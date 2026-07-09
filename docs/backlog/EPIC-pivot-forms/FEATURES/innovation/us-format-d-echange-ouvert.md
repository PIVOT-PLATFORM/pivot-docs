# US42.11.1 — Format d'échange ouvert

**En tant que** DSI
**Je veux** un format d'export/import ouvert et documenté (champs, logique, thème) pour les formulaires
**Afin de** garder la réversibilité — pouvoir sortir de Forms sans perte de structure, pas seulement y entrer

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un formulaire avec champs, logique conditionnelle et thème, when il est exporté puis réimporté dans une autre instance Forms, then il est reconstitué à l'identique (aucune perte de structure) | ⬜ |
| Given le format d'export, when il est consulté hors de Forms, then sa spécification est documentée publiquement (schéma ouvert, pas un format propriétaire opaque) | ⬜ |
| Error : given un formulaire utilisant une capacité non représentable dans le format d'échange (ex. évolution future du moteur), when il est exporté, then l'export signale explicitement ce qui ne peut pas être représenté, plutôt qu'un export silencieusement incomplet | ⬜ |
| Security : l'export ne contient jamais les réponses ni données personnelles par défaut — uniquement la structure du formulaire, sauf demande explicite et tracée d'export des réponses (cf. US42.4.1) | ⬜ |

## Hors périmètre

- Export vers le format propriétaire d'un outil tiers spécifique — cette US couvre le format ouvert Forms, pas une conversion vers Typeform/Jotform/etc. (cf. migration/import, US42.9.3, pour le sens inverse)

## Notes d'implémentation

- C'est ce format qui rend possible l'export lors d'une portabilité de données (US42.8.2) et l'import depuis un outil tiers exposant un format compatible (US42.9.3) — un socle transverse, pas une fonctionnalité isolée

---
Item Type: US · Parent: F42.11 · Module: forms · Phase: phase-3 · Size: L · Priority: Medium
Stage: ⬜
Source: FRM-B01 · MoSCoW: Could · Origine: Vide de marché
Justification: Benchmark formulaires (Typeform/Jotform/Tally/Formbricks/Qualtrics/Google) — recentré PIVOT
Dépendances: EN42.1 (moteur & schéma de formulaire)
