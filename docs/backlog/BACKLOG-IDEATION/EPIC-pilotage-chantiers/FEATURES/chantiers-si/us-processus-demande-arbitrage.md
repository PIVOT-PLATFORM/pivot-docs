# US39.1.3 — Processus demande-arbitrage

**En tant que** PMO
**Je veux** formaliser le processus cible : demande -> scoring -> capacité -> arbitrage tracé, avant le paramétrage de l'outil
**Afin de** définir la gouvernance avant l'outillage et éviter de figer un mauvais processus

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given l'organisation, when le processus cible est formalisé, then l'enchaînement demande -> scoring -> capacité -> arbitrage tracé est documenté | ⬜ |
| Le processus est validé avant le paramétrage de l'outil | ⬜ |
| Error : given un paramétrage lancé sans processus validé, la démarche est bloquée/signalée | ⬜ |
| Security/Gouvernance : les étapes d'arbitrage prévoient la traçabilité des décisions | ⬜ |

## Hors périmètre
- L'US ne couvre pas le paramétrage de l'outil PPM lui-même (formulaires, workflows applicatifs) — seulement la formalisation du processus cible en amont, qui servira ensuite de spécification au paramétrage.
- Le scoring et les modèles de capacité ne sont pas définis en détail ici (méthode de scoring, calcul de capacité) — seul l'enchaînement des étapes du processus est formalisé.
- La traçabilité réglementaire détaillée des décisions (archivage, contrôle de légalité) est couverte par US39.1.9, pas par cette US de cadrage processus.

## Notes d'implémentation
- Cette US est un artefact de gouvernance (formalisation de processus), pas une fonctionnalité applicative : le livrable attendu est un document de processus cible décrivant l'enchaînement demande → scoring → capacité → arbitrage tracé, validé avant tout paramétrage d'outil.
- Sert de spécification amont pour le futur module PPM (E39/E40) : le paramétrage de l'outil ne doit démarrer qu'après validation formelle de ce processus, pour éviter de figer une gouvernance non désirée.
- Le blocage d'un paramétrage lancé sans processus validé doit être un point de contrôle explicite du Gate de validation du chantier (revue avant lancement du paramétrage).

---
Item Type: US · Parent: F39.1 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: officier-responsable-pmo
Source: PP-063 · MoSCoW: Must · Lot: Lot 1 · Origine: Insight I3
Profils: Tous
Justification: Dossier §8-I3
Dépendances: —
