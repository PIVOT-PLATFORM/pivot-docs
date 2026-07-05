# US27.4.1 — Check-in périodique (progress, confiance, commentaire)

**En tant que** responsable pilotage
**Je veux** réaliser un **check-in** périodique (hebdo par défaut) : mise à jour de la valeur des KR, **niveau de confiance** et commentaire
**Afin de** maintenir les OKR vivants entre l'ouverture et la clôture

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un OKR actif, when je fais un check-in, then je mets à jour les valeurs des KR, un **niveau de confiance** (ex. 1–10 ou vert/orange/rouge) et un commentaire | ⬜ |
| Given un check-in, when il est enregistré, then il est **horodaté et historisé** (courbe d'avancement & de confiance dans le temps) | ⬜ |
| Error : given un check-in sur un OKR d'un cycle gelé pour sa définition mais non encore clôturé, when la valeur soumise est hors bornes (ex. négative, ou dépassant la cible pour un KR borné), then l'API retourne 400 | ⬜ |
| Security : given un utilisateur, when il fait un check-in, then seul l'owner du KR (ou un manager habilité) peut modifier la valeur, la confiance et le commentaire | ⬜ |
| A11y : formulaire de check-in conforme WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Le calcul du statut ON_TRACK/AT_RISK/OFF_TRACK et de la tendance à partir des check-ins (cf. US27.4.2)
- L'envoi de rappels pour inciter au check-in (cf. US27.4.3)
- La mise à jour automatique des KR via connecteurs BI/API/tableur (cf. US27.8.1)

## Notes d'implémentation
- Entité `CheckIn` (valeur, confiance, commentaire, horodaté) posée par EN27.1, rattachée à un `KeyResult` — cette US couvre la saisie manuelle et son historisation.
- Le check-in est autorisé uniquement si le cycle est ouvert ou gelé-validé (en cours) ; refusé si clôturé (cf. US27.2.1, cycle en lecture seule).
- L'historique doit permettre de reconstruire une courbe temporelle (valeur KR + confiance) sans écraser les check-ins précédents — chaque check-in est un enregistrement immuable, pas une mise à jour en place.

---
Item Type: US · Parent: F27.4 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: Backlog
Profils: Tous
Justification: Raffinage OKR état de l'art (Doerr/Google ; Quantive/Workboard/Viva Goals/Perdoo)
Dépendances: EN27.1 (modèle OKR & moteur)
