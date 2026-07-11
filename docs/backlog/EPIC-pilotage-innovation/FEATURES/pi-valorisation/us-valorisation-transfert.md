# US38.7.2 — Valorisation & transfert

**En tant que** responsable innovation
**Je veux** **valoriser** et **transférer** les innovations (mise sur le marché, transfert interne, licensing, essaimage)
**Afin de** transformer l'innovation en valeur réelle

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une innovation aboutie, when je la valorise, then le mode (produit, transfert interne, licence, spin-off) et les bénéfices sont suivis | ⬜ |
| Error : given une innovation qui n'a pas atteint un stade « abouti » dans l'entonnoir (F38.3), when je tente de créer une valorisation, then l'action est refusée (une valorisation ne peut porter que sur une innovation ayant franchi les stage-gates requis) | ⬜ |
| Security : la création/modification d'une valorisation est réservée au responsable innovation (ou rôle habilité) ; les données de bénéfices financiers associés suivent le même niveau de confidentialité que les données de PI (US38.7.1) | ⬜ |

## Hors périmètre
- La protection et le suivi administratif des actifs de PI (brevets, savoir-faire) : couverts par US38.7.1, cette US porte sur la valorisation économique une fois la PI établie
- Le montage juridique effectif d'un spin-off ou d'une licence (contrats) : hors périmètre, seul le suivi du mode de valorisation et des bénéfices est couvert
- Le studio/incubateur interne et le financement par paliers d'un spin-off : couverts par F38.13 (Corporate venturing), cette US se limite au suivi de la valorisation elle-même

## Notes d'implémentation
- Le mode de valorisation (produit, transfert interne, licence, spin-off) doit être un champ structuré, cohérent avec les modes déjà évoqués dans F38.7 et F38.13, pour permettre une agrégation dans les KPIs (F38.9)
- Le suivi des « bénéfices » peut être qualitatif ou quantitatif (revenu de licence, économies internes) ; ne pas imposer un montant chiffré obligatoire si la valorisation est encore en cours
- S'appuie sur le modèle SMI d'EN38.1 pour le rattachement à l'innovation d'origine et à ses éventuels actifs PI

---
Item Type: US · Parent: F38.7 · Module: pilotage · Phase: phase-3 · Size: M · Priority: Low
Stage: ⬜
Rôle: responsable-innovation
Profils: Grand groupe, Publique, État
Justification: SMI — Système de Management de l'Innovation (état de l'art, ISO 56002/56000)
Dépendances: EN38.1 (modèle SMI & moteur)
