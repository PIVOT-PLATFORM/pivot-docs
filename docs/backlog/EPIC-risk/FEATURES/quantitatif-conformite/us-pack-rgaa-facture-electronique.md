# US21.6.7 — Pack RGAA & facture électronique

**En tant que** Chef de projet public
**Je veux** « Pack RGAA & facture électronique »
**Afin de** chiffrer les risques et garantir la conformité réglementaire

## Contexte

Risques d'accessibilité et d'échéances réglementaires FR injectés selon le profil.

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un projet dont le profil indique un secteur public ou une obligation RGAA/facturation électronique, when le projet est créé ou son profil mis à jour en ce sens, then le pack injecte automatiquement les risques pré-suggérés d'accessibilité RGAA et d'échéances de facturation électronique (avec les dates réglementaires FR applicables) | ⬜ |
| Error : given un projet marqué secteur public mais sans échéance de facturation électronique renseignée dans son profil, system injecte le risque RGAA mais signale explicitement l'échéance de facturation manquante plutôt que d'injecter une date par défaut incorrecte | ⬜ |
| Security : la modification du profil réglementaire (secteur public, échéances de facturation électronique) est réservée aux rôles habilités du projet (chef de projet, PMO) ; ces informations de conformité restent en lecture seule pour les contributeurs standards | ⬜ |

## Hors périmètre
- L'audit technique RGAA réel (contrôle des critères d'accessibilité sur les livrables) n'est pas réalisé par cette US : elle injecte un risque de suivi, pas un outil d'audit d'accessibilité.
- Les autres packs de conformité (RGPD US21.6.5, AI Act US21.6.6) sont traités par des US distinctes ; ils peuvent coexister avec ce pack sans duplication.
- L'accessibilité RGAA des vues du module risque lui-même (F21.8.6) est une US séparée qui porte sur l'UI du module, pas sur les risques métier injectés ici.

## Notes d'implémentation
- Dépend de US21.1.5 (bibliothèque de risques pré-suggérés) : le pack est un sous-ensemble filtré par le profil « secteur public » et/ou « soumis à facturation électronique ».
- Les échéances réglementaires françaises de facturation électronique (calendrier légal par taille d'entreprise) doivent être des données paramétrables, pas codées en dur, pour rester à jour si le calendrier évolue.
- L'injection doit être idempotente comme pour les autres packs (US21.6.5, US21.6.6) : pas de duplication des risques déjà injectés lors d'une mise à jour de profil.

---
Item Type: US · Parent: F21.6 · Module: risk · Phase: phase-3 · Size: M · Priority: Medium
Stage: ⬜
Dépendances: US21.1.5
