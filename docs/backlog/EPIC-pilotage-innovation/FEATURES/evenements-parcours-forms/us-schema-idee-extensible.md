# US38.15.4 — Schéma d'idée extensible (champs personnalisés)

**En tant que** responsable innovation
**Je veux** que le modèle **Idea** accepte des **champs personnalisés** définis par campagne/challenge (via Forms), sans casser le socle commun
**Afin de** adapter les informations collectées au contexte tout en gardant une base d'idée unifiée

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une idée, when elle porte des champs additionnels (définis par le formulaire du challenge), then ils sont stockés et affichés sans altérer les champs socles | ⬜ |
| Given des idées de challenges différents, when je les consolide, then le socle commun (titre, auteur, statut, score) reste comparable | ⬜ |
| Given une exigence RGPD, when des champs collectent des données personnelles, then minimisation et finalité sont respectées | ⬜ |
| Error : given un champ personnalisé dont le nom entre en conflit avec un champ socle existant (titre, auteur, statut, score), when le schéma est défini, then la création du champ est refusée avec une erreur explicite | ⬜ |
| Security : seul le responsable innovation (créateur du challenge/campagne) peut définir le schéma de champs personnalisés ; les champs personnalisés contenant des données personnelles sont soumis aux mêmes règles d'accès que les champs socles équivalents | ⬜ |

## Hors périmètre
- La définition de l'UI de configuration des champs personnalisés : fournie par E42 Pivot Forms, cette US couvre le stockage/consolidation côté modèle Idea
- La migration ou la conversion de champs personnalisés existants en champs socles : hors périmètre, le socle commun reste fixe
- L'agrégation analytique avancée sur des champs personnalisés hétérogènes entre challenges : seule la comparabilité du socle commun est garantie, pas l'analyse croisée des champs additionnels

## Notes d'implémentation
- S'appuie sur EN38.1 (modèle Idea) : les champs personnalisés doivent être stockés dans une structure extensible (ex. JSON/EAV) distincte des colonnes socles, pour ne pas modifier le schéma à chaque nouveau challenge
- Le schéma de champs additionnels est défini via E42 Pivot Forms lors de la création du formulaire de dépôt (lien avec US38.15.3)
- RGPD : identifier explicitement, au niveau du schéma, les champs personnalisés contenant des données personnelles pour appliquer minimisation et durée de conservation adaptées

---
Item Type: US · Parent: F38.15 · Module: pilotage · Phase: phase-3 · Size: M · Priority: Medium
Stage: ⬜
Rôle: responsable-innovation
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: SMI — événements internes d'innovation, parcours orchestré (Workflow E29), dépôt d'idée par formulaire (Forms)
Dépendances: EN38.1 · E42 Pivot Forms
