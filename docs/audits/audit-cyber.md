# Audit — cyber

**Statut :** À compléter
**Dernière révision :** 2026-07-08
**Profil agent responsable :** Expert Red Team (offensif) + Expert Blue Team (corrections)

## Résumé

> _À remplir lors du premier audit formel._

Périmètre étendu à deux sous-domaines transverses jusqu'ici non rattachés à un audit — voir
sous-sections dédiées ci-dessous : OIDC/IAM et temps réel/WebSocket.

## Points d'attention

- [ ] À identifier

## Sous-domaine — OIDC / IAM

**Profil agent responsable :** Expert OIDC / IAM

Chaque repo core/ui a un rôle d'expert "OIDC / IAM" explicitement distinct du Red/Blue Team
générique, et toute modification touchant OIDC/rôles/session déclenche un hard block Gate 4
automatique dans tous les repos (`pivot-core`, `pivot-ui`, et modules) — signal que ce
sous-domaine mérite un suivi dédié plutôt que d'être noyé dans l'audit cyber général.

- [ ] Opaque tokens (SHA-256, TTL BDD) — cohérence de l'implémentation entre `pivot-core` et
      tout module qui viendrait à en dépendre
- [ ] OIDC enterprise (PKCE S256) — statut réel de l'intégration (`TenantOidcConfig`,
      provisionnement JIT) vs. ce que documente `pivot-core/CLAUDE.md`
- [ ] Aucun silent refresh via iframe (règle absolue documentée dans `pivot-ui/CLAUDE.md`) —
      vérifier l'absence de régression sur ce point à chaque implémentation auth Angular

## Sous-domaine — Temps réel / WebSocket (STOMP)

**Profil agent responsable :** Architecte Temps Réel / WebSocket (domaine Collaboratif)

Fonctionnalité déjà en production (EN08.1, isolation de room STOMP mergée dans
`pivot-collaboratif-core`) sans audit sécurité dédié à ce jour.

- [ ] Isolation par room WS — un non-membre ne peut pas s'abonner à un topic
      `/topic/whiteboard/{boardId}/*` (souscription STOMP refusée) — vérifier la couverture de
      test réelle (`WhiteboardWebSocketIT`)
- [ ] Fuite de données dans les payloads de présence — `PARTICIPANTS_UPDATE` ne doit exposer que
      `userId`/`displayName`/`role`/`color`, jamais l'email (règle déjà documentée sur l'issue
      #29 de `pivot-collaboratif-core`)
- [ ] Isolation tenant sur les topics WS — un participant d'un autre tenant ne doit ni apparaître
      ni recevoir le flux
- [ ] Résilience aux déconnexions/reconnexions (multi-onglets, crash sans LEAVE) — cf. issue #32
      (deux mécanismes de présence concurrents actuellement en cours d'unification)

## Historique des révisions

| Version | Date | Score | Évolutions principales |
|---------|------|-------|------------------------|
| v1 | 2026-06-20 | — | Initialisation |
| v2 | 2026-07-08 | — | Ajout profil agent responsable + sous-domaines OIDC/IAM et temps réel/WebSocket |
