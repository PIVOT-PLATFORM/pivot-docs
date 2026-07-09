# US38.8.2 — Veille & scouting technologique

**En tant que** veilleur
**Je veux** organiser la **veille & le scouting** (tendances, technologies, signaux faibles) alimentant l'idéation
**Afin de** détecter tôt les opportunités et menaces

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given des sources de veille, when elles sont configurées, then les signaux sont collectés, qualifiés et reliés aux axes stratégiques | ⬜ |
| Given un signal fort, when il émerge, then il peut générer une idée/campagne | ⬜ |
| Error : given une source de veille externe indisponible (flux cassé, timeout), when la collecte s'exécute, then l'échec est signalé au veilleur sans bloquer la collecte des autres sources | ⬜ |
| Security : la configuration des sources de veille et la qualification des signaux sont réservées au rôle veilleur/responsable innovation ; si une source de veille externe nécessite des identifiants (API, abonnement), ceux-ci ne sont jamais exposés aux utilisateurs finaux consultant les signaux | ⬜ |

## Hors périmètre
- La capture et l'enrichissement des idées elles-mêmes une fois générées à partir d'un signal : couverts par US38.2.1
- Le matchmaking IA ou l'analyse sémantique automatique des signaux : hors périmètre de cette US (voir F38.11 si pertinent ultérieurement), la qualification reste manuelle/humaine ici
- L'intégration technique avec des flux de veille tiers spécifiques (RSS, API propriétaires) n'est pas détaillée ; cette US couvre le modèle fonctionnel (source, signal, qualification, lien stratégique)

## Notes d'implémentation
- Un signal doit pouvoir être relié aux axes stratégiques définis dans US38.1.1 (politique & ambition d'innovation), pour permettre de prioriser la veille selon la stratégie
- La génération d'une idée/campagne à partir d'un signal fort doit réutiliser le flux existant de capture d'idées (US38.2.1) plutôt que créer un chemin de création parallèle
- S'appuie sur le modèle SMI d'EN38.1 pour le stockage des sources et signaux

---
Item Type: US · Parent: F38.8 · Module: pilotage · Phase: phase-3 · Size: M · Priority: Low
Stage: ⬜
Profils: Grand groupe, Publique, État
Justification: SMI — Système de Management de l'Innovation (état de l'art, ISO 56002/56000)
Dépendances: EN38.1 (modèle SMI & moteur)
