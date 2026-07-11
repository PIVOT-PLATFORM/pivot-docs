# US20.1.2b — Phase Vote (dot-voting)

**En tant que** participant à la rétrospective
**Je veux** répartir un nombre limité de votes sur les cards révélées
**Afin de** faire émerger les sujets les plus importants pour l'équipe sans discussion exhaustive de chaque card

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une session passée en phase VOTE, when la phase démarre, then chaque participant reçoit un nombre de votes N configurable (défaut 3) | ⬜ |
| Given un participant avec des votes restants, when il vote sur une card révélée, then le vote est décompté de son solde et diffusé via STOMP `VOTE_CAST` (compteur global par card, jamais l'identité du votant) | ⬜ |
| Given un participant ayant déjà voté sur une card, when il revote sur la même card, then un vote supplémentaire est autorisé jusqu'à épuisement de son solde (plusieurs votes sur une même card permis) | ⬜ |
| Given un participant à 0 vote restant, when il tente de voter, then la requête est rejetée (409) sans décompte négatif | ⬜ |
| Given une session en phase VOTE, when le timer configuré expire ou l'animateur clôture manuellement, then la phase passe à ACTION et le classement des cards par nombre de votes est diffusé via `PHASE_CHANGED` | ⬜ |
| Error case: given une tentative de vote sur une card d'une autre session, system retourne 404 | ⬜ |
| Security: le décompte de votes restants est autoritaire côté serveur (jamais transmis/fiable depuis le client) — un client falsifié ne peut pas dépasser son solde réel | ⬜ |
| Test TI: 2 participants votent simultanément sur la même card jusqu'à épuisement de leur solde respectif — aucune race condition sur le compteur global (vérifié par une transaction/verrou approprié) | ⬜ |

## Hors périmètre
- Contribution/révélation des cards → US20.1.2a (prérequis)
- Génération/persistance d'actions → US20.1.2c + US20.3.1
- Pondération différenciée des votes par rôle (facilitateur vs participant) — non demandé par l'US fondatrice

---
Item Type: US · Parent: F20.1 · Module: agilite · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: utilisateur-final
Dépendances: US20.1.2a
