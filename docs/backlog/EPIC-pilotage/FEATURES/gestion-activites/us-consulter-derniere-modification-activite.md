# US18.1.4 — Consulter la dernière modification d'une activité

**En tant que** utilisateur final
**Je veux** voir qui a modifié une activité, une liste ou un jalon et à quel moment
**Afin de** assurer la traçabilité des changements

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une activité modifiée, when je la consulte, then l'auteur de la dernière modification et sa date/heure sont affichés | ⬜ |
| Given une liste ou un jalon modifié, when je le consulte, then l'auteur et le moment de la dernière modification sont affichés | ⬜ |
| Error : given une entité jamais modifiée depuis sa création, system affiche l'information de création sans provoquer d'erreur | ⬜ |
| Security/Gouvernance : l'information de dernière modification est en lecture seule et ne peut être altérée par l'utilisateur | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- L'historique complet des versions successives n'est pas couvert (seule la dernière modification est affichée).

## Notes d'implémentation
- Information de dernière modification (auteur + horodatage) affichée sur activité, liste et jalon.
- Voir aussi US-208 pour les onglets budgétaires (Élaboration PMT, Jalon, PDS Pluriannuel).

---
Item Type: US · Parent: F18.1 · Module: pilotage · Phase: phase-3 · Size: XS · Priority: Medium
Stage: ⬜
Rôle: utilisateur-final
Source: Backlog OPPA (reconstitution v1–v2.1) — US-104
Dépendances: —
