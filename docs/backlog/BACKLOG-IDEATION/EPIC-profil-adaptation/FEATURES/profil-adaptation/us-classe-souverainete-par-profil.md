# US40.1.3 — Classe de souveraineté par profil

**En tant que** RSSI
**Je veux** dériver la classe de souveraineté (A/B/C) et l'hébergement exigé depuis le profil et la sensibilité des données
**Afin de** traiter la souveraineté comme un curseur indexé sur le statut, pas un interrupteur

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un profil et la sensibilité des données, when la classe est calculée, then une classe A/B/C et un hébergement cible (SaaS FR/UE, dédié, on-premise) sont prescrits | ⬜ |
| Given une classe C sur données sensibles, when un hébergement non conforme est choisi, then le système bloque ou alerte | ⬜ |
| Error : given un profil sans sensibilité des données renseignée (dépendance US40.1.1 incomplète), when la classe est calculée, then le calcul est refusé avec message explicite plutôt que de prescrire une classe par défaut silencieuse | ⬜ |
| Security/Gouvernance : la dérivation de classe de souveraineté est traçable et opposable (audit horodaté, qui/quand/pourquoi) — cette classe est la référence utilisée par le guard module (US40.1.2) pour bloquer l'activation de tout module non conforme | ⬜ |

## Hors périmètre
- Le blocage effectif de l'activation d'un module non conforme (guard module) est implémenté par US40.1.2 — cette US ne fait que produire et exposer la classe.
- La capture de la sensibilité des données et du profil source est couverte par US40.1.1, pas ici.
- Pas de catalogue exhaustif des hébergeurs SaaS FR/UE certifiés dans cette US — seule la classe cible (A/B/C) et le type d'hébergement attendu sont prescrits, la qualification des offres concrètes est hors périmètre.

## Notes d'implémentation
- Backend `pivot-pilotage-core` (schéma Flyway `pilotage`) : règle de dérivation profil × sensibilité des données → classe A/B/C, versionnée pour rester auditable si la règle évolue.
- La classe calculée doit être stockée (pas recalculée à la volée à chaque lecture) pour permettre l'audit historique exigé par l'AC Security/Gouvernance.
- Concerne uniquement les profils Grand groupe, Privée sous droit public, Publique, État (cf. frontmatter `Profils`) — TPE/PME n'ont pas cette dérivation.
- Dépend de EN18.9 (modèle Application→Projet) et de US40.1.1 (profil + sensibilité des données en entrée).

---
Item Type: US · Parent: F40.1 · Module: pilotage · Phase: phase-3 · Size: M · Priority: Critical
Stage: ⬜
Source: PP-A03 · MoSCoW: Must · Lot: Lot 1 · Origine: Synthèse v2
Profils: Grand groupe, Privée sous droit public, Publique, État
Justification: Synthèse v2 §6-I3 + ADR souveraineté
Dépendances: EN18.9 (modèle Application→Projet)
