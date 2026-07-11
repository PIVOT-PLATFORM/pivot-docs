# US42.8.1 — Auto-hébergement

**En tant que** DSI souveraine
**Je veux** déployer Forms en self-host (Docker/K8s), sans limite de réponses ni de facturation à l'usage
**Afin de** garder les données de formulaire dans mon périmètre d'hébergement, sans dépendre d'un SaaS tiers

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un déploiement self-host packagé (image Docker), when il est installé, then Forms est pleinement fonctionnel sans appel réseau sortant obligatoire vers un service PIVOT hébergé ou un tiers | ⬜ |
| Given un volume de réponses important, when le self-host est utilisé, then aucune limite artificielle de nombre de réponses ni facturation à la réponse ne s'applique (contrairement aux offres SaaS du marché) | ⬜ |
| Error : given une tentative de démarrage sans les dépendances requises (base de données, stockage fichiers configuré), when le conteneur démarre, then un message de configuration manquante explicite s'affiche plutôt qu'un crash silencieux | ⬜ |
| Security : le self-host n'expose par défaut aucun port ni service au-delà du strict nécessaire (surface d'attaque minimale), et s'appuie sur le SSO Keycloak du tenant plutôt qu'un compte local | ⬜ |

## Hors périmètre

- Mode air-gap complet sans aucune connectivité réseau — cf. le mode hors-ligne d'autres modules PIVOT (ex. collaboration), non repris ici tel quel
- Migration automatique depuis une instance SaaS vers le self-host — hors périmètre, cf. migration/import (US42.9.3) pour l'import de données

## Notes d'implémentation

- Packaging cohérent avec EN42.2 (déploiement souverain & sécurité) — cette US est le volet self-host, EN42.2 porte l'ensemble sécurité/RGPD-by-design transverse

---
Item Type: US · Parent: F42.8 · Module: forms · Phase: phase-3 · Size: L · Priority: Critical
Stage: ⬜
Rôle: directeur-des-systemes-d-information
Source: FRM-801 · MoSCoW: Must · Origine: Différenciant Formbricks (AGPLv3)
Justification: Benchmark formulaires (Typeform/Jotform/Tally/Formbricks/Qualtrics/Google) — recentré PIVOT
Dépendances: EN42.1 (moteur & schéma de formulaire)
