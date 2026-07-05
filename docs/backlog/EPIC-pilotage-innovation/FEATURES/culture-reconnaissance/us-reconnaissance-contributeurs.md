# US38.10.2 — Reconnaissance des contributeurs

**En tant que** responsable innovation
**Je veux** **reconnaître** les contributeurs (kudos, récompenses, mise en avant des idées adoptées)
**Afin de** entretenir la motivation et le flux d'idées

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une idée adoptée, when elle avance, then ses contributeurs sont crédités et reconnus | ⬜ |
| Given une récompense, when elle est attribuée, then elle respecte les règles internes (équité, RGPD) | ⬜ |
| Error : given une idée dont un contributeur a été retiré (ex. quitte l'équipe/organisation), when la reconnaissance est affichée, then l'historique de contribution reste correct sans bloquer l'affichage de la mise en avant de l'idée | ⬜ |
| Security : seul un rôle habilité (responsable innovation) peut attribuer une récompense ; le contributeur reconnu peut consulter et, le cas échéant, masquer sa mise en avant publique (contrôle sur l'exposition de sa contribution) | ⬜ |

## Hors périmètre
- La gamification générale (badges de progression, classements) : couverte par US38.10.1, cette US porte sur la reconnaissance ciblée liée à une idée/contribution précise
- La définition du barème ou du montant des récompenses matérielles : hors périmètre, cette US trace l'attribution et le crédit, pas la politique de récompense elle-même
- Le calcul automatique de la part de contribution entre plusieurs co-contributeurs d'une même idée n'est pas couvert (attribution manuelle/déclarative)

## Notes d'implémentation
- Le crédit de contribution doit rester attaché à l'idée dans l'entonnoir (F38.3) pour que la mise en avant suive l'idée à mesure qu'elle progresse (concept → POC → projet)
- Prévoir la possibilité de reconnaître plusieurs contributeurs sur une même idée (co-création), pas uniquement un auteur unique
- S'appuie sur le modèle SMI d'EN38.1 ; complémentaire à US38.10.1 mais distinct (reconnaissance ciblée vs gamification globale)

---
Item Type: US · Parent: F38.10 · Module: pilotage · Phase: phase-3 · Size: S · Priority: Low
Stage: Backlog
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: SMI — Système de Management de l'Innovation (état de l'art, ISO 56002/56000)
Dépendances: EN38.1 (modèle SMI & moteur)
