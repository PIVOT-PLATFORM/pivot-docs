# US27.5.1 — Scoring 0.0–1.0 (KR & objectif pondéré)

**En tant que** responsable pilotage
**Je veux** obtenir un **score 0.0–1.0** par KR et par objectif (moyenne pondérée), tenant compte du type engageant/aspirationnel
**Afin de** évaluer objectivement l'atteinte, à la manière de Google

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un KR, when son avancement est à X %, then son **score = X/100** (borné 0.0–1.0) | ⬜ |
| Given un objectif, when on agrège, then **score O = moyenne pondérée des KR** ; pour un O aspirationnel, **0.7 est considéré « réussi »**, 1.0 pour un O engageant | ⬜ |
| Given un score, when il est affiché, then le code couleur suit le sweet spot (rouge < 0.4 · orange 0.4–0.6 · vert 0.7+) | ⬜ |
| Error : given un objectif sans aucun KR ou avec des poids non renseignés, when le score est calculé, then le calcul est refusé/affiché comme indisponible plutôt que de retourner un score erroné (division par zéro ou poids nul) | ⬜ |
| Security : le recalcul du score n'est déclenchable/visible que dans le respect des droits de visibilité de l'OKR (pas d'exposition d'un score d'OKR confidentiel via une API de scoring générique) | ⬜ |
| A11y : le code couleur du sweet spot est doublé d'un libellé textuel ou d'une icône (pas de dépendance à la seule couleur pour distinguer rouge/orange/vert) | ⬜ |

## Hors périmètre
- La définition des types de KR et le calcul de leur avancement 0–100 % individuel — couverte par US27.1.3 (prérequis, cf. dépendance)
- Le grading final et le passage en lecture seule du cycle — couverts par US27.5.2 (clôture)
- Le calcul du statut ON_TRACK/AT_RISK/OFF_TRACK basé sur le rythme attendu — relève du moteur EN27.1 (statut et tendance), distinct du score ponctuel

## Notes d'implémentation
- Le score est calculé par le moteur OKR (EN27.1) : score KR = avancement/100 (borné 0.0–1.0), score O = moyenne pondérée des scores KR (somme des poids = 100 %, cf. US27.1.3)
- Le seuil de réussite dépend du type d'objectif (engageant vs aspirationnel, cf. US27.1.4) : ce seuil est affiché à titre de repère, il ne bloque rien
- Le sweet spot (rouge/orange/vert) est un repère visuel calculé à partir du score, cohérent avec le statut de check-in (US27.4.2) sans le dupliquer

---
Item Type: US · Parent: F27.5 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: Backlog
Profils: Tous
Justification: Raffinage OKR état de l'art (Doerr/Google ; Quantive/Workboard/Viva Goals/Perdoo)
Dépendances: US27.1.3
