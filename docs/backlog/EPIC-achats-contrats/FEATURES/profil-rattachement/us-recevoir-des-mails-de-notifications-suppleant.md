# US25.2.4 — Recevoir des mails de notifications en tant que suppléant

**En tant que** utilisateur de l'application Achats/Contrats
**Je veux** activer ou désactiver les notifications que je reçois en tant que suppléant
**Afin de** maîtriser le volume de mails liés à mes délégations de suppléance

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given mon profil, when j'active la coche de préférence « notifications suppléant », then je reçois les mails de notification relatifs à mes suppléances | ⬜ |
| Given la coche désactivée, when une DA me concerne en tant que suppléant, then je ne reçois pas de mail de notification de suppléant | ⬜ |
| Error : given un utilisateur qui n'est suppléant d'aucun valideur, when il modifie la coche, then aucune notification de suppléant ne lui est envoyée | ⬜ |
| Security/Gouvernance : la préférence ne pilote que les notifications de suppléance de l'utilisateur ; disponible pour P/V/CM/A (OUI/OUI/OUI/OUI) | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La désignation des suppléants (gérée dans le circuit de validation / administration).

## Notes d'implémentation
- Coche de préférence dans le profil pour (dés)activer les notifications de suppléant.
- Module WRAP/OPDN ; s'articule avec l'enabler Notifications e-mail.

---
Item Type: US · Parent: F25.2 · Module: pilotage · Phase: phase-3 · Size: XS · Priority: Medium
Stage: ⬜
Rôle: utilisateur-final
Source: SPEC_OPDN — B.2 Profil utilisateur & rattachement
Dépendances: —
