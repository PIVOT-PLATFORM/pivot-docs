# ADR-018 — Chiffrement de bout en bout et gestion des clés par tenant (modules critiques)

**Date :** 2026-07-08
**Statut :** Proposé
**Décideurs :** Architecte plateforme, RSSI, Responsable juridique
**Contexte technique :** organisation `PIVOT-PLATFORM`

---

## Contexte

ADR-017 garantit qu'un attaquant accédant au stockage physique ne lit rien. Il ne suffit pas si l'attaquant est PIVOT lui-même (hébergeur compromis, mainteneur malveillant, accès OPS non journalisé). Pour les modules critiques hébergeant des données stratégiques d'entreprise — plans de traitement de risque (E21), marchés publics (E25), données financières (E26) — le tenant doit être en mesure de prouver que **PIVOT ne peut pas lire ses données**, même avec un accès direct à la base. Ce modèle est celui du BYOK/HYOK (*Bring/Hold Your Own Key*) imposé par certains référentiels (HDS, SecNumCloud niveau 3+).

Les modules sensibles (Zone B) n'ont pas cette exigence : leur exposition est opérationnelle, pas stratégique, et l'overhead d'une gestion de clé externe serait disproportionné.

## Décision

### Modèle BYOK pour les modules critiques (Zone A)

1. **KEK tenant externe** : chaque tenant peut fournir sa propre KEK maître via une API de dépôt sécurisé (OpenBao Transit Engine, ADR-014). PIVOT ne stocke jamais la KEK en clair ; il n'en voit que le handle. Le chiffrement/déchiffrement des DEK (ADR-017) est délégué à l'opération `encrypt`/`decrypt` d'OpenBao Transit — PIVOT transmet le DEK chiffré, OpenBao le déchiffre avec la KEK tenant, retourne le DEK en clair uniquement le temps de l'opération, en mémoire.
2. **Rotation tenant-controlled** : le tenant déclenche la rotation de sa KEK depuis son portail. PIVOT rechiffre les DEK affectés lors de la prochaine fenêtre de maintenance ou à la demande. Aucune interruption de service si la rotation est progressive (*re-wrap*).
3. **Révocation immédiate = destruction logique des données** : révoquer la KEK dans OpenBao rend toutes les données critiques du tenant illisibles en moins d'une minute (les DEK chiffrés avec cette KEK deviennent inutilisables). C'est le mécanisme de *crypto-shredding* utilisé pour le droit à l'effacement (RGPD Art. 17) — voir ADR-021.
4. **Collaboration temps réel (Collaboratif, Zone B)** : pour les sessions whiteboard ou quiz impliquant des données à caractère personnel, le chiffrement en transit utilise TLS 1.3 (ADR-011 mTLS) ; le module collaboratif n'étant pas Zone A, le chiffrement E2E de type Signal Protocol n'est **pas** imposé à ce stade, mais reste une option d'extension pour une future Zone A+ (données médicales ou classifiées).

### Ce que PIVOT ne fait pas (garantie architecturale)

- PIVOT ne journalise jamais une DEK déchiffrée (ADR-020 journalise les accès, pas les contenus).
- Les KEK tenant ne transitent jamais dans les logs applicatifs ni les traces OpenTelemetry.
- Un opérateur PIVOT ne peut pas exporter une KEK tenant depuis OpenBao : les politiques ACL d'OpenBao interdisent l'opération `export` sur les clés Transit.

## Conséquences

- **Positif :** PIVOT peut présenter une garantie contractuelle d'opacité sur les données critiques tenant ; compatible avec les exigences HDS et SecNumCloud ; le crypto-shredding remplace une purge physique complexe.
- **Négatif :** si le tenant perd sa KEK sans sauvegarde de sa part, ses données critiques sont définitivement perdues — responsabilité clairement contractualisée côté tenant. La disponibilité d'OpenBao Transit est sur le chemin critique de toute lecture de donnée critique.
- **Interdit :** stocker, loguer ou tracer une KEK ou une DEK tenant en clair dans n'importe quel système PIVOT (base, log, cache, trace, variable d'environnement).

## Alternatives écartées

- Clé unique PIVOT pour tous les tenants : ne permet pas d'isoler la compromission d'un tenant des autres ; PIVOT reste en position de lire toutes les données, incompatible avec les référentiels les plus stricts.
- Signal Protocol pour les modules critiques non temps-réel : conçu pour la messagerie éphémère avec forward secrecy ; inadapté à des données persistantes avec accès multi-utilisateur et re-lecture — la gestion des sessions de clés devient un problème non résolu pour des documents de marchés publics consultés des mois après.

## Historique

| Version | Date | Évolution |
|---------|------|-----------|
| v1 | 2026-07-08 | Décision initiale |
