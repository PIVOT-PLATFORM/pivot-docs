# US39.1.7 — Gouvernance de l'IA de pilotage

**En tant que** DSI
**Je veux** encadrer l'IA : localisation des traitements, traçabilité des synthèses, contrôle humain sur toute décision, information des instances
**Afin de** garantir une IA de pilotage gouvernée et transparente

> ⚠️ **Hors v2 adaptative** — non repris dans la mise à jour du backlog PPM v2 ; conservé pour mémoire, à confirmer.

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une IA de pilotage, when la politique est définie, then localisation des traitements, traçabilité des synthèses et contrôle humain sur toute décision sont exigés | ⬜ |
| Les instances sont informées de l'usage de l'IA de pilotage | ⬜ |
| Error : given une décision prise sans contrôle humain, la politique la considère non conforme | ⬜ |
| Security/Gouvernance : les productions IA sont tracées (données, modèle, auteur) — exigence contractualisée | ⬜ |

## Hors périmètre
- L'US ne couvre pas le choix ou l'implémentation d'une IA de pilotage spécifique (moteur, prompts, intégration) — seulement la politique de gouvernance qui l'encadre (localisation, traçabilité, contrôle humain, information des instances).
- L'audit technique de conformité d'un outil IA tiers (certification, audit de modèle) n'est pas traité ici, seule l'exigence contractuelle de traçabilité est couverte.
- Statut à reconfirmer : cette US est marquée « hors v2 adaptative » dans le backlog PPM — sa reprise effective dépend d'une confirmation lors d'un Gate 1 ultérieur, non actée à ce stade.

## Notes d'implémentation
- Cette US est un artefact de gouvernance (politique + exigence contractuelle), pas une fonctionnalité applicative : le livrable attendu est une politique d'usage de l'IA de pilotage (localisation des traitements, traçabilité des synthèses, contrôle humain systématique, information des instances) et sa traduction en clause contractuelle.
- Le statut "Hors v2 adaptative" (non repris dans la mise à jour du backlog PPM v2) signifie que cette US est conservée pour mémoire : sa priorité et son applicabilité doivent être reconfirmées avant tout passage en Ready.
- La traçabilité des productions IA (données, modèle, auteur) doit être cohérente avec la politique de traçabilité réglementaire générale du chantier (US39.1.9) pour éviter une double gouvernance divergente.

---
Item Type: US · Parent: F39.1 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: Backlog
Source: PP-067 · MoSCoW: Should · Lot: Lot 2 · Origine: Insight I7
Profils: — (hors v2 adaptative — à confirmer)
Justification: Dossier §8-I7
Dépendances: —
