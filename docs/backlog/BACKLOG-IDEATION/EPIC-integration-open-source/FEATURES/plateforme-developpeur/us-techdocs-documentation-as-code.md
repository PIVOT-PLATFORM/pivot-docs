# US28.11.3 — TechDocs : documentation-as-code par entité catalogue

> Stub phase-3 — ACs à détailler par PO Agent lors de Gate 1 avant implémentation.
> Gap identifié par le benchmark plateforme développeur (`pivot-benchmarks/plateforme-developpeur/dossier-synthese-plateforme-developpeur.md` §5.3, §7.2, §8.1 — pivot-benchmarks#1) : le gap le plus net et le plus facilement actionnable du panel — Backstage est seul à porter une brique nommée et mature (« TechDocs », 5000+ sites internes chez Spotify), absente à la fois d'E28 (catalogue) et d'E41 (Formation & Onboarding, cf. distinction ci-dessous).

**En tant que** développeur ou propriétaire d'une entité catalogue
**Je veux** rédiger la documentation technique d'une entité en Markdown versionné dans son propre dépôt, publiée automatiquement et indexée dans la recherche du catalogue
**Afin de** garder la documentation à jour avec le code qu'elle décrit, plutôt que dans un wiki séparé qui diverge silencieusement (cf. Insight I9 du benchmark collaboration visuelle : « exiger la réversibilité »)

**Distinction avec E41 (Formation & Onboarding)** : cette US couvre la documentation technique d'une entité cataloguée (composant, API, ressource), versionnée avec son code — domaine E28. E41/F41.2-F41.3 restent centrés sur le contenu pédagogique utilisateur final (centre d'aide, guides, e-learning) ; aucune des deux Features ne recouvre l'autre. Distinction à garder explicite dans les deux EPICs pour éviter toute confusion future entre « documentation d'un composant » et « support de formation d'un module ».

## Critères d'acceptation (outline — Gate 1 PO Agent)

| Critère | 🤖 Dev |
|---------|--------|
| Une documentation Markdown versionnée dans le dépôt d'une entité catalogue est détectée et construite automatiquement | ⬜ |
| La documentation publiée est accessible depuis la fiche catalogue de l'entité correspondante | ⬜ |
| Le contenu de la documentation publiée est indexé et retrouvable dans la recherche transverse du portail (croisé avec les résultats d'entité) | ⬜ |
| La documentation publiée se reconstruit automatiquement à chaque changement du dépôt source (CI) | ⬜ |
| Error : un dépôt sans documentation valide (fichier de configuration absent ou malformé) n'empêche pas l'affichage du reste de la fiche catalogue, avec un état « documentation indisponible » explicite | ⬜ |

## Hors périmètre (stub)

- Support de plusieurs formats/générateurs de documentation au-delà du Markdown simple (EF-DOC-05 du cahier Backstage) — raffiné en Gate 1, hors socle minimal
- Contenu pédagogique utilisateur, centre d'aide, e-learning — reste E41 (cf. Distinction ci-dessus)

---
Item Type: US · Parent: F28.11 · Module: plateforme-developpeur · Phase: phase-3 · Size: L · Priority: Medium
Stage: ⬜
Dépendances: EN28.3, EN28.2
