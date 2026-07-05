# US42.7.1 — Formulaire = entité gouvernée

**En tant que** DSI
**Je veux** que chaque formulaire soit déclaré au catalogue PIVOT avec un propriétaire, une classification de sensibilité des données collectées et un cycle de vie
**Afin de** savoir en permanence qui est responsable de quel formulaire et quelles données il traite

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given la création d'un formulaire, when il est publié, then il porte obligatoirement un propriétaire et une classification de sensibilité (ex. public/interne/sensible) — la publication est bloquée tant que ces champs ne sont pas renseignés | ⬜ |
| Given un formulaire classifié « sensible », when il est consulté au catalogue, then sa classification et son propriétaire sont visibles par les rôles de gouvernance (DSI, DPO, RSSI) sans accès aux réponses elles-mêmes | ⬜ |
| Error : given un formulaire dont le propriétaire quitte l'organisation ou perd ses droits, when le formulaire reste actif, then il est signalé comme orphelin au catalogue plutôt que de rester silencieusement sans responsable | ⬜ |
| Security : la classification de sensibilité conditionne les capacités disponibles ailleurs dans Forms (ex. un formulaire « sensible » ne peut pas activer la synthèse IA, US42.6.2, sans dérogation explicite) | ⬜ |

## Hors périmètre

- Workflow d'approbation multi-niveaux avant publication (au-delà de la vérification propriétaire/classification) — hors périmètre de cette itération

## Notes d'implémentation

- Priorité relevée à **Critical** (initialement High) : les autres US de F42.7 (consentement, rétention, anti-spam) présupposent cette classification pour s'appliquer correctement — c'est le socle du reste de la gouvernance du module
- S'inscrit au catalogue PIVOT comme les autres entités du contrat d'intégration (ADR-009) — cohérent avec le principe « pas de FK inter-modules » (ADR-006), le propriétaire est référencé par identifiant logique

---
Item Type: US · Parent: F42.7 · Module: forms · Phase: phase-3 · Size: L · Priority: Critical
Stage: Backlog
Source: FRM-701 · MoSCoW: Must · Origine: Vide de marché + catalogue PIVOT
Justification: Benchmark formulaires (Typeform/Jotform/Tally/Formbricks/Qualtrics/Google) — recentré PIVOT
Dépendances: EN42.1 (moteur & schéma de formulaire)
