# US35.1.6 — Étiquettes et DLP sur tâches

**En tant que** DSI
**Je veux** appliquer des étiquettes de confidentialité au niveau tâche avec des actions DLP (blocage copie/export/impression) qui suivent la tâche partout
**Afin de** protéger les informations sensibles jusqu'au niveau le plus fin

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une tâche, when un utilisateur autorisé lui applique une étiquette de confidentialité, then l'étiquette et sa politique DLP associée (copie/export/impression autorisés ou non) s'attachent à la tâche et sont visibles dans toutes les vues qui l'affichent (planning, portefeuille, tableau, fiche détail) | ⬜ |
| Given une tâche étiquetée avec blocage export, when un utilisateur tente un export (PDF, Excel, API, copier-coller vers une autre application via le presse-papiers applicatif), then le contenu de la tâche est masqué ou l'export est refusé, quel que soit le point d'entrée utilisé | ⬜ |
| Error : given une action interdite par l'étiquette (copie, export, impression), system bloque l'action, affiche un message explicite à l'utilisateur et journalise la tentative (auteur, tâche, action, horodatage) | ⬜ |
| Error : given une tentative de retrait ou d'abaissement d'étiquette par un utilisateur non habilité, system refuse l'opération et journalise la tentative | ⬜ |
| Security : le mécanisme DLP est appliqué côté serveur au niveau de la génération des exports/impressions et de l'API — un contournement via appel direct à l'API ou capture d'écran applicative ne doit pas pouvoir contourner le blocage serveur (les limites de la capture d'écran système restent hors contrôle applicatif et sont documentées comme telles) | ⬜ |
| Security : seuls les rôles habilités (ex. DSI, propriétaire de la tâche) peuvent apposer, modifier ou retirer une étiquette de confidentialité ; toute pose/modification/retrait est tracé (auteur, ancienne/nouvelle étiquette, horodatage) et consultable en audit | ⬜ |
| A11y : l'indicateur visuel d'étiquette de confidentialité sur une tâche n'est pas porté uniquement par la couleur (icône + texte alternatif) et reste perceptible par lecteur d'écran, conformément WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Détection automatique de contenu sensible par analyse sémantique/NLP (classification assistée) — cette US couvre l'étiquetage manuel et l'application de la politique DLP, pas la détection automatique
- DLP au niveau réseau/poste de travail (agent DLP local, filtrage proxy) — hors périmètre applicatif, cette US couvre uniquement le DLP applicatif interne à Pivot
- Classification de portefeuille entier par niveau de sensibilité — couverte par US35.1.5 (Classification des portefeuilles), cette US porte sur l'étiquette au niveau tâche
- Chiffrement au repos spécifique aux tâches étiquetées (relève de la politique de sécurité infrastructure globale, non redéfinie ici)

## Notes d'implémentation
- L'étiquette doit être un attribut porté par la tâche dans `pivot-pilotage-core` (schéma Flyway `pilotage`) et propagé à toute vue/export qui la consomme (`pivot-pilotage-ui`, `@pivot/ui-core`) — éviter une logique DLP dupliquée par point d'export, centraliser la vérification de politique dans une couche partagée
- Le blocage DLP doit intercepter tous les chemins de sortie connus (export PDF/Excel, API REST directe, impression navigateur) ; capture d'écran système et copie manuelle de texte affiché restent des limites connues à documenter, pas à résoudre techniquement
- Le journal des tentatives bloquées peut réutiliser le format d'événement d'audit défini pour US35.1.4 (SSO et audit) afin d'unifier la traçabilité de gouvernance
- Item marqué "Différenciant MS" (Origine) dans le benchmark — vérifier au Gate 1 le niveau de fidélité attendu par rapport à Microsoft Purview avant de sur-designer une solution DLP complète

---
Item Type: US · Parent: F35.1 · Module: pilotage · Phase: phase-3 · Size: XL · Priority: Medium
Stage: ⬜
Source: PP-043 · MoSCoW: Could · Lot: Lot 3 · Origine: Différenciant MS
Profils: Grand groupe, Privée sous droit public, État
Justification: Dossier §6.3 : marqueur de conformité rare
Dépendances: —
