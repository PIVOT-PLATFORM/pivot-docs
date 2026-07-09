# US42.3.1 — Lien partageable

**En tant que** concepteur de formulaire
**Je veux** générer un lien de diffusion avec options d'accès (mot de passe, date de fermeture, quota de réponses)
**Afin de** contrôler qui peut répondre et jusqu'à quand, sans dépendre d'un compte PIVOT côté répondant

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un lien protégé par mot de passe, when un répondant l'ouvre sans le bon mot de passe, then l'accès au formulaire est refusé et aucune donnée du formulaire n'est exposée | ⬜ |
| Given une date de fermeture ou un quota de réponses configuré, when la limite est atteinte, then le lien affiche un message de fermeture et n'accepte plus de nouvelle soumission | ⬜ |
| Error : given un lien de formulaire non publié ou supprimé, when il est ouvert, then une page d'erreur explicite s'affiche (pas de 500 ni de formulaire partiellement chargé) | ⬜ |
| Security : le lien utilise un identifiant non devinable (pas d'ID séquentiel) ; les tentatives de mot de passe sont limitées en fréquence (anti brute-force) | ⬜ |

## Hors périmètre

- Authentification du répondant par SSO PIVOT sur un lien public — hors périmètre ici (cf. enquêtes in-app ciblées, US42.3.3, pour un contexte authentifié)

## Notes d'implémentation

- Le quota et la fermeture automatique doivent être vérifiés côté serveur à chaque soumission, pas seulement affichés côté client, pour éviter une soumission après clôture par requête directe

---
Item Type: US · Parent: F42.3 · Module: forms · Phase: phase-3 · Size: S · Priority: Critical
Stage: ⬜
Source: FRM-201 · MoSCoW: Must · Origine: Socle 6/6
Justification: Benchmark formulaires (Typeform/Jotform/Tally/Formbricks/Qualtrics/Google) — recentré PIVOT
Dépendances: EN42.1 (moteur & schéma de formulaire)
