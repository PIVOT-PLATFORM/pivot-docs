# EN42.1a — Schéma & validation de formulaire

**Type d'enabler** : architecture

**Objectif technique** : Poser le socle du form-builder : le **modèle de formulaire** et le
**contrat de schéma** consommés par tout le reste du module Forms, ainsi que la **validation
serveur** des saisies. Aucune logique conditionnelle, aucun calcul (relève d'EN42.1b), aucun
événement ni webhook (relève d'EN42.1c), aucun thème (relève d'EN42.1d).

Entités (schéma `forms`, Flyway ; FK → `public.teams.id`) :

```text
Form (titre, i18n, statut brouillon/publié, propriétaire, tenant)
   ├─< Page (ordre, titre)
   │     └─< Section (ordre, titre)
   │           └─< Field (type typé, libellé i18n, obligatoire, règles de validation)
   └─ ResponseSchema (schéma de réponse dérivé du schéma de formulaire, versionné)
```

**Justification** : Fondation persistante et contractuelle indispensable à tout le reste du
module Forms — moteur logique, événements/API et thème s'appuient tous sur ce modèle et ce
contrat de schéma. Isoler la partie « schéma + champs typés + validation serveur » du parent XL
donne un lot livrable et testable indépendamment, sans dépendance vers un autre enfant.

**Hors-périmètre** :
- Logique conditionnelle, calculs et scoring (EN42.1b)
- Émission d'événements, collecte/API de réponses, webhooks (EN42.1c)
- Thème `--pv-*` et intégration embarquée (EN42.1d)
- Éditeur no-code visuel (US42.1.x) — cet enabler fournit le modèle et la validation, pas l'UI

**Critères de complétion** :
- [ ] Migration Flyway créant `form`, `page`, `section`, `field` et le schéma de réponse versionné
  au schéma `forms` (types, contraintes `NOT NULL`, énumérations, index), FK → `public.teams.id`
- [ ] Champs typés (texte, nombre, choix unique/multiple, date, e-mail, fichier…) avec leurs
  règles de validation déclaratives (obligatoire, format, bornes, longueur, motif)
- [ ] Contrat de schéma de formulaire stable et versionné (structure sérialisable) consommable par
  les enfants EN42.1b/c/d sans couplage à leur implémentation
- [ ] Validation serveur des saisies faisant autorité : toute réponse est revalidée côté serveur
  contre le schéma du formulaire, indépendamment de toute validation client
- [ ] Isolation multi-tenant au niveau persistance : chaque `Form` est rattaché à un tenant et
  toute requête est filtrée par le tenant courant
- [ ] Support i18n du schéma (libellés/valeurs traduisibles) sans logique d'affichage

**Critères d'acceptation (Given/When/Then)** :
- [ ] Given un tenant valide, when je persiste un `Form` avec une `Page`, une `Section` et 3
  `Field` typés, then l'agrégat est enregistré au schéma `forms` et relu à l'identique.
- [ ] Given un formulaire publié dont un champ e-mail est obligatoire, when une réponse fournit une
  valeur d'e-mail valide, then la validation serveur accepte la saisie et la réponse est retenue.
- [ ] Error case: given une réponse dont un champ obligatoire est absent ou dont la valeur viole
  une règle de validation (format e-mail invalide, hors bornes), when la validation serveur
  s'exécute, then la saisie est rejetée avec un `400` détaillant le champ fautif, sans persister de
  réponse partielle non conforme.
- [ ] Security: un `Form` d'un autre tenant est invisible et se comporte comme inexistant — un
  accès non-membre ou cross-tenant retourne `404` (jamais `403` révélateur d'existence) ; un membre
  du tenant sans le rôle requis pour éditer le schéma reçoit `403`.

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E42 · Module: forms · Phase: phase-3 · Size: M · Priority: Critical
Stage: ⬜
Justification: Modèle de formulaire/champ/page/section + contrat de schéma + validation serveur — socle du form-builder (issu de la décomposition d'EN42.1 XL)
Dépendances: E03 Système de modules · E17 Infrastructure multi-repo (schéma `forms`, FK → `public.teams.id`)
