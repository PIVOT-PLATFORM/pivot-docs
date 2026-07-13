# EN25.4 — Intégration PGI / MyPGI

**Type d'enabler** : infrastructure

**Objectif technique** : Réaliser l'intégration avec PGI / MyPGI : liens de consultation et de validation par mandant PGI (déterminé par le 3e chiffre du numéro de DA), ouverture directe de l'écran de validation PGI, et export CSV des contrats.

**Justification** : Le circuit de validation et le suivi des demandes s'appuient sur PGI/MyPGI. La sélection du bon mandant et l'accès direct à l'écran de validation évitent les erreurs de saisie, et l'export CSV des contrats répond aux besoins de reporting.

**Critères de complétion** :
- [ ] Détermination du mandant PGI à partir du 3e chiffre du numéro de DA.
- [ ] Génération des liens de consultation/validation vers PGI/MyPGI selon le mandant.
- [ ] Ouverture de l'écran de validation PGI depuis l'application.
- [ ] Export CSV des contrats conforme au format attendu.

**Critères d'acceptation (Given/When/Then)** :
- [ ] Given une DA dont le 3e chiffre du numéro désigne un mandant, when l'utilisateur ouvre le lien PGI, then l'écran de validation du mandant correspondant s'ouvre.
- [ ] Error case: given un numéro de DA dont le 3e chiffre ne correspond à aucun mandant connu, when le lien est généré, then l'application signale l'erreur et n'ouvre pas d'écran PGI erroné.
- [ ] Security: les liens de validation PGI ne sont accessibles qu'aux rôles habilités (V/CM/A) sur le périmètre de la DA ; l'export CSV respecte le périmètre de rattachement.

---
Item Type: Enabler · Parent: E25 · Module: pilotage · Phase: phase-3 · Size: L · Priority: High
Stage: ⬜
Rôle: administrateur-plateforme
Source: SPEC_OPDN — module Achats/Contrats (WRAP/OPDN)
Dépendances: —
