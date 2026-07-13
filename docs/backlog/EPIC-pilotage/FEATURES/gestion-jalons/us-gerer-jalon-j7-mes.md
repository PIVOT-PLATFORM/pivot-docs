# US18.3.4 — Gérer le jalon J7 « Mise en Service (MES) »

**En tant que** chef de projet (pilote d'activité)
**Je veux** gérer le jalon J7 (ex Go Live) renommé Mise en Service (MES)
**Afin de** décrire et planifier la mise en service de la version

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given le jalon J7, when je le consulte, then il est intitulé Mise en Service (MES) et propose Type de déploiement, Planning confirmé par le site, Sites de déploiement et Description version | ⬜ |
| Given le champ Description version, when je saisis, then la longueur est limitée à 380 caractères maximum | ⬜ |
| Given la sélection d'un site de déploiement, when je le sélectionne, then l'ensemble de ses tranches existantes est sélectionné | ⬜ |
| Given les champs Date de passage et Sites de déploiement, when j'utilise les options de vidage, then leur contenu est vidé | ⬜ |
| Error : given une Description version dépassant 380 caractères, system empêche la saisie au-delà de la limite | ⬜ |
| Security/Gouvernance : seul le chef de projet pilote de l'activité (ou un administrateur habilité) peut gérer le jalon J7 MES | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Le jalon J6 (MEP) et son aide au format sont couverts par une US dédiée.

## Notes d'implémentation
- Jalon J7 « Mise en Service (MES) » de l'écran jalons (module pilotage).
- Sélection d'un site = sélection de toutes ses tranches ; options de vidage sur Date de passage et Sites de déploiement ; Description version 380 car. max.

---
Item Type: US · Parent: F18.3 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: chef-de-projet
Source: Backlog OPPA (reconstitution v1–v2.1) — US-304
Dépendances: —
