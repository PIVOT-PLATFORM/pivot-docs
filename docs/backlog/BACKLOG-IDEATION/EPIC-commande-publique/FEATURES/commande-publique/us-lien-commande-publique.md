# US25.1.4 — Lien commande publique

**En tant que** acheteur
**Je veux** rattacher le cycle des marchés aux projets (consultations, notifications, ordres de service, avenants, pénalités, échéances contractuelles), consolidé au portefeuille
**Afin de** piloter les projets qui, pour un adjudicateur, sont souvent des marchés

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un projet, when un marché lui est rattaché, then consultations, notifications, ordres de service, avenants, pénalités et échéances sont suivis | ⬜ |
| Given des marchés rattachés à plusieurs projets, when la consolidation portefeuille est demandée, then les éléments contractuels (avenants, pénalités, échéances) sont agrégés au niveau portefeuille | ⬜ |
| Error : given une échéance contractuelle dépassée, system alerte le responsable du projet concerné | ⬜ |
| Error : given un rattachement d'un marché à un projet déjà associé à un autre marché actif du même type, system retourne 409 (pas de double-rattachement incohérent) | ⬜ |
| Security : seuls les rôles habilités (acheteur, responsable pilotage) du tenant propriétaire du projet peuvent créer ou modifier un rattachement marché-projet ; le cycle des marchés (avenants, pénalités, échéances, décisions) est historisé et tracé de façon immuable (traçabilité opposable en cas de litige contractuel) | ⬜ |

## Hors périmètre
- La création et l'analyse de la consultation elle-même (US25.1.1 à US25.1.3), cette US ne fait que rattacher le cycle de vie du marché à un projet existant
- La génération ou la gestion documentaire des avenants et ordres de service (contenu) — seul leur suivi/rattachement est couvert
- Le calcul financier détaillé des pénalités (montants) — hors périmètre, seul le suivi de l'échéance/déclenchement est couvert

## Notes d'implémentation
- Dépend de l'association projet ↔ équipe (E15) et du domaine Pilotage (E18, schéma `pilotage`) ; le marché devient un objet pivot rattaché au projet, consolidable au niveau portefeuille (cf. ADR-008 domaines composables)
- Le lien s'appuie sur les entités consultation/attribution des US25.1.1-3 : un marché rattaché correspond à une consultation ATTRIBUEE
- Alerting sur échéance dépassée à implémenter via un job planifié (pattern à aligner avec les autres alertes du domaine Pilotage) plutôt qu'un contrôle synchrone
- Priorité Low / Size XL (Lot 4, MoSCoW Could) : dépendance forte aux US25.1.1-3, à ne pas démarrer avant leur implémentation

---
Item Type: US · Parent: F25.1 · Module: pilotage · Phase: phase-3 · Size: XL · Priority: Low
Stage: ⬜
Source: PP-053 · MoSCoW: Could · Lot: Lot 4 · Origine: Bonus B1
Profils: Privée sous droit public, Publique, État
Justification: Dossier §7-B1 : pour un adjudicateur, le projet EST souvent des marchés
Dépendances: —
