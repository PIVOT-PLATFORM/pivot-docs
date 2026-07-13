# US25.1.8 — Visualisation de Flash Info

**En tant que** utilisateur de l'application Achats/Contrats
**Je veux** consulter les Flash Info affichés en haut des pages du module DA
**Afin de** être informé des actualités concernant mon unité, ma division ou ma direction

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given les pages du module Demandes d'achats, when je les ouvre, then un encart Flash Info est affiché en haut de page | ⬜ |
| Given plusieurs Flash Info, when j'utilise la flèche droite, then je fais défiler les flashs successifs | ⬜ |
| Given l'encart Flash Info, when je consulte un flash, then il affiche le titre, la structure de rattachement, le texte et la date de création | ⬜ |
| Given le bouton Afficher/Masquer, when je clique dessus, then l'encart Flash Info est masqué ou réaffiché | ⬜ |
| Error : given l'absence de flash lié à l'unité/division/direction de l'utilisateur, system n'affiche aucun flash pour cet utilisateur | ⬜ |
| Security/Gouvernance : l'utilisateur ne voit que les flashs liés à son unité, sa division ou sa direction de rattachement ; visible pour P/V/CM/A (OUI/OUI/OUI/OUI) | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La création et la gestion des Flash Info (couvertes par la feature Administration).

## Notes d'implémentation
- Encart en haut des pages du module DA, filtrage par structure de rattachement (unité/division/direction).
- Défilement via flèche droite, bouton Afficher/Masquer, champs affichés : titre, structure de rattachement, texte, date de création.

---
Item Type: US · Parent: F25.1 · Module: pilotage · Phase: phase-3 · Size: M · Priority: Medium
Stage: ⬜
Rôle: utilisateur-final
Source: SPEC_OPDN — B.1 Navigation générale & accès
Dépendances: —
