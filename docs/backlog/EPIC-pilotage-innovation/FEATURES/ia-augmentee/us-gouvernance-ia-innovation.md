# US38.11.6 — Gouvernance de l'IA d'innovation

**En tant que** DPO / responsable IA
**Je veux** **encadrer l'IA** du SMI : humain dans la boucle, traçabilité des appels, non-entraînement, non-biais, option souveraine, conformité RGPD/AI Act
**Afin de** innover avec l'IA de façon éthique et conforme

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given toute fonction IA du SMI, when elle est utilisée, then chaque appel est **tracé** (modèle, données, finalité) et **désactivable** par l'administrateur | ⬜ |
| Given les données d'idées/contributeurs, when l'IA les traite, then **non-entraînement contractualisé**, minimisation RGPD et **option modèle souverain/local** | ⬜ |
| Given un système à décision, when il est classé (AI Act), then l'explicabilité et le contrôle humain sont assurés | ⬜ |
| Error : given une fonction IA désactivée par l'administrateur, when un utilisateur ou un service tente de l'invoquer, then l'appel est bloqué avant tout envoi de données et une erreur explicite est retournée (pas d'appel silencieux au modèle) | ⬜ |
| Security : accès au panneau de gouvernance IA (activation/désactivation, consultation des traces d'appels) restreint aux rôles DPO/administrateur ; le registre d'appels IA est **immuable** (append-only) et exportable pour audit | ⬜ |
| A11y : le tableau de bord de gouvernance IA (registre des appels, statut par fonctionnalité) est navigable au clavier et restitué correctement par lecteur d'écran | ⬜ |

## Hors périmètre
- Implémentation technique du moteur IA lui-même (embeddings, LLM, graphe) — couvert par EN38.2
- Certification AI Act formelle / dépôt réglementaire (cette US assure les prérequis techniques : traçabilité, explicabilité, contrôle humain — pas la démarche de certification externe)
- Gouvernance IA hors du périmètre SMI (autres modules Pivot)

## Notes d'implémentation
- Cette US est transverse à toutes les autres US de F38.11 (assistant idéation, ponts entre idées, évaluation assistée, fail-fast, matchmaking IA) : chacune doit s'appuyer sur le registre d'appels et le flag de désactivation définis ici
- Le registre d'appels IA (modèle, données envoyées — ou hash/résumé si sensibles —, finalité, horodatage, utilisateur) doit être conçu dès EN38.2 pour éviter un retrofit
- Prévoir une classification AI Act par fonctionnalité IA (risque minimal / limité / élevé) documentée en amont de l'implémentation de chaque US F38.11

---
Item Type: US · Parent: F38.11 · Module: pilotage · Phase: phase-3 · Size: L · Priority: High
Stage: ⬜
Profils: Tous
Justification: SMI — fonctionnalités innovantes (IA gouvernée, intelligence collective, corporate venturing)
Dépendances: EN38.1 · EN38.2 (moteur IA & graphe)
