# US21.5.3 — Bibliothèque vivante (REX)

**En tant que** PMO
**Je veux** que la clôture d'un projet enrichisse automatiquement la bibliothèque de risques de sa typologie avec les risques survenus et l'efficacité des actions menées
**Afin de** capitaliser le retour d'expérience (REX) pour améliorer la pertinence des suggestions sur les projets futurs

## Contexte

À la clôture, les risques survenus et l'efficacité des actions enrichissent la bibliothèque.

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un projet dont tous les risques sont au statut `clos` (US21.3.1), when le PMO clôture le projet, then chaque risque `survenu` ou `clos` est versé dans la bibliothèque de risques pré-suggérés (US21.1.5) de la typologie du projet, avec le résultat des actions de traitement associées | ⬜ |
| Given un risque versé dans la bibliothèque, when un chef de projet consulte la bibliothèque pour un nouveau projet de même typologie, then ce risque apparaît avec un indicateur d'efficacité des actions historiquement menées (traité avec succès / récurrent malgré traitement) | ⬜ |
| Error : given un projet clôturé sans qu'aucun de ses risques n'ait de statut final valide (ex. encore `actif`), system n'alimente pas la bibliothèque pour ce projet et journalise l'anomalie plutôt que d'enrichir la bibliothèque avec une donnée incomplète | ⬜ |
| Security : l'enrichissement de la bibliothèque anonymise les données propres au projet d'origine (nom de projet, montants, parties prenantes) — seuls le libellé du risque, sa famille et l'efficacité du traitement sont capitalisés, pour éviter la fuite d'information sensible entre projets/clients | ⬜ |

## Hors périmètre
- La suggestion de risques similaires à un nouveau projet à partir de la bibliothèque enrichie — couverte par US21.5.4 (Suggestion par similarité).
- La définition initiale de la bibliothèque de risques pré-suggérés — pré-requis fourni par US21.1.5.
- La machine à états et la traçabilité des transitions de statut du risque — pré-requis fourni par US21.3.1.
- La détection de signaux faibles ou l'usage d'IA générative pour qualifier l'efficacité — traitement déterministe uniquement dans cette US (pas de lien avec F21.7 IA gouvernée).

## Notes d'implémentation
- Dépend de US21.1.5 pour la structure de la bibliothèque de risques pré-suggérés (catalogue par typologie) et de US21.3.1 pour disposer d'un historique de statuts fiable (audit trail des transitions) permettant de dater la clôture et de qualifier le résultat du traitement.
- L'anonymisation (exigence Security) doit être appliquée avant écriture en bibliothèque, pas en lecture seule — la bibliothèque ne doit à aucun moment stocker de donnée projet identifiante.
- Le déclenchement se fait à la clôture du projet (signal reçu du domaine Pilotage via bus, cf. F21.4 Boucle vivante) : cette US suppose l'existence d'un événement de clôture de projet consommable, sans en définir le contrat exact ici.

---
Item Type: US · Parent: F21.5 · Module: risk · Phase: phase-3 · Size: M · Priority: Medium
Stage: Backlog
Dépendances: US21.1.5, US21.3.1
