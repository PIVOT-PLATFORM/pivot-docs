# US52.1.1 — Registre des applications citoyennes

**En tant que** CoE Citizen Dev (rôle CoE — [EN49.2](../../../EPIC-organisation-gouvernance-dsi/ENABLERS/en-modele-roles-raci.md))
**Je veux** un registre transverse recensant toutes les applications citoyennes de PIVOT, toutes
plateformes et tous modules confondus (Workflows, Pivot Forms, whiteboard/collaboration, futurs
constructeurs no-code), avec leur niveau de risque, leur propriétaire et leur statut de cycle de vie
**Afin de** disposer d'une vision consolidée du parc citizen dev et de lutter contre le shadow IT non maîtrisé

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une application citizen dev créée sur n'importe quelle plateforme/module (Workflows, Pivot Forms, whiteboard, autre), when elle est déclarée, then une entrée est créée dans le registre transverse avec au minimum : plateforme d'origine, module, niveau de risque, propriétaire, statut de cycle de vie | ⬜ |
| Given le registre, when un CoE Citizen Dev ou un DSI Groupe/Architecture le consulte, then il peut filtrer/trier par plateforme, module, niveau de risque, statut de cycle de vie et propriétaire | ⬜ |
| Given une US ou un module référençant déjà un inventaire module-spécifique (ex. US29.7.6 — inventaire des workflows), when ce module est intégré au registre transverse, then il alimente ce registre par contrat plutôt que de maintenir un inventaire isolé et divergent | ⬜ |
| Error : given une application déclarée sans propriétaire identifié, system refuse la création de l'entrée et retourne une erreur de validation explicite | ⬜ |
| Security : l'accès en lecture/écriture au registre est restreint aux rôles CoE Citizen Dev, DSI Groupe/Architecture et RSSI (matrice RACI EN49.2, domaine « Citizen Development ») ; toute consultation est tracée | ⬜ |
| A11y : le tableau du registre est navigable au clavier, les filtres sont annoncés par lecteur d'écran, contraste conforme WCAG 2.1 AA | ⬜ |

## Hors périmètre

- La saisie détaillée propre à chaque plateforme (ex. modélisation fine d'un workflow) — reste dans le module d'origine (E29 pour Workflows, etc.), qui alimente ce registre via son propre contrat d'intégration.
- La définition des rôles et de la matrice RACI — portée par EN49.2, non redéfinie ici.

## Notes d'implémentation

Entité `CitizenApp` (schéma `pilotage`) : `platform`, `module`, `owner_id` (FK → `public.users.id`
via contrat cross-schéma, cf. ADR-006), `risk_level` (vert/orange/rouge), `lifecycle_status`
(idéation/développement/production/exploitation/revue/décommissionné). Contrat d'intégration
exposé pour que E29 (et futurs modules citizen dev) synchronisent leurs propres entrées plutôt que
de dupliquer le modèle de données.

---
Item Type: US · Parent: F52.1 · Module: pilotage · Phase: phase-3 · Size: L · Priority: High
Stage: Backlog
Dépendances: EN49.2 (rôles CoE Citizen Dev, DSI Groupe/Architecture, RSSI) · US29.7.6 (inventaire workflows — module source à intégrer) · E01 (identification du propriétaire) · E15 (rattachement du propriétaire à une équipe)
