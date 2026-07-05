# US40.1.1 — Profil d'organisation

**En tant que** DSI
**Je veux** renseigner un questionnaire de cadrage (taille, statut juridique, maturité PMO, redevabilité, exigence de souveraineté)
**Afin de** obtenir un profil d'organisation qui pilote l'adaptation de l'outil

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given le questionnaire de cadrage, when je le complète, then un profil d'organisation typé est enregistré (TPE/PME/Grand groupe/Privée sous droit public/Publique/État) | ⬜ |
| Given un profil enregistré, when il change, then les modules et niveaux de rigueur associés sont recalculés (cf. US40.1.2) | ⬜ |
| Error : given un questionnaire incomplet ou des réponses incohérentes (ex. taille et statut juridique contradictoires), when je tente de le soumettre, then la soumission est rejetée avec message explicite et aucun profil n'est enregistré | ⬜ |
| Security/Gouvernance : le profil et ses paramètres — dont la classe de souveraineté qu'il détermine (US40.1.3) — sont tracés (horodatage, auteur) et modifiables uniquement par un rôle habilité (DSI/admin plateforme) | ⬜ |
| A11y : le questionnaire de cadrage (formulaire multi-étapes) est navigable au clavier, les erreurs de validation sont annoncées aux lecteurs d'écran et conforme WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Le recalcul effectif des modules/packs/niveau de rigueur suite à un changement de profil est traité par US40.1.2, pas par cette US (ici on ne fait que déclencher/persister le changement).
- La dérivation de la classe de souveraineté elle-même (algorithme, hébergements prescrits) est traitée par US40.1.3 — cette US ne fait que capturer l'exigence de souveraineté déclarée dans le questionnaire.
- Pas de workflow d'approbation multi-niveaux pour valider un changement de profil (une seule validation par le rôle habilité).

## Notes d'implémentation
- Backend `pivot-pilotage-core` (schéma Flyway `pilotage`) : nouvelle entité `OrganizationProfile` liée à l'équipe/tenant via FK `public.teams.id`.
- Le questionnaire couvre au minimum : taille, statut juridique, maturité PMO, redevabilité, exigence de souveraineté — ces champs alimentent directement US40.1.2 (activation modules) et US40.1.3 (classe de souveraineté).
- Historisation requise (qui a changé quoi, quand) pour satisfaire l'AC Security/Gouvernance — pas de simple update en place.
- Frontend `pivot-pilotage-ui`, consomme `@pivot/ui-core` + `@pivot/design-system` pour le formulaire de cadrage.
- Dépend de EN18.9 (modèle Application→Projet) pour le rattachement du profil.

---
Item Type: US · Parent: F40.1 · Module: pilotage · Phase: phase-3 · Size: M · Priority: Critical
Stage: Backlog
Source: PP-A01 · MoSCoW: Must · Lot: Lot 1 · Origine: Synthèse v2
Profils: Tous
Justification: Synthèse v2 §7 : pendant, côté organisation, du profil projet du module Risque
Dépendances: EN18.9 (modèle Application→Projet)
