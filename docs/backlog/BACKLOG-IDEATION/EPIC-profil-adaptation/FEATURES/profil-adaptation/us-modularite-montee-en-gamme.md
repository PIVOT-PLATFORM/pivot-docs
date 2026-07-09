# US40.1.4 — Modularité & montée en gamme

**En tant que** officier PMO
**Je veux** activer progressivement les capacités selon la maturité, avec un parcours d'évolution sans rupture
**Afin de** accompagner la montée en gamme du bas de spectre sans re-paramétrage lourd

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un profil de faible maturité PMO, when la maturité progresse, then de nouvelles capacités s'activent sans migration ni perte de données | ⬜ |
| Given une activation progressive, when une capacité est ajoutée, then les données existantes restent cohérentes et rattachées à l'Application/Projet | ⬜ |
| Error : given une tentative d'activation d'une capacité incompatible avec la classe de souveraineté du profil courant (US40.1.3), when l'officier PMO la déclenche, then l'activation est refusée avec message explicite plutôt que d'activer silencieusement une capacité non conforme | ⬜ |
| Security/Gouvernance : la montée en gamme (changement de niveau de maturité, activation de capacité) n'est déclenchable que par un rôle habilité et respecte la classe de souveraineté en vigueur (US40.1.3) — pas de contournement du guard module (US40.1.2) via ce parcours | ⬜ |
| A11y : le parcours d'activation progressive (écran de sélection/confirmation des nouvelles capacités) est navigable au clavier et conforme WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La définition du mapping profil/maturité → capacités disponibles est celle produite par US40.1.2, pas redéfinie ici.
- La dérivation de la classe de souveraineté n'est pas recalculée par cette US — elle est simplement consultée comme contrainte (US40.1.3).
- Pas de rétrogradation automatique des capacités si la maturité régresse — cette US couvre uniquement le sens montée en gamme.

## Notes d'implémentation
- Backend `pivot-pilotage-core` (schéma Flyway `pilotage`) : l'activation progressive doit être un ajout additif (nouvelles tables/colonnes optionnelles ou nouveaux enregistrements liés), jamais une migration destructive des données existantes.
- Concerne les profils TPE, PME, Grand groupe, Privée sous droit public (cf. frontmatter `Profils`) — État/Publique ne sont pas concernés par ce parcours de montée en gamme progressive.
- Les données existantes doivent rester rattachées à l'Application/Projet (EN18.9) pendant et après l'activation d'une nouvelle capacité — pas de ré-association manuelle requise.
- Frontend `pivot-pilotage-ui`, consomme `@pivot/ui-core` + `@pivot/design-system` pour l'écran d'activation progressive.

---
Item Type: US · Parent: F40.1 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Source: PP-A04 · MoSCoW: Must · Lot: Lot 1 · Origine: Synthèse v2
Profils: TPE, PME, Grand groupe, Privée sous droit public
Justification: Synthèse v2 §6-I1 (modularité Sciforma) ; cf. PP-051
Dépendances: EN18.9 (modèle Application→Projet)
