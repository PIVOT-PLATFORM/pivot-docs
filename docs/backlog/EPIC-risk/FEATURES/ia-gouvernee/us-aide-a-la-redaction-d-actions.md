# US21.7.3 — Aide à la rédaction d'actions

**En tant que** Chef de projet
**Je veux** que l'IA me suggère des plans d'action de mitigation pour un risque donné
**Afin de** rédiger plus vite un plan d'action tout en gardant la main sur son contenu final

## Contexte

Suggérer des plans d'action de mitigation, tracés et validés, en s'appuyant sur le plan d'action du risque (US21.3.3).

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un risque qualifié avec sa stratégie de traitement (4 T), when le chef de projet demande une aide à la rédaction, then l'IA propose un texte d'action (description, responsable suggéré, échéance indicative) que l'utilisateur peut accepter tel quel, modifier ou rejeter | ⬜ |
| Given une suggestion d'action affichée, when le chef de projet l'accepte (avec ou sans modification), then l'action est créée dans le plan d'action du risque (US21.3.3) avec une référence à la suggestion IA d'origine et le texte final validé par l'humain | ⬜ |
| Error : given un risque sans contexte suffisant (pas de stratégie de traitement définie), system refuse de générer une suggestion et invite à qualifier le risque au préalable | ⬜ |
| Security : aucune action suggérée par l'IA n'est enregistrée dans le plan d'action sans validation explicite d'un utilisateur habilité ; chaque action tracée conserve la distinction entre texte proposé par l'IA et texte final validé | ⬜ |

## Hors périmètre
- La création et le suivi du plan d'action lui-même (statuts, échéances, responsables) — couverts par US21.3.3, cette US ne fait qu'assister sa rédaction.
- Le choix de la stratégie de traitement (4 T) — couvert par US21.3.2, prérequis à cette US.
- La gouvernance transverse de traçabilité et de contrôle humain de l'IA — couverte par US21.7.4 (cette US en hérite les garanties, ne les redéfinit pas).

## Notes d'implémentation
- Dépend de US21.3.3 (Plan d'action) : la suggestion alimente une action mais ne crée pas un modèle de données parallèle.
- Doit respecter les mêmes garde-fous de traçabilité que US21.7.1/US21.7.4 : toute suggestion conserve sa référence même après modification par l'utilisateur.
- Le texte suggéré doit rester éditable intégralement avant validation — pas d'acceptation en un clic sans possibilité de relecture.

---
Item Type: US · Parent: F21.7 · Module: risk · Phase: phase-3 · Size: M · Priority: Low
Stage: ⬜
Dépendances: US21.3.3
