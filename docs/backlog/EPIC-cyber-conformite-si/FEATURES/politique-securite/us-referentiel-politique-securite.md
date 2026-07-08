# US53.1.1 — Référentiel de politique de sécurité Groupe

**En tant que** RSSI Groupe
**Je veux** publier un référentiel de politique de sécurité opposable à toutes les DSI métier et suivre son adoption
**Afin de** garantir une politique de sécurité unique et cohérente à l'échelle du Groupe (exigence critique pour un OIV)

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une politique de sécurité Groupe publiée (référentiel versionné), when le RSSI la diffuse aux DSI métier, then chaque DSI métier dispose d'un statut d'adhésion (conforme / non conforme / en cours) visible dans le référentiel | ⬜ |
| Given une DSI métier ne pouvant pas appliquer une clause de la politique, when elle déclare une dérogation, then la dérogation est enregistrée avec motif, périmètre et durée, et reste rattachée à la clause concernée pour audit ultérieur | ⬜ |
| Given une politique mise à jour (nouvelle version), when la nouvelle version est publiée, then les statuts d'adhésion des DSI métier repassent à "à réévaluer" et ne restent pas conformes par défaut sur l'ancienne version | ⬜ |
| Error : given une tentative de déclarer une dérogation sans motif ni durée, system rejette la déclaration et indique les champs obligatoires manquants | ⬜ |
| Security : seuls le RSSI Groupe et les référents sécurité de chaque DSI métier habilités peuvent modifier le statut d'adhésion ou déclarer une dérogation pour leur périmètre — une DSI métier ne peut pas modifier le statut d'une autre | ⬜ |
| Security : l'historique complet des versions de la politique, des changements de statut d'adhésion et des dérogations est conservé et attribué à son auteur, pour permettre un audit de conformité OIV | ⬜ |
| A11y : le référentiel (liste de clauses, statuts d'adhésion, dérogations) est conforme WCAG 2.1 AA — le statut n'est pas porté uniquement par la couleur | ⬜ |

## Hors périmètre
- L'implémentation d'un SOC/SIEM/PAM technique — hors périmètre PPM, cette US ne couvre que le reporting/la gouvernance
- La rédaction du contenu de la politique de sécurité elle-même (clauses, référentiel normatif ISO 27001/EBIOS RM…) — cette US porte l'outil de publication/suivi d'adoption, pas la production du contenu réglementaire, à cadrer avec le client au Gate 1
- La notification automatique des DSI métier lors d'une mise à jour de politique — cette US couvre le changement de statut, pas un système de notification proactif

## Notes d'implémentation
- Le référentiel de politique et les statuts d'adhésion par DSI métier s'appuient sur la hiérarchie organisationnelle définie par E49 (référentiel organisationnel, EN49.1) pour identifier les DSI métier concernées
- Le rôle RSSI est celui défini par [E49 — Organisation & gouvernance DSI](../../../EPIC-organisation-gouvernance-dsi/README.md) (**EN49.2 — Modèle de rôles & RACI**) — ne pas redéfinir ce rôle ici
- Prévoir une entité versionnée pour la politique (chaque publication crée une nouvelle version, jamais d'édition en place d'une version déjà diffusée) afin de garantir la traçabilité exigée par un contexte OIV

---
Item Type: US · Parent: F53.1 · Module: pilotage · Phase: phase-3 · Size: M · Priority: Critical
Stage: Backlog
Dépendances: EN49.2 (rôle RSSI, référentiel de rôles partagé)
