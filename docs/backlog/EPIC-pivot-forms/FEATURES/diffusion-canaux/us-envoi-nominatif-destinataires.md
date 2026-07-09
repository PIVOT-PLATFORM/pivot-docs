# US42.3.4 — Envoi nominatif à des destinataires nommés

**En tant que** concepteur de formulaire
**Je veux** diffuser un formulaire à une liste de destinataires nommés, chacun avec un lien personnel, plutôt qu'un seul lien public
**Afin de** savoir précisément qui a répondu et permettre les relances ciblées (US42.3.5) sur une population connue

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une liste de destinataires nommés (email + identité), when le formulaire est diffusé, then chaque destinataire reçoit un lien personnel distinct du lien partageable générique (US42.3.1) | ⬜ |
| Given un lien personnel, when le destinataire répond, then la réponse est associée à son identité — pas d'anonymat sur ce canal, contrairement au lien partageable public | ⬜ |
| Given l'envoi initial, when il est déclenché, then une invitation par email est envoyée à chaque destinataire avec son lien personnel | ⬜ |
| Error : given un email de destinataire invalide dans la liste, when l'envoi est déclenché, then cet envoi échoue explicitement pour ce destinataire sans bloquer l'envoi aux autres | ⬜ |
| Security : un lien personnel n'est valide que pour le destinataire auquel il a été émis (non devinable, non réutilisable par un tiers) | ⬜ |

## Hors périmètre

- Le lien partageable public sans identité (couvert par US42.3.1)
- Les relances (manuelles ou automatiques) sur les destinataires n'ayant pas répondu — couvertes par US42.3.5

## Notes d'implémentation

- Réutilise l'infrastructure d'envoi email déjà existante côté PIVOT plutôt que d'en recréer une dédiée à Forms
- Le lien personnel est un token non séquentiel par (formulaire, destinataire), distinct du token du lien partageable générique

---
Item Type: US · Parent: F42.3 · Module: forms · Phase: phase-3 · Size: M · Priority: Medium
Stage: ⬜
Source: PouetPouet v0.31.0 (PR1/2 #240, Formulaires génériques pour PI Planning)
Justification: Livré dans le POC de référence (PI Planning, formulaire logistique nominatif) — absent du benchmark socle initial
Dépendances: EN42.1 (moteur & schéma de formulaire)
