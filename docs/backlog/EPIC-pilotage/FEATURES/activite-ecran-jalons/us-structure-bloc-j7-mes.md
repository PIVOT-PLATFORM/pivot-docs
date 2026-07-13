# US18.19.7 — Structure du bloc J7 - Mise en Service (MES)

**En tant que** chef de projet (pilote d'activité)
**Je veux** un bloc J7 - MES décrivant la version, les sites et le type de déploiement
**Afin de** documenter la mise en service de l'activité

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un bloc J7 - Mise en Service (MES), when il s'affiche, then il présente « Type de jalon », « Date de passage », « Description de la version » (480 caractères) et « Site(s) de déploiement » (liste multi-sélection facultative) | ⬜ |
| Given le champ « Site(s) de déploiement », when je sélectionne un CNPE, then toutes ses tranches sont sélectionnées de façon transparente | ⬜ |
| Given le champ « Type de déploiement » (liste facultative), when je l'ouvre, then il propose : À définir, Bascule, Vague, Pilote (avec infobulles) | ⬜ |
| Given la case « Planning confirmé par le(s) site(s) », when le bloc s'affiche, then elle est décochée par défaut | ⬜ |
| Given le bloc J7 - MES, when j'agis dessus, then il propose les boutons « Supprimer » et « Modifier » | ⬜ |
| Error : given une description de version dépassant 480 caractères, system empêche la saisie au-delà de la limite | ⬜ |
| Security/Gouvernance : les actions du bloc J7 - MES restent soumises aux droits de l'utilisateur sur l'activité | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La construction du référentiel CNPE / tranches n'est pas couverte par cette US.

## Notes d'implémentation
- Bloc J7 - Mise en Service (MES) (module pilotage, onglet Jalon) : Description de la version (480 car.), Site(s) de déploiement (multi-sélection, CNPE → toutes tranches), Type de déploiement (À définir/Bascule/Vague/Pilote + infobulles), case « Planning confirmé par le(s) site(s) » décochée par défaut, boutons Supprimer/Modifier.

---
Item Type: US · Parent: F18.19 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: chef-de-projet
Source: SPEC_OPDN — B.16 Activité — écran Jalons
Dépendances: —
