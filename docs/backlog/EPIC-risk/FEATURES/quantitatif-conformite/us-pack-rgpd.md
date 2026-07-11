# US21.6.5 — Pack RGPD

**En tant que** DPO, Chef de projet
**Je veux** « Pack RGPD »
**Afin de** chiffrer les risques et garantir la conformité réglementaire

## Contexte

Injecter les risques RGPD obligatoires et le lien au registre des traitements.

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un projet dont le profil (questionnaire de cadrage, US21.1.1) indique un traitement de données personnelles, when le projet est créé ou son profil mis à jour en ce sens, then le pack RGPD injecte automatiquement les risques RGPD pré-suggérés (famille Conformité/Données) issus de la bibliothèque US21.1.5, rattachés au registre des traitements du projet | ⬜ |
| Error : given un projet dont le profil ne mentionne aucun traitement de données personnelles, system n'injecte aucun risque RGPD automatiquement ; si le Chef de projet tente de forcer l'injection manuelle sans lien valide vers un registre de traitement, system retourne une erreur de validation identifiant l'information manquante | ⬜ |
| Security : le lien vers le registre des traitements (donnée RGPD sensible pouvant référencer des catégories de données à caractère personnel) n'est consultable que par les rôles habilités (DPO, chef de projet) ; l'injection automatique ne doit pas dupliquer ou exposer le contenu du registre, seulement le référencer | ⬜ |

## Hors périmètre
- La tenue du registre des traitements lui-même (source de vérité RGPD) n'est pas portée par ce module : cette US ne fait que référencer un registre existant, pas le créer ni le gérer.
- La suggestion de risques par IA (F21.7) reste hors périmètre ; l'injection ici est déterministe, basée sur le profil de projet et la bibliothèque pré-suggérée (US21.1.5).
- Les packs AI Act (US21.6.6) et RGAA/facture électronique (US21.6.7) sont des packs de conformité distincts, traités séparément.

## Notes d'implémentation
- Dépend de US21.1.5 (bibliothèque de risques pré-suggérés) : le pack RGPD est un sous-ensemble filtré de cette bibliothèque, activé par une condition sur le profil de projet (traitement de données personnelles = oui).
- L'injection doit être idempotente : une mise à jour du profil ne doit pas dupliquer les risques RGPD déjà présents sur le projet si le pack a déjà été appliqué.
- Le lien au registre des traitements suppose une référence externe (`registre_ref` ou équivalent) — pas de FK directe si le registre est porté par un autre module, conformément à ADR-006 (corrélation par référence via bus PIVOT).

---
Item Type: US · Parent: F21.6 · Module: risk · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: delegue-a-la-protection-des-donnees, chef-de-projet
Dépendances: US21.1.5
