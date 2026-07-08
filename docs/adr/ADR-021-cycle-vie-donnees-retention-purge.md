# ADR-021 — Cycle de vie des données : rétention, anonymisation et purge sécurisée

**Date :** 2026-07-08
**Statut :** Proposé
**Décideurs :** Architecte plateforme, RSSI, Responsable juridique
**Contexte technique :** organisation `PIVOT-PLATFORM`

---

## Contexte

PIVOT traite des données personnelles (identités, rôles, historiques d'accès) et des données à caractère stratégique (contrats, budgets, risques). Ni les ADRs existants ni le backlog actuel ne définissent combien de temps ces données sont conservées, ce qu'on en fait à l'expiration, ni comment répondre à un droit à l'effacement (RGPD Art. 17) sur des données chiffrées hiérarchiquement (ADR-017, ADR-018). Sans politique de cycle de vie, les données s'accumulent indéfiniment, augmentant la surface d'exposition et exposant PIVOT à une non-conformité RGPD.

## Décision

### 1. Tableau de rétention par classe

| Classe | Exemples | Rétention active | Action à expiration |
|---|---|---|---|
| **Critique** (Zone A) | Contrats E25, budgets E26, scores de risque E21, tokens E01 | 7 ans (obligation légale marchés publics) | Crypto-shredding (voir §3) |
| **Sensible** (Zone B) | Roadmaps E22, OKR E27, sessions de standup, cahiers de tests | 3 ans | Anonymisation puis purge physique |
| **Données de collaboration** | Sessions whiteboard, quiz | 90 jours après clôture de session | Purge physique |
| **Journaux d'audit Zone A** | Événements critiques (ADR-020) | 7 ans (RFC 3161 scellés) | Archivage froid WORM, non effaçable |
| **Journaux d'audit Zone B** | Événements sensibles (ADR-020) | 3 ans | Purge physique |
| **Sessions OIDC / tokens** | `access_tokens`, refresh tokens | Durée de vie du token (ADR-005) | Purge automatique à expiration |

Ces durées sont le minimum légal ; un tenant peut configurer des durées plus longues via sa politique de gouvernance, jamais plus courtes que le minimum légal.

### 2. Anonymisation et pseudonymisation (modules sensibles, Zone B)

Pour les données Zone B arrivant à expiration, l'anonymisation remplace la purge physique lorsque les données ont une valeur analytique résiduelle :

- **Pseudonymisation** (RGPD Art. 25) : les identifiants directs (`user_id`, `team_id`) sont remplacés par des tokens opaques dérivés d'un sel per-tenant stocké dans OpenBao (ADR-014). Le lien token ↔ identité réel ne subsiste que dans OpenBao ; détruire le sel rend la pseudonymisation irréversible (crypto-shredding du lien).
- **Agrégation** : les métriques de sprint (vélocité, burn-down) sont conservées sous forme agrégée (sans granularité individuelle) après anonymisation.
- L'anonymisation est validée par le Responsable juridique avant activation du batch de traitement.

### 3. Crypto-shredding (modules critiques, Zone A — droit à l'effacement RGPD Art. 17)

La purge physique de données chiffrées par hiérarchie KEK/DEK (ADR-017, ADR-018) est remplacée par le **crypto-shredding** :

1. **Révocation de la DEK** dans OpenBao : la DEK de l'entité (ou du tenant) est supprimée d'OpenBao Transit. Les données chiffrées par cette DEK deviennent cryptographiquement inaccessibles en < 1 min (temps de propagation OpenBao).
2. **Purge physique différée** : les blocs chiffrés (désormais inutilisables) sont supprimés du stockage dans la fenêtre de maintenance suivante (≤ 7 jours), afin d'éviter de maintenir des données chiffrées orphelines.
3. **Traçabilité de l'effacement** : l'opération de crypto-shredding est elle-même journalisée dans le journal d'audit immuable (ADR-020) avec signature RFC 3161, permettant de prouver à un régulateur que l'effacement a bien eu lieu à une date certaine.

Pour les journaux d'audit Zone A (ADR-020, WORM) : l'effacement n'est pas applicable pendant la durée de rétention légale (7 ans). Passé ce délai, la purge physique est autorisée.

### 4. Processus automatisé de cycle de vie

- Un job Kubernetes `CronJob` (fréquence : hebdomadaire) scanne les entités dont la date de création dépasse la rétention active, déclenche le traitement adapté (anonymisation ou crypto-shredding) et consigne le résultat.
- Les entités proches de l'expiration (J-30) génèrent une alerte vers le tenant concerné (droit à la portabilité, RGPD Art. 20 — dernière chance d'export).
- Aucun traitement de cycle de vie ne s'exécute sans avoir vérifié via OPA (ADR-013) que le rôle applicatif du job (`lifecycle-worker`) est autorisé à agir sur la classe de données concernée.

## Conséquences

- **Positif :** le droit à l'effacement est satisfait en < 1 min pour les données critiques (crypto-shredding) sans migration de base ; la conformité RGPD est structurellement outillée et auditable ; la surface de données exposées diminue mécaniquement dans le temps.
- **Négatif :** la pseudonymisation exige de maintenir le sel OpenBao aussi longtemps que des données pseudonymisées existent — la durée de rétention du sel s'aligne donc sur la durée de rétention la plus longue des données associées. Un bug dans le CronJob peut déclencher un effacement prématuré — la purge physique n'est activée qu'après validation manuelle du crypto-shredding.
- **Interdit :** conserver des données personnelles identifiantes au-delà de leur durée de rétention au motif qu'elles sont chiffrées — le chiffrement ne remplace pas la purge, il en est le mécanisme, pas l'exemption.

## Alternatives écartées

- Purge physique directe (DELETE SQL + VACUUM) pour les données critiques : inefficace sur des données distribuées (réplicas, sauvegardes, WAL PostgreSQL) — il subsiste des copies chiffrées dans les sauvegardes ; le crypto-shredding rend ces copies inutilisables sans les poursuivre individuellement.
- Rétention unique pour tous les modules (ex. 5 ans) : non conforme aux durées légales différenciées (7 ans pour les marchés publics, 3 ans droit commun) et ne tient pas compte de la valeur résiduelle des données analytiques de modules sensibles.
- Anonymisation des données critiques plutôt que crypto-shredding : l'anonymisation irréversible de données contractuelles (E25) ou financières (E26) détruit leur valeur probante, incompatible avec les obligations de conservation légale.

## Historique

| Version | Date | Évolution |
|---------|------|-----------|
| v1 | 2026-07-08 | Décision initiale |
