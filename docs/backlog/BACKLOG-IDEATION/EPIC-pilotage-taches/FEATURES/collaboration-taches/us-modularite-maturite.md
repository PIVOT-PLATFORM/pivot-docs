# US33.1.3 — Modularité par maturité

**En tant que** PMO
**Je veux** activer progressivement des modules préinstallés selon la maturité du PMO
**Afin d'** adopter les fonctionnalités au rythme de la montée en compétence de l'organisation

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given des modules préinstallés, when le PMO active un module, then ses fonctionnalités deviennent disponibles sans réinstallation | ⬜ |
| Les modules peuvent être activés progressivement selon la maturité | ⬜ |
| Error : given l'activation d'un module dont un prérequis n'est pas activé, system signale la dépendance | ⬜ |
| Security/Gouvernance : l'activation de modules est réservée aux rôles autorisés et tracée | ⬜ |

## Hors périmètre
- Le développement des modules eux-mêmes (leurs fonctionnalités) n'est pas couvert ici — cette US ne traite que le mécanisme d'activation/désactivation des modules préinstallés
- La facturation ou le modèle commercial lié à l'activation de modules n'est pas traité
- La désactivation d'un module déjà utilisé (avec données existantes) et la gestion de sa réversibilité ne sont pas couvertes par cette US

## Notes d'implémentation
- Les modules sont préinstallés (livrés avec le socle) : l'activation ne déclenche pas d'installation ni de déploiement, uniquement un changement d'état exposé aux organisations
- Le graphe de dépendances entre modules (prérequis) doit être vérifié côté backend avant activation (cf. AC Error) ; il n'est pas nécessaire de le rendre configurable dans cette US
- La trace d'activation (qui, quand, quel module) est à conserver pour audit, cohérente avec les exigences de gouvernance PMO du dossier §6.2
- Le profil « Profils: TPE, PME, Grand groupe, Privée sous droit public » indique que la granularité de modules doit rester pertinente pour des organisations de tailles très différentes — éviter un modèle figé pensé pour un seul profil

---
Item Type: US · Parent: F33.1 · Module: pilotage · Phase: phase-3 · Size: M · Priority: Medium
Stage: ⬜
Rôle: officier-responsable-pmo
Source: PP-051 · MoSCoW: Should · Lot: Lot 2 · Origine: Différenciant Sciforma
Profils: TPE, PME, Grand groupe, Privée sous droit public
Justification: Dossier §6.2
Dépendances: —
