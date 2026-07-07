#!/usr/bin/env node
// Vérifie que le champ frontmatter `Rôle:` (docs/taxonomie/README.md, zones-ombre.md #5),
// quand présent, ne référence que des identifiants déclarés dans docs/taxonomie/roles.json
// (rôle simple `<id>`, macro-rôle `macro:<id>` ou groupe `groupe:<id>`).
//
// Volontairement non bloquant sur l'absence du champ : le backfill des ~700 US/Enablers
// existants est un chantier séparé (PR #65, zones-ombre.md #5) — ce script ne fait que
// garantir qu'un `Rôle:` renseigné n'est jamais une faute de frappe ou un id inventé.

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const errors = [];

function fail(message) {
  errors.push(message);
}

function isDir(path) {
  return statSync(path).isDirectory();
}

function loadValidTokens() {
  const data = JSON.parse(readFileSync('docs/taxonomie/roles.json', 'utf8'));
  const tokens = new Set();
  for (const role of data.roles) tokens.add(role.id);
  for (const macro of data.macro_roles) tokens.add(`macro:${macro.id}`);
  for (const groupe of data.groupes) tokens.add(`groupe:${groupe.id}`);
  return tokens;
}

function walkMarkdownFiles(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (isDir(full)) {
      out.push(...walkMarkdownFiles(full));
    } else if (entry.endsWith('.md')) {
      out.push(full);
    }
  }
  return out;
}

function checkRoleField(validTokens) {
  const files = walkMarkdownFiles('docs/backlog');
  let checked = 0;

  for (const file of files) {
    const content = readFileSync(file, 'utf8');
    const match = content.match(/^Rôle:\s*(.+)$/m);
    if (!match) continue;

    checked++;
    const raw = match[1].trim();
    if (raw === '—' || raw === '') continue; // valeur explicitement vide, tolérée

    const tokens = raw.split(',').map((t) => t.trim()).filter(Boolean);
    for (const token of tokens) {
      if (!validTokens.has(token)) {
        fail(`${file}: Rôle "${token}" absent de docs/taxonomie/roles.json (rôle simple, macro:<id> ou groupe:<id> attendus)`);
      }
    }
  }

  return checked;
}

const validTokens = loadValidTokens();
const checked = checkRoleField(validTokens);

if (errors.length > 0) {
  console.error(`Taxonomie des rôles : ${errors.length} erreur(s) sur ${checked} fichier(s) portant un champ Rôle:`);
  for (const e of errors) console.error(`  ✗ ${e}`);
  process.exit(1);
}

console.log(`Taxonomie des rôles : OK (${checked} fichier(s) avec un champ Rôle: renseigné, 0 invalide — backfill restant hors périmètre de ce script, cf. zones-ombre.md #5)`);
