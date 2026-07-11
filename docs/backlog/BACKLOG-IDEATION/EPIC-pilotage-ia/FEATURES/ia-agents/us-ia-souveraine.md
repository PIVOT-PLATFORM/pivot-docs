# US34.1.4 — IA souveraine

**En tant que** DSI
**Je veux** des traitements IA hébergés en France/UE avec des modèles maîtrisés, positionnés 'souverain, fiable, transparent'
**Afin de** garantir la souveraineté des traitements IA pour les portefeuilles sensibles

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une fonction IA du module pilotage, when elle est exécutée, then les traitements sont hébergés en France/UE avec des modèles maîtrisés documentés (identité du modèle, hébergeur, localisation) | ⬜ |
| Given un organisme contraint (profil Publique/État), when il consulte le positionnement IA, then l'attestation 'souverain, fiable, transparent' est disponible et vérifiable (référence contractuelle ou technique) | ⬜ |
| Error : given l'indisponibilité du modèle souverain, system n'utilise pas de repli vers un modèle non souverain sans consentement explicite du DSI (ou de l'organisme), et signale l'indisponibilité plutôt que de dégrader silencieusement | ⬜ |
| Security : la non-réutilisation des données du tenant pour l'entraînement des modèles est contractualisée et technique (isolation des flux) ; chaque traitement IA est tracé (tenant, modèle, horodatage, localisation) pour audit | ⬜ |

## Hors périmètre
- Ne couvre pas le choix ou l'intégration technique d'un fournisseur de modèle souverain précis (VIA ou équivalent) : cette US porte sur la garantie et la traçabilité de la localisation, pas sur le contrat fournisseur lui-même.
- Ne couvre pas la bascule automatique entre plusieurs modèles souverains en fonction de la charge ou du coût (hors périmètre fonctionnel de cette US).
- Ne couvre pas les traitements IA des autres modules Pivot (cette US porte sur les fonctions IA du domaine Pilotage ; une politique de souveraineté transverse relèverait d'un enabler plateforme).

## Notes d'implémentation
- S'applique transversalement aux autres US IA du module (US34.1.1 synthèse gouvernée, US34.1.2 agent exécutant, US34.1.3 réunions vers tâches) : la localisation/traçabilité décrite ici doit être vérifiée par chacune, pas dupliquée.
- Nécessite une configuration par tenant (certains tenants Publique/État imposent le souverain, d'autres profils PME/Grand groupe peuvent accepter un modèle non souverain) — le mécanisme de sélection de modèle doit être piloté par la configuration du tenant, pas codé en dur.
- La documentation du modèle (identité, hébergeur, localisation) doit être exposée de façon consultable par le DSI, pas seulement stockée en config technique interne.

---
Item Type: US · Parent: F34.1 · Module: pilotage · Phase: phase-3 · Size: XL · Priority: Medium
Stage: ⬜
Rôle: directeur-des-systemes-d-information
Source: PP-047 · MoSCoW: Could · Lot: Lot 4 · Origine: Différenciant PM (VIA)
Profils: Publique, État
Justification: Dossier §6.1 + §8-I7
Dépendances: —
