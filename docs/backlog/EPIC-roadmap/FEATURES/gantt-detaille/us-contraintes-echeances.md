# US22.4.4 — Contraintes de date & échéances

**En tant que** chef de projet
**Je veux** poser des contraintes (Dès que possible/Le plus tard/Doit commencer le/Doit finir le/Ne pas commencer avant…) et des échéances (deadlines)
**Afin de** refléter les engagements externes comme dans MS Project

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une contrainte de type « Doit finir le », when l'ordonnancement s'exécute, then elle est respectée ou un conflit est signalé | ⬜ |
| Given une échéance (deadline), when la date de fin la dépasse, then un indicateur d'alerte apparaît sans bloquer | ⬜ |
| Error : given une contrainte incompatible avec une dépendance, then le conflit est explicité | ⬜ |
| Security : seul un utilisateur avec un rôle d'édition sur le projet peut poser ou modifier une contrainte/échéance ; la levée d'un conflit reste visible en lecture seule pour les autres rôles | ⬜ |
| A11y : l'indicateur d'alerte de dépassement d'échéance et le message de conflit de contrainte ne reposent pas uniquement sur la couleur (icône + texte) et sont annoncés aux lecteurs d'écran via `aria-live` | ⬜ |

## Hors périmètre
- Le calcul du chemin critique impacté par les contraintes : couvert par US22.4.7
- La résolution automatique des conflits (proposition de replanification) : hors périmètre, seule la détection/signalisation est couverte ici
- Les calendriers ouvrés utilisés pour évaluer si une date de contrainte est atteignable : couverts par US22.4.5

## Notes d'implémentation
- Les types de contraintes doivent reprendre le référentiel MS Project (ASAP, ALAP, MSO, MFO, SNET, SNLT, FNET, FNLT) porté par le moteur d'ordonnancement EN22.1
- Une échéance (deadline) est un indicateur, pas une contrainte dure : elle ne doit jamais bloquer le recalcul du moteur, contrairement aux contraintes de type "Doit"
- La détection de conflit contrainte/dépendance doit s'appuyer sur le même mécanisme de validation que la détection de cycle (US22.4.3), côté serveur

---
Item Type: US · Parent: F22.4 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: Parité MS Project en mode web — modèle temporel unique (EN22.1), altitude pilotée par le profil (E40)
Dépendances: EN22.1 (modèle temporel unique)
