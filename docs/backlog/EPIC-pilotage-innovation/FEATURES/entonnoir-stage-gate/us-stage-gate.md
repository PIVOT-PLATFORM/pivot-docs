# US38.3.2 — Jalons de décision (stage-gate)

**En tant que** comité d'innovation
**Je veux** poser des **jalons de décision (stage-gate)** à chaque passage d'étape : **go / kill / hold / pivot**
**Afin de** arbitrer objectivement et ne financer que ce qui mérite de continuer

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un item à un jalon, when le comité décide, then la décision (go/kill/hold/pivot) est tracée avec justification | ⬜ |
| Given un « kill », when il est prononcé, then l'apprentissage est capitalisé (cf. F38.6) et les ressources libérées | ⬜ |
| Error : given une décision de gate soumise sans justification renseignée, when elle est validée, then l'enregistrement est refusé (justification obligatoire) | ⬜ |
| Security : seuls les membres du comité d'innovation habilité (US38.1.2) peuvent prononcer une décision de gate ; une décision enregistrée est immuable (correction possible uniquement via une nouvelle entrée horodatée, jamais par réécriture) | ⬜ |
| A11y : l'écran de décision de gate (choix go/kill/hold/pivot, saisie de justification) est utilisable au clavier avec libellés explicites pour chaque option (WCAG 2.1 AA) | ⬜ |

## Hors périmètre
- La définition des comités et de leur composition (US38.1.2) — cette US consomme la gouvernance déjà établie, elle ne la crée pas
- La capitalisation détaillée de l'apprentissage post-kill (innovation accounting, F38.6) — cette US ne fait que déclencher/référencer ce capitalisage
- La conversion effective d'un item « go » en projet (US38.3.3)

## Notes d'implémentation
- Le `Gate` (EN38.1) référence le comité et les rôles définis par la gouvernance (US38.1.2) : pas de nouvelle notion de comité à créer ici
- Une décision « kill » doit libérer les ressources allouées à l'item (au sens du portefeuille F38.5, si l'allocation existe) et pointer vers l'apprentissage capitalisé (F38.6) via lien, sans dupliquer les données d'apprentissage dans le gate lui-même
- La traçabilité (décision + justification + auteur + horodatage) est portée par le mécanisme générique de EN38.1, réutilisé aussi par US38.1.2

---
Item Type: US · Parent: F38.3 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: SMI — Système de Management de l'Innovation (état de l'art, ISO 56002/56000)
Dépendances: EN38.1 (modèle SMI & moteur)
