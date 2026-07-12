# EN51.10 — Interfaçage ITSM (connecteurs par tenant)

**Type d'enabler** : intégration / données

**Objectif technique** : Alimenter les cards du cockpit **Run** liées au service (incidents, files de
support, changements en production) **sans recopier la donnée métier dans PIVOT** : PIVOT s'interface
avec l'**ITSM du tenant** (ServiceNow, GLPI, Jira Service Management…) soit par **API** (agrégats :
volumes, SLA, tendances), soit par **lien profond** (`href` contextuel vers le ticket/la file dans
l'ITSM), selon la configuration du tenant.

**Justification** : Les tickets de support contiennent souvent des **données personnelles/sensibles**
(🔴). Les recopier dans PIVOT créerait un risque RGPD et un doublon de source de vérité. La bonne
frontière : la donnée reste **dans l'ITSM du tenant** ; PIVOT n'affiche que des **agrégats** ou
**renvoie** vers l'ITSM. Cela évite aussi de réimplémenter un ITSM que PIVOT n'a pas vocation à être.

## Périmètre

- Connecteur configurable **par tenant** (choix de l'ITSM + mode API et/ou lien profond).
- Deux modes complémentaires :
  - **API agrégats** : volumes d'incidents/demandes, respect des SLA, tendances — pour les cards.
  - **Lien profond** (`href`) : l'action contextuelle d'une card ouvre l'élément dans l'ITSM du tenant.
- Cartes concernées : *Files de support*, *Incidents en cours*, *Changements en production* (C4 Run).

**Critères de complétion** :
- [ ] Contrat de connecteur ITSM (interface d'abstraction) + au moins un connecteur de référence.
- [ ] Configuration par tenant (type d'ITSM, endpoint, secret via EN07.2, mode API/href).
- [ ] Mode dégradé : si aucun ITSM configuré, les cards Run concernées se rendent en `module-wip`.
- [ ] **Aucune PII de ticket persistée dans PIVOT** — seuls des agrégats ou des identifiants de lien.
- [ ] Respect de la matrice : cards 🟡, contenu 🔴 non exposé ; externe ◐/◑ selon engagement (ADR-028).
- [ ] Traçabilité des accès (cohérent EN51.7).

## Notes

- Se combine avec EN51.2 : une card ITSM sans connecteur configuré = état `module-wip`, cohérent avec
  le principe « le cockpit marche même si la brique n'est pas prête ».

---
Item Type: Enabler · Parent: E51 · Type: integration · Module: core · Phase: phase-3
Stage: ⬜ · Priority: Medium
Dépendances: EN51.1, EN51.2, EN07.2 (secret management), ADR-028 (accès externe)
