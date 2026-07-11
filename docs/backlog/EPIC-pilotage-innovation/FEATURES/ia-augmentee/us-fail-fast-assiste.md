# US38.11.4 — Fail-fast assisté

**En tant que** responsable innovation
**Je veux** un **fail-fast assisté** : détection précoce des idées/POC à faible traction, redondants ou bloqués, avec **recommandation argumentée de pivot/kill** et capitalisation des apprentissages
**Afin de** libérer les ressources vite et sans stigmatiser l'échec

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given les signaux d'une idée/POC (traction, activité, résultats d'expérimentation), when ils sont faibles/stagnants, then une **alerte fail-fast** est levée avec justification | ⬜ |
| Given une alerte, when le comité tranche, then la décision (pivot/kill/continuer) est tracée et **les apprentissages sont capitalisés** (REX, « kill with dignity ») | ⬜ |
| Error : given des signaux insuffisants ou absents (POC trop récent, données manquantes), when le calcul d'alerte s'exécute, then aucune alerte n'est levée par défaut (pas de faux positif par manque de données) | ⬜ |
| Security : **le comité seul décide** (pivot/kill/continuer) — l'IA ne clôture jamais une idée/POC automatiquement ; l'alerte et sa justification sont tracées (signaux utilisés, modèle, horodatage) | ⬜ |
| Éthique : le fail-fast cible les **idées/POC**, pas les personnes ; aucune sanction individuelle, aucune donnée de performance nominative n'entre dans le calcul du signal | ⬜ |

## Hors périmètre
- Automatisation de l'arrêt d'un POC ou de la clôture d'une idée (le kill reste une décision humaine du comité)
- Définition des grilles de business case (couvert par US38.6.1 — POC/MVP et US38.6.2 — Innovation accounting)
- Notation ou évaluation individuelle des porteurs d'idée

## Notes d'implémentation
- S'appuie sur EN38.2 (moteur IA & graphe) pour le calcul des signaux de traction/stagnation à partir des données d'expérimentation (US38.6.1/US38.6.2)
- Le REX et la capitalisation des apprentissages doivent rester accessibles même après clôture de l'idée (pas de suppression, cohérent avec l'esprit « kill with dignity »)
- Le seuil de déclenchement de l'alerte doit être paramétrable (éviter un fail-fast trop agressif selon le contexte organisationnel)

---
Item Type: US · Parent: F38.11 · Module: pilotage · Phase: phase-3 · Size: L · Priority: High
Stage: ⬜
Rôle: responsable-innovation
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: SMI — fonctionnalités innovantes (IA gouvernée, intelligence collective, corporate venturing)
Dépendances: EN38.1 · EN38.2 (moteur IA & graphe)
