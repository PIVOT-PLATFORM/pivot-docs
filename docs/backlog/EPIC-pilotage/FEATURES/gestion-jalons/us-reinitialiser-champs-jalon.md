# US18.3.7 — Réinitialiser les champs de jalon (vue planning)

**En tant que** chef de projet (pilote d'activité)
**Je veux** réinitialiser Date de passage, Date de sécurisation/SECEN et Avis de sécurisation/Avis CEN
**Afin de** corriger une saisie erronée sans recréer le jalon

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un jalon renseigné, when je réinitialise le champ Date de passage, then sa valeur est vidée | ⬜ |
| Given un jalon renseigné, when je réinitialise Date de sécurisation/SECEN et Avis de sécurisation/Avis CEN, then leurs valeurs sont vidées | ⬜ |
| Error : given une réinitialisation, system vide uniquement les champs concernés sans altérer les autres jalons | ⬜ |
| Security/Gouvernance : seul le chef de projet pilote de l'activité (ou un administrateur habilité) peut réinitialiser les champs de jalon | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- L'isolement d'un jalon dans la vue planning est couvert par une US dédiée.

## Notes d'implémentation
- Vue planning des jalons (module pilotage) : réinitialisation de Date de passage, Date de sécurisation/SECEN, Avis de sécurisation/Avis CEN.

---
Item Type: US · Parent: F18.3 · Module: pilotage · Phase: phase-3 · Size: XS · Priority: Medium
Stage: ⬜
Rôle: chef-de-projet
Source: Backlog OPPA (reconstitution v1–v2.1) — US-307
Dépendances: —
