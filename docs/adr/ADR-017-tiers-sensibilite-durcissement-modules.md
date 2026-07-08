# ADR-017 — Tiers de sensibilité cyber & durcissement gradué des modules

**Date :** 2026-07-08
**Statut :** Proposé
**Décideurs :** Architecte plateforme, RSSI, Architecte Modules
**Contexte technique :** organisation `PIVOT-PLATFORM`

---

## Contexte

Le socle sécurité actuel (ADR-011 mTLS/token exchange, ADR-016 checklist d'admission à neuf
points, chiffrement TLS 1.2+/AES-256 au repos uniforme — EN43.6, EN29.1, EN42.2, EN18.3) est un
**plancher unique** : la même exigence s'applique à un module de sondage anonyme (E19) et à un
registre de vulnérabilités critique pour un OIV. Le benchmark « Organisations DSI dans les grands
groupes » (2026-07-08, → E49–E53) fait apparaître des modules dont la compromission est
disproportionnellement plus grave : registre de vulnérabilités, registre de comptes à privilèges
(PAM), tableau de bord SOC/CERT (E53 — US53.3.1, US53.4.1, US53.2.1), ainsi que toute
**instanciation** de workflow (E29) qu'un client construit pour automatiser un processus cyber
(ingestion de scan de vulnérabilités, triage d'incident, alerte RSSI). Le plancher actuel ne prévoit
aucun palier supérieur pour ces cas — angle mort identifié en préparant E53.

Cette classification est **orthogonale** à ADR-015 (zones de souveraineté A/B/C) : ADR-015 répond à
« où la donnée peut circuler » (résidence, réseau) ; la présente décision répond à « comment la
donnée est protégée » (chiffrement, encapsulation, contrôle d'accès). Un module peut être Zone A
(souverain) et pourtant de sensibilité Standard (ex. un sondage anonyme self-host), ou Zone B et de
sensibilité Critique (ex. un registre de vulnérabilités tenant UE) — les deux axes sont indépendants
et se combinent.

## Décision

1. **Trois paliers de sensibilité**, portés par un attribut distinct de la classe A/B/C, déclaré au
   même catalogue de modules (EN28.2) — et, différence structurante avec ADR-015, **déclarable
   aussi au niveau d'une instanciation de workflow** (E29), pas seulement au niveau du module qui
   l'héberge :

   | Palier | Exemple | Exigences (s'ajoutent au plancher ADR-016) |
   |---|---|---|
   | **Standard** (défaut) | Sondage, page de contact, tableau Kanban | Plancher à neuf points (ADR-016) seul |
   | **Sensible** | Export RGPD, budget, ADR projet | + chiffrement au niveau champ des attributs qualifiés sensibles, TTL de token réduit, journal d'audit horodaté |
   | **Critique** | Registre de vulnérabilités (US53.3.1), registre de comptes à privilèges (US53.4.1), tableau de bord SOC/CERT (US53.2.1), instanciation de workflow cyber (E29) | + chiffrement par enveloppe avec clé dédiée par tenant (HSM/KMS, cf. ADR-014), encapsulation obligatoire (schéma ou service dédié, aucun chemin de lecture partagé avec un module Standard/Sensible), aucune donnée en clair y compris journaux/sauvegardes, contrôle à double validation pour tout accès en lecture, audit immuable (WORM), aucun export/agrégation générique (analytics, bus PIVOT) sans anonymisation ou tokenisation préalable |

2. Le moteur de politique (ADR-013) applique la même règle de non-franchissement que pour les
   zones de souveraineté (ADR-015) : une donnée Critique ne peut circuler en clair vers un
   consommateur Standard/Sensible, y compris via le bus d'événements PIVOT (ADR-006) — seule une
   référence tokenisée/rédigée peut transiter, jamais le contenu.
3. La checklist d'admission à neuf points (ADR-016 / EN43.13) est étendue d'un **addendum
   conditionnel** : un module ou une instanciation classée Critique doit, en plus des neuf points,
   démontrer les cinq critères du tableau ci-dessus avant mise en production.
4. Pour une instanciation de workflow (E29), la classification Critique s'applique au **domaine de
   données traité par cette instance précise**, pas au module Workflows dans son ensemble — un même
   tenant peut avoir un flux « notification Slack » Standard et un flux « ingestion de scan de
   vulnérabilités » Critique, tous deux hébergés par le même module.

## Conséquences

- **Positif :** proportionnalité de l'investissement sécurité — tous les modules ne paient pas le
  coût du palier Critique ; critères concrets et vérifiables pour une revue RSSI/OIV ; extension des
  mécanismes déjà existants (attribut de catalogue EN28.2, moteur de politique ADR-013, checklist
  ADR-016) plutôt qu'un système parallèle.
- **Négatif :** complexité additionnelle du schéma de catalogue et des règles du moteur de
  politique ; gestion de clés HSM/KMS par tenant (charge opérationnelle nouvelle, à spécifier avec
  ADR-014) ; la classification **au niveau d'une instanciation de workflow** (et non du seul module
  statique) est plus fine que le mécanisme d'ADR-015 — nécessite qu'E29 expose un moyen de taguer
  dynamiquement une instance à la création, point non résolu par cette décision (cf. Points
  ouverts).
- **Interdit :** une instanciation classée Critique qui stocke une donnée sensible en clair (y
  compris journal ou sauvegarde), ou qui l'expose sur le bus PIVOT sans tokenisation.

## Alternatives écartées

- **Chiffrement enveloppe/HSM appliqué uniformément à tous les modules :** coût et latence
  disproportionnés pour la majorité des données PIVOT (sondages, préférences UI...) qui ne
  présentent aucune sensibilité cyber particulière.
- **Laisser chaque module/instanciation décider seul de son niveau de durcissement :** aucune
  garantie auditable pour un client OIV, aucune cohérence entre modules, contredit le principe
  « assume breach » déjà retenu par ADR-016.
- **Fusionner ce palier dans la classification de zones d'ADR-015 (une seule dimension A/B/C) :**
  confond deux questions distinctes (où circule la donnée vs. comment elle est protégée) — un
  module Zone A souverain n'est pas nécessairement Critique (ex. sondage self-host), et un module
  Zone B peut l'être (ex. registre de vulnérabilités tenant UE) ; garder les deux axes orthogonaux
  préserve la lisibilité de chacun.

## Points ouverts

- Mécanisme technique pour taguer dynamiquement une **instanciation** de workflow (E29) à sa
  création, plutôt qu'un module entier au catalogue (EN28.2) — à traiter avec l'Architecte Modules
  lors de l'implémentation d'E29/EN29.x.
- Choix du fournisseur HSM/KMS (auto-hébergé vs cloud) et modalités de rotation par tenant — à
  trancher en extension d'ADR-014 (OpenBao).

## Historique

| Version | Date | Évolution |
|---------|------|-----------|
| v1 | 2026-07-08 | Décision initiale |
