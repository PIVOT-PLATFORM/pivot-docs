# US19.4.2 — Exporter les résultats d'une session terminée

**En tant que** animateur
**Je veux** exporter les résultats d'une session terminée (JSON / CSV)
**Afin de** partager ou archiver les données de la session

**Gate 1 réalisé le 2026-07-23** — remplace le stub outline précédent. Prolonge US19.4.1.

**Écart de périmètre résolu (Gate 1)** : le README de l'EPIC (`F19.4`) mentionnait « PDF ou JSON »,
mais le fichier AC détaillé de cette US (source de vérité, présent avant même ce Gate 1) demandait
déjà **JSON/CSV**, jamais PDF. PIVOT n'a aucune librairie de génération PDF dans le codebase
(vérifié) et ADR-007 exclut toute nouvelle dépendance tierce lourde sans validation — cohérent
avec l'AC détaillé. **Décision retenue** : JSON/CSV uniquement pour ce socle, PDF non repris (le
README de l'EPIC sera mis à jour séparément pour refléter le fichier AC, hors périmètre de ce
changement précis).

## Critères d'acceptation

### Export (backend `pivot-core`)

| Critère | 🤖 Dev |
|---------|--------|
| Given une session `COMPLETED` accessible à l'animateur, when `GET .../sessions/{id}/results/export?format=json\|csv`, then le fichier est retourné dans le format demandé (`Content-Disposition: attachment`) | ⬜ |
| Given `type: QUIZ`, when exporté, then questions + réponses par participant + scores finaux | ⬜ |
| Given `type: POLL`, when exporté, then options + nombre de votes + % | ⬜ |
| Given `type: WORDCLOUD`, when exporté, then liste des mots + fréquences | ⬜ |
| Given `type: BRAINSTORM`, when exporté, then post-its + catégories | ⬜ |
| Given `type: QA`, when exporté, then questions + votes + statut | ⬜ |
| Given `type: VOTE`, when exporté, then le résultat structuré selon le sous-type (même contenu que `US19.4.1`) + l'entrée d'audit (`date`, participants) | ⬜ |
| Given `format=csv`, when généré, then une ligne d'en-tête + encodage UTF-8 avec BOM (compatibilité Excel, même précédent que l'export CSV déjà utilisé ailleurs dans le codebase — vérifier s'il existe un utilitaire CSV partagé avant d'en écrire un nouveau) | ⬜ |

### Cas d'erreur

| Critère | 🤖 Dev |
|---------|--------|
| Error : given une session non `COMPLETED`, when export tenté, then 409 code `SESSION_NOT_COMPLETED` | ⬜ |
| Error : given `format` hors `{json,csv}`, when demandé, then 400 code `INVALID_EXPORT_FORMAT` | ⬜ |
| Error : given un `id` de session inexistant ou d'un autre tenant, when export, then 404 | ⬜ |

### Sécurité

| Critère | 🤖 Dev |
|---------|--------|
| Security : seul le créateur (propriétaire) ou `ROLE_ADMIN` peut exporter — un participant recevant l'URL ne peut pas l'utiliser (404) | ⬜ |
| Security : test TI obligatoire export session autre tenant → 404 | ⬜ |
| Security : donnée invité (`ROLE_GUEST`) exportée sous son `displayName` uniquement, jamais de champ additionnel non présent pour un compte authentifié (pas de fuite de métadonnée invité au-delà de ce qui est déjà public dans la session) | ⬜ |

## Hors périmètre

- **Export PDF** — voir §Écart de périmètre résolu ci-dessus.
- **Export programmé/automatique** (webhook à la clôture) — non spécifié.

## Notes d'implémentation

- **Backend** : `SessionExportService#export(sessionId, format)` — délègue à
  `SessionResultsAggregatorService` (`US19.4.1`) pour le contenu, puis sérialise en JSON natif ou
  CSV (vérifier l'existence d'un writer CSV déjà utilisé dans `pivot-core` avant d'en introduire
  un nouveau — sinon `commons-csv` ou équivalent déjà présent dans les dépendances gérées par
  Spring Boot BOM, pas de nouvelle dépendance si évitable).
- **Frontend** : bouton export sur `session-results-view` (sélecteur de format, déclenche le
  téléchargement).

---
Item Type: US · Parent: F19.4 · Module: collaboratif · Phase: phase-3 · Size: M · Priority: Medium
Stage: ⬜
Rôle: animateur-facilitateur
Dépendances: US19.4.1
