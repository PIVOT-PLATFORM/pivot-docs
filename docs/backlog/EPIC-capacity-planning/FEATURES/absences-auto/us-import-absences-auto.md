# US11.7.1 — Import automatique des absences (SI RH / absence)

**En tant que** Scrum Master
**Je veux** importer en masse les absences des membres, **en complément** de la saisie manuelle (US11.2.2)
**Afin de** planifier sur la disponibilité réelle sans ressaisir chaque congé un par un

**Gate 1 réalisé le 2026-07-22** — remplace la version outline précédente.

**Architecture — import CSV générique, pas de connecteur SI RH nommé (Gate 1 — décision
mainteneur, 2026-07-22)** : le stub d'origine visait des connecteurs temps réel vers des SI RH
nommés (SAP SuccessFactors/HCM, Workday, Lucca…) — irréalisable dans ce sprint : chacun exige une
intégration OAuth/API propriétaire réelle (identifiants d'entreprise, comptes sandbox/production,
mapping de champs spécifique à chaque éditeur), dont aucun n'est accessible ici. Construire un tel
connecteur sans jamais l'exercer contre une vraie instance produirait du code non vérifiable, avec
un risque réel de mapping RGPD incorrect passé inaperçu (voir US11.8.1). **Décision retenue** : un
**import CSV générique** — le Scrum Master exporte les absences depuis n'importe quel SI RH (tous
en proposent un export CSV/Excel) et l'importe manuellement. Livre la même valeur réelle (import en
masse plutôt que saisie ligne à ligne) sans prétendre à une intégration temps réel non vérifiable.
Une US de convergence pourra proposer un ou plusieurs connecteurs temps réel nommés si un accès
réel à un tenant SAP/Workday/Lucca devient disponible — non traité ici.

## Critères d'acceptation

### Import CSV (backend `pivot-core`)

| Critère | 🤖 Dev |
|---------|--------|
| Given un événement accessible et un fichier CSV (colonnes `teamMemberIdOrEmail`, `dateDebut`, `dateFin` — **aucune autre colonne acceptée, notamment aucune colonne motif/raison**, voir §RGPD), when `POST .../events/{id}/absences/import`, then chaque ligne valide crée une `CapacityAbsence` (US11.2.2, même entité, mêmes colonnes RGPD-minimales — pas de nouvelle table dupliquée) | ⬜ |
| Given le fichier importé, when le traitement se termine, then une réponse **ligne par ligne** est retournée : `{ imported: N, errors: [{ line, code }] }` — jamais tout-ou-rien, les lignes valides sont importées même si d'autres échouent | ⬜ |
| Given une ligne dont `teamMemberIdOrEmail` ne correspond à aucun membre de l'événement, when elle est traitée, then elle échoue avec le code `UNKNOWN_MEMBER` (ligne suivante quand même traitée) | ⬜ |
| Given une ligne avec des dates invalides (`dateDebut` > `dateFin`, format non parsable), when elle est traitée, then elle échoue avec le code `INVALID_DATE_RANGE` (même code qu'US11.2.2) | ⬜ |
| Given une absence importée qui **duplique exactement** une absence déjà existante pour ce membre (mêmes `dateDebut`/`dateFin`), when elle est traitée, then elle est **silencieusement ignorée** (comptée dans `imported` mais non recréée) — évite les doublons en cas de ré-import du même export | ⬜ |
| Given une colonne inconnue dans le CSV (ex. un export SI RH incluant une colonne "motif"/"reason"), when le fichier est traité, then elle est **ignorée sans erreur** — seules les trois colonnes attendues sont lues, aucune n'est persistée au-delà de `dateDebut`/`dateFin` | ⬜ |

### Cas d'erreur

| Critère | 🤖 Dev |
|---------|--------|
| Error : given un fichier vide, non-CSV, ou dépassant **500 lignes**, when import, then 400 code `INVALID_IMPORT_FILE` (rejeté avant tout traitement ligne par ligne) | ⬜ |
| Error : given un `id` d'événement inexistant ou d'un autre tenant, when import, then 404 | ⬜ |

### Sécurité

| Critère | 🤖 Dev |
|---------|--------|
| Security : `tenantId`/`userId` résolus exclusivement depuis le `RequestPrincipal` | ⬜ |
| Security : given un appelant sans lien avec l'événement, when import, then 404 (jamais 403) | ⬜ |
| Security — **RGPD, même contrat qu'US11.2.2** : aucune colonne motif/catégorie/commentaire n'est jamais persistée, même si présente dans le fichier importé — test unitaire/TI obligatoire prouvant qu'une colonne "motif" dans le CSV source est ignorée, jamais retrouvée en base ni dans la réponse | ⬜ |
| Security : test TI obligatoire cross-tenant sur `POST .../absences/import` | ⬜ |

## Hors périmètre

- **Connecteurs temps réel nommés** (SAP, Workday, Lucca…) — voir §Architecture, définitivement
  hors de portée sans accès réel à ces systèmes ; le CSV reste la seule voie d'import en masse.
- **Planification récurrente de l'import** (cron, webhook) — import à la demande uniquement,
  déclenché manuellement par le Scrum Master.
- **Détection de doublons approximatifs** (dates qui se chevauchent sans être identiques) — seule
  la duplication exacte est filtrée ; un chevauchement partiel crée une absence distincte
  (comportement cohérent avec US11.2.2, qui autorise déjà le chevauchement partiel avec la
  période de l'événement).

## Notes d'implémentation

- **Backend** : `CapacityAbsenceImportService#importCsv(eventId, MultipartFile)` — parsing CSV
  ligne par ligne (bibliothèque déjà présente dans le classpath si une existe pour un besoin
  similaire ailleurs dans `pivot-core`, sinon parsing manuel simple `split(",")` suffisant pour 3
  colonnes fixes, pas de dépendance CSV lourde nouvelle sans validation), résolution
  `teamMemberIdOrEmail` → `CapacityEventMember` via `TeamMembershipService`, réutilise
  `CapacityAbsenceService#create` ligne par ligne (mêmes validations qu'US11.2.2, y compris le
  chevauchement avec la période de l'événement — `ABSENCE_OUTSIDE_EVENT` par ligne si applicable).
  `CapacityAbsenceImportController` (`POST .../absences/import`, `multipart/form-data`).
- **Frontend** : bouton "Importer un CSV" dans `capacity-event-detail` (section absences),
  sélecteur de fichier + tableau de résultat (lignes importées / lignes en erreur avec leur code,
  libellé traduit via Transloco).

---
Item Type: US · Parent: F11.7 · Module: agilite · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: scrum-master
Dépendances: US11.2.2 · EN11.1
