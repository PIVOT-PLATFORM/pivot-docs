---
sidebar_position: 2
sidebar_label: "Plan d'action"
---

# Plan d'action consolidé — PIVOT Platform

## Mis à jour le 2026-07-08 — aucun finding actif (aucun audit formel publié)

## Sources : 11 domaines `docs/audits/*.md` (voir [README.md](README.md))

---

## Légende statuts

| Statut | Signification |
|---|---|
| ✅ **Fait** | Corrigé et livré (mergé sur `main`) |
| 🔄 **En attente** | Implémenté mais non validé (recette, confirmation BDD/CI) |
| ⬜ **À faire** | Identifié, non commencé |
| ❌ **Bloqué** | Dépendance externe (prestataire, décision juridique, budget) |

---

## Protocole d'alimentation

Après chaque audit formel publié (`docs/audits/audit-{domaine}.md`), reporter ici chaque finding
actif (sévérité ≥ LOW retenue) avec le **même ID** que dans le rapport de domaine (`VULN-XXX` ou
équivalent propre au domaine), dans la section de sévérité correspondante, au format :

| ID | Audit | Description | Fichier(s) | Sprint | Statut |
|---|---|---|---|---|---|

Un finding résolu reste dans ce plan jusqu'au cycle suivant (marqué ✅), puis est retiré à la
publication d'audit suivante sur le même domaine — l'historique complet reste dans
`docs/audits/audit-{domaine}.md` (section "Statut des findings/dettes historiques").

---

## 🔴 CRITICAL

_Aucun — aucun audit formel publié._

---

## 🟠 HIGH / P0-P1

_Aucun — aucun audit formel publié._

---

## 🟡 MEDIUM / P1-P2

_Aucun — aucun audit formel publié._

---

## 🔵 LOW / P2-P3

_Aucun — aucun audit formel publié._

---

## ⚪ INFO / P3-Post-live

_Aucun — aucun audit formel publié._

---

## Tableau de synthèse

| Priorité | Total | ✅ Fait | ⬜ À faire | 🔄 En attente | ❌ Bloqué |
|---|---|---|---|---|---|
| 🔴 CRITICAL | 0 | 0 | 0 | 0 | 0 |
| 🟠 HIGH P0-P1 | 0 | 0 | 0 | 0 | 0 |
| 🟡 MEDIUM P1-P2 | 0 | 0 | 0 | 0 | 0 |
| 🔵 LOW P2-P3 | 0 | 0 | 0 | 0 | 0 |
| ⚪ INFO | 0 | 0 | 0 | 0 | 0 |
| **Total** | **0** | **0** | **0** | **0** | **0** |

---

## Roadmap

_Aucune — se construit à partir des premiers audits formels publiés (priorité aux domaines
cybersécurité et architecture, cf. [BILAN-AUDITS.md](BILAN-AUDITS.md))._
