# US26.2.4 — Interface ERP finance

**En tant que** contrôleur de gestion SI
**Je veux** connecter le PPM au SI financier d'entreprise (ERP) pour importer les réalisations et rapprocher le budget
**Afin de** disposer de l'équivalent privé de l'interface comptable publique

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un ERP finance connecté, when les réalisations sont importées, then elles sont rapprochées des budgets projet (prévu/engagé/réalisé) | ⬜ |
| Given un écart de rapprochement, when il est détecté, then il est signalé pour arbitrage | ⬜ |
| Error : given un import ERP dont un enregistrement ne référence aucun Projet/Application connu, system rejette cet enregistrement et le signale sans bloquer le reste de l'import | ⬜ |
| Security : seul le contrôleur de gestion SI (ou rôle admin d'intégration) peut configurer la connexion ERP et déclencher/valider un import ; les flux financiers importés sont tracés (origine, horodatage) et rattachés au Projet/Application, sans exposer les identifiants de connexion ERP aux profils non habilités | ⬜ |
| A11y : l'écran d'arbitrage des écarts de rapprochement est navigable au clavier et les écarts signalés sont restitués au lecteur d'écran, conformément WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Simulation de scénarios budgétaires AP/CP (couverte par US26.2.6)
- Interface comptable publique équivalente (hors scope — cette US est la variante privée)
- Résolution automatique des écarts de rapprochement : l'US couvre le signalement pour arbitrage humain, pas la correction automatique

## Notes d'implémentation
- Variante privée de l'interface comptable publique (Insight I2) — cible PME, Grand groupe, Privée sous droit public
- Le rapprochement s'appuie sur les montants prévu/engagé/réalisé déjà portés par US26.2.1 (Coûts au niveau projet)
- Traçabilité obligatoire des flux importés (source ERP, date d'import, utilisateur ayant déclenché l'import) pour audit
- Le mapping Projet/Application entre l'ERP et Pivot est un prérequis technique à documenter avant implémentation (référentiel de correspondance)

---
Item Type: US · Parent: F26.2 · Module: pilotage · Phase: phase-3 · Size: L · Priority: High
Stage: Backlog
Source: PP-017b · MoSCoW: Should · Lot: Lot 2 · Origine: Insight I2 (variante privée)
Profils: PME, Grand groupe, Privée sous droit public
Justification: Synthèse v2 §8 : équivalent privé de l'interface comptable
Dépendances: —
