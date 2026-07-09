# ADR-011 — Zero Trust : mTLS est-ouest, token exchange

**Date :** 2026-07-05
**Statut :** Accepté
**Décideurs :** Architecte plateforme, RSSI, Lead intégration
**Contexte technique :** organisation `PIVOT-PLATFORM` (`pivot-core`, `pivot-ui`, adaptateurs `pivot-plugins`)

---

## Contexte

Un portail qui agrège des dizaines de modules concentre trois choses convoitées : les identités, les accès, les données. C'est structurellement la cible la plus rentable du SI, juste après l'annuaire. Le périmètre réseau ne peut plus être la frontière de sécurité : un module interne compromis doit être traité avec la même méfiance qu'un module externe (assume breach).

## Décision

1. **Aucune confiance implicite liée au réseau.** Chaque requête — y compris interne module ↔ module — est authentifiée, autorisée et chiffrée.
2. **mTLS systématique est-ouest** entre tous les services internes, avec identité de charge (workload identity, type SPIFFE/SPIRE) distincte de l'identité utilisateur.
3. **Token Exchange (OAuth2, RFC 8693)** pour la propagation d'identité en profondeur : l'utilisateur s'authentifie une fois auprès de Keycloak ; à chaque appel descendant, son token est échangé contre un token à portée réduite, spécifique au module cible et à l'action, à durée de vie courte.
4. On distingue explicitement **contexte utilisateur** (token échangé, *on-behalf-of*) et **contexte de service** (identité de charge, droits minimaux) — l'audit trace la personne réelle, jamais « le portail », même au fond de la pile d'appels.

## Conséquences

- **Positif :** contient le rayon d'explosion d'une compromission ; l'autorisation fine peut décider selon l'utilisateur réel à n'importe quel niveau de la pile ; cohérent avec ADR-004 (Keycloak, OIDC multi-tenant).
- **Négatif :** complexité opérationnelle de la rotation de certificats et de la gestion des identités de charge ; nécessite un Service Mesh (ADR-012) pour ne pas reporter cette complexité sur chaque module.
- **Interdit :** un module qui fait confiance à une requête interne au seul motif qu'elle vient du réseau interne.

## Alternatives écartées

- Confiance réseau (périmètre = frontière de sécurité) : ne tient pas avec des dizaines de modules et des adaptateurs tiers potentiellement hostiles.
- Partage direct des credentials utilisateur en profondeur : expose les credentials d'origine à chaque module traversé, aucune granularité de portée possible.

## Historique

| Version | Date | Évolution |
|---------|------|-----------|
| v1 | 2026-07-05 | Décision initiale |
