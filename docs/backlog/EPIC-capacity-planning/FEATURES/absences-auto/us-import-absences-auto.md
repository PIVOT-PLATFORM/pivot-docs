# US11.7.1 — Import automatique des absences (SI RH / absence)

**En tant que** Scrum Master
**Je veux** importer automatiquement les absences des membres depuis un SI RH/absence (SAP SuccessFactors/HCM, Workday, Lucca…), **en complément** de la saisie manuelle (US11.2.2)
**Afin de** planifier sur la disponibilité réelle sans ressaisir les congés

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un connecteur SI RH configuré, when la synchro s'exécute, then les absences (congés, RTT, arrêts) des membres **sur la période de sprint** sont importées | ⬜ |
| Given une absence importée chevauchant le sprint, when la capacité se calcule, then elle réduit les jours ouvrés du membre au prorata | ⬜ |
| Given saisie manuelle ET import, when les deux existent, then la fusion **évite les doublons** (source tracée) | ⬜ |
| Security/RGPD : **seules les périodes d'indisponibilité** sont importées (jamais le motif ni de donnée de santé) ; base légale, minimisation, traçabilité — cf. US11.8.1 | ⬜ |
| Error : given le SI RH indisponible, then dernier état conservé + échec signalé | ⬜ |

---
Item Type: US · Parent: F11.7 · Module: agilite · Phase: phase-3 · Size: XL · Priority: High
Stage: Backlog
Dépendances: US11.2.2 · EN11.1 · EN22.3
