# E51 — Cockpits DSI

## Objectif

Rendre les **cockpits d'administration DSI** réels et utiles **dès aujourd'hui**, même quand les
modules fonctionnels sont encore WIP (work-in-progress) ou non activés. On construit d'abord
l'**ossature** (composant card, moteur de composition, shell, filtre d'accès) puis les **cards Socle
v0** branchées sur les briques déjà livrées, et on enregistre les cards des modules WIP avec un état
`module-wip` explicite — le cockpit se remplit au fur et à mesure que les modules mûrissent, sans
refonte.

Cet EPIC matérialise les specs [cockpits-dsi.md](pathname:///pivot-docs/specs/EPIC-shell-ux/cockpits-dsi)
(conseils UX/UI), [cockpits-dsi-bijection.md](pathname:///pivot-docs/specs/EPIC-shell-ux/cockpits-dsi-bijection)
(bijection profils ↔ cockpits + accès interne/externe + catalogue de cards).

## Principe « marche même si les modules sont WIP »

Le moteur de composition (EN51.2) assemble un cockpit à partir de : `archétype JTBD + rôle + module
activé + périmètre identité + sensibilité de la card`. Quand la brique de données d'une card n'est
pas prête, la card se rend en état **`module-wip`** (placeholder informatif, non-bloquant — même
famille que les pages « Bientôt disponible » du shell E16). Un cockpit est donc **toujours
composable** : il affiche les cards Socle réelles + les cards WIP en attente.

## Périmètre

### Enablers — ossature (EN51.1–51.9)

| Enabler | Rôle | Faisable |
| --- | --- | --- |
| [EN51.1 — Composant Card & états](ENABLERS/en-composant-card-etats.md) | Card design-system + états `loading`/`empty`/`error`/`no-permission`/**`module-wip`** | Maintenant |
| [EN51.2 — Moteur de composition](ENABLERS/en-moteur-composition.md) | Assemble le cockpit (rôle + module + périmètre + sensibilité) | Maintenant |
| [EN51.3 — Contrat du catalogue de cards](ENABLERS/en-contrat-catalogue-cards.md) | Registre machine-readable (sensibilité, visibilité, source) | Maintenant |
| [EN51.4 — Shell / hôte de cockpit](ENABLERS/en-shell-cockpit.md) | Page cockpit, layout par archétype, perso encadrée | Maintenant |
| [EN51.5 — Filtre d'accès interne/externe](ENABLERS/en-filtre-acces-interne-externe.md) | Scoping engagement, masquage 🔴, lecture seule, time-box, traçabilité | Maintenant |
| [EN51.6 — Couche de télémétrie d'usage](ENABLERS/en-telemetrie-usage.md) | Persiste les événements d'usage — **débloque 5-6 cards adoption/usage** | Levier n°1 |
| [EN51.7 — Endpoint lecture journal d'audit](ENABLERS/en-endpoint-lecture-audit.md) | API de lecture admin de `audit_events` | Maintenant |
| [EN51.8 — Intégration GitHub Code-Scanning](ENABLERS/en-integration-code-scanning.md) | Remonte alertes SARIF/Dependabot comme donnée | Maintenant |
| [EN51.9 — Agrégat portefeuille cross-projet](ENABLERS/en-agregat-portefeuille.md) | Consolidation multi-projets du pilotage | Maintenant |
| [EN51.10 — Interfaçage ITSM](ENABLERS/en-interfacage-itsm.md) | Connecteurs ITSM par tenant (ServiceNow…) : agrégats API / lien profond, PII hors PIVOT | Maintenant |

### Features — cards

- **F51.1 — Cards Socle v0** (données déjà exposées, faisables maintenant) :
  - [US51.1.1 — Card Identités & sessions](FEATURES/cards-socle/us-card-identites-sessions.md)
  - [US51.1.2 — Card Activation des domaines](FEATURES/cards-socle/us-card-activation-domaines.md)
  - [US51.1.3 — Card Santé de l'instance](FEATURES/cards-socle/us-card-sante-instance.md)
  - [US51.1.4 — Card Roadmap](FEATURES/cards-socle/us-card-roadmap.md)
- **F51.2 — Cards gouvernance v0** (après EN51.6–51.9) : Journal d'audit *(EN51.7)*, Correctifs de
  sécurité *(EN51.8)*, Santé du portefeuille *(EN51.9)*, Adoption globale *(EN51.6)*.
- **F51.3 — Cards modules WIP** (rendues `module-wip` jusqu'à livraison du module porteur) : Vélocité
  / Standups / Capacity *(agilité E10/E11 — cards **100% Équipe**, agrégat jamais individuel, cohérence
  RGPD)*, Usage whiteboard/live/quiz *(collaboratif + EN51.6)*, Budget / ROI vs SaaS *(E26)*, **Risques
  projet & portefeuille** *(pilotage E21)*, **Risques SSI** *(sécurité E43)*, Alertes SOC / PCA-PRA
  *(SOC non planifié)*, Incidents / Files de support / Changements *(via connecteur **ITSM du tenant**,
  EN51.10 — PII hors PIVOT)*, Catalogue & qualité données / Pipelines *(module données)*, **Conformité
  IA / AI Act** *(Assistant IA E48, intégration interne)*, Formation *(E41)*, Satisfaction NPS *(E46)*.

Les règles d'accès des identités externes (définition, OIDC fragment externe, scoping projets +
transverse) sont fixées par [ADR-028](pathname:///pivot-docs/adr/ADR-028-acces-identites-externes).

## Hors périmètre

- L'adaptation **par profil d'organisation** (E40, profil adaptatif) — le cockpit part d'un
  **archétype par défaut** (EN18.10, altitude fixe). E40 se greffera dessus (queue idéation).
- La construction des **modules fonctionnels** eux-mêmes (agilité, pilotage, collaboratif, données) —
  couverts par leurs EPICs respectifs. E51 ne fait que les **exposer** en cards quand ils sont prêts.

## Modules impactés

`core` (backend cockpit + endpoints), `pivot-ui` (shell), `pivot-design-system` (composant card).

## Dépendances

- Dépend de : E16 Shell & UX (navigation, pattern « coming soon »), E03 Système de modules (statut),
  E01 Auth & IAM (identité + périmètre), E04 Observabilité (santé), E06 Administration (gouvernance).
- Source de vérité UX/contrat : specs `EPIC-shell-ux/cockpits-dsi*.md`.

## Statut global

⬜ phase-3 · transverse — planifié en [Sprint 14](../sprints/sprint-14.md) (framework + cards Socle v0).
