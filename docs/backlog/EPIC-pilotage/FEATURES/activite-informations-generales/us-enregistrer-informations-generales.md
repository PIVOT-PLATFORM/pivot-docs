# US18.16.10 — Enregistrer informations générales

**En tant que** chef de projet (pilote d'activité)
**Je veux** enregistrer globalement l'écran Informations générales via un bouton contextuel
**Afin de** persister l'ensemble des champs sans perdre ma saisie

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une activité en création, when tous les champs obligatoires ne sont pas remplis, then le bouton « Suivant » est grisé ; une fois les obligatoires remplis, le bouton « Suivant » devient actif et enregistre l'ensemble de l'écran | ⬜ |
| Given une activité en modification, when j'ouvre l'écran, then le bouton s'intitule « Enregistrer », désactivé (disabled) tant qu'aucune modification n'a été faite, et devient actif (vert) dès qu'une modification est effectuée | ⬜ |
| Given des champs modifiés, when je clique sur Enregistrer, then l'ensemble des champs de l'écran Informations générales est enregistré en une seule action | ⬜ |
| Error : given des modifications non enregistrées, when je tente de quitter l'écran, then une pop-up m'avertit et me demande de confirmer avant de perdre ma saisie | ⬜ |
| Security/Gouvernance : seul le chef de projet pilote de l'activité (ou un administrateur habilité) peut enregistrer l'écran Informations générales | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA ; l'état actif/inactif du bouton n'est pas signalé uniquement par la couleur | ⬜ |

## Hors périmètre
- La validation détaillée de chaque champ est couverte par les US dédiées (nom, statut, météo, description, gains…).
- La navigation vers l'écran suivant (Budget, Jalons…) après « Suivant » n'est pas détaillée ici.

## Notes d'implémentation
- Écran Activité — Informations générales (module pilotage), enregistrement global de l'écran.
- Bouton contextuel : « Suivant » à la création (grisé tant que les obligatoires ne sont pas remplis) → « Enregistrer » en modification (disabled sans modif, vert dès modif).
- Pop-up de confirmation si sortie de l'écran sans enregistrement des modifications.

---
Item Type: US · Parent: F18.16 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: chef-de-projet
Source: SPEC_OPDN — B.12 Activité — champs Informations générales
Dépendances: —
