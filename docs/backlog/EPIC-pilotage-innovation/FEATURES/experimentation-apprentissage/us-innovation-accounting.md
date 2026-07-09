# US38.6.2 — Innovation accounting & apprentissages

**En tant que** porteur d'innovation
**Je veux** capitaliser les **apprentissages** et décider **pivot / persévérer / abandonner** (innovation accounting, Lean Startup)
**Afin de** apprendre de chaque test, y compris des échecs

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given les résultats d'une expérimentation, when je les analyse, then une décision pivot/persévérer/abandonner est tracée avec les learnings | ⬜ |
| Given un échec, when il est capitalisé, then l'apprentissage reste consultable (bibliothèque de REX) | ⬜ |
| Error : given une expérimentation non clôturée (résultats absents), when je tente d'enregistrer une décision pivot/persévérer/abandonner, then l'action est refusée tant que les résultats ne sont pas renseignés | ⬜ |
| Security : la décision et les learnings restent visibles par l'équipe/porteur de l'innovation et les rôles SMI habilités ; un apprentissage marqué sensible (ex. échec impliquant un partenaire externe) peut être restreint en visibilité par le porteur | ⬜ |

## Hors périmètre
- Le déroulé de l'expérimentation elle-même (protocole, budget, résultats mesurés) : couvert par US38.6.1
- La recommandation automatique de la décision pivot/persévérer/abandonner : cette US trace une décision humaine, elle ne calcule pas de verdict
- Le fail-fast assisté par IA (F38.11) : hors périmètre de cette US, qui reste un enregistrement manuel de la décision et des learnings

## Notes d'implémentation
- La bibliothèque de REX doit rester consultable même après abandon de l'innovation d'origine (les learnings ne doivent pas être perdus si l'innovation est archivée/supprimée du pipeline)
- Un learning doit pouvoir être retrouvé par thématique/tag, pas seulement par l'innovation d'origine, pour permettre la réutilisation transverse (Lean Startup / innovation accounting)
- S'appuie sur le modèle SMI d'EN38.1 ; consomme les résultats produits par US38.6.1

---
Item Type: US · Parent: F38.6 · Module: pilotage · Phase: phase-3 · Size: M · Priority: Medium
Stage: ⬜
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: SMI — Système de Management de l'Innovation (état de l'art, ISO 56002/56000)
Dépendances: EN38.1 (modèle SMI & moteur)
