# US25.1.1 — Accès à l'application

**En tant que** utilisateur de l'application Achats/Contrats
**Je veux** accéder à l'application lorsque je remplis les conditions d'habilitation cumulatives
**Afin de** utiliser les fonctionnalités WRAP/OPDN correspondant à mon rattachement

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un agent appartenant (au niveau SIRH) à une unité déclarée dans WRAP, disposant d'une licence Power App Premium et membre d'au moins un des groupes M365 (DIVNUM-LISTE-AGENTS, DIGIT-AGT, DIVNUM-LISTE-WRAP-[E], DIGIT-LISTE-WRAP-[E], WRAP PROD, DTEO-DGF-DIGIT-SOCNUM/SERVMET/PERFINDUS), when il ouvre l'application, then l'accès lui est accordé | ⬜ |
| Given une des trois conditions cumulatives non remplie (unité non déclarée, licence absente ou aucun groupe M365), when l'utilisateur tente d'accéder, then l'accès est refusé | ⬜ |
| Given un intervenant externe, when un propriétaire l'ajoute au groupe DIGIT-LISTE-WRAP-[E], then l'externe obtient l'accès sans licence attribuée par un autre canal | ⬜ |
| Error : given un utilisateur sans licence Power App Premium, system l'oriente vers la demande de licence via WIZMI, laquelle requiert l'accord préalable du référent Power Apps | ⬜ |
| Security/Gouvernance : accès conditionné aux trois exigences cumulatives (appartenance SIRH à une unité WRAP + licence Premium + appartenance à un groupe M365) ; ouvert à P/V/CM/A (OUI/OUI/OUI/OUI) | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La provision de la licence Power App Premium (processus WIZMI) et la validation du référent Power Apps.
- La gestion des membres des groupes M365 (assurée par leurs propriétaires côté annuaire).

## Notes d'implémentation
- Module WRAP/OPDN (Power App). Conditions cumulatives : appartenance SIRH à une unité déclarée dans WRAP, licence Power App Premium, appartenance à un des groupes M365 listés.
- Les externes sont ajoutés au groupe DIGIT-LISTE-WRAP-[E] par les propriétaires du groupe.

---
Item Type: US · Parent: F25.1 · Module: pilotage · Phase: phase-3 · Size: M · Priority: Critical
Stage: ⬜
Rôle: utilisateur-final
Source: SPEC_OPDN — B.1 Navigation générale & accès
Dépendances: —
