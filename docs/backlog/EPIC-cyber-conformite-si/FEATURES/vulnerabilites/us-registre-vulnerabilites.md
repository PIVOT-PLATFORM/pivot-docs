# US53.3.1 — Registre de vulnérabilités

**En tant que** RSSI Groupe
**Je veux** un registre des vulnérabilités connues par application/domaine avec statut de remédiation et priorisation
**Afin de** piloter la réduction du risque cyber du SI à l'échelle du Groupe

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une application cartographiée dans le référentiel applicatif, when une vulnérabilité connue lui est rattachée, then elle apparaît dans le registre avec sévérité, statut de remédiation (ouverte / en cours / corrigée / acceptée) et priorité | ⬜ |
| Given plusieurs vulnérabilités ouvertes sur des applications de sévérité et criticité différentes, when le RSSI consulte le registre, then il peut trier/filtrer par sévérité, priorité et domaine applicatif pour prioriser la remédiation | ⬜ |
| Given une vulnérabilité marquée "acceptée" (risque résiduel accepté), when elle est consultée, then le registre affiche le motif d'acceptation et son auteur | ⬜ |
| Error : given une tentative de rattacher une vulnérabilité à une application absente du référentiel applicatif, system rejette le rattachement et indique que l'application doit d'abord être inventoriée | ⬜ |
| Security : la consultation et la modification du registre respectent le périmètre de visibilité — seuls le RSSI Groupe et les référents sécurité habilités pour le domaine applicatif concerné peuvent modifier le statut de remédiation | ⬜ |
| Security : l'historique des changements de statut (découverte, remédiation, acceptation) est conservé et attribué à son auteur, pour permettre un audit de la gestion des vulnérabilités | ⬜ |
| A11y : le registre (tableau de vulnérabilités, indicateurs de sévérité/priorité) est conforme WCAG 2.1 AA — la sévérité n'est pas portée uniquement par la couleur et le tableau est navigable au clavier | ⬜ |

## Hors périmètre
- L'implémentation d'un SOC/SIEM/PAM technique — hors périmètre PPM, cette US ne couvre que le reporting/la gouvernance
- Les outils de scan de vulnérabilités eux-mêmes (SAST/DAST/SCA, security gates CI/CD) — cette US couvre le registre de suivi/priorisation des vulnérabilités déjà détectées, pas leur détection technique
- La correction technique des vulnérabilités (patch, remédiation applicative) — hors périmètre PPM, cette US suit le statut de remédiation, ne l'exécute pas

## Notes d'implémentation
- Le rattachement vulnérabilité → application dépend du référentiel applicatif Groupe porté par [E50 — Architecture d'entreprise & urbanisation](../../../EPIC-architecture-entreprise/README.md) (**US50.1.1 — Inventaire des applications**) — une vulnérabilité ne peut être enregistrée que rattachée à une application déjà cartographiée dans ce référentiel (cf. AC Error)
- L'alimentation du registre (import depuis un outil de scan tiers, saisie manuelle) est à cadrer avec le client au Gate 1 — cette US porte le mécanisme de suivi/priorisation, pas le connecteur d'ingestion
- Le modèle de priorisation (sévérité × criticité applicative × exposition) peut réutiliser la logique de classification déjà utilisée par le référentiel applicatif d'E50, à confirmer au Gate 1

---
Item Type: US · Parent: F53.3 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: Backlog
Dépendances: US50.1.1 (registre applicatif — rattachement des vulnérabilités par application)
