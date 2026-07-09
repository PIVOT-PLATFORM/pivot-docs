# US22.7.6 — Export iCalendar (.ics)

**En tant que** utilisateur métier
**Je veux** exporter jalons, tâches et échéances au format iCalendar (.ics) et par abonnement (URL)
**Afin de** voir le planning dans Outlook / Google Agenda / Apple Calendar

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un projet, when je l'exporte en .ics, then jalons et tâches datées apparaissent dans un agenda standard | ⬜ |
| Given un abonnement iCal (URL), when le planning change, then l'agenda abonné se met à jour | ⬜ |
| Error : given un projet sans aucune date (tâches/jalons non planifiés) ou une tentative d'accès à une URL d'abonnement invalide/expirée/révoquée, when l'export ou l'abonnement est sollicité, then un fichier .ics valide mais vide est renvoyé (export) ou une erreur HTTP explicite est renvoyée (abonnement), jamais un flux .ics malformé | ⬜ |
| Security : l'URL d'abonnement iCal est un lien secret non énumérable (token opaque) limité en lecture seule aux données du projet concerné, révocable et régénérable par le chef de projet | ⬜ |

## Hors périmètre
- Import de fichiers .ics vers PIVOT (cette US ne couvre que l'export/abonnement sortant)
- Synchronisation bidirectionnelle avec l'agenda (modifier un événement dans Outlook/Google Agenda ne modifie pas le planning PIVOT)
- Notifications/rappels avancés (alarmes iCal) au-delà des dates de jalons/tâches elles-mêmes

## Notes d'implémentation
- Format standard RFC 5545 (iCalendar) — générer un flux `.ics` conforme consommable par Outlook/Google Agenda/Apple Calendar sans plugin
- L'abonnement par URL doit rester disponible en polling périodique côté client agenda (limite du protocole iCal, pas de push) ; documenter la fréquence de rafraîchissement typique des agendas cibles
- Chaque jalon/tâche datée du modèle temporel unique EN22.1 devient un VEVENT ; les tâches sans date ferme (planification floue, cf. F22.3) sont exclues du flux

---
Item Type: US · Parent: F22.7 · Module: pilotage · Phase: phase-3 · Size: M · Priority: Medium
Stage: ⬜
Profils: Tous
Justification: Interopérabilité / interfaces inter-modules & SI (ADR-010, bus PIVOT + deep-links ADR-006/008)
Dépendances: EN22.1 (modèle temporel unique)
