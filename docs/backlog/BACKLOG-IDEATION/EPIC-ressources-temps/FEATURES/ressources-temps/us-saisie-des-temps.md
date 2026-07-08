# US32.1.2 — Saisie des temps

**En tant que** ressource (contributeur terrain)
**Je veux** saisir mon temps via une feuille personnalisée connectée aux projets et activités récurrentes
**Afin d'** alimenter le réel et fiabiliser le pilotage de la charge

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une feuille de temps personnalisée (projets et activités récurrentes visibles pour la ressource), when la ressource saisit ses heures sur un projet ou une activité récurrente, then la saisie est enregistrée et rattachée à l'objet, et agrégée dans le réel remontant au pilotage de charge | ⬜ |
| Error : given une saisie sur une période verrouillée (clôture), system la refuse et explique le motif (période close) à la ressource | ⬜ |
| Security : une ressource ne peut saisir/consulter/modifier que ses propres temps, sur son périmètre autorisé (projets et activités récurrentes auxquels elle est affectée) ; un chef de projet ou PMO ne peut consulter que les temps relevant de son périmètre | ⬜ |
| A11y : la feuille de temps est conforme RGAA 4 / WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La validation/l'approbation hiérarchique des feuilles de temps saisies (workflow de validation par un manager) : cette US couvre uniquement la saisie par la ressource
- Le verrouillage des périodes lui-même (définition des règles de clôture, qui clôture, quand) : cette US suppose une période verrouillée déjà existante et se limite à en refuser la saisie
- L'exploitation du réel saisi pour le plan de charge (comparaison charge/capacité, détection de tension) : couverte par US32.1.3
- La correction/régularisation de saisies sur périodes déjà clôturées (processus dérogatoire hors scope)

## Notes d'implémentation
- Le réel saisi alimente le pilotage de charge (US32.1.3), qui distingue déjà projet / maintenance / récurrent — la feuille de temps doit permettre de rattacher chaque saisie à l'un de ces trois types d'objet
- La personnalisation de la feuille (projets/activités visibles) dépend des affectations existantes de la ressource (US32.1.1) : une ressource ne doit voir que les objets auxquels elle est affectée
- Le verrouillage de période (clôture) est une donnée de configuration à consommer, probablement portée par le module pilotage (schéma `pilotage`) — à confirmer avec l'équipe backend `pivot-pilotage-core`
- Frontend `pivot-pilotage-ui`, consommation de `@pivot/ui-core` pour les composants de saisie (grille de temps) et `@pivot/design-system` pour le rendu

---
Item Type: US · Parent: F32.1 · Module: pilotage · Phase: phase-3 · Size: L · Priority: High
Stage: Backlog
Source: PP-018 · MoSCoW: Must · Lot: Lot 2 · Origine: 2/3 (PM, Sciforma)
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: Dossier §5.1 : alimentation du réel
Dépendances: US32.1.1 (affectations définissant le périmètre de saisie de la ressource)
