# US42.1.1 — Éditeur no-code drag-and-drop

**En tant que** concepteur de formulaire
**Je veux** construire un formulaire par glisser-déposer de blocs de champs, avec prévisualisation en temps réel, sans compétence technique
**Afin de** publier un formulaire opérationnel sans dépendre d'un développeur

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given l'éditeur ouvert sur un formulaire vide, when je glisse-dépose 5 blocs de champs, then le formulaire est constitué et la prévisualisation reflète l'ordre et le rendu réel sans rechargement de page | ⬜ |
| Given un formulaire en cours d'édition, when je quitte l'éditeur sans publier, then l'état est conservé en brouillon (pas de perte de travail) | ⬜ |
| Error : given un champ mal configuré (ex. type incompatible avec une règle de validation existante), when j'essaie de publier, then la publication est bloquée avec le champ en cause mis en évidence | ⬜ |
| Security : l'éditeur et la prévisualisation s'exécutent sous le compte de l'utilisateur authentifié (SSO) ; un brouillon n'est visible que par ses collaborateurs déclarés (US42.9.2), jamais public par défaut | ⬜ |
| A11y : construction et réorganisation des blocs possibles au clavier seul (pas seulement drag-and-drop souris), WCAG 2.1 AA | ⬜ |

## Hors périmètre

- Éditeur de thème visuel avancé (au-delà de l'héritage des tokens `--pv-*`, cf. US42.2.4) — non couvert ici
- Undo/redo multi-niveaux — cf. Notes d'implémentation

## Notes d'implémentation

- Un utilisateur néophyte doit pouvoir créer un formulaire à 5 champs sans aide en moins de 10 minutes — objectif à valider en test utilisateur, pas un AC automatisable
- Undo/redo au moins mono-niveau attendu dès cette US ; le multi-niveaux peut être différé (dépend du modèle d'état retenu par EN42.1)

---
Item Type: US · Parent: F42.1 · Module: forms · Phase: phase-3 · Size: M · Priority: Critical
Stage: Backlog
Source: FRM-001 · MoSCoW: Must · Origine: Socle 6/6
Justification: Benchmark formulaires (Typeform/Jotform/Tally/Formbricks/Qualtrics/Google) — recentré PIVOT
Dépendances: EN42.1 (moteur & schéma de formulaire)
