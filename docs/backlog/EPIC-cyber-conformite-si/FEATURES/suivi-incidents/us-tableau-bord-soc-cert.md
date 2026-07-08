# US53.2.1 — Tableau de bord SOC/CERT

**En tant que** RSSI Groupe
**Je veux** un tableau de bord de synthèse des incidents remontés par le SOC/CERT du client
**Afin de** disposer d'une vision consolidée de la sinistralité cyber du Groupe sans dupliquer l'outillage SOC/SIEM existant

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given des incidents remontés par le SOC/CERT du client (import ou saisie de synthèse), when le RSSI consulte le tableau de bord, then il voit les incidents agrégés par gravité, statut et DSI métier concernée | ⬜ |
| Given un incident critique non résolu au-delà d'un délai attendu, when le RSSI consulte le tableau de bord, then l'incident est signalé visuellement comme en dépassement de délai de traitement | ⬜ |
| Given une période donnée, when le RSSI consulte les tendances, then le tableau de bord affiche l'évolution du nombre d'incidents par gravité sur la période | ⬜ |
| Error : given une tentative d'enregistrer un incident sans gravité ni DSI métier associée, system rejette la saisie et indique les champs obligatoires manquants | ⬜ |
| Security : la consultation des incidents respecte le périmètre de visibilité de l'utilisateur — une DSI métier ne voit que les incidents la concernant, seul le RSSI Groupe a une vue consolidée transverse | ⬜ |
| Security : l'historique de traitement d'un incident (création, changement de statut, clôture) est conservé et attribué à son auteur pour audit | ⬜ |
| A11y : le tableau de bord (indicateurs de gravité, graphiques de tendance) est conforme WCAG 2.1 AA — la gravité n'est pas portée uniquement par la couleur, les graphiques restent accessibles via une alternative textuelle/tabulaire | ⬜ |

## Hors périmètre
- L'implémentation d'un SOC/SIEM/PAM technique — hors périmètre PPM, cette US ne couvre que le reporting/la gouvernance
- La détection, la corrélation ou l'investigation technique des incidents (fonctions natives d'un SIEM/SOAR) — cette US couvre l'agrégation et le reporting de synthèse d'incidents déjà qualifiés par le SOC/CERT du client, pas leur détection
- L'intégration technique temps réel avec un SIEM tiers (connecteur API, flux d'événements bruts) — le mécanisme d'alimentation du tableau de bord (import, saisie manuelle, API) est à cadrer avec le client au Gate 1

## Notes d'implémentation
- L'entité "incident" est un objet de synthèse (résumé, gravité, statut, DSI métier concernée, dates), pas un flux d'événements bruts de type SIEM — l'alimentation initiale peut être un import périodique ou une saisie manuelle par le RSSI/référents sécurité
- Le rattachement d'un incident à une DSI métier s'appuie sur le référentiel organisationnel d'E49 (EN49.1)
- Prévoir l'émission d'un événement sur le bus PIVOT à la création/clôture d'un incident critique, pour permettre à d'autres modules (notifications, activité) de s'y abonner sans couplage direct

---
Item Type: US · Parent: F53.2 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: Backlog
Dépendances: —
