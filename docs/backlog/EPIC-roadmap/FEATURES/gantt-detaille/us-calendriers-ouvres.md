# US22.4.5 — Calendriers ouvrés & exceptions

**En tant que** chef de projet
**Je veux** définir des calendriers (projet, tâche, ressource) avec jours ouvrés, horaires et exceptions (fériés, fermetures)
**Afin de** planifier sur le temps réellement travaillé

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un calendrier projet, when une tâche est planifiée, then elle n'occupe que des jours/heures ouvrés | ⬜ |
| Given une exception (férié), when elle tombe dans une tâche, then la durée s'étend en conséquence | ⬜ |
| Given une ressource avec son propre calendrier, when elle est affectée, then son calendrier prime pour son travail | ⬜ |
| Error : given une exception de calendrier avec une date de fin antérieure à sa date de début, then la saisie est rejetée avec un message explicite | ⬜ |
| Security : seul un utilisateur avec un rôle d'administration du projet peut créer/modifier un calendrier projet ou ressource ; un contributeur planning ne peut que consulter les calendriers | ⬜ |
| A11y : l'éditeur de calendrier (jours ouvrés, horaires, exceptions) est intégralement pilotable au clavier, avec les jours fériés/exceptions annoncés par leur libellé (pas seulement une couleur) pour les lecteurs d'écran | ⬜ |

## Hors périmètre
- L'import automatique des jours fériés légaux par pays/région : couvert par US22.8.3
- L'utilisation des calendriers dans le recalcul auto/manuel des tâches : couverte par US22.4.2
- La gestion des indisponibilités issues des SI RH externes (congés, absences) : couverte par US22.8.4

## Notes d'implémentation
- Le modèle de calendrier doit permettre trois niveaux (projet, tâche, ressource) avec une règle de priorité claire : calendrier ressource > calendrier tâche > calendrier projet, cohérente avec EN22.1
- Une exception de calendrier (jour férié, fermeture) doit être un intervalle daté attaché au calendrier, réutilisable entre plusieurs tâches/ressources sans duplication
- Le socle de connecteurs calendrier (EN22.3) est le point d'extension prévu pour l'import de fériés par pays ; cette US ne couvre que le modèle et l'édition manuelle des calendriers

---
Item Type: US · Parent: F22.4 · Module: pilotage · Phase: phase-3 · Size: L · Priority: High
Stage: ⬜
Rôle: chef-de-projet
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: Parité MS Project en mode web — modèle temporel unique (EN22.1), altitude pilotée par le profil (E40)
Dépendances: EN22.1 (modèle temporel unique)
