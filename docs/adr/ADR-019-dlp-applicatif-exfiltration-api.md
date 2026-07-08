# ADR-019 — DLP applicatif : prévention de l'exfiltration par les API

**Date :** 2026-07-08
**Statut :** Proposé
**Décideurs :** Architecte plateforme, RSSI
**Contexte technique :** organisation `PIVOT-PLATFORM`

---

## Contexte

Les ADRs 012 (Egress Gateway, allowlist sortante) et 013 (autorisation policy-as-code) contrôlent *qui peut appeler quoi*. Ils ne contrôlent pas *ce qui sort dans les corps de réponse* : un module autorisé à lire une entité peut renvoyer au frontend un champ qu'il ne devrait pas exposer (numéro de marché complet, IBAN, scoring de risque brut) sans que l'API Gateway ou le Service Mesh ne le détecte. À l'échelle de dizaines d'adaptateurs, ce risque de sur-exposition est structurel, pas anecdotique.

Par ailleurs, un adaptateur Workflow (n8n) peut légitimement lire des données critiques pour les traiter, puis les inscrire dans une réponse de webhook sortant vers un endpoint autorisé — mais avec un volume de données bien supérieur à ce qu'exige le traitement. C'est une exfiltration silencieuse dans la catégorie des fuites de données autorisées (*authorized data leakage*).

## Décision

### 1. Schéma de données annoté (source de vérité DLP)

Chaque champ du modèle de données PIVOT porte une annotation de sensibilité dans le schéma OpenAPI du module :

| Annotation | Signification | Action DLP |
|---|---|---|
| `x-pivot-dlp: critical` | Champ critique (ex. IBAN, KEK handle, score de risque brut) | Masquage systématique hors rôle explicite |
| `x-pivot-dlp: sensitive` | Champ sensible (ex. nom complet, montant global) | Troncature ou pseudonymisation selon le rôle |
| `x-pivot-dlp: public` | Donnée non restreinte | Pas d'action |

Ce schéma est versionné en Git, soumis à la même revue que les politiques OPA (ADR-013).

### 2. Filtrage de réponse à l'API Gateway (modules critiques)

L'API Gateway (ADR-012, plan nord-sud) applique un **filtre de réponse** sur les endpoints des modules critiques (Zone A) :

- Pour chaque champ `x-pivot-dlp: critical` présent dans la réponse JSON, le filtre vérifie via OPA (ADR-013) que le token d'appel (ADR-011) porte une claim autorisant l'exposition de ce champ.
- Si la claim est absente : le champ est remplacé par `"***"` (masquage) ou supprimé selon la politique du module.
- Latence additionnelle cible : < 5 ms (évaluation OPA locale en sidecar, pas d'appel réseau supplémentaire).

### 3. Contrôle volumétrique sur les sorties Workflow (Egress Gateway)

L'Egress Gateway (ADR-012, plan sortant) applique une règle volumétrique sur les webhooks et exports des Workflows :

- Un webhook sortant ne peut pas contenir plus de N champs `x-pivot-dlp: critical` par appel (seuil configurable par politique, défaut : 0 sauf exception explicite).
- Un export (CSV, PDF) généré depuis un module Zone A passe par un service de sanitisation qui applique les mêmes annotations avant livraison.

### 4. Watermarking des exports critiques

Tout export d'un module critique (E25 Commande publique, E26 Budget) embarque un watermark numérique invisible (stéganographie légère ou métadonnée signée) traçant l'identité du demandeur et l'horodatage. Cela ne remplace pas le contrôle d'accès mais permet la traçabilité en cas de fuite constatée a posteriori.

### Modules sensibles (Zone B)

Pas de filtre de réponse à l'API Gateway : le contrôle d'accès OPA (ADR-013) est suffisant. Les exports de modules sensibles embarquent une métadonnée de classification mais pas de watermark lourd.

## Conséquences

- **Positif :** une sur-exposition accidentelle dans un adaptateur (champ mal filtré dans le DTO) est rattrapée à la couche Gateway sans déploiement du module ; le DLP est auditable centralement.
- **Négatif :** le filtre de réponse introduit un couplage entre l'API Gateway et le schéma OpenAPI des modules — tout nouveau champ critique doit être annoté avant déploiement, sous peine d'être exposé sans contrôle. Nécessite une revue DLP dans la checklist d'admission (ADR-016, point 4).
- **Interdit :** exposer un champ `x-pivot-dlp: critical` dans une réponse API sans annotation explicite dans le schéma OpenAPI du module et validation OPA correspondante.

## Alternatives écartées

- DLP uniquement au niveau réseau (inspection de paquets) : inefficace sur du HTTPS chiffré de bout en bout au niveau transport — l'inspection nécessiterait un MITM TLS, incompatible avec l'ADR-011 (mTLS, identités de charge).
- DLP délégué à chaque module (filtrage dans le DTO Java) : revient au problème identique à l'autorisation codée en dur (ADR-013) — chaque module réimplémente, diverge, et l'auditabilité globale disparaît.

## Historique

| Version | Date | Évolution |
|---------|------|-----------|
| v1 | 2026-07-08 | Décision initiale |
