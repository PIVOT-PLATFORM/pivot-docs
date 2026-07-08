# Audit — dépendances

**Statut :** À compléter
**Dernière révision :** 2026-07-08
**Profil agent responsable :** Expert DevSecOps

## Résumé

Audit de la chaîne de dépendances tierces (Maven + npm) sur l'ensemble des repos de la
plateforme (`pivot-core`, `pivot-ui`, et les modules `pivot-xxx-core`/`pivot-xxx-ui`) : CVE
connues, fraîcheur des versions, compatibilité de licence, et génération de SBOM.

Catégorie absente jusqu'ici bien que déjà outillée : chaque repo core/ui exécute un check CI
nommé `SCA - Dependency Audit` (voir `.github/workflows/`), mais aucun audit consolidé
multi-repo n'existe pour en faire la synthèse.

## Points d'attention

- Consolider les résultats `SCA - Dependency Audit` des 8 repos (core+ui × 4 domaines) dans
      une vue unique — aujourd'hui dispersés par repo, aucune vue transverse
- Compatibilité de licence : tous les repos déclarent `AGPL-3.0-or-later` — vérifier
      qu'aucune dépendance tierce (Maven/npm) n'a une licence incompatible (ex. certaines
      licences propriétaires ou copyleft incompatibles)
- SBOM (Software Bill of Materials) — génération mentionnée dans `skill-devops-cicd` de
      plusieurs repos, statut de génération/publication réelle à vérifier
- Fraîcheur des dépendances directes majeures (Spring Boot, Angular, Testcontainers,
      Playwright) sur chaque repo — dérive de version entre repos du même type (core vs core)

## Historique des révisions

| Version | Date | Score | Évolutions principales |
|---------|------|-------|------------------------|
| v1 | 2026-07-08 | — | Initialisation |
