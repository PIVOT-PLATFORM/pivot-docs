# US25.2.5 — Recevoir des mails de validation finale en tant que prescripteur

**En tant que** acheteur informatique (prescripteur)
**Je veux** activer une préférence pour être notifié de la validation finale de mes DA
**Afin de** savoir quand une demande d'achat dont je suis prescripteur est définitivement validée

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given mon profil, when j'active la coche de préférence « validation finale prescripteur », then je recevrai la notification de validation finale des DA dont je suis prescripteur | ⬜ |
| Given la coche désactivée, when une de mes DA est validée en dernier ressort, then je ne reçois pas de mail de validation finale | ⬜ |
| Given la coche activée, when une DA dont je suis prescripteur atteint la validation finale, then je reçois le mail de notification correspondant | ⬜ |
| Error : given un utilisateur prescripteur d'aucune DA, when il active la coche, then aucune notification de validation finale ne lui est envoyée | ⬜ |
| Security/Gouvernance : la notification ne porte que sur les DA dont l'utilisateur est prescripteur ; préférence disponible pour P/V/CM/A (OUI/OUI/OUI/OUI) | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Le workflow de validation aboutissant à la validation finale (couvert par les US du circuit de validation).

## Notes d'implémentation
- Coche de préférence dans le profil pour recevoir la notification de validation finale des DA dont on est prescripteur.
- Module WRAP/OPDN ; s'articule avec l'enabler Notifications e-mail.

---
Item Type: US · Parent: F25.2 · Module: pilotage · Phase: phase-3 · Size: XS · Priority: Medium
Stage: ⬜
Rôle: acheteur-informatique
Source: SPEC_OPDN — B.2 Profil utilisateur & rattachement
Dépendances: —
