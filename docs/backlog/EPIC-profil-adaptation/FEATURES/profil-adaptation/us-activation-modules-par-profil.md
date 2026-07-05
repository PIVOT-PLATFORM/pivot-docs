# US40.1.2 — Activation des modules par profil

**En tant que** administrateur de la plateforme
**Je veux** que le profil active/désactive automatiquement modules, packs de conformité et niveau de rigueur
**Afin de** éviter la sur-ingénierie (TPE) comme le sous-équipement (État)

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un profil d'organisation, when il est appliqué, then les modules-EPIC du domaine et les packs de conformité pertinents sont activés/désactivés automatiquement | ⬜ |
| Given un profil bas de spectre (TPE), when il est appliqué, then les capacités avancées (AP/CP, PPI, DLP…) sont masquées par défaut | ⬜ |
| Error : given un module désactivé par le profil, when un utilisateur tente d'y accéder, then l'accès est refusé proprement (guard module) | ⬜ |

---
Item Type: US · Parent: F40.1 · Module: pilotage · Phase: phase-3 · Size: L · Priority: Critical
Stage: Backlog
Rôle: administrateur-plateforme
Source: PP-A02 · MoSCoW: Must · Lot: Lot 1 · Origine: Synthèse v2
Profils: Tous
Justification: Synthèse v2 §7 + Insight I1
Dépendances: EN18.9 (modèle Application→Projet)
