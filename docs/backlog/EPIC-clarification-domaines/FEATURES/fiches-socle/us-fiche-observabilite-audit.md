# US52.1.7 — Fiche de clarification : Observabilité & audit

En tant qu'**architecte / RSSI**
Je veux une **fiche de clarification du domaine Observabilité & audit** (E04)
Afin de clarifier les données de santé/journalisation, qui peut les lire et par quels endpoints.

**Livrable** : `docs/architecture/domaines/observabilite-audit.md`, conforme au template EN52.1.

**Périmètre du domaine** *(repos pivot-core + modules · schéma `public` pour `audit_events`)* :
endpoints de santé (actuator, ports internes `:808x`), métriques, `audit_events` (écriture par les
domaines, lecture admin — endpoint EN51.7 planifié). Distinguer santé **technique** (actuator, non
`/api`) et journal d'**audit métier**.

## Critères d'acceptation

- [ ] **Axe 1 — CRUD** : matrice CRUD d'`audit_events` (Create = append par les domaines, jamais
      Update/Delete ; Read = admin) + inventaire des endpoints de santé/métriques (R technique).
- [ ] **Axe 2 — Accès par profil** : lecture d'audit = `ADMIN`/`SUPER_ADMIN` selon la portée (`◑`) ;
      endpoints actuator = exploitation (non exposés aux `USER`) ; le noter précisément.
- [ ] **Axe 3 — Mécanisme** : point d'exposition de la santé (actuator sur `:8081` **non** `/api`,
      cf. cockpits) et point d'application de la lecture d'audit nommés ; renvoi EN52.2.
- [ ] **Axe 4 — Sources externes** : santé consommée par la card cockpit (interne), code-scanning
      (EN51.8, ↓in) comme source d'audit sécurité — référencés depuis EN52.3.
- [ ] Error case + Security : `audit_events` mutable/effaçable (doit être append-only), actuator
      accessible publiquement, ou action sensible (changement de rôle US52.1.4) non journalisée = écarts.
- [ ] `npm run lint` + `npm run build` verts.

## Notes d'implémentation

- Source d'audit : code `pivot-core`/modules (actuator, `audit_events`) + E04 + EN51.7. La fiche est la
  contrepartie « qui lit / d'où vient la santé » de l'axe observabilité des cockpits (E51).

---
Item Type: US · Parent: F52.1 · Module: core · Phase: Socle · Size: M · Priority: High
Stage: ⬜
Dépendances: EN52.1, EN52.2, EN52.3, E04, EN51.7 (lecture audit), EN51.8 (code-scanning)
