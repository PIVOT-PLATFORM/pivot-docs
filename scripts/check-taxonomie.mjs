#!/usr/bin/env node
// Valide la taxonomie des rôles (docs/taxonomie/roles.json) et la couverture :
// chaque US/EN du backlog doit porter un champ `Rôle:` résolvant vers un rôle,
// un `macro:<macro-rôle>` ou un `groupe:<groupe>` déclaré dans la taxonomie.
// Zéro dépendance (aligné sur scripts/check-docs-naming.mjs).

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const errors = [];
const fail = (m) => errors.push(m);

const TAXO = 'docs/taxonomie/roles.json';
const PERIMETRES = new Set(['DSI', 'Métier', 'Externe']);
const KEBAB = /^[a-z0-9]+(-[a-z0-9]+)*$/;

// --- 1. Charger + valider les invariants de la taxonomie ---
let taxo;
try {
  taxo = JSON.parse(readFileSync(TAXO, 'utf8'));
} catch (e) {
  fail(`${TAXO}: JSON invalide — ${e.message}`);
  report();
}

const domaineNums = new Set((taxo.domaines || []).map((d) => d.num));
const macroIds = new Set();
const roleIds = new Set();
const groupeIds = new Set();

for (const m of taxo.macro_roles || []) {
  if (!m.id || !KEBAB.test(m.id)) fail(`macro_role id invalide (kebab attendu) : ${JSON.stringify(m.id)}`);
  if (macroIds.has(m.id)) fail(`macro_role dupliqué : ${m.id}`);
  macroIds.add(m.id);
  if (!m.label_fr || !m.label_en) fail(`macro_role ${m.id} : label_fr et label_en requis`);
  for (const d of m.domaines || []) if (!domaineNums.has(d)) fail(`macro_role ${m.id} : domaine ${d} inconnu`);
}

for (const r of taxo.roles || []) {
  if (!r.id || !KEBAB.test(r.id)) { fail(`rôle id invalide (kebab attendu) : ${JSON.stringify(r.id)}`); continue; }
  if (roleIds.has(r.id)) fail(`rôle dupliqué : ${r.id}`);
  roleIds.add(r.id);
  if (!r.label_fr) fail(`rôle ${r.id} : label_fr requis`);
  if (!r.mission) fail(`rôle ${r.id} : mission requise`);
  if (!Array.isArray(r.aliases_en) || r.aliases_en.length === 0) fail(`rôle ${r.id} : au moins une appellation EN (aliases_en) requise`);
  if (!Array.isArray(r.perimetre) || r.perimetre.length === 0) fail(`rôle ${r.id} : périmètre requis`);
  for (const p of r.perimetre || []) if (!PERIMETRES.has(p)) fail(`rôle ${r.id} : périmètre invalide « ${p} » (attendu DSI/Métier/Externe)`);
  if (!domaineNums.has(r.domaine)) fail(`rôle ${r.id} : domaine ${r.domaine} inconnu`);
  if (!macroIds.has(r.macro_role)) fail(`rôle ${r.id} : macro_role « ${r.macro_role} » inconnu`);
}

for (const g of taxo.groupes || []) {
  if (!g.id || !KEBAB.test(g.id)) fail(`groupe id invalide : ${JSON.stringify(g.id)}`);
  if (groupeIds.has(g.id)) fail(`groupe dupliqué : ${g.id}`);
  groupeIds.add(g.id);
  if (!Array.isArray(g.membres) || g.membres.length === 0) fail(`groupe ${g.id} : membres requis`);
  for (const mb of g.membres || []) if (!roleIds.has(mb)) fail(`groupe ${g.id} : membre « ${mb} » n'est pas un rôle connu`);
}

const archIds = new Set();
for (const a of taxo.archetypes || []) {
  if (!a.id || !KEBAB.test(a.id)) fail(`archétype id invalide : ${JSON.stringify(a.id)}`);
  if (archIds.has(a.id)) fail(`archétype dupliqué : ${a.id}`);
  archIds.add(a.id);
  if (!a.label_fr || !a.roles_renforces) fail(`archétype ${a.id} : label_fr et roles_renforces requis`);
}

if (roleIds.size === 0) fail(`${TAXO}: aucun rôle défini`);

// --- 2. Résolution d'une valeur de champ Rôle ---
function resolves(value) {
  const v = value.trim();
  if (v.startsWith('macro:')) return macroIds.has(v.slice(6));
  if (v.startsWith('groupe:')) return groupeIds.has(v.slice(7));
  return roleIds.has(v);
}

// --- 3. Couverture : tout us-*.md / en-*.md porte un Rôle: valide ---
function walk(dir) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p);
    else if (/^(us|en)-[a-z0-9-]+\.md$/.test(e)) checkItem(p);
  }
}

function checkItem(path) {
  const content = readFileSync(path, 'utf8');
  const m = content.match(/^Rôle\s*:\s*(.+)$/m);
  if (!m) { fail(`${path}: champ \`Rôle:\` manquant`); return; }
  const values = m[1].split(',').map((s) => s.trim()).filter(Boolean);
  if (values.length === 0) { fail(`${path}: \`Rôle:\` vide`); return; }
  for (const v of values) {
    if (!resolves(v)) fail(`${path}: rôle « ${v} » introuvable dans la taxonomie (${TAXO})`);
  }
}

walk('docs/backlog');

report();

function report() {
  if (errors.length) {
    console.error(`Taxonomie : ${errors.length} erreur(s)`);
    for (const e of errors.slice(0, 100)) console.error(`  ✗ ${e}`);
    if (errors.length > 100) console.error(`  … +${errors.length - 100} autres`);
    process.exit(1);
  }
  console.log(`Taxonomie : OK — ${roleIds.size} rôles, ${macroIds.size} macro-rôles, ${groupeIds.size} groupes ; couverture US/EN complète`);
  process.exit(0);
}
