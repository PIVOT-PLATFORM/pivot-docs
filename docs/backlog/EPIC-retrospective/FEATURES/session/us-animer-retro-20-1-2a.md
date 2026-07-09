# US20.1.2a — Contribution & révélation des cards

**En tant que** Scrum Master (animateur)
**Je veux** que l'équipe soumette des cards par colonne, masquées jusqu'à la révélation
**Afin de** recueillir des retours honnêtes sans biais d'ancrage sur les contributions des autres

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une session de rétro active, when un participant soumet une card (texte, colonne cible), then la card est enregistrée et diffusée via STOMP `CARD_ADDED` aux autres participants sous forme masquée (compteur uniquement, jamais le contenu) | ⬜ |
| Given une card masquée reçue par un autre participant, when le contenu est rendu côté client, then aucune information de contenu n'a transité avant la révélation (vérifié au niveau du payload WS, pas seulement de l'affichage) | ⬜ |
| Given une session en phase CONTRIBUTION, when le timer configuré expire, then la phase passe automatiquement à REVUE et un événement `PHASE_CHANGED` est diffusé | ⬜ |
| Given une session en phase CONTRIBUTION, when l'animateur clôture la phase manuellement avant expiration du timer, then la transition vers REVUE est immédiate | ⬜ |
| Given toutes les cards soumises, when l'animateur déclenche la révélation, then toutes les cards de la session sont diffusées en clair via `CARDS_REVEALED`, groupées par colonne | ⬜ |
| Error case: given un timer configuré à 0 ou négatif, system rejette la configuration de session (400) | ⬜ |
| Security: contenu de card rendu via `textContent` (Angular interpolation), jamais `[innerHTML]` — aucune injection HTML/JS possible | ⬜ |
| Security: tenantId/teamId de la session extraits du TenantContext résolu serveur, jamais du payload STOMP client | ⬜ |
| Test TI: une card soumise n'est visible en clair pour aucun participant autre que l'animateur avant l'événement `CARDS_REVEALED` (vérifié via un client STOMP de test qui inspecte le payload brut) | ⬜ |

## Hors périmètre (renvoyé aux US sœurs)
- Dot-voting sur les cards révélées → US20.1.2b
- Génération/persistance d'actions → US20.1.2c + US20.3.1
- Anonymat garanti même vis-à-vis de l'animateur (non retenu pour ce module, cf. EPIC README §Benchmark — anonymat = masquage jusqu'à révélation, pas non-attribution permanente)

---
Item Type: US · Parent: F20.1 · Module: agilite · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Dépendances: US20.1.1
