#!/usr/bin/env node
// Vérifie les conventions de nommage décrites dans docs/backlog/README.md
// (hiérarchie EPIC/FEATURE/ENABLER/US) et la numérotation séquentielle des ADR.

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const errors = [];

function fail(message) {
  errors.push(message);
}

function isDir(path) {
  return statSync(path).isDirectory();
}

// --- ADR : ADR-NNN-slug.md, numérotation séquentielle sans trou ---
function checkAdr() {
  const dir = 'docs/adr';
  const files = readdirSync(dir).filter((f) => f !== 'README.md');
  const numbers = [];

  for (const file of files) {
    const match = file.match(/^ADR-(\d{3})-[a-z0-9-]+\.md$/);
    if (!match) {
      fail(`docs/adr/${file}: nom attendu \`ADR-NNN-slug-kebab-case.md\``);
      continue;
    }
    numbers.push(Number(match[1]));
  }

  numbers.sort((a, b) => a - b);
  numbers.forEach((n, i) => {
    const expected = i + 1;
    if (n !== expected) {
      fail(`docs/adr: numérotation non séquentielle — attendu ADR-${String(expected).padStart(3, '0')}, trouvé ADR-${String(n).padStart(3, '0')}`);
    }
  });
}

// --- Backlog : EPIC-slug/{README.md, ENABLERS/, FEATURES/} ---
function checkBacklog() {
  const root = 'docs/backlog';
  const entries = readdirSync(root);

  for (const entry of entries) {
    const full = join(root, entry);
    if (!isDir(full)) continue;

    if (!/^EPIC-[a-z0-9-]+$/.test(entry)) {
      fail(`${full}: dossier EPIC attendu au format \`EPIC-slug-kebab-case\``);
      continue;
    }

    const children = readdirSync(full);
    if (!children.includes('README.md')) {
      fail(`${full}: README.md manquant (page d'accueil de l'EPIC)`);
    }

    for (const child of children) {
      const childPath = join(full, child);
      if (!isDir(childPath)) continue;

      if (!['ENABLERS', 'FEATURES'].includes(child)) {
        fail(`${childPath}: sous-dossier inattendu (seuls ENABLERS/ et FEATURES/ sont autorisés sous un EPIC)`);
        continue;
      }

      // "1 fichier par US / Enabler — nommage us-{slug}.md ou en-{slug}.md"
      // (docs/backlog/README.md §2) : les deux préfixes sont valides dans
      // ENABLERS/ comme dans FEATURES/ — un enabler peut être décomposé en
      // sous-US numérotées (ex. US05.15.2 sous EN05.15).
      if (child === 'ENABLERS') {
        for (const f of readdirSync(childPath)) {
          const p = join(childPath, f);
          if (isDir(p)) {
            fail(`${p}: sous-dossier inattendu dans ENABLERS/ (fichiers plats attendus)`);
          } else if (!/^(en|us)-[a-z0-9-]+\.md$/.test(f)) {
            fail(`${p}: fichier attendu au format \`en-slug-kebab-case.md\` ou \`us-slug-kebab-case.md\``);
          }
        }
      }

      if (child === 'FEATURES') {
        for (const featureDir of readdirSync(childPath)) {
          const featurePath = join(childPath, featureDir);
          if (!isDir(featurePath)) {
            fail(`${featurePath}: fichier inattendu directement sous FEATURES/ (un sous-dossier par feature est attendu)`);
            continue;
          }
          if (!/^[a-z0-9-]+$/.test(featureDir)) {
            fail(`${featurePath}: dossier feature attendu en kebab-case`);
          }
          // README.md est optionnel au niveau feature (cf. arborescence
          // documentée dans docs/backlog/README.md — seul l'EPIC en a un).
          for (const f of readdirSync(featurePath)) {
            if (f === 'README.md') continue;
            if (!/^(us|en)-[a-z0-9-]+\.md$/.test(f)) {
              fail(`${join(featurePath, f)}: fichier attendu au format \`us-slug-kebab-case.md\` ou \`en-slug-kebab-case.md\``);
            }
          }
        }
      }
    }
  }
}

// --- IDs E01 / F01.1 / EN01.1 / US01.1.1 : format strict partout où ils apparaissent ---
function checkIdFormat() {
  const files = [
    'docs/backlog/STATUS.md',
    'docs/backlog/SPRINTS.md',
    ...readdirSync('docs/backlog')
      .filter((e) => /^EPIC-/.test(e))
      .map((e) => join('docs/backlog', e, 'README.md')),
  ];

  // Grammaire réelle observée dans docs/backlog (STATUS.md, SPRINTS.md, EPIC READMEs) :
  // - E01 (epic, toujours seul)
  // - F01.1 / F01.x (feature, éventuellement wildcard ".x" = "toute la feature")
  // - EN01.1 / EN01 / EN01.x (enabler, avec ou sans sous-numéro, wildcard possible)
  // - US01 / US01.x / US01.1 / US01.1.1 / US01.1.3a (story, jusqu'à 2 sous-segments,
  //   wildcard ".x", suffixe lettre a/b pour les stories scindées)
  const seg = '(\\.(\\d+|x))';
  const validId = new RegExp(
    `^(E\\d{2}|F\\d{2}${seg}|EN\\d{2}${seg}?|US\\d{2}${seg}{0,2}[a-z]?)$`,
  );
  // Repère un jeton qui RESSEMBLE à un ID (préfixe E/F/EN/US suivi de chiffres,
  // points, "x" wildcard, ou lettre de suffixe) mais qui pourrait être mal formé.
  const idLike = /\b(EN|US|E|F)\d+(\.(\d+|x))*[a-z]?\b/g;

  for (const file of files) {
    let content;
    try {
      content = readFileSync(file, 'utf8');
    } catch {
      continue;
    }
    for (const match of content.matchAll(idLike)) {
      const token = match[0];
      if (!validId.test(token)) {
        fail(`${file}: identifiant \`${token}\` ne respecte pas le format E01 / F01.1 / EN01.1 / US01.1.1`);
      }
    }
  }
}

checkAdr();
checkBacklog();
checkIdFormat();

if (errors.length > 0) {
  console.error(`${errors.length} violation(s) de nomenclature :\n`);
  for (const e of errors) console.error(`  ✗ ${e}`);
  process.exit(1);
}

console.log('Nomenclature docs/ : OK');
