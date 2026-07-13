# US30.8.5 — Export structuré des contenus

**En tant que** utilisateur
**Je veux** exporter les objets du board (pense-bêtes, catégories, votes, auteurs, cadres) dans un format de données structuré (CSV / XLSX / JSON)
**Afin de** réutiliser les productions d'atelier dans un tableur ou un outil de BI (Excel / Power BI) sans ressaisie manuelle

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un board avec pense-bêtes catégorisés et votes, when j'exporte en format structuré, then j'obtiens un fichier (CSV / XLSX / JSON) où chaque objet conserve son texte, sa catégorie/couleur, son cadre et son nombre de votes | ⬜ |
| Given un export structuré, when je l'ouvre dans un tableur, then les colonnes sont exploitables directement (pas d'image, pas de mise en forme à reconstruire) | ⬜ |
| Error : given une entrée invalide ou une coupure réseau, system préserve les contributions et affiche un état cohérent | ⬜ |
| Security/Gouvernance : export journalisé et respectant les droits d'accès du participant | ⬜ |

---
Item Type: US · Parent: F30.8 · Module: collaboratif · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: utilisateur-final
Source: Étude interne Klaxoon (EDF) 2026-07 · MoSCoW: Should · Lot: Lot 2 · Origine: Écart terrain (irritant majeur + backlog cible)
Justification: Étude interne §2.5 (« Export inexploitable → ressaisie manuelle ») / §3.7-6 — distinct de US30.8.3 (image/PDF), qui ne produit pas de données réutilisables ; condition de réversibilité (cf. US30.9.8)
Dépendances: —
