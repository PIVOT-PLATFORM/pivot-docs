# US30.6.7 — IA : génération de compte-rendu d'atelier

**En tant que** utilisateur
**Je veux** générer par IA un compte-rendu structuré d'atelier (contexte, thèmes, décisions, actions) à partir du contenu du board
**Afin d'** éviter la ressaisie manuelle pénible des CR après chaque atelier

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un board d'atelier renseigné, when je demande la génération du compte-rendu, then l'IA produit un document structuré (thèmes, décisions, actions) éditable avant diffusion | ⬜ |
| Given un compte-rendu généré, when je l'exporte, then il est disponible dans un format bureautique réutilisable (Markdown / DOCX / PDF) | ⬜ |
| Error : given une entrée invalide ou une coupure réseau, system préserve les contributions et affiche un état cohérent | ⬜ |
| Security/Gouvernance : action journalisée, respect des droits d'accès et de la gouvernance IA (US30.6.4) | ⬜ |

---
Item Type: US · Parent: F30.6 · Module: collaboratif · Phase: phase-3 · Size: M · Priority: Medium
Stage: ⬜
Rôle: utilisateur-final
Source: Étude interne Klaxoon (EDF) 2026-07 · MoSCoW: Could · Lot: Lot 3 · Origine: Écart terrain (irritant + backlog cible)
Justification: Étude interne §2.4 (« rédaction des CR pénible ») / §3.7-8 (« IA d'assistance : génération de CR ») — complète US30.6.3 (synthèse en actions), qui n'extrait que les actions
Dépendances: US30.6.4 (gouvernance de l'IA)
