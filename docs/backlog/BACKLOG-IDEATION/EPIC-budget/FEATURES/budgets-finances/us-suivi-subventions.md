# US26.2.5 — Suivi des subventions

**En tant que** contrôleur de gestion
**Je veux** gérer les plans de financement par projet (FEDER, DSIL, fonds vert), les échéances de justification, les taux de réalisation exigés et le risque de reversement
**Afin de** sécuriser la trésorerie réelle conditionnée par les subventions

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un projet, when un plan de financement est saisi, then les sources (FEDER, DSIL, fonds vert…) et leurs échéances de justification sont suivies, et le taux de réalisation exigé ainsi que le risque de reversement sont calculés par subvention | ⬜ |
| Error : given une échéance de justification approchant sans pièces justificatives déposées, system alerte sur le risque de reversement | ⬜ |
| Security : seul le contrôleur de gestion (ou rôle admin du projet) peut créer/modifier un plan de financement ou déposer une pièce justificative ; les pièces justificatives et leur dépôt sont tracés et horodatés (auteur, date), et un utilisateur en lecture seule sur le projet ne peut ni saisir ni modifier ces données | ⬜ |
| A11y : le formulaire de saisie du plan de financement et le tableau des échéances/alertes sont navigables au clavier et restitués par lecteur d'écran, conformément WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Dépôt de dossier de demande de subvention auprès de l'organisme financeur (hors Pivot)
- Calcul automatique du reversement effectif (l'US couvre le risque et l'alerte, pas la liquidation comptable)
- Rapprochement ERP des versements de subvention perçus (couvert par US26.2.4 si applicable)

## Notes d'implémentation
- Sources de financement multiples par projet : FEDER, DSIL, fonds vert, etc. — modèle à prévoir extensible sans être un référentiel ouvert non contrôlé
- Le risque de reversement dépend du taux de réalisation exigé par la subvention vs réalisation effective du projet (US26.2.1) — dépendance fonctionnelle forte avec le suivi des coûts
- Pièces justificatives : stockage horodaté requis pour audit en cas de contrôle par l'organisme financeur
- Priorité Low / MoSCoW Could : US complexe (Size XL), à ne pas complexifier au-delà du dossier §7-B2

---
Item Type: US · Parent: F26.2 · Module: pilotage · Phase: phase-3 · Size: XL · Priority: Low
Stage: ⬜
Source: PP-054 · MoSCoW: Could · Lot: Lot 4 · Origine: Bonus B2
Profils: Privée sous droit public, Publique, État
Justification: Dossier §7-B2 : conditionne la trésorerie réelle
Dépendances: —
