# US42.5.1 — Webhooks sortants

**En tant que** développeur intégrateur
**Je veux** configurer un webhook sortant qui reçoit le JSON complet de chaque réponse soumise
**Afin de** connecter Forms à un système tiers sans passer par le bus PIVOT

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un webhook configuré avec une URL cible, when une réponse est soumise, then le JSON complet de la réponse est envoyé en POST à cette URL | ⬜ |
| Given un webhook dont l'URL cible répond en erreur ou timeout, when l'envoi échoue, then il est retenté selon une politique de backoff, puis journalisé comme échec définitif après épuisement des tentatives | ⬜ |
| Error : given une URL de webhook invalide ou non joignable configurée par erreur, when le concepteur l'enregistre, then une validation de base (format, résolution DNS) le signale avant d'attendre la première soumission réelle | ⬜ |
| Security : l'URL cible doit être HTTPS ; chaque envoi est signé (secret partagé ou HMAC) pour que le récepteur vérifie l'authenticité de l'origine ; les cibles pointant vers des adresses internes/privées (loopback, RFC 1918, link-local, métadonnées cloud) sont refusées pour prévenir le SSRF | ⬜ |
| Security : la configuration d'un webhook et de son secret est réservée aux propriétaires/collaborateurs déclarés du formulaire (RBAC) — un non-membre (ou une requête cross-tenant) reçoit un 404 ; le secret n'est jamais réaffiché en clair après enregistrement | ⬜ |

## Hors périmètre

- Webhooks entrants (déclencher une action dans Forms depuis un système tiers) — hors périmètre, cette US couvre uniquement l'émission sortante
- Transformation/filtrage du payload avant envoi — le JSON envoyé est complet, pas de mapping personnalisé dans cette US

## Notes d'implémentation

- Distinct de l'émission `form.submitted` sur le bus PIVOT (US42.5.4) : le webhook est un canal point-à-point vers un système externe, le bus est le canal interne à la plateforme — les deux coexistent sans dépendre l'un de l'autre

---
Item Type: US · Parent: F42.5 · Module: forms · Phase: phase-3 · Size: S · Priority: Critical
Stage: ⬜
Rôle: developpeur-d-integration-api
Source: FRM-401 · MoSCoW: Must · Origine: Formbricks, Tally, Jotform, Typeform
Justification: Benchmark formulaires (Typeform/Jotform/Tally/Formbricks/Qualtrics/Google) — recentré PIVOT
Dépendances: EN42.1 (moteur & schéma de formulaire)
