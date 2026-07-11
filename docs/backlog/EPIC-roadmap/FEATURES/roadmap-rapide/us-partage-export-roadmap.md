# US22.3.5 — Partage & export de la roadmap

**En tant que** direction
**Je veux** partager la roadmap par lien et l'exporter en image / PDF pour un comité
**Afin de** diffuser la direction hors de l'outil sans capture d'écran

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une roadmap, when je l'exporte, then un PNG/PDF fidèle (lanes, jalons, périodes) est produit | ⬜ |
| Given un lien de partage lecture seule, when un destinataire l'ouvre, then il voit la roadmap sans pouvoir l'éditer | ⬜ |
| Error : given un lien de partage révoqué ou expiré, when un destinataire tente de l'ouvrir, then l'accès est refusé avec un message explicite (pas d'affichage partiel de la roadmap) | ⬜ |
| Security : le lien de partage lecture seule ne doit exposer que les données de la roadmap concernée (pas d'autres projets/portefeuilles) et doit pouvoir être révoqué à tout moment par un utilisateur habilité | ⬜ |
| A11y : la page consultée via le lien de partage respecte les mêmes exigences WCAG 2.1 AA que la roadmap éditable (navigation clavier, contrastes) | ⬜ |

## Hors périmètre

- L'édition collaborative ou les commentaires sur la roadmap partagée — le lien est strictement lecture seule.
- Les autres formats d'export (MS Project, Excel, iCalendar…) — couverts par F22.7 (Interopérabilité).
- La planification d'envois récurrents (ex. export automatique hebdomadaire) — non couverte, export à la demande uniquement.

## Notes d'implémentation

- L'export PNG/PDF doit être fidèle au rendu affiché (lanes, jalons, périodes) au moment de l'export — génération côté serveur ou capture du rendu client à définir en conception technique.
- Le lien de partage lecture seule nécessite un mécanisme de token/permission dédié, distinct des rôles applicatifs classiques, pour permettre un accès sans compte au destinataire.

---
Item Type: US · Parent: F22.3 · Module: pilotage · Phase: phase-3 · Size: S · Priority: Should
Stage: ⬜
Rôle: macro:direction-pilotage
Profils: Tous
Justification: Parité MS Project en mode web — modèle temporel unique (EN22.1), altitude pilotée par le profil (E40)
Dépendances: EN22.1 (modèle temporel unique)
