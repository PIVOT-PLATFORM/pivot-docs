# US30.13.2 — Tableau de bord des quotas

**En tant que** administrateur
**Je veux** consulter un tableau de bord des quotas (participants, fichiers, crédits IA) avec alertes avant plafond
**Afin de** éviter tout blocage inattendu en pleine réunion

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given le canevas de collaboration, when l'administrateur consulte la consommation des quotas et reçoit une alerte avant plafond, then le résultat est visible et persistant pour tous les participants | ⬜ |
| Fichiers | ⬜ |
| Error : given une entrée invalide ou une coupure réseau, system préserve les contributions et affiche un état cohérent | ⬜ |
| Security/Gouvernance : action journalisée et respectant les droits d'accès du participant | ⬜ |

---
Item Type: US · Parent: F30.13 · Module: collaboratif · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: administrateur-plateforme
Source: BL-051 · MoSCoW: Must · Lot: Lot 2 · Origine: Insight I3 + limites Klaxoon/FigJam
Justification: Dossier §8-I3 : quota = risque opérationnel (blocage en réunion)
Dépendances: —
