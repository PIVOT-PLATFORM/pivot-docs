# US27.2.2 — Périodes imbriquées & report (carry-over)

**En tant que** responsable pilotage
**Je veux** imbriquer les cycles (**annuel ↔ trimestriel**) et **reporter** (carry-over) un OKR non atteint au cycle suivant
**Afin de** articuler stratégie annuelle et exécution trimestrielle sans repartir de zéro

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un OKR annuel, when je crée des OKR trimestriels, then ils peuvent s'aligner sur l'OKR annuel (cf. F27.3) | ⬜ |
| Given un OKR non atteint en fin de cycle, when je choisis le report, then il est **cloné** dans le cycle suivant avec historique conservé | ⬜ |
| Error : given un cycle trimestriel qui ne s'inscrit dans aucun cycle annuel ouvert (dates incompatibles), when je tente l'imbrication, then l'API refuse (400) | ⬜ |
| Security : given un utilisateur, when il déclenche un report (carry-over), then seul le owner de l'OKR ou un responsable pilotage habilité sur l'équipe concernée peut l'initier | ⬜ |

## Hors périmètre
- La gestion des transitions ouvert/gelé/clôturé du cycle lui-même (cf. US27.2.1)
- Les règles d'alignement O↔O détaillées (arbre, anti-cycle) (cf. US27.3.1)
- Le recalcul de scoring de l'OKR reporté (réutilise le moteur existant, cf. F27.5/EN27.1)

## Notes d'implémentation
- S'appuie sur l'entité `Cycle` (EN27.1) : l'imbrication annuel/trimestriel se modélise par une relation de période (le cycle trimestriel doit être contenu dans les dates du cycle annuel).
- Le report (carry-over) clone l'`Objective` et ses `KeyResult` dans le nouveau cycle en réinitialisant l'avancement courant mais en conservant un lien vers l'OKR d'origine (traçabilité de l'historique, pas de perte de données).
- Le clonage ne doit pas dupliquer les `CheckIn` historiques — ceux-ci restent attachés à l'OKR d'origine (cycle clôturé, lecture seule).

---
Item Type: US · Parent: F27.2 · Module: pilotage · Phase: phase-3 · Size: M · Priority: Medium
Stage: ⬜
Profils: Tous
Justification: Raffinage OKR état de l'art (Doerr/Google ; Quantive/Workboard/Viva Goals/Perdoo)
Dépendances: EN27.1 (modèle OKR & moteur)
