# US38.11.1 — Assistant IA d'idéation

**En tant que** porteur d'innovation
**Je veux** un **assistant IA** qui aide à formuler, reformuler et enrichir une idée (problème, bénéfices, variantes), avec l'humain qui garde la main
**Afin de** abaisser la barrière à la contribution et enrichir la qualité des idées

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une idée en cours, when je sollicite l'assistant, then il propose reformulations, angles, bénéfices et risques — **suggestions révisables, jamais imposées** | ⬜ |
| Given une suggestion IA, when je l'accepte, then la paternité humaine et l'apport IA sont tracés (transparence) | ⬜ |
| Error : given un service IA indisponible ou en timeout, when je sollicite l'assistant, then un message d'erreur explicite s'affiche et l'idée reste éditable manuellement (dégradation gracieuse, pas de blocage) | ⬜ |
| Security : appels IA **tracés** (utilisateur, idée, prompt, modèle, horodatage), **non-entraînement sur les données** contractualisé, option modèle souverain ; l'assistant n'écrit jamais directement dans l'idée sans validation explicite de l'auteur | ⬜ |
| A11y : les suggestions IA sont annoncées aux lecteurs d'écran (zone `aria-live`) et accessibles/actionnables au clavier (accepter/rejeter/modifier) | ⬜ |

## Hors périmètre
- Génération automatique d'idées complètes sans intervention humaine (l'assistant reformule/enrichit, il ne crée pas d'idée de toutes pièces)
- Choix du modèle IA sous-jacent et sa gouvernance détaillée (couvert par US38.11.6 — Gouvernance de l'IA d'innovation)
- Traduction automatique multilingue des idées

## Notes d'implémentation
- S'appuie sur EN38.2 (moteur IA & graphe) pour l'appel au LLM ; ne définit pas ce moteur, le consomme
- Le marquage « apport IA » doit être stocké au niveau du champ/de la version de l'idée (pas seulement en méta), pour rester visible dans l'historique et les exports
- Prévoir un flag d'activation par organisation (aligné avec le principe de désactivation administrateur d'US38.11.6)

---
Item Type: US · Parent: F38.11 · Module: pilotage · Phase: phase-3 · Size: L · Priority: High
Stage: ⬜
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: SMI — fonctionnalités innovantes (IA gouvernée, intelligence collective, corporate venturing)
Dépendances: EN38.1 · EN38.2 (moteur IA & graphe)
