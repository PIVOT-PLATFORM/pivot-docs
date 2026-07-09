# US21.4.4 — Événements de risque émis

**En tant que** Dev
**Je veux** que les changements significatifs d'un risque publient les événements normalisés `risk.raised`, `risk.threshold.exceeded` et `risk.mitigation.due` sur le bus PIVOT
**Afin de** que les autres modules puissent réagir en temps réel sans interroger directement la base risque

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un nouveau risque créé et qualifié, when il passe à l'état actif, then l'événement `risk.raised` est publié avec `project_ref`, criticité et famille du risque | ⬜ |
| Given un risque dont la criticité dépasse le seuil d'appétence configuré (US21.2.3), when le seuil est franchi, then l'événement `risk.threshold.exceeded` est publié une seule fois par franchissement | ⬜ |
| Error : given une erreur de publication sur le bus (bus indisponible), system met l'événement en file de retry locale et ne perd pas l'événement, sans bloquer la transaction métier qui l'a déclenché | ⬜ |
| Security : seuls les événements issus d'une transaction métier validée (risque persisté en base) sont publiés — aucune donnée sensible (ex. contenu libre de commentaires internes) n'est incluse dans le payload de l'événement | ⬜ |

## Hors périmètre
- La consommation d'événements émis par d'autres modules — traitée par US21.4.1.
- La définition du seuil d'appétence lui-même — portée par US21.2.3.
- La garantie de livraison exactly-once sur le bus — le bus PIVOT garantit at-least-once (cf. architecture bus), les consommateurs doivent gérer l'idempotence.

## Notes d'implémentation
- S'appuie sur l'adaptateur bus PIVOT (EN21.3) côté producteur.
- Le payload de chaque événement est versionné (schéma stable) car consommé par des modules et adaptateurs externes (US21.4.3, cockpits F21.9).
- Publication transactionnelle recommandée (outbox pattern) pour garantir que l'événement n'est émis que si l'écriture en base du risque a réussi.

---
Item Type: US · Parent: F21.4 · Module: risk · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Dépendances: US21.1.6
