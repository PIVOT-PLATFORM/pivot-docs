# US25.5.9 — Export des données

**En tant que** utilisateur final
**Je veux** exporter les contrats sélectionnés au format Excel CSV
**Afin de** retravailler les données hors de l'application

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given des contrats sélectionnés, when j'ouvre le menu « 3 points » à droite de la barre de recherche et lance l'export, then un fichier au format Excel CSV est généré | ⬜ |
| Given le fichier CSV exporté, when je l'ouvre dans Excel, then il est à retravailler via Données → Fractionner le texte en colonnes → séparateur Virgule | ⬜ |
| Error : given aucun contrat sélectionné, system n'exporte pas et ne génère pas de fichier | ⬜ |
| Security/Gouvernance : fonction disponible pour tous les rôles (P/V/CM/A) sur les contrats de leur périmètre (OUI/OUI/OUI/OUI) | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La sélection multiple par coches est couverte par l'US Coches pour la sélection multiple de contrats.

## Notes d'implémentation
- Écran d'accueil des contrats (module OPDN, B.5), action d'export dans le menu « 3 points » à droite de la barre de recherche.
- Format Excel CSV séparé par virgule ; retravail Excel : Données → Fractionner le texte en colonnes → Virgule.

---
Item Type: US · Parent: F25.5 · Module: pilotage · Phase: phase-3 · Size: S · Priority: Medium
Stage: ⬜
Rôle: utilisateur-final
Source: SPEC_OPDN — B.5 Contrats — écran d'accueil
Dépendances: —
