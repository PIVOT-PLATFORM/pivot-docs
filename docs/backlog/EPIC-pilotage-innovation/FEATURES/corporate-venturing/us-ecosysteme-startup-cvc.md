# US38.13.4 — Lien écosystème start-up & CVC

**En tant que** responsable open innovation
**Je veux** connecter le SMI au **réseau start-up externe et au Corporate Venture Capital (CVC)** : deal flow, partenariats, prises de participation
**Afin de** capter l'innovation externe et l'articuler avec l'innovation interne

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un deal flow start-up, when il est qualifié, then opportunités, partenariats et prises de participation sont suivis et reliés aux axes stratégiques | ⬜ |
| Given une start-up partenaire, when la collaboration avance, then elle peut alimenter l'entonnoir interne (F38.3) ou une prise de participation | ⬜ |
| Error : given une prise de participation avec un montant ou une devise invalide, when elle est enregistrée, then la validation échoue et le dossier CVC n'est pas créé | ⬜ |
| Security : la création/consultation d'un dossier CVC (deal flow, participations) est réservée aux rôles habilités (responsable open innovation, COMEX) ; les montants d'investissement sont journalisés (accès + modifications) | ⬜ |

## Hors périmètre
- La gestion juridique complète du montage financier (pacte d'actionnaires, cap table détaillée, closing) : suivi uniquement, pas d'outillage juridique/notarial
- Le versement effectif de fonds (intégration bancaire/comptable) : hors périmètre, seul le suivi du dossier est couvert
- La découverte automatisée de start-ups (scouting) : couverte par US38.8.2 (veille & scouting technologique), pas ici

## Notes d'implémentation
- S'appuie sur EN38.1 (modèle SMI) pour relier le dossier CVC aux axes stratégiques et à l'entonnoir (F38.3) ; pas de FK inter-modules, liaison via bus PIVOT + deep-links (ADR-006/008)
- Le lien avec le spin-off/spin-in (US38.13.3) se fait quand une participation aboutit à une entité créée ou réintégrée
- Champs sensibles (montants, participations) à traiter avec le même niveau de confidentialité que les données financières du portefeuille (E23)

---
Item Type: US · Parent: F38.13 · Module: pilotage · Phase: phase-3 · Size: L · Priority: Low
Stage: Backlog
Profils: Grand groupe, Publique, État
Justification: SMI — fonctionnalités innovantes (IA gouvernée, intelligence collective, corporate venturing)
Dépendances: EN38.1 · EN38.2 (moteur IA & graphe)
