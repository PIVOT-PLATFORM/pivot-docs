# US38.8.1 — Partenaires, startups & appels à projets

**En tant que** responsable open innovation
**Je veux** gérer l'**open innovation** : partenaires, **startups**, laboratoires, **appels à projets** et suivi des collaborations
**Afin de** innover avec l'écosystème externe, pas seulement en interne

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un besoin, when je lance un appel à projets, then candidatures externes, évaluation et sélection sont outillées | ⬜ |
| Given un partenaire/startup, when la collaboration démarre, then contrat, jalons et livrables sont suivis | ⬜ |
| Error : given un appel à projets dont la date de clôture est dépassée, when une candidature externe tente d'être soumise, then elle est refusée avec un message explicite | ⬜ |
| Security : un candidat externe ne peut consulter que sa propre candidature (jamais celles des autres candidats) ; l'évaluation et la sélection restent visibles uniquement par les rôles internes habilités (responsable open innovation, évaluateurs désignés) | ⬜ |

## Hors périmètre
- La veille et le scouting technologique en amont de l'appel à projets : couverts par US38.8.2
- Les hackathons et challenges ouverts à l'écosystème : couverts par US38.8.3
- La gestion contractuelle juridique complète (signature électronique, clauses) : hors périmètre, seul le suivi de statut/jalons/livrables du contrat est couvert, pas sa rédaction

## Notes d'implémentation
- Les candidatures externes impliquent un accès pour des utilisateurs hors organisation (startups, partenaires) — a minima un dépôt de candidature sans compte complet dans l'organisation, à définir en cohérence avec le modèle d'accès externe du SMI (EN38.1)
- Le suivi de collaboration (contrat, jalons, livrables) doit rester relié au partenaire pour permettre l'agrégation dans les KPIs de l'écosystème (F38.9)
- S'appuie sur le modèle SMI d'EN38.1 ; distinct de F38.15 (formulaires Forms) pour le dépôt d'idée interne — ici la candidature est externe et porte sur un appel à projets, pas un dépôt d'idée classique

---
Item Type: US · Parent: F38.8 · Module: pilotage · Phase: phase-3 · Size: L · Priority: Medium
Stage: Backlog
Profils: Grand groupe, Publique, État
Justification: SMI — Système de Management de l'Innovation (état de l'art, ISO 56002/56000)
Dépendances: EN38.1 (modèle SMI & moteur)
