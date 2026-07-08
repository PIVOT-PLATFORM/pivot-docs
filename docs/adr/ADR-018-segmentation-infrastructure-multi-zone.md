# ADR-018 — Segmentation physique de l'infrastructure par zone & palier de sensibilité

**Date :** 2026-07-08
**Statut :** Proposé
**Décideurs :** Architecte plateforme, RSSI, Lead infrastructure
**Contexte technique :** organisation `PIVOT-PLATFORM`

---

## Contexte

ADR-015 (zones de souveraineté A/B/C) et ADR-017 (paliers de sensibilité Standard/Sensible/
Critique) définissent deux classifications **logicielles** : un attribut au catalogue de modules
(EN28.2), vérifié par le moteur de politique (ADR-013) et l'Egress Gateway (ADR-012). Aucune des
deux ne spécifie **comment cette classification se traduit dans l'infrastructure réelle**. E07
(Infrastructure & Déploiement) ne livre aujourd'hui qu'une topologie unique — un seul Docker Compose
(EN07.1-11), un seul réseau applicatif, TLS/secrets/scaling mais **aucune segmentation réseau
multi-zone**. EN43.11 (classification souveraineté) porte d'ailleurs elle-même une case non cochée :
« Séparation stricte des environnements (dev/test/prod) documentée » — le gap est déjà identifié,
pas encore comblé.

Une classification purement logicielle est un point de défaillance unique : la compromission d'un
seul nœud partagé ou d'une règle de politique mal configurée effondre toute garantie d'isolement,
contredisant le principe « assume breach » déjà retenu par ADR-016. Le moteur de politique doit être
**adossé à une frontière réseau physique** qui rend la fuite structurellement impossible, pas
seulement bloquée par une règle logicielle contournable.

## Décision

1. **Une matrice de segmentation combinant les deux axes existants** (zone A/B/C × palier
   Standard/Sensible/Critique) — un module Zone B + Critique (ex. registre de vulnérabilités
   tenant UE, E53) exige une isolation réseau plus stricte qu'un module Zone B + Standard (ex.
   sondage tenant UE), bien que les deux partagent la même zone de souveraineté.
2. **Mécanismes réseau, indépendants du cloud ou de l'on-premise** :
   - Sous-réseau/VPC (cloud) ou VLAN (on-premise) **dédié par zone**, en refus par défaut
     (ingress et egress) entre segments — seuls les trois chemins déjà définis par ADR-012
     (API Gateway nord-sud, Service Mesh est-ouest mTLS, Egress Gateway sortant filtré)
     peuvent franchir une frontière de segment.
   - Zone A (souveraine) : sous-réseau/VLAN **sans route vers Internet** — patching et
     administration exclusivement via bastion surveillé, jamais de passerelle sortante directe.
   - Palier Critique : **pool de nœuds Kubernetes dédié** (ou cluster séparé pour un client Zone A
     air-gap), politique réseau (NetworkPolicy) en refus par défaut, aucun nœud partagé avec un pod
     Standard/Sensible — limite le mouvement latéral en cas d'évasion de conteneur.
   - **dev/test/prod** reçoivent chacun leur propre jeu de segments (pas seulement une séparation
     logique) — ferme explicitement le point ouvert d'EN43.11.
3. **Neutre vis-à-vis du fournisseur** : la même matrice s'applique qu'il s'agisse d'un cloud
   (VPC/projet dédié par zone, a minima sous-réseau + groupe de sécurité dédiés) ou d'un
   déploiement on-premise (segmentation VLAN + pare-feu physique/virtuel) — le choix d'un
   fournisseur cloud ou d'un produit pare-feu précis est hors périmètre de cette décision (cf.
   Points ouverts).
4. **Propriété backlog** : E07 (Infrastructure) porte un nouvel enabler (segmentation réseau
   multi-zone/multi-palier, à créer) ; EN43.3 (Service Mesh) et EN43.4 (Egress Gateway) restent les
   seuls chemins autorisés à franchir une frontière de segment ; EN43.11 référence cette ADR pour
   la réalisation infra de sa case « séparation des environnements ».

## Conséquences

- **Positif :** la classification logicielle (ADR-015/017) obtient un adossement réseau physique —
  une compromission logicielle (policy engine, application) ne suffit plus à franchir une frontière
  de zone/palier ; ferme le gap déjà identifié par EN43.11 ; réutilise les trois chemins de trafic
  déjà actés (ADR-012) plutôt que d'inventer un quatrième mécanisme.
- **Négatif :** complexité et coût opérationnel accrus (pools de nœuds dédiés, sous-réseaux/VLAN
  multiples, règles pare-feu par segment) ; nécessite un outillage d'infrastructure-as-code capable
  de reproduire la matrice de façon fiable par engagement client ; un client dont le profil (E40)
  change de classe de souveraineté ou de palier en cours de vie implique une migration
  d'infrastructure, non traitée par cette décision.
- **Interdit :** un module Critique ou Zone A déployé sur un nœud/sous-réseau partagé avec un module
  Standard/Zone C ; tout chemin réseau entre segments qui ne passe pas par Gateway, Mesh ou Egress
  Gateway (ADR-012).

## Alternatives écartées

- **Cluster/VPC unique avec application de la classification uniquement au niveau logiciel (moteur
  de politique) :** point de défaillance unique — un nœud compromis ou une règle mal configurée
  effondre l'isolement ; contredit « assume breach » (ADR-016).
- **Infrastructure entièrement séparée (compte cloud ou site on-premise dédié) par module
  individuellement, indépendamment de son palier :** coût et charge opérationnelle disproportionnés
  pour les modules Standard qui ne présentent aucun besoin d'isolement renforcé.
- **Segmenter uniquement par zone de souveraineté (ADR-015) ou uniquement par palier de sensibilité
  (ADR-017), sans combiner les deux axes :** un module Zone B + Critique et un module Zone B +
  Standard partagent la même zone mais pas le même besoin d'isolement réseau — ignorer l'un des deux
  axes sous-protège le premier cas ou sur-protège inutilement le second.

## Points ouverts

- Choix du ou des fournisseurs cloud cibles et du produit pare-feu/WAF concret — dépend de
  l'engagement client, hors périmètre de cette ADR.
- Automatisation de la matrice de segmentation (infrastructure-as-code par zone/palier) — à traiter
  lors de l'implémentation du nouvel enabler E07.
- Stratégie de migration d'infrastructure lorsqu'un client change de classe de souveraineté ou de
  palier de sensibilité en cours de vie (lié à E40 — Profil & adaptation) — non traitée ici.

## Historique

| Version | Date | Évolution |
|---------|------|-----------|
| v1 | 2026-07-08 | Décision initiale |
