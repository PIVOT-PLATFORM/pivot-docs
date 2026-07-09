# US27.8.1 — Mise à jour automatique des KR (sources de données)

**En tant que** responsable pilotage
**Je veux** **mettre à jour automatiquement** la valeur d'un KR depuis une source de données (BI, base, Jira, tableur, **API/webhook**) préconfigurée
**Afin de** réduire la saisie manuelle et fiabiliser la mesure

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un KR relié à une source (API, requête BI, cellule tableur), when la synchro s'exécute, then sa valeur actuelle est mise à jour et historisée | ⬜ |
| Given une source indisponible, when la synchro échoue, then le dernier point est conservé et l'échec signalé | ⬜ |
| Security : les identifiants de connexion sont stockés chiffrés (coffre-fort) | ⬜ |
| Security : seul le owner du KR (ou un rôle habilité) peut créer/modifier une connexion de synchronisation ; le webhook entrant est authentifié (secret partagé/signature) | ⬜ |

## Hors périmètre
- Le développement de connecteurs spécifiques à chaque outil tiers (Jira, BI précis, tableur précis) — cette US couvre le mécanisme générique de synchronisation, pas chaque intégration métier
- L'import/export ponctuel manuel de fichiers (CSV/XLSX/JSON) — couvert par US27.8.2
- La modification manuelle rétroactive de l'historique des valeurs synchronisées

## Notes d'implémentation
- Le KR reste la source de vérité affichée ; la synchro écrit un nouveau point historisé (jamais une réécriture destructive de l'historique)
- Le coffre-fort de secrets pour les identifiants de connexion doit être cohérent avec l'infra existante de la plateforme (pas de solution ad hoc par connecteur)
- L'échec de synchro (source indisponible) doit être visible côté KR sans dégrader le score déjà calculé sur le dernier point connu — cf. moteur EN27.1
- Le webhook entrant (mode push) doit être distingué du mode pull (requête vers l'API/BI) au niveau de la configuration de la source

---
Item Type: US · Parent: F27.8 · Module: pilotage · Phase: phase-3 · Size: L · Priority: Medium
Stage: ⬜
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: Raffinage OKR état de l'art (Doerr/Google ; Quantive/Workboard/Viva Goals/Perdoo)
Dépendances: EN27.1 (modèle OKR & moteur)
