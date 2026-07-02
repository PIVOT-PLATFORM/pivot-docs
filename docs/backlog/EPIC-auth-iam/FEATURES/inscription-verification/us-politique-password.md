# US01.2.4 — Politique de robustesse du mot de passe

**En tant que** utilisateur
**Je veux** voir en temps réel si mon mot de passe respecte les critères de robustesse
**Afin de** choisir un mot de passe sécurisé

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|-------|
| Validation backend : min 12 chars, 1 majuscule, 1 chiffre, 1 spécial | ⬜ |
| Composant Angular `PasswordStrengthComponent` : indicateur visuel (faible/moyen/fort) | ⬜ |
| Validation temps réel côté Angular (pas d'appel API) | ⬜ |
| Critères affichés sous le champ (checked au fur et à mesure) | ⬜ |
| Politique configurable via `security.password.min-length` etc. | ⬜ |
| Tests Vitest PasswordStrengthComponent + TU PasswordValidator | ⬜ |
| Paramètres configurables exhaustifs listés : min-length, min-uppercase, min-digits, min-special (pas d'autre paramètre implicite) | ⬜ |
| Les critères affichés par PasswordStrengthComponent sont cohérents avec la politique backend : soit endpoint GET /api/auth/password-policy expose les règles, soit hardcodés identiques des deux côtés | ⬜ |
| Formulaire d'inscription bloqué (bouton désactivé) tant que le mot de passe ne satisfait pas tous les critères | ⬜ |
| L'indicateur visuel de force (barre faible/moyen/fort) n'est pas uniquement différencié par couleur — texte du niveau visible : "Faible", "Moyen", "Fort" | ⬜ |
| Indicateur de force lié au champ password via aria-describedby ; changements de niveau annoncés via aria-live="polite" | ⬜ |
| Chaque critère de la checklist utilise role="listitem" et icône ✓/✗ avec texte SR-only ("validé" / "non validé") — pas uniquement couleur verte/rouge | ⬜ |
| Checklist de critères associée au champ password via aria-describedby | ⬜ |
| Erreur "mots de passe différents" affichée inline sous le champ "Confirmer" avec role="alert", uniquement après blur — pas à chaque frappe | ⬜ |
| Niveaux de force et libellés de critères internalisés dans auth.password.strength.* (fr.json / en.json) | ⬜ |

---
Item Type: US · Parent: F01.2 · Module: auth · Phase: MVP · Size: S · Priority: High
Stage: Backlog
