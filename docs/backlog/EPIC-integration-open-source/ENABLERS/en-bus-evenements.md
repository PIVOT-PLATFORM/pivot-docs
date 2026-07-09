# EN28.4 — Bus d'événements

**Type d'enabler** : plateforme · événementiel

**Contexte** : Bus interne de publication/consommation et schéma d'événement normalisé (ADR-009 §4), pour que les adaptateurs et modules natifs communiquent sans se connaître directement.

**Critères de complétion** :
- [ ] Bus interne (publication/consommation) en place
- [ ] Schéma d'événement normalisé documenté
- [ ] Un événement publié par un adaptateur est reçu par un autre abonné
- [ ] Événements **signés et idempotents** (durcissement sécurité — cf. E43 EN43.8, tracés par l'observabilité/SIEM)

**Dépendances** : EN28.3 (contrat PivotAdapter)

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E28 · Type: plateforme · Module: socle · Phase: phase-3
Stage: ⬜ · Priority: Highest
