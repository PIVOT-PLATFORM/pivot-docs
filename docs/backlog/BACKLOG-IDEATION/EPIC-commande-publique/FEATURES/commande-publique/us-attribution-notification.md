# US25.1.3 — Attribuer le marché et notifier les candidats

**En tant que** responsable achats
**Je veux** attribuer le marché au candidat retenu et notifier les autres
**Afin de** clore le processus de consultation de manière traçable

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une consultation en statut EN_COURS_ANALYSE avec au moins un candidat scoré, when POST `.../consultations/{id}/award` (body: candidateId, motif), then le statut de la consultation passe à ATTRIBUEE et l'attribution est enregistrée avec horodatage et utilisateur ayant attribué | ⬜ |
| Given une consultation attribuée, when la notification est déclenchée, then un rapport d'attribution (export structuré incluant la grille d'analyse) est généré et chaque candidat reçoit une notification de résultat (retenu / non retenu) | ⬜ |
| Error : given une consultation non en statut EN_COURS_ANALYSE (ex. DRAFT, déjà ATTRIBUEE, ANNULEE), system retourne 409 sur l'attribution | ⬜ |
| Error : given une consultation sans aucun candidat enregistré, system retourne 400 sur l'attribution | ⬜ |
| Security : seul le rôle responsable achats/pilotage du tenant propriétaire peut déclencher l'attribution ; l'historique des décisions d'attribution (audit log) est immuable et horodaté | ⬜ |
| Security : la notification envoyée à un candidat non retenu ne contient jamais l'offre, le score ou les informations d'un candidat concurrent — seul son propre résultat et, au maximum, son propre score/classement lui sont communiqués | ⬜ |

## Hors périmètre
- Le calcul des scores et la grille d'analyse elle-même (US25.1.2)
- L'envoi effectif via un canal de notification externe (email/SMS transactionnel) — cette US couvre la génération du contenu et le déclenchement, pas l'infrastructure d'envoi
- La gestion des recours/contestations post-attribution

## Notes d'implémentation
- Dépend des données de scoring produites par US25.1.2 (`ScoringGrid`, scores par candidat) pour générer le rapport d'attribution
- L'audit log d'attribution doit être distinct et append-only (pas de update/delete) pour garantir la traçabilité opposable en cas de litige
- Le contenu de notification par candidat doit être généré individuellement (pas un export unique diffusé à tous) afin d'éviter tout risque de fuite croisée des informations d'un candidat à l'autre

---
Item Type: US · Parent: F25.1 · Module: pilotage · Phase: phase-3 · Size: M · Priority: Medium
Stage: ⬜
Rôle: acheteur-informatique
Dépendances: US25.1.2
