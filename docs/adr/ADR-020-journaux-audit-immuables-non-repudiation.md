# ADR-020 — Journaux d'audit immuables et non-répudiation

**Date :** 2026-07-08
**Statut :** Proposé
**Décideurs :** Architecte plateforme, RSSI, Responsable juridique
**Contexte technique :** organisation `PIVOT-PLATFORM`

---

## Contexte

L'ADR-011 pose que l'audit trace « la personne réelle, jamais le portail ». Cela présuppose l'existence d'un journal d'audit — mais aucun ADR ne définit son format, sa protection contre l'altération, ni sa valeur probante. Sans immuabilité, un journal n'est pas une preuve : un attaquant qui a compromis un module peut effacer ses traces. Sans non-répudiation, un utilisateur peut nier une action sur un document de marché public ou une décision budgétaire. Pour les modules critiques, les journaux doivent être **opposables** (valeur légale en cas de litige ou d'audit externe).

Les modules sensibles nécessitent un historique d'accès pour la conformité RGPD (Art. 30, registre des traitements) mais sans exigence de valeur probante.

## Décision

### 1. Structure d'un événement d'audit

Chaque événement d'audit porte :

```json
{
  "event_id": "<UUIDv7>",
  "timestamp": "<RFC3339 nanoseconds>",
  "actor": { "sub": "<OIDC sub>", "tenant": "<tenant_id>", "roles": ["..."] },
  "action": "<RESOURCE>:<VERB>",
  "resource": { "type": "<module>/<entity>", "id": "<entity_id>" },
  "outcome": "ALLOWED | DENIED",
  "context": { "ip": "<IP>", "user_agent": "...", "session_id": "..." },
  "hmac": "<HMAC-SHA256 de l'événement signé avec la clé d'audit>"
}
```

Le champ `hmac` est calculé avec une clé d'audit dédiée, stockée dans OpenBao (ADR-014), distincte des KEK données.

### 2. Modules critiques (Zone A) — granularité et immuabilité forte

- **Granularité champ** : chaque lecture ou écriture sur un champ `x-pivot-dlp: critical` (ADR-019) génère un événement individuel — pas d'agrégation par session.
- **Chaînage des événements** : chaque événement d'audit contient le HMAC de l'événement précédent (structure Merkle-like), rendant toute suppression ou modification d'un événement intermédiaire détectable.
- **Stockage WORM** : les journaux critiques sont écrits dans un backend *Write Once Read Many* — S3 Object Lock (mode Compliance, rétention ≥ 7 ans) ou un log append-only chiffré sur volume immuable. Aucune API de suppression n'est exposée, même aux administrateurs PIVOT.
- **Signature périodique** : toutes les heures, un processus scelle le lot d'événements de l'heure avec une signature RSA-4096 timestampée (RFC 3161, Trusted Timestamp Authority externe), produisant une ancre de non-répudiation opposable.

### 3. Modules sensibles (Zone B) — granularité entité

- Granularité entité (pas champ) : un événement par opération CRUD sur l'entité.
- Pas de chaînage Merkle ; HMAC simple par événement suffit.
- Rétention : 3 ans (conformité RGPD registre Art. 30).
- Stockage : append-only dans PostgreSQL (table de logs avec trigger `BEFORE DELETE RAISE EXCEPTION`) ou dans le pipeline OpenTelemetry dirigé vers un SIEM (Wazuh ou équivalent).

### 4. Pipeline de collecte

- **Collecte** : OpenTelemetry (traces + logs structurés) depuis chaque module, via le Service Mesh (ADR-012). L'OTel Collector reçoit, valide la présence du champ `hmac`, puis route vers le backend de stockage approprié selon la Zone A/B de la source.
- **Alerting** : tout événement `outcome: DENIED` sur un module critique déclenche une alerte temps réel vers le SIEM. Toute rupture de chaîne HMAC déclenche une alerte critique.
- **Accès aux journaux** : lecture seule, réservée aux rôles `AUDIT_READER` et `RSSI` — contrôlée par OPA (ADR-013). Les journaux d'audit ne sont jamais exposés à un module applicatif.

## Conséquences

- **Positif :** les journaux critiques sont opposables en cas de litige (marché public contesté, décision budgétaire disputée) ; la détection d'altération est automatique (chaînage HMAC) ; conforme aux exigences ANSSI pour la journalisation des SI sensibles.
- **Négatif :** le volume de journaux Zone A peut être élevé (granularité champ sur E25/E26 avec de nombreux accès concurrents) — dimensionner le stockage WORM avec une marge ×5. Le chaînage HMAC rend le rechargement d'événements en masse (import historique) structurellement impossible sans recalcul de chaîne.
- **Interdit :** toute API ou commande permettant la suppression ou la modification d'un événement d'audit d'un module Zone A, y compris pour un administrateur PIVOT.

## Alternatives écartées

- Logs dans PostgreSQL standard (table normale) : la table est modifiable par un DBA — ne garantit pas l'immuabilité ; une compromission de l'accès DBA efface les preuves.
- Blockchain privée pour l'immuabilité : surcoût opérationnel et de gouvernance disproportionné pour le besoin ; le chaînage HMAC + WORM S3 + RFC 3161 offre les mêmes garanties avec une stack standard.
- Agrégation par session pour les modules critiques : masque les accès champ par champ, insuffisant pour démontrer qu'un opérateur a lu un montant de marché précis à une heure précise.

## Historique

| Version | Date | Évolution |
|---------|------|-----------|
| v1 | 2026-07-08 | Décision initiale |
