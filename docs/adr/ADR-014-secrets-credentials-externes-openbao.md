# ADR-014 — Secrets & credentials externes (OpenBao, rotation)

**Date :** 2026-07-05
**Statut :** Accepté
**Décideurs :** Architecte plateforme, RSSI
**Contexte technique :** organisation `PIVOT-PLATFORM`

---

## Contexte

Le portail ne doit **jamais** détenir de secret longue durée en clair ni parler directement aux modules avec des credentials statiques. Avec des dizaines d'adaptateurs consommant des API tierces (clés, tokens de service), une fuite de credential doit être contenue et révocable rapidement.

## Décision

1. **OpenBao** est le coffre-fort central, consommé par tous les modules (étend EN07.2, aujourd'hui limité aux Docker secrets statiques).
2. **Secrets dynamiques** : générés à la demande, à courte durée de vie, plutôt que des secrets statiques longue durée.
3. **Rotation automatique**, portée (scope) limitée par module — aucun accès croisé aux secrets d'un autre module.
4. Un adaptateur ne détient aucun secret longue durée : il le récupère à l'exécution, scoped, et le relâche.
5. Une clé fuitée doit être **révocable en une action**.

## Conséquences

- **Positif :** blast radius d'une fuite de credential contenu à la durée de vie du secret dynamique ; pas de secret en clair dans le code ni la configuration d'un adaptateur.
- **Négatif :** dépendance opérationnelle forte à la disponibilité d'OpenBao ; complexité d'intégration pour les adaptateurs qui ne supportent pas nativement les secrets à courte durée de vie (nécessite parfois un sidecar ou un wrapper).
- **Interdit :** un secret d'API tierce stocké en dur dans le code, la configuration ou les variables d'environnement d'un adaptateur.

## Alternatives écartées

- Docker secrets statiques (portée actuelle d'EN07.2) : suffisant pour un secret unique de démarrage, mais ne supporte ni rotation automatique ni révocation instantanée à l'échelle de dizaines d'adaptateurs.
- Gestion des secrets déléguée à chaque adaptateur (fichier `.env` propre) : impossible à auditer, aucune rotation centralisée, contredit le principe « le portail ne détient jamais de secret longue durée ».

## Historique

| Version | Date | Évolution |
|---------|------|-----------|
| v1 | 2026-07-05 | Décision initiale |
