# US27.9.2 — Export & rapports de comité

**En tant que** PMO
**Je veux** générer des **rapports de comité** (synthèse OKR d'un cycle) et les exporter (PDF, image, tableur)
**Afin de** alimenter les instances de direction

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un cycle, when je génère le rapport, then il synthétise objectifs, scores, statuts, faits marquants et OKR à risque | ⬜ |
| Given un export PDF/image, when je le produis, then il est fidèle et prêt pour un comité | ⬜ |
| Error : given un cycle non clôturé ou incomplet (check-ins manquants), when je génère le rapport, then les données partielles sont signalées explicitement dans le rapport (pas de score silencieusement absent) | ⬜ |
| Security : la génération du rapport et l'export tableur ne reprennent que les OKR visibles pour le rôle du demandeur (OKR confidentiels exclus sauf droit explicite) | ⬜ |
| A11y : l'export PDF/image conserve une alternative textuelle (tableau exportable) pour les données présentées visuellement (graphiques, heatmap) | ⬜ |

## Hors périmètre
- La définition du contenu des dashboards eux-mêmes (couverte par US27.9.1) : cette US se limite à la synthèse et l'export en rapport de comité
- La diffusion automatique programmée du rapport (envoi périodique par email/Slack) — non demandée ici
- L'édition manuelle du contenu du rapport après génération (commentaires, mise en forme libre)

## Notes d'implémentation
- Le rapport de comité agrège les données déjà calculées par le moteur OKR (EN27.1) sur le périmètre d'un cycle : objectifs, scores, statuts, OKR à risque
- Formats d'export : PDF, image, tableur — la génération PDF/image doit rester fidèle à la mise en forme (pas de recomposition simplifiée)
- Le filtrage par rôle/confidentialité doit être appliqué au moment de la génération, pas seulement à l'affichage, pour éviter une fuite via l'export

---
Item Type: US · Parent: F27.9 · Module: pilotage · Phase: phase-3 · Size: M · Priority: Medium
Stage: ⬜
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: Raffinage OKR état de l'art (Doerr/Google ; Quantive/Workboard/Viva Goals/Perdoo)
Dépendances: EN27.1 (modèle OKR & moteur)
