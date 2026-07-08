# ADR-017 — Chiffrement au repos différencié par classe de données

**Date :** 2026-07-08
**Statut :** Proposé
**Décideurs :** Architecte plateforme, RSSI
**Contexte technique :** organisation `PIVOT-PLATFORM`

---

## Contexte

Les ADRs 011–016 sécurisent les flux réseau, l'autorisation et les secrets d'exploitation. Ils ne traitent pas la protection des **données dormantes** : colonnes PostgreSQL, objets stockés (fichiers whiteboard, pièces jointes contrats), sauvegardes. Un attaquant qui obtient un dump de base de données — ou un accès direct au volume de stockage — doit se heurter à du chiffrement, pas à des données en clair. La granularité du chiffrement doit être proportionnée à la criticité : chiffrer chaque colonne d'une table de sprint serait coûteux sans bénéfice réel ; ne pas chiffrer au niveau colonne une donnée financière serait une faute.

PIVOT distingue deux classes (ADR-015) :

- **Critique** (Zone A) : E01 Auth/IAM (`public`), E21 Risques, E25 Commande publique, E26 Budget, E23 Portefeuille, Workflows — données stratégiques, financières, juridiques, identités.
- **Sensible** (Zone B) : E22 Roadmap, E24 ADR projet, E27 OKR, E13 Cahiers de tests, Collaboratif, Agilité — données opérationnelles internes sans impact réglementaire direct.

## Décision

### Niveau Critique (Zone A)

1. **Chiffrement colonne par colonne** pour tous les champs à haute valeur : `pgcrypto` (fonction `pgp_sym_encrypt` / `pgp_asym_encrypt`) avec AES-256-GCM ou RSA-4096 selon le type d'accès.
2. **Hiérarchie KEK/DEK via OpenBao (ADR-014)** : une *Data Encryption Key* (DEK) par entité critique (ex. : une DEK par dossier de marché dans E25, une par ligne de budget dans E26) ; chaque DEK est elle-même chiffrée par une *Key Encryption Key* (KEK) tenant, stockée dans OpenBao et jamais exposée en clair au module. La rotation de KEK déclenche le rechiffrement des DEK sans toucher les données.
3. **Chiffrement des objets stockés** (pièces jointes, exports) : AES-256-GCM, enveloppe de clé transmise par OpenBao à chaque lecture autorisée — pas de clé stockée à côté de l'objet.
4. **Sauvegardes chiffrées de bout en bout** : les dumps PostgreSQL et les snapshots de volume sont chiffrés avec une clé de sauvegarde distincte, également dans OpenBao, jamais co-localisée avec les données.

### Niveau Sensible (Zone B)

1. **Chiffrement au niveau tablespace / volume** : TDE PostgreSQL (Transparent Data Encryption) ou chiffrement LUKS du volume hôte. Granularité volume, pas colonne — suffisant car l'accès applicatif reste contrôlé par ADR-013.
2. **Chiffrement des objets stockés** : identique au niveau critique (AES-256-GCM, pas d'exception pour les fichiers de collaboration).
3. Pas de DEK par entité : une clé de volume par schéma de base de données (`agilite`, `collaboratif`), gérée dans OpenBao.

### Infrastructure commune (`public`, schéma pivot-core)

TDE systématique + chiffrement colonne sur `access_tokens`, `credentials` et tout champ contenant un hash ou un jeton.

## Conséquences

- **Positif :** un dump brut de base de données est inexploitable sans la hiérarchie KEK/DEK ; les sauvegardes peuvent être externalisées sans exposer les données.
- **Négatif :** latence additionnelle sur les lectures/écritures des colonnes chiffrées avec `pgcrypto` (mesurer, indexer sur le hash plutôt que la valeur claire si nécessaire) ; la perte d'une DEK sans sauvegarde OpenBao est irréversible — la haute disponibilité d'OpenBao est donc critique.
- **Interdit :** toute colonne portant des données financières (E26), contractuelles (E25), d'identité (E01) ou de scoring de risque (E21) stockée en clair dans PostgreSQL, quelle que soit la justification de performance.

## Alternatives écartées

- Chiffrement colonne uniforme sur tous les modules : coût CPU disproportionné sur des données de sprint ou de roadmap sans valeur réglementaire, sans gain de sécurité réel grâce aux contrôles d'accès (ADR-013).
- Chiffrement uniquement au niveau volume pour les modules critiques : un accès OS au volume (par ex. via une sauvegarde compromise) expose toutes les colonnes en clair dès que PostgreSQL est démarré.

## Historique

| Version | Date | Évolution |
|---------|------|-----------|
| v1 | 2026-07-08 | Décision initiale |
