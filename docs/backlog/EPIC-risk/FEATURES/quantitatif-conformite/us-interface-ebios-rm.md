# US21.6.4 — Interface EBIOS RM

**En tant que** RSSI
**Je veux** « Interface EBIOS RM »
**Afin de** chiffrer les risques et garantir la conformité réglementaire

## Contexte

Sources de risque, scénarios, mesures pour les projets à sécurité prédominante.

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un projet marqué « sécurité prédominante » dans son profil, when le RSSI accède à l'atelier EBIOS RM du projet, then il peut saisir/consulter les sources de risque, les scénarios stratégiques et opérationnels, et les mesures de sécurité, et l'ensemble se restitue sous forme d'analyse EBIOS structurée rattachée au projet | ⬜ |
| Error : given une tentative de rattacher un scénario EBIOS à une source de risque ou une mesure inexistante (référence invalide), system rejette l'enregistrement et retourne une erreur de validation identifiant l'élément manquant, sans créer d'incohérence dans l'analyse | ⬜ |
| Security : la saisie et la consultation de l'analyse EBIOS RM (scénarios de menace, mesures de sécurité — données sensibles sur la posture de sécurité du projet) sont réservées au RSSI et aux rôles explicitement habilités sécurité du projet ; les autres membres de l'équipe n'y ont pas accès par défaut | ⬜ |

## Hors périmètre
- La conduite complète de la méthode EBIOS RM (les 5 ateliers officiels ANSSI) n'est pas reproduite intégralement : cette US couvre la saisie/restitution structurée de sources de risque, scénarios et mesures, pas un outil EBIOS RM complet.
- La génération automatique de scénarios de menace par IA n'est pas couverte ici (cf. F21.7 IA gouvernée si applicable ultérieurement).
- L'export réglementaire de l'analyse EBIOS (rapport formaté ANSSI) est traité par F21.8 (Restitutions), pas par cette US.

## Notes d'implémentation
- Dépend de US21.1.3 (taxonomie universelle 12 familles) : les sources de risque et scénarios EBIOS doivent pouvoir se rattacher aux familles existantes (notamment Sécurité) plutôt que créer une taxonomie parallèle.
- L'activation de cet atelier doit être conditionnée au profil de projet (« sécurité prédominante » issu du questionnaire de cadrage, US21.1.1), pour ne pas surcharger les projets sans enjeu sécurité fort.
- Les scénarios et mesures EBIOS doivent rester des entités distinctes mais liées au risque standard du module (pas de duplication du cycle de vie du risque déjà couvert par F21.3).

---
Item Type: US · Parent: F21.6 · Module: risk · Phase: phase-3 · Size: L · Priority: Medium
Stage: ⬜
Rôle: responsable-de-la-securite-si
Dépendances: US21.1.3
