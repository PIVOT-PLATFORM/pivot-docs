# US38.14.4 — Valorisation par options réelles & momentum

**En tant que** responsable innovation / COMEX
**Je veux** valoriser les innovations incertaines par les **options réelles** et suivre leur **momentum/traction**
**Afin de** décider sous incertitude comme un investisseur, pas comme un comptable

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une innovation incertaine, when je la valorise, then une approche **options réelles** (valeur de l'option de continuer/abandonner) est proposée | ⬜ |
| Given le momentum (traction, engagement, résultats), when il évolue, then il alimente les décisions de gate et d'allocation (F38.3/F38.5) | ⬜ |
| Error : given des paramètres de valorisation incomplets ou incohérents (ex. volatilité/horizon manquant), when le calcul d'option réelle est lancé, then le système signale les données manquantes et ne produit pas de valorisation erronée silencieuse | ⬜ |
| Security : la valorisation financière (options réelles) et les indicateurs de momentum sensibles ne sont visibles que par les rôles habilités (responsable innovation, COMEX) ; les hypothèses de calcul sont tracées pour audit | ⬜ |

## Hors périmètre
- Le calcul financier complet de type modèle Black-Scholes avec tous ses raffinements : une approche simplifiée/pédagogique d'options réelles est visée, pas un outil de pricing financier certifié
- La décision automatique de gate/allocation à partir de la valorisation : ces indicateurs alimentent la décision humaine (F38.3/F38.5), ils ne décident pas seuls
- Le suivi du momentum de facteurs hors SMI (marché financier externe, cours de bourse) : uniquement la traction/engagement/résultats internes au SMI

## Notes d'implémentation
- S'appuie sur EN38.2 (signaux & prédiction) pour le calcul du momentum ; le modèle d'options réelles est un calcul dédié à documenter avec ses hypothèses (incertitude, horizon, valeur d'abandon)
- Les résultats de valorisation et de momentum doivent être exposés aux décisions de gate (F38.3) et d'allocation de portefeuille (F38.5) via le modèle EN38.1, sans dupliquer la logique de scoring multicritère (F38.4)
- Toute hypothèse de calcul (taux, volatilité estimée) doit rester modifiable et tracée pour permettre la revue par le COMEX

---
Item Type: US · Parent: F38.14 · Module: pilotage · Phase: phase-3 · Size: L · Priority: Low
Stage: Backlog
Profils: Grand groupe, Publique, État
Justification: SMI — fonctionnalités innovantes (IA gouvernée, intelligence collective, corporate venturing)
Dépendances: EN38.1 · EN38.2 (moteur IA & graphe)
