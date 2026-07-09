# US42.10.1 — Accessibilité RGAA 4

**En tant que** DSI publique
**Je veux** que l'éditeur de formulaires et les formulaires produits soient conformes RGAA 4 / WCAG 2.1 AA, avec une déclaration d'accessibilité publiable
**Afin de** répondre à l'obligation légale d'accessibilité numérique du secteur public

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un formulaire créé avec l'éditeur, when il est audité RGAA, then il obtient un taux de conformité publiable (déclaration d'accessibilité générée) sans intervention manuelle supplémentaire du concepteur | ⬜ |
| Given l'éditeur lui-même (pas seulement le formulaire produit), when il est utilisé au clavier ou au lecteur d'écran, then toutes les actions de construction (ajout, réorganisation, configuration de champ) sont accessibles | ⬜ |
| Error : given un type de champ ou un composant qui ne peut techniquement pas atteindre la conformité RGAA (ex. certains widgets tiers embarqués), when il est utilisé, then il est signalé comme dérogation documentée dans la déclaration d'accessibilité, jamais silencieusement omis | ⬜ |
| A11y : conformité RGAA 4 / WCAG 2.1 AA sur l'éditeur ET les formulaires produits — navigation clavier complète, compatibilité lecteur d'écran, contrastes suffisants, focus visible | ⬜ |

## Hors périmètre

- Conformité RGAA de niveau AAA — cette US couvre le niveau AA requis réglementairement, pas au-delà
- Accessibilité des widgets tiers embarqués hors du contrôle de Forms (cf. AC Error ci-dessus pour la dérogation documentée)

## Notes d'implémentation

- La génération automatique de la déclaration d'accessibilité distingue cette US d'une simple conformité technique : c'est l'obligation légale (déclaration publiable) qui est le critère de complétion, pas seulement le score d'audit

---
Item Type: US · Parent: F42.10 · Module: forms · Phase: phase-3 · Size: L · Priority: Critical
Stage: ⬜
Source: FRM-A01 · MoSCoW: Must · Origine: Vide de marché + contexte public FR
Justification: Benchmark formulaires (Typeform/Jotform/Tally/Formbricks/Qualtrics/Google) — recentré PIVOT
Dépendances: EN42.1 (moteur & schéma de formulaire)
