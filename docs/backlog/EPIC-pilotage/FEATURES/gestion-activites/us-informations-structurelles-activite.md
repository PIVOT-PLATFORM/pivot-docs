# US18.1.2 — Renseigner les informations structurelles d'une activité

**En tant que** chef de projet (pilote d'activité)
**Je veux** rattacher l'activité à un produit associé, un domaine/sous-domaine (N1, N2) métier et une capacité/sous-capacité métier
**Afin de** situer l'activité dans le référentiel métier

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given le formulaire structurel, when je le renseigne, then les champs Produit associé, Domaine métier, Sous-domaine métier et Capacité métier sont obligatoires | ⬜ |
| Given une valeur sélectionnée sur un champ structurel, when je clique sur son bouton de réinitialisation, then la sélection est vidée | ⬜ |
| Given une réinitialisation, when la sélection est vidée, then Priorité métier et Typologie principale se remettent sur « À définir » | ⬜ |
| Error : given un champ obligatoire vide (Produit associé, Domaine métier, Sous-domaine métier ou Capacité métier), system bloque l'enregistrement et signale le champ manquant | ⬜ |
| Security/Gouvernance : seul le chef de projet pilote de l'activité (ou un administrateur habilité) peut modifier le rattachement structurel | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La saisie des gains et de la description est couverte par l'US Informations générales.

## Notes d'implémentation
- Écran Informations générales de l'activité, section structurelle (module pilotage).
- Chaque champ dispose d'un bouton de réinitialisation ; la remise à zéro rétablit « À définir » pour Priorité métier et Typologie principale.

---
Item Type: US · Parent: F18.1 · Module: pilotage · Phase: phase-3 · Size: S · Priority: High
Stage: ⬜
Rôle: chef-de-projet
Source: Backlog OPPA (reconstitution v1–v2.1) — US-102
Dépendances: —
