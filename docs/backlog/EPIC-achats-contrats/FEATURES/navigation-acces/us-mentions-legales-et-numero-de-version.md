# US25.1.9 — Mentions légales et numéro de version

**En tant que** utilisateur de l'application Achats/Contrats
**Je veux** accéder aux mentions légales et voir le numéro de version publiée
**Afin de** connaître le cadre légal et la version de l'application que j'utilise

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given l'interface de l'application, when je consulte le pied de page, then un texte « Mentions légales » cliquable est affiché | ⬜ |
| Given le texte « Mentions légales », when je clique dessus, then je suis redirigé vers les mentions légales de la Power App | ⬜ |
| Given l'interface de l'application, when je la consulte, then le numéro de version publiée est affiché | ⬜ |
| Error : given l'indisponibilité de la page des mentions légales, system affiche un message d'erreur sans quitter l'application | ⬜ |
| Security/Gouvernance : mentions légales et numéro de version consultables par tous les utilisateurs — P/V/CM/A (OUI/OUI/OUI/OUI) | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La rédaction du contenu des mentions légales.

## Notes d'implémentation
- Lien « Mentions légales » redirigeant vers les mentions légales de la Power App ; affichage du numéro de version publiée.
- Module WRAP/OPDN.

---
Item Type: US · Parent: F25.1 · Module: pilotage · Phase: phase-3 · Size: XS · Priority: Low
Stage: ⬜
Rôle: utilisateur-final
Source: SPEC_OPDN — B.1 Navigation générale & accès
Dépendances: —
