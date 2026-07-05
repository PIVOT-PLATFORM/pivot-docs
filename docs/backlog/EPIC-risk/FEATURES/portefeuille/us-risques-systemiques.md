# US21.5.2 — Risques systémiques

**En tant que** PMO, RSSI
**Je veux** être alerté automatiquement quand plusieurs risques du portefeuille partagent une même cause de concentration (fournisseur, compétence rare, échéance commune)
**Afin de** détecter et traiter les risques transverses avant qu'ils ne se matérialisent simultanément sur plusieurs projets

## Contexte

Détecter les concentrations (même fournisseur, compétence rare, échéance commune) sur le portefeuille.

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given plusieurs risques actifs de projets différents rattachés au même `vendor_ref` (US21.4.5), when leur nombre dépasse le seuil de concentration configuré, then le PMO/RSSI reçoit un signalement de risque systémique listant les projets et risques concernés | ⬜ |
| Given des risques actifs sur des projets différents dont les échéances de traitement tombent dans une même fenêtre temporelle, when la consolidation de portefeuille (US21.5.1) est recalculée, then une concentration « échéance commune » est signalée avec la liste des risques impliqués | ⬜ |
| Error : given un portefeuille sans donnée de vendor/compétence/échéance suffisante pour croiser les risques, system n'affiche aucun faux signalement et journalise l'absence de détection possible plutôt que de lever une alerte non fondée | ⬜ |
| Security : le signalement de concentration n'expose que les risques et projets sur lesquels le PMO/RSSI destinataire est habilité ; un risque hors périmètre d'accès n'apparaît jamais dans le détail, même agrégé | ⬜ |

## Hors périmètre
- Le rattachement d'un risque à un Vendor/Contract lui-même — pré-requis fourni par US21.4.5.
- L'agrégation par famille/entité en heat map — couverte par US21.5.1 (Consolidation de portefeuille), consommée ici comme donnée d'entrée.
- La détection de signaux faibles par IA — traitée par US21.7.2 (Détection de signaux faibles), qui est un mécanisme distinct (IA gouvernée) de cette détection déterministe de concentration.
- La définition et la gestion du référentiel de compétences rares — supposée déjà disponible via le domaine RH/Delivery, hors périmètre risque.

## Notes d'implémentation
- S'appuie sur la consolidation de portefeuille (US21.5.1) pour l'agrégation multi-projets et sur les liens Vendor/Contract (US21.4.5) pour la dimension fournisseur.
- La détection de concentration est une règle déterministe (seuils configurables), distincte de la détection de signaux faibles par IA (US21.7.2) — pas de dépendance à un modèle IA ici.
- Le seuil de concentration (nombre de risques / fenêtre temporelle) doit être configurable au niveau du portefeuille, pas figé en dur.

---
Item Type: US · Parent: F21.5 · Module: risk · Phase: phase-3 · Size: L · Priority: High
Stage: Backlog
Dépendances: US21.5.1, US21.4.5
