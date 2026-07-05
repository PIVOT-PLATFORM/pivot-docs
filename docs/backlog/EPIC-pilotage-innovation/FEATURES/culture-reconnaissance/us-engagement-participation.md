# US38.10.1 — Engagement & participation

**En tant que** responsable innovation
**Je veux** favoriser l'**engagement** (visibilité des idées, gamification, badges, classements)
**Afin de** installer une culture d'innovation participative dans la durée

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given la démarche, when des contributeurs participent, then progression, badges et classements (opt-in) valorisent la participation | ⬜ |
| Error : given un contributeur qui n'a pas activé l'opt-in, when un classement est affiché, then il n'apparaît pas nommément dans ce classement (pas de fallback qui l'exposerait par défaut) | ⬜ |
| Security : gamification non punitive, données agrégées, opt-out respecté à tout moment (un contributeur peut se retirer d'un classement rétroactivement) | ⬜ |
| A11y : les badges et classements ne reposent pas uniquement sur la couleur ou une icône seule pour signifier un niveau/rang (texte alternatif ou libellé explicite), et sont navigables au clavier | ⬜ |

## Hors périmètre
- La reconnaissance individuelle liée à une idée précise (kudos, mise en avant d'un contributeur sur une idée adoptée) : couverte par US38.10.2
- La définition des règles de récompense matérielle (primes, avantages) : hors périmètre, cette US couvre l'engagement par la gamification (badges/classements), pas les récompenses tangibles
- Le calcul du score de maturité de l'organisation : couvert par US38.9.2, sans lien avec les classements individuels de cette US

## Notes d'implémentation
- Le classement doit être strictement opt-in : un contributeur non opt-in doit être exclu de tout affichage nominatif (pas seulement masqué côté client)
- Les badges/progression doivent être calculés à partir d'actions déjà tracées ailleurs dans le SMI (idées soumises, votes, participations) plutôt que dupliquer un système de tracking dédié
- S'appuie sur le modèle SMI d'EN38.1 ; la dimension « éthique » (gamification non punitive) signifie qu'aucun classement ne doit mettre en avant le bas du classement ou la non-participation

---
Item Type: US · Parent: F38.10 · Module: pilotage · Phase: phase-3 · Size: S · Priority: Low
Stage: Backlog
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: SMI — Système de Management de l'Innovation (état de l'art, ISO 56002/56000)
Dépendances: EN38.1 (modèle SMI & moteur)
