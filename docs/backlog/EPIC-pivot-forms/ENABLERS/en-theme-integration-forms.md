# EN42.1d — Thème & intégration

**Type d'enabler** : intégration

**Objectif technique** : Câbler le rendu d'un formulaire au **thème PIVOT** (consommation des
tokens `--pv-*` du design-system) et à l'**intégration embarquée** dans le portail, en
implémentant les capacités **Thème** et **Liens profonds** du contrat d'intégration à six
capacités (ADR-009). Un formulaire s'affiche avec l'identité visuelle PIVOT et peut être ouvert
en profondeur (deep-link) ou embarqué, sans que Forms gère l'authentification (SSO PIVOT) ni le
style à sa main.

**Justification** : L'adoption du form-builder passe par une intégration transparente dans le
portail : un formulaire doit hériter du thème PIVOT et s'embarquer/s'ouvrir par lien profond
comme n'importe quelle brique du contrat d'intégration ADR-009. Isoler cette couche protège le
cœur (schéma EN42.1a) de toute dépendance au design-system et concentre le respect d'ADR-009
(capacités Thème et Liens profonds) en un seul lot, sans toucher aux événements (EN42.1c).

**Hors-périmètre** :
- Modèle de formulaire et validation (EN42.1a)
- Logique conditionnelle et scoring (EN42.1b)
- Événements bus, API de réponses, webhooks (EN42.1c)
- **Identité** : le SSO PIVOT est consommé, jamais géré par Forms (ADR-009, capacité Identité —
  hors de cet enabler)
- Éditeur no-code visuel (US42.1.x) et personnalisation avancée du thème par formulaire au-delà
  des tokens `--pv-*`

**Critères de complétion** :
- [ ] Consommation des tokens `--pv-*` du design-system pour le rendu d'un formulaire (couleurs,
  typographie, espacements) — capacité **Thème** du contrat ADR-009
- [ ] Intégration embarquée d'un formulaire dans le portail (embed) respectant le thème hérité
- [ ] **Liens profonds** (deep-links) ouvrant « le formulaire X » directement, construits par
  identifiant logique — capacité **Liens profonds** du contrat ADR-009
- [ ] Aucun style codé en dur : le rendu dérive exclusivement des tokens du design-system, de sorte
  qu'un changement de thème PIVOT se propage sans modification de Forms
- [ ] Respect de l'isolation multi-tenant : un deep-link/embed ne donne accès qu'aux formulaires du
  tenant autorisé

**Critères d'acceptation (Given/When/Then)** :
- [ ] Given un formulaire publié et un thème PIVOT actif, when le formulaire est rendu, then ses
  couleurs/typographie dérivent des tokens `--pv-*` sans style codé en dur.
- [ ] Given un formulaire embarqué dans le portail, when la page hôte change de thème PIVOT, then le
  formulaire embarqué reflète le nouveau thème sans redéploiement de Forms.
- [ ] Given un identifiant de formulaire, when j'ouvre son deep-link depuis le portail, then je suis
  redirigé directement sur le formulaire par identifiant (capacité Liens profonds, ADR-009).
- [ ] Error case: given un deep-link/embed vers un formulaire inexistant ou dépublié, when il est
  résolu, then l'accès retourne `404` (jamais de fuite d'existence), sans rendu partiel.
- [ ] Security: un deep-link/embed vers un formulaire d'un autre tenant est traité comme inexistant
  (`404` non-membre/cross-tenant, jamais `403` révélateur d'existence) ; un membre sans le rôle
  requis pour ouvrir un formulaire restreint reçoit `403`.

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E42 · Module: forms · Phase: phase-3 · Size: M · Priority: Critical
Stage: ⬜
Justification: Thème PIVOT (tokens `--pv-*`) + intégration embarquée / liens profonds (capacités Thème & Liens profonds du contrat ADR-009) — issu de la décomposition d'EN42.1 XL
Dépendances: EN42.1a (schéma & validation de formulaire) · ADR-009 (contrat d'intégration) · @pivot/design-system
