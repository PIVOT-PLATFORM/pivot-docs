# US35.1.5 — Classification des portefeuilles

**En tant que** DSI
**Je veux** classifier la sensibilité des projets (sécurité, foncier, précontentieux) et aligner l'hébergement par classe
**Afin d'** appliquer la doctrine 'cloud au centre' avec le bon niveau de protection selon la sensibilité

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un projet, when un administrateur habilité lui attribue une classe de sensibilité (sécurité, foncier, précontentieux, etc.), then la classe est enregistrée et affichée sur la fiche projet et dans les vues de portefeuille | ⬜ |
| Given un projet classifié, when sa classe de sensibilité est déterminée, then l'hébergement applicable (recommandé par la doctrine "cloud au centre") est affiché en cohérence avec cette classe | ⬜ |
| Error : given un projet classifié comme sensible mais hébergé sur une offre non conforme à sa classe, system génère une alerte visible par le DSI (dashboard ou notification) sans bloquer silencieusement l'accès | ⬜ |
| Error : given une tentative de classification par un rôle non habilité, system refuse l'opération et journalise la tentative | ⬜ |
| Security : la classe de sensibilité attribuée à un projet détermine effectivement les droits d'accès en lecture/écriture aux données de ce projet (ex. restriction aux rôles habilités pour la classe "précontentieux") — la classification n'est pas un simple libellé cosmétique mais conditionne le contrôle d'accès appliqué par US35.1.1 | ⬜ |
| Security : les changements de classification (attribution, modification, retrait) sont tracés (auteur, ancienne/nouvelle classe, horodatage) et l'opération est réservée aux rôles autorisés (ex. DSI, administrateur portefeuille) | ⬜ |
| A11y : l'indicateur de classe de sensibilité affiché sur la fiche projet et en vue portefeuille n'est pas porté uniquement par la couleur (label textuel + icône), conformément WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Étiquetage au niveau tâche (granularité plus fine) et blocage DLP associé — couverts par US35.1.6 (Étiquettes et DLP sur tâches)
- Provisionnement ou migration effective de l'hébergement d'un projet vers une offre conforme — cette US couvre la détection/l'alerte, pas l'automatisation de la remédiation
- Définition des rôles et périmètres de visibilité génériques — couverte par US35.1.1 ; cette US ajoute une dimension de contrôle par classe de sensibilité au-dessus de ce socle
- Catalogue exhaustif des classes de sensibilité et de leur mapping réglementaire (à cadrer avec le client au Gate 1, cette US porte le mécanisme, pas la taxonomie complète)

## Notes d'implémentation
- La classe de sensibilité est un attribut du projet dans `pivot-pilotage-core` (schéma Flyway `pilotage`) ; son évaluation doit être branchée sur le moteur de contrôle d'accès par périmètre défini en US35.1.1 plutôt que dupliquée
- La doctrine "cloud au centre" (Dossier §8-I4) suppose un référentiel d'hébergements avec un niveau de conformité par offre — à minima un mapping simple classe→hébergement(s) conforme(s) doit exister pour permettre la détection d'écart
- Priorité Must conditionnel : vérifier au Gate 1 si le mapping hébergement fait partie du MVP de cette US ou peut être simplifié à une classification déclarative sans vérification automatique d'hébergement dans un premier temps
- Le journal des changements de classification peut réutiliser le format d'événement d'audit commun défini pour US35.1.4 (SSO et audit)

---
Item Type: US · Parent: F35.1 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: Backlog
Source: PP-028 · MoSCoW: Must (conditionnel) · Lot: Lot 2 · Origine: Insight I4
Profils: Grand groupe, Privée sous droit public, Publique, État
Justification: Dossier §8-I4 : doctrine 'cloud au centre'
Dépendances: —
