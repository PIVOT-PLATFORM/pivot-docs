# US38.12.2 — Profils d'innovateurs (compétences & intérêts)

**En tant que** contributeur
**Je veux** un **profil d'innovateur** (compétences, centres d'intérêt, expertises, contributions, badges) relié au référentiel de rôles
**Afin de** révéler qui sait/aime quoi et alimenter le matchmaking

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un utilisateur, when il complète son profil d'innovateur, then compétences, intérêts et contributions sont visibles (selon confidentialité) | ⬜ |
| Given le référentiel de rôles (taxonomie), when le profil s'affiche, then rôle et expertises sont cohérents | ⬜ |
| Error : given une compétence ou un intérêt ne figurant pas dans le référentiel de rôles, when l'utilisateur tente de l'ajouter, then une erreur explicite s'affiche (pas de valeur libre incohérente avec la taxonomie) | ⬜ |
| Security/RGPD : visibilité du profil **maîtrisée par son propriétaire** (opt-in par champ ou global), données déclaratives uniquement (pas d'inférence automatique de compétences sans validation de l'utilisateur), droit à la modification/suppression du profil | ⬜ |
| A11y : le formulaire de profil (compétences, intérêts, badges) et son affichage sont utilisables au clavier et correctement restitués par lecteur d'écran (labels associés aux champs) | ⬜ |

## Hors périmètre
- Vérification/certification externe des compétences déclarées (données purement déclaratives)
- Import automatique de profils depuis des sources externes (LinkedIn, SIRH, etc.)
- Système de badges et sa logique d'attribution détaillée (peut être couvert par une US de reconnaissance dédiée, F38.10)

## Notes d'implémentation
- Le profil doit être cohérent avec le référentiel de rôles/taxonomie déjà utilisé ailleurs dans Pivot (à réutiliser, pas dupliquer)
- Alimente le matchmaking (US38.11.5, US38.12.3) et le mentorat (US38.12.4) : la structure de données (compétences, intérêts, disponibilité, opt-in) doit être conçue pour être exploitable par ces US en aval
- La granularité de la visibilité (publique / communauté / privée) doit être définie par champ pour respecter le principe de minimisation RGPD

---
Item Type: US · Parent: F38.12 · Module: pilotage · Phase: phase-3 · Size: M · Priority: Medium
Stage: Backlog
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: SMI — fonctionnalités innovantes (IA gouvernée, intelligence collective, corporate venturing)
Dépendances: EN38.1 · EN38.2 (moteur IA & graphe)
