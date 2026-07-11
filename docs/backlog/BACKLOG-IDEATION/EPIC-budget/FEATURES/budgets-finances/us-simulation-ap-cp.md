# US26.2.6 — Simulation AP/CP

**En tant que** contrôleur de gestion
**Je veux** simuler des scénarios budgétaires aux règles publiques (autorisations de programme / crédits de paiement, annualité, M57, virements d'enveloppes)
**Afin que** décaler un projet recalcule correctement les crédits de paiement

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un projet avec AP/CP, when le contrôleur décale le projet dans une simulation, then les crédits de paiement sont recalculés selon l'annualité et la M57, en tenant compte des virements d'enveloppes | ⬜ |
| Error : given un scénario violant une règle publique (dépassement d'AP), system le signale sans valider le scénario | ⬜ |
| Security : seul le contrôleur de gestion (ou rôle admin du portefeuille public) peut lancer ou enregistrer une simulation AP/CP ; les simulations n'altèrent jamais les données budgétaires de référence (fonctionnement en bac à sable tracé, sans écriture sur le budget réel) | ⬜ |
| A11y : l'écran de simulation (paramétrage du décalage, résultats recalculés AP/CP) est navigable au clavier et les résultats de recalcul sont restitués par lecteur d'écran, conformément WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Application définitive d'un scénario simulé au budget réel (l'US couvre uniquement la simulation, pas la validation/publication)
- Gestion générique des règles comptables publiques hors AP/CP/M57 (pas d'autres référentiels comptables)
- Simulation de trésorerie multi-portefeuille (couverte par US26.2.3 pour la partie projection)

## Notes d'implémentation
- Règles spécifiques au secteur public : autorisations de programme (AP), crédits de paiement (CP), annualité budgétaire, nomenclature comptable M57, virements d'enveloppes
- Le recalcul des CP doit respecter l'annualité (répartition sur les exercices) et les règles M57 — logique métier à valider avec un expert finances publiques avant implémentation
- Les simulations sont isolées des données budgétaires de référence : nécessite un espace de calcul dédié (scénario non persistant sur le budget réel) mais tracé (qui a lancé quelle simulation, quand)
- Réservé aux profils Publique et État (cf. frontmatter Profils) — dépend fonctionnellement du budget pluriannuel (US26.2.2)

---
Item Type: US · Parent: F26.2 · Module: pilotage · Phase: phase-3 · Size: XL · Priority: Low
Stage: ⬜
Rôle: controleur-de-gestion-si
Source: PP-055 · MoSCoW: Could · Lot: Lot 4 · Origine: Bonus B3
Profils: Publique, État
Justification: Dossier §7-B3 : 'décaler un projet' doit recalculer les CP
Dépendances: —
