# US20.1.2c — Phase Action (transition en session)

**En tant que** Scrum Master (animateur)
**Je veux** que la session bascule en phase ACTION en présentant les cards triées par nombre de votes
**Afin de** transformer directement les sujets les plus votés en actions, sans ressaisie manuelle du contexte

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une session passée en phase ACTION (fin de la phase VOTE), when la phase démarre, then les cards sont affichées triées par nombre de votes décroissant, groupées par colonne | ⬜ |
| Given une card affichée en phase ACTION, when l'animateur ou un participant déclenche "créer une action depuis cette card", then l'appel `POST .../sessions/{id}/actions` (US20.3.1) est effectué avec la card comme source (`card source optionnelle` de US20.3.1) — cette US ne réimplémente pas la persistance, elle ne fait que le déclenchement contextualisé | ⬜ |
| Given la phase ACTION active, when le timer configuré expire ou l'animateur clôture la session, then un événement `SESSION_CLOSED` est diffusé et la session passe en lecture seule | ⬜ |
| Given une session fermée, when un participant tente une action d'écriture (vote, card, action) via WebSocket, then la requête est rejetée (STOMP ERROR) sans exception non gérée | ⬜ |
| Error case: given une tentative de clôture par un participant non-animateur, system rejette (403) | ⬜ |
| Security: seul l'animateur (créateur de la session ou rôle délégué) peut clôturer la session ou déclencher la transition de phase manuelle | ⬜ |
| Test TI: séquence complète CONTRIBUTION → REVUE → VOTE → ACTION → SESSION_CLOSED rejouée de bout en bout sur une session de test, chaque transition de phase vérifiée par son événement STOMP respectif | ⬜ |

## Hors périmètre
- Persistance/CRUD des actions (titre, owner, échéance, statut) → US20.3.1, cette US ne fait que déclencher l'appel
- Contribution/révélation/vote → US20.1.2a/US20.1.2b (prérequis)
- Consultation des actions hors session → US20.3.1/US20.3.2

---
Item Type: US · Parent: F20.1 · Module: agilite · Phase: phase-3 · Size: S · Priority: High
Stage: ⬜
Dépendances: US20.1.2b
