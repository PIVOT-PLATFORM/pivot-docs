# US37.1.4 — Offre d'entrée incluse / gratuite

**En tant que** acheteur
**Je veux** un niveau basique inclus dans une suite existante (coût d'entrée nul) avec montée en gamme par profil
**Afin de** démarrer sans surcoût et faire évoluer les droits selon les besoins

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une suite existante, when un utilisateur y accède, then un niveau basique de pilotage est disponible sans coût d'entrée additionnel | ⬜ |
| La montée en gamme s'effectue par profil selon les besoins | ⬜ |
| Error : given une fonctionnalité hors du niveau basique, system invite à la montée en gamme plutôt que d'échouer silencieusement | ⬜ |
| Security/Gouvernance : les changements de niveau/profil sont tracés | ⬜ |
| A11y : le message d'invitation à la montée en gamme est perceptible sans dépendre uniquement de la couleur et reste conforme WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La définition tarifaire précise des niveaux (grille de prix) relève d'une décision commerciale, pas d'un développement applicatif couvert par cette US.
- Le processus de paiement/souscription à la montée en gamme n'est pas détaillé ici (cette US couvre l'invitation, pas le tunnel d'achat).
- La segmentation fine par profil (consultation/contribution/pilotage/PMO) est traitée par US37.1.3 ; cette US ne couvre que le niveau basique inclus vs niveaux supérieurs.

## Notes d'implémentation
- Le niveau basique s'appuie sur le système d'activation de modules déjà existant (E03 Système de modules) pour déterminer les fonctionnalités accessibles sans coût additionnel.
- Le blocage/l'invitation sur une fonctionnalité hors niveau basique doit être un comportement explicite (état visible dans l'UI), pas une simple absence de menu.
- La traçabilité des changements de niveau/profil peut réutiliser le mécanisme d'audit déjà utilisé pour les autres changements de droits dans le module pilotage.
- Frontend `pivot-pilotage-ui`, consomme `@pivot/ui-core` + `@pivot/design-system` pour le composant d'invitation à la montée en gamme.

---
Item Type: US · Parent: F37.1 · Module: pilotage · Phase: phase-3 · Size: M · Priority: Medium
Stage: Backlog
Source: PP-050 · MoSCoW: Should · Lot: Lot 3 · Origine: Différenciant MS
Profils: TPE, PME
Justification: Dossier §6.3
Dépendances: —
