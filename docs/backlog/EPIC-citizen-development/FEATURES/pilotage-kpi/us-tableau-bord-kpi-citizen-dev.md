# US52.4.1 — Tableau de bord des KPI Citizen Dev

**En tant que** DSI Groupe/Architecture
**Je veux** un tableau de bord consolidé des indicateurs de pilotage du citizen development, toutes plateformes confondues
**Afin de** mesurer la maîtrise du parc citizen dev et arbitrer les priorités de gouvernance (dette organisationnelle, sécurité, délais)

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given le registre transverse (US52.1.1), when le tableau de bord est affiché, then il présente le nombre d'applications actives par niveau de risque (vert/orange/rouge) | ⬜ |
| Given le registre transverse, when le tableau de bord calcule la dette organisationnelle, then il affiche le taux d'applications sans propriétaire identifié | ⬜ |
| Given le catalogue de gabarits (US52.3.1), when le tableau de bord est affiché, then il présente le taux de réutilisation des gabarits CoE parmi les applications déclarées | ⬜ |
| Given les incidents de sécurité liés au low-code remontés par les modules citizen dev, when le tableau de bord est affiché, then il présente le nombre d'incidents sur la période sélectionnée | ⬜ |
| Given le cycle de vie des applications (US52.2.1/US52.2.2), when le tableau de bord est affiché, then il présente le délai moyen entre déclaration d'intention (idéation) et mise en production | ⬜ |
| Given les bascules vers l'IT classique (US52.2.3), when le tableau de bord est affiché, then il présente le taux de bascule réussie vers l'IT classique parmi les applications concernées | ⬜ |
| Error : given une période sélectionnée sans données disponibles, system affiche un état vide explicite plutôt qu'une erreur ou un graphique incohérent | ⬜ |
| Security : l'accès au tableau de bord est restreint aux rôles CoE Citizen Dev, DSI Groupe/Architecture et RSSI (matrice RACI EN49.2, domaine « Citizen Development ») | ⬜ |
| A11y : chaque indicateur graphique dispose d'une alternative textuelle/tabulaire, contraste conforme WCAG 2.1 AA, navigation clavier complète | ⬜ |

## Hors périmètre

- La définition de seuils d'alerte automatiques sur les KPI (ex. seuil de taux d'apps sans propriétaire déclenchant une action) — amélioration future, non couverte ici.
- Les KPI propres à un seul module (ex. KPI internes Workflows) — restent dans le module d'origine ; seuls les agrégats transverses figurent ici.

## Notes d'implémentation

Vues agrégées calculées à partir des entités `CitizenApp` (US52.1.1) et `CoeTemplate`
(US52.3.1) : requêtes d'agrégation par `risk_level`, `owner_id IS NULL`, historique des
transitions de `lifecycle_status` (pour le délai idéation → production et le taux de bascule).
KPI incidents de sécurité alimenté par un événement standard remonté par chaque module citizen dev
(contrat d'intégration à définir avec E29 et futurs modules).

---
Item Type: US · Parent: F52.4 · Module: pilotage · Phase: phase-3 · Size: M · Priority: Medium
Stage: Backlog
Dépendances: US52.1.1 (registre transverse) · US52.2.1, US52.2.2, US52.2.3 (cycle de vie, source des délais et bascules) · US52.3.1 (catalogue de gabarits, source du taux de réutilisation) · EN49.2 (rôles CoE/DSI Groupe/RSSI)
