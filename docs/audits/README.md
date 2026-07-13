---
slug: /
sidebar_position: 0
sidebar_label: "Vue d'ensemble"
---

# Audits

Un fichier par domaine, mis à jour en place. **Jamais de fichiers datés.**

**Gabarit de rapport formel** (squelette commun + grille d'analyse par domaine) → skill
`pivot-audit-format` (`.project/skills/skill-audit-format.yaml`) — à charger par le profil agent
responsable avant tout audit formel, pas pour les simples éditions de contexte/scaffolding.
Règle clé : `Historique des révisions` ne grossit que sur un vrai passage noté (score réel),
jamais sur une édition de préparation — `Statut` reste `À compléter` tant qu'aucun audit formel
n'a été publié.

**Vues consolidées cross-domaine** (mises à jour après chaque audit formel publié, jamais en
avance) :
- [BILAN-AUDITS.md](BILAN-AUDITS.md) — score et statut de chaque domaine, findings récents,
  synthèse chiffrée par priorité
- [PLAN-ACTION.md](PLAN-ACTION.md) — plan d'action consolidé, findings actifs regroupés par
  sévérité (CRITICAL → INFO) avec ID cross-référencé au rapport de domaine

| Audit | Fichier | Profil agent responsable |
|-------|---------|---------------------------|
| Architecture | [audit-architecture.md](audit-architecture.md) | Architecte Modules (coordination) + Architecte Java/Spring + Architecte Angular |
| CI/CD / DevSecOps (+ gouvernance des packages inter-repos) | [audit-cicd.md](audit-cicd.md) | Expert DevSecOps |
| Sécurité applicative (+ OIDC/IAM, + temps réel/WebSocket) | [audit-cyber.md](audit-cyber.md) | Expert Red Team (offensif) + Expert Blue Team (corrections) |
| Base de données | [audit-bdd.md](audit-bdd.md) | Architecte BDD PostgreSQL |
| Modules | [audit-modules.md](audit-modules.md) | Architecte Modules |
| QA / Tests | [audit-qa.md](audit-qa.md) | Expert QA |
| RGPD | [audit-rgpd.md](audit-rgpd.md) | Expert RGPD |
| UX / Accessibilité (+ performance) | [audit-ux.md](audit-ux.md) | Expert UX/UI + Architecte Angular |
| Dépendances / Supply chain | [audit-dependances.md](audit-dependances.md) | Expert DevSecOps |
| Observabilité | [audit-observabilite.md](audit-observabilite.md) | Expert DevSecOps |
| Backlog | [audit-backlog.md](audit-backlog.md) | Product Owner + Scrum Master |
| Recette fonctionnelle (Socle) | [audit-recette-fonctionnelle.md](audit-recette-fonctionnelle.md) | Expert QA + Product Owner |
