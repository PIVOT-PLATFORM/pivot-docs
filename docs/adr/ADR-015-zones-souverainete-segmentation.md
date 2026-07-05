# ADR-015 — Zones de souveraineté A/B/C & segmentation réseau

**Date :** 2026-07-05
**Statut :** Proposé
**Décideurs :** Architecte plateforme, RSSI, Responsable juridique
**Contexte technique :** organisation `PIVOT-PLATFORM`

---

## Contexte

PIVOT intègre des modules natifs et des adaptateurs OSS de maturité et de résidence de données variables (cf. ADR-009). Jusqu'ici, la « souveraineté » n'était mentionnée que ponctuellement (Zitadel, Forgejo, Rocket.Chat… qualifiés de « souverains ») sans modèle de classification transverse. Sans classification explicite, aucune politique d'autorisation (ADR-013) ni de passerelle de sortie (ADR-012) ne peut bloquer automatiquement une exfiltration vers un module non souverain.

## Décision

Trois zones de sensibilité, alignées sur les zones réseau :

| Zone | Contenu | Règle |
|---|---|---|
| **Zone A — souveraine** | Modules et données sensibles, self-host, air-gap possible | Aucun flux sortant vers B/C ; données critiques cantonnées |
| **Zone B — contrôlée** | Modules à périmètre maîtrisé (tenant UE, VPC) | Flux sortants filtrés, résidence UE contractualisée |
| **Zone C — DMZ externe** | Connexions aux API tierces | Passe par l'Egress Gateway (ADR-012) ; jamais de donnée sensible |

Chaque module/adaptateur déclaré au catalogue (EN28.2) porte un attribut de classe A/B/C. La compromission d'un module d'une zone ne doit jamais franchir la frontière vers une zone plus sensible. S'y ajoute la séparation stricte des environnements (dev/test/prod).

## Conséquences

- **Positif :** un critère objectif et automatisable pour bloquer une exfiltration (le moteur de politique, ADR-013, refuse un appel si la classe de la donnée dépasse celle du module cible) ; cohérent avec la table « Alternative » d'ADR-009 §5 (Zitadel/Forgejo/etc. déjà qualifiés de « souverains » sans modèle formel jusqu'ici).
- **Négatif :** nécessite de classer rétroactivement tous les modules/adaptateurs déjà planifiés (E28) ; une classification erronée est un risque de sécurité silencieux.
- **Interdit :** un adaptateur de classe C qui reçoit une donnée sensible sans passer par la vérification de classification.

## Alternatives écartées

- Pas de classification, contrôle au cas par cas : ne passe pas à l'échelle de dizaines d'adaptateurs, dépend de la vigilance individuelle plutôt que d'une politique automatisée.
- Classification binaire (souverain / non souverain) : insuffisamment fine pour distinguer un module self-hosted en air-gap d'un module tenant UE contrôlé — les deux ne portent pas le même niveau de risque.

## Historique

| Version | Date | Évolution |
|---------|------|-----------|
| v1 | 2026-07-05 | Décision initiale |
