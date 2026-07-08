# US50.2.1 — Workflow du comité d'architecture

**En tant qu'** Architecte / DSI Groupe
**Je veux** instruire une décision du comité d'architecture (adoption d'une nouvelle technologie, dérogation à un standard)
**Afin de** garantir la conformité aux standards d'architecture du Groupe et tracer les décisions prises

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une demande d'adoption de nouvelle techno ou de dérogation à un standard, when elle est soumise au comité d'architecture, then elle est enregistrée avec un statut (soumise / en instruction / décidée) | ⬜ |
| Given une décision du comité, when elle est rendue (approuvée / rejetée / approuvée sous conditions), then elle est tracée avec sa motivation et rattachée à l'application ou au projet concerné | ⬜ |
| Error : given une demande soumise sans porteur identifié, system refuse la soumission | ⬜ |
| Security : seuls les membres du comité d'architecture (rôle Architecte, RACI défini au niveau Groupe) peuvent rendre une décision ; la soumission d'une demande reste ouverte à un périmètre de rôles plus large | ⬜ |
| A11y : l'interface de soumission et de consultation des décisions est conforme WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Le tableau de bord de conformité continue alimenté par des contrôles automatisés en CI/CD est fourni par E49/F49.2 (Architecture as Code) — cette US ne duplique pas ce tableau de bord, elle peut s'appuyer sur son résultat comme signal déclencheur d'une instruction.
- L'automatisation des contrôles techniques (CI/CD, scans de conformité) n'est pas dans le périmètre de cette US, qui ne couvre que le workflow de décision humaine du comité.

## Notes d'implémentation
- Les rôles du comité (Architecte, DSI Groupe) et la matrice RACI associée sont portés par **EN49.2** ([E49](../../../EPIC-organisation-gouvernance-dsi/README.md)) — ne pas redéfinir de rôles ad hoc dans cette US, réutiliser le contrat EN49.2.
- Peut consommer en entrée le tableau de bord de conformité continue d'**E49/F49.2** (US49.2.2 — conformité Architecture as Code) comme signal déclencheur d'une instruction, sans dupliquer ce contrôle.
- Une décision peut se rattacher à une application cartographiée par [US50.1.1](../cartographie-applicative/us-inventaire-applications.md).

---
Item Type: US · Parent: F50.2 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: Backlog
Dépendances: EN49.2 (rôles/RACI comité d'architecture), E49/F49.2 (tableau de bord de conformité continue, en entrée uniquement), US50.1.1 (rattachement application)
