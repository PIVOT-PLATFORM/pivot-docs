# US28.11.2 — Scaffolding self-service (golden path agnostique du SCM)

> Stub phase-3 — ACs à détailler par PO Agent lors de Gate 1 avant implémentation.
> Gap identifié par le benchmark plateforme développeur (`pivot-benchmarks/plateforme-developpeur/dossier-synthese-plateforme-developpeur.md` §5.2, §6/B3, §7.2, §8.1 — pivot-benchmarks#1) : E28 modélise aujourd'hui des adaptateurs vers l'existant (F28.1-F28.10), jamais un mécanisme de *création* de nouvelles entités conformes à un standard — capacité orthogonale au principe même d'E28, justifiant cette Feature dédiée.

**En tant que** développeur
**Je veux** créer un nouveau projet conforme aux standards de l'organisation depuis un formulaire self-service (« golden path » exécutable), quel que soit le SCM activé par mon instance
**Afin de** démarrer un nouveau composant en quelques minutes plutôt qu'en configurant manuellement dépôt, structure de fichiers, pipeline CI/CD et enregistrement catalogue

**Note** : périmètre initial = scaffolding de création (à la Backstage/Roadie), pensé pour évoluer vers des actions de cycle de vie complet à la Port (modification, dépréciation) sans réécriture — cf. dossier de synthèse §5.2. Contrainte spécifique PIVOT absente du marché analysé : le golden path doit rester agnostique du SCM choisi par l'instanciation (GitLab CE **ou** Forgejo, ADR-009 §5), aucun concurrent du panel n'ayant à résoudre cette coexistence.

## Critères d'acceptation (outline — Gate 1 PO Agent)

| Critère | 🤖 Dev |
|---------|--------|
| Un template de golden path paramétrable par formulaire est exécutable depuis le portail catalogue | ⬜ |
| L'exécution d'un template crée le dépôt (GitLab CE ou Forgejo selon l'instance, cf. F28.10), sa structure de fichiers, un pipeline CI/CD initial, et enregistre automatiquement l'entité résultante au catalogue | ⬜ |
| Un golden path de bout en bout (création → dépôt → pipeline → entité catalogue) se complète en moins de 10 minutes | ⬜ |
| Chaque exécution de template est journalisée (auteur, template, paramètres, horodatage) à des fins d'audit | ⬜ |
| Error : un template exécuté avec des paramètres invalides ou sur un SCM non activé par l'instance retourne une erreur explicite sans créer de ressource partielle | ⬜ |
| Security : les actions du scaffolder qui créent des ressources s'exécutent avec les permissions de l'utilisateur demandeur, jamais avec un compte de service à privilèges élevés non traçable | ⬜ |

## Hors périmètre (stub)

- Publication de templates internes par les équipes elles-mêmes (self-service de templates, EF-SCA-03 du cahier Backstage) — raffiné en Gate 1, hors socle minimal
- Exposition des actions du scaffolder comme outils invocables par un agent IA (registre d'actions type MCP, EF-SCA-05) — piste future, hors socle minimal
- Actions de cycle de vie complet (modification, dépréciation à la Port) — périmètre initial limité à la création, cf. Note ci-dessus

---
Item Type: US · Parent: F28.11 · Module: plateforme-developpeur · Phase: phase-3 · Size: XL · Priority: Medium
Stage: ⬜
Rôle: developpeur
Dépendances: EN28.3, F28.10
