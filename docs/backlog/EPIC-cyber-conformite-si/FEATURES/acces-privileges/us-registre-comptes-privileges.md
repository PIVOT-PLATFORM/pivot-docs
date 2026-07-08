# US53.4.1 — Registre des comptes à privilèges

**En tant que** RSSI Groupe
**Je veux** un registre de gouvernance des comptes à privilèges déclarés par système
**Afin de** suivre et auditer les accès à privilèges du Groupe sans réimplémenter une solution PAM technique

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un système du SI Groupe, when un référent sécurité déclare un compte à privilèges sur ce système (titulaire, périmètre d'accès, date d'attribution), then le compte apparaît dans le registre rattaché à ce système | ⬜ |
| Given un compte à privilèges déclaré, when sa date de revue périodique est échue, then le registre le signale comme "revue requise" jusqu'à ce qu'un référent sécurité confirme le maintien ou révoque l'accès | ⬜ |
| Given un compte à privilèges révoqué, when il est consulté, then le registre affiche la date et le motif de révocation, et le compte reste visible dans l'historique (pas de suppression) | ⬜ |
| Error : given une tentative de déclarer un compte à privilèges sans système ni titulaire associé, system rejette la déclaration et indique les champs obligatoires manquants | ⬜ |
| Security : seuls le RSSI Groupe et les référents sécurité habilités pour le système concerné peuvent déclarer, modifier ou révoquer un compte à privilèges dans le registre | ⬜ |
| Security : l'historique complet des déclarations, revues et révocations est conservé et attribué à son auteur, pour permettre un audit des accès à privilèges (traçabilité exigée en contexte OIV) | ⬜ |
| A11y : le registre (liste de comptes, statuts de revue) est conforme WCAG 2.1 AA — le statut n'est pas porté uniquement par la couleur et la liste est navigable au clavier | ⬜ |

## Hors périmètre
- L'implémentation d'un SOC/SIEM/PAM technique — hors périmètre PPM, cette US ne couvre que le reporting/la gouvernance
- La solution PAM technique elle-même (coffre-fort de mots de passe, rotation automatique des secrets, enregistrement de session privilégiée) — cette US porte le registre déclaratif de gouvernance des comptes à privilèges, pas l'outil PAM qui les gère techniquement
- La synchronisation automatique en temps réel avec un outil PAM/IAM tiers — le mécanisme d'alimentation du registre (déclaration manuelle, import périodique) est à cadrer avec le client au Gate 1

## Notes d'implémentation
- Le registre est déclaratif au niveau gouvernance : il documente/audite l'existence et le cycle de vie des comptes à privilèges, il ne les gère pas techniquement (pas de connexion à un coffre-fort de secrets ou à un annuaire — cf. E43 EN43.6 pour la gestion technique des secrets côté plateforme PIVOT elle-même, hors périmètre de cette US)
- Le rattachement d'un compte à privilèges à un système peut réutiliser, si pertinent, le référentiel applicatif d'E50 (US50.1.1) lorsque le système concerné est une application déjà cartographiée — à confirmer au Gate 1
- Prévoir une échéance de revue périodique paramétrable par système (ex. tous les 90 jours) pour déclencher le statut "revue requise" (cf. AC)

---
Item Type: US · Parent: F53.4 · Module: pilotage · Phase: phase-3 · Size: S · Priority: High
Stage: Backlog
Dépendances: —
