# US10.2.1 — Minuteur configurable et rotation participants (temps réel)

**En tant que** participant au standup
**Je veux** voir le minuteur décompter et passer au participant suivant automatiquement
**Afin de** respecter le timebox de la session

**Gate 1 réalisé le 2026-07-22** — remplace le stub outline précédent. Prolonge US10.1.2 (démarrage,
transition manuelle `next`). Le minuteur configurable lui-même (`timePerPersonSeconds`) est déjà
posé par US10.1.1 — cette US couvre l'**expiration automatique** et son **rendu visuel**.

**Décision d'architecture (voir US10.1.1 §Architecture temps réel) : pas de broadcast serveur par
seconde.** Le POC de référence PouetPouet (`apps/web/src/hooks/useDaily.ts`) calcule le temps
écoulé **côté client**, purement dérivé de `speakingAt` (`Date.now() - speakingAt`), rafraîchi par
un `setInterval` local d'1s — le serveur ne diffuse qu'aux changements d'état réels. **Différence
avec PouetPouet** : PouetPouet n'auto-avance jamais à expiration (juste "Temps dépassé" affiché,
en attente d'un clic animateur) — l'AC ci-dessous va plus loin et exige un **passage automatique
serveur** à expiration, sur le modèle de `RetroPhaseScheduler` (poll périodique, pas de tick).

## Critères d'acceptation

### Expiration automatique (backend `pivot-core`)

| Critère | 🤖 Dev |
|---------|--------|
| Given une session `RUNNING` avec un participant `SPEAKING` depuis `speakingAt`, when `speakingAt + timePerPersonSeconds + extraSeconds` (US10.2.2) est dépassé, then un scheduler périodique (`fixedDelay` ~2s, sur le modèle de `RetroPhaseScheduler`) déclenche automatiquement la **même transition** que `POST .../next` (US10.1.2) — participant courant → `DONE`, suivant → `SPEAKING`, ou fin de session si dernier participant | ⬜ |
| Given le passage automatique ci-dessus, when il a lieu, then le même événement `PARTICIPANT_CHANGED`/`SESSION_ENDED` qu'un passage manuel est broadcasté — un participant ne peut pas distinguer une rotation automatique d'une rotation manuelle | ⬜ |
| Given un passage manuel (`POST .../next`, US10.1.2) survenant avant l'expiration, when il a lieu, then il prévaut — le scheduler suivant ne trouve plus ce participant `SPEAKING` et ne fait rien (idempotence par le même verrou conditionnel que US10.1.2) | ⬜ |

### Rendu (frontend `pivot-ui`)

| Critère | 🤖 Dev |
|---------|--------|
| Given un participant `SPEAKING`, when l'interface l'affiche, then un minuteur visuel circulaire décompte depuis `timePerPersonSeconds + extraSeconds` jusqu'à 0, recalculé chaque seconde **localement** (`speakingAt` + horloge client, jamais un tick serveur) — inspiré du composant `CircleTimer` du POC PouetPouet (`apps/web/src/app/(app)/daily/[id]/page.tsx`), adapté aux tokens `@pivot/design-system` | ⬜ |
| Given le temps dépassé (dépassement du minuteur avant que le serveur n'ait encore traité l'auto-passage — fenêtre du `fixedDelay` du scheduler), when l'interface l'affiche, then le minuteur passe en état visuel "dépassé" (couleur alerte, temps compté en négatif) plutôt que de se bloquer à 0 | ⬜ |
| Given le nom du participant courant et celui à venir, when l'interface l'affiche, then les deux sont visibles simultanément (courant en grand, suivant en aperçu) | ⬜ |

### Test

| Critère | 🤖 Dev |
|---------|--------|
| Test TI : session démarrée avec `timePerPersonSeconds` court (via horloge injectable, comme `RetroPhaseScheduler`) → scheduler déclenché → rotation automatique constatée en base et broadcastée | ⬜ |
| Test TI : passage manuel juste avant expiration → le scheduler suivant ne déclenche pas de second passage (pas de saut de participant) | ⬜ |

## Hors périmètre

- **Notification sonore/visuelle de fin de tour** au-delà du changement d'état visuel — non
  spécifié.

## Notes d'implémentation

- **Backend** : `StandupTimerScheduler` (nouveau, `@Scheduled(fixedDelayString =
  "${pivot.agilite.standup.timer-scheduler.fixed-delay-ms:2000}")`), calque exact de
  `RetroPhaseScheduler` — `Clock` injectable pour les tests, jamais `Instant.now()` en dur.
  Réutilise `StandupSessionService`'s transition interne (extraite en méthode partagée entre le
  contrôleur `next` et ce scheduler, comme `RetroPhaseService#autoTransitionToRevue` est partagé
  entre bouton manuel et scheduler).
- **Frontend** : composant `standup-timer` (SVG cercle, mêmes proportions que `CircleTimer`
  PouetPouet — rayon/`stroke-dasharray` en fonction du ratio écoulé/total), signal local
  incrémenté par `setInterval(1000)` pour forcer le recalcul, jamais stocké côté serveur.

---
Item Type: US · Parent: F10.2 · Module: agilite · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: utilisateur-final
Dépendances: US10.1.2
