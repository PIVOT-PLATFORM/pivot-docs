# US38.6.1 — POC / MVP & expérimentations

**En tant que** porteur d'innovation
**Je veux** planifier et suivre des **expérimentations (POC/MVP)** avec hypothèses, protocole et critères de succès
**Afin de** tester vite et à moindre coût avant d'industrialiser

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un concept, when je lance une expérimentation, then hypothèses, protocole, budget et critères de succès sont définis | ⬜ |
| Given une expérimentation, when elle se termine, then résultats mesurés vs critères sont enregistrés | ⬜ |
| Error : given une expérimentation sans critères de succès renseignés, when je tente de la clôturer, then la clôture est bloquée tant que les critères ne sont pas définis (pas de résultat sans référentiel de comparaison) | ⬜ |
| Security : seul le porteur de l'innovation (ou rôle habilité sur cette innovation) peut créer/modifier une expérimentation qui lui est rattachée ; les autres utilisateurs ont un accès en lecture seule | ⬜ |

## Hors périmètre
- L'analyse des learnings et la décision pivot/persévérer/abandonner : couvertes par US38.6.2 (Innovation accounting), cette US se limite au cycle de vie de l'expérimentation elle-même
- Le passage en projet à l'issue d'une expérimentation réussie : couvert par US38.3.3 (Passage d'une innovation en projet)
- L'outillage détaillé de gestion de budget (comptabilité analytique) : hors SMI, seul le budget déclaré au niveau de l'expérimentation est suivi ici

## Notes d'implémentation
- Le protocole (hypothèses, méthode, budget, critères de succès) doit être structuré et non un simple champ texte libre, pour permettre la comparaison résultats vs critères à la clôture
- Une expérimentation est rattachée à un concept issu de l'entonnoir (F38.3) ; elle référence l'innovation en cours d'instruction, elle n'en est pas une copie
- S'appuie sur le modèle SMI d'EN38.1 pour le stockage des données d'expérimentation et leur exposition au portefeuille (F38.5) et à l'innovation accounting (US38.6.2)

---
Item Type: US · Parent: F38.6 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: SMI — Système de Management de l'Innovation (état de l'art, ISO 56002/56000)
Dépendances: EN38.1 (modèle SMI & moteur)
