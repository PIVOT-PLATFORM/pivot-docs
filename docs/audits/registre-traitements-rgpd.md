# Registre des traitements RGPD (Art. 30) — PIVOT Platform

**Statut :** À compléter — initié 2026-07-31 par `US11.8.1` (E11 Capacity Planning), une seule
entrée renseignée. Consolidation complète des autres traitements = portée de
`RGPD-HIGH-01` (`audit-rgpd.md`), non traitée ici.

**Responsable de traitement :** PIVOT Platform. **DPO :** `dpo@pivot.app` (référencé
publiquement, voir `audit-rgpd.md` — désignation formelle CNIL en attente, finding séparé).

Un traitement par ligne, gabarit Art. 30 : finalité, base légale, catégories de données,
catégories de personnes concernées, destinataires, durée de conservation, mesures de sécurité.
Fichier mis à jour en place au fil des traitements documentés — jamais de fichier daté.

---

## Agilité — Capacity Planning (E11)

| Champ | Contenu |
|-------|---------|
| **Traitement** | Planification de la capacité d'équipe (jours ouvrés, absences, facteur de concentration, maturité agile, vélocité) |
| **Finalité** | Planifier la capacité **collective** d'une équipe à la maille sprint/incrément/PI — jamais une évaluation de performance individuelle |
| **Base légale** | Intérêt légitime de l'organisation (planification opérationnelle d'équipe), Art. 6.1.f RGPD |
| **Catégories de données** | Périodes d'indisponibilité (dates de début/fin uniquement — **aucun motif, aucune donnée de santé**, `CapacityAbsence` sans colonne motif depuis US11.2.2) ; quotité/facteur de concentration/maturité au niveau équipe ou membre ; vélocité historique agrégée par sprint |
| **Catégories de personnes concernées** | Membres des équipes utilisant le module Agilité de PIVOT |
| **Destinataires** | Membres de l'équipe concernée (accès en lecture au roster, convention transverse PIVOT — voir `us-rgpd-ethique-capacite.md` §Réconciliation 2026-07-31) ; pas de destinataire hors équipe/tenant |
| **Durée de conservation** | Alignée sur celle de l'événement de capacité parent (sprint/incrément/PI) — pas de politique de rétention dédiée au-delà du cycle de vie de l'événement |
| **Mesures de sécurité** | Isolation stricte par `tenantId` résolu exclusivement depuis `RequestPrincipal` (testé cross-tenant sur chaque endpoint du module) ; import CSV en masse filtre toute colonne hors `teamMemberIdOrEmail`/`dateDebut`/`dateFin` (aucune colonne motif/raison jamais persistée, y compris si présente dans le fichier source) |
| **Droits des personnes** | Accès : le roster (incluant les absences) est visible par tout membre de l'équipe, donc *a fortiori* par la personne concernée elle-même. Rectification/effacement : `DELETE .../events/{id}/absences/{absenceId}` (US11.2.2), pas de mécanisme dédié supplémentaire nécessaire |
| **Traçabilité backlog** | `US11.2.2` (S20, minimisation), `US11.7.1` (import CSV), `US11.8.1` (formalisation de cette entrée) |

---

## Autres traitements PIVOT

Non couverts par ce lot — voir `RGPD-HIGH-01` (`docs/audits/audit-rgpd.md`) pour le périmètre
restant (authentification & compte, journalisation `audit_events`, appareils de confiance,
whiteboard collaboratif, et tout autre module traitant des données personnelles).
