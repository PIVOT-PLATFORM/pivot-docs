# US18.19.10 — Valider un jalon A / B / C / D

**En tant que** chef de projet (pilote d'activité)
**Je veux** valider un jalon A, B, C ou D et figer les références planning et budget
**Afin d'** enregistrer la référence du jalon dans l'activité

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un jalon A/B/C/D non validé, when je clique sur « Valider », then l'état passe à « Validé » en base, le planning est copié en base et le PDS est copié dans la photo financière du jalon | ⬜ |
| Given un jalon validé, when la validation aboutit, then le jalon se grise et n'est plus modifiable (seul le bouton « Modifier » reste disponible) | ⬜ |
| Given le clic sur « Valider », when le pop-up de confirmation s'affiche, then il porte le message spécifique au jalon (« Attention la validation du Jalon A/B/C/D enregistre la référence… voulez-vous continuer ? ») avec les boutons CONTINUER et ANNULER | ⬜ |
| Given un jalon déjà validé que l'on revalide, when je confirme, then la REF_Jalon_X et la photo financière correspondantes sont écrasées | ⬜ |
| Error : given un clic sur ANNULER dans le pop-up de confirmation, system n'enregistre ni la référence planning ni la photo financière | ⬜ |
| Security/Gouvernance : tous les utilisateurs habilités sur l'activité peuvent valider un jalon | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La dévalidation via « Modifier » est couverte par l'US « Modifier un jalon grisé ».

## Notes d'implémentation
- Validation jalon A/B/C/D (module pilotage, onglet Jalon) : état « Validé » en base, copie planning + copie PDS dans la photo financière du jalon, grisage du bloc.
- Pop-up de confirmation par jalon (CONTINUER/ANNULER) ; la revalidation écrase REF_Jalon_X + photo financière.

---
Item Type: US · Parent: F18.19 · Module: pilotage · Phase: phase-3 · Size: L · Priority: Critical
Stage: ⬜
Rôle: chef-de-projet
Source: SPEC_OPDN — B.16 Activité — écran Jalons
Dépendances: —
