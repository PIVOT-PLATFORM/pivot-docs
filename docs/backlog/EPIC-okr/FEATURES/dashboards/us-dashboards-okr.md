# US27.9.1 — Tableaux de bord OKR (mes OKR / équipe / entreprise / à risque)

**En tant que** responsable pilotage
**Je veux** disposer de tableaux de bord : **mes OKR**, **équipe**, **entreprise**, **liste à risque** et **heatmap** d'avancement/confiance
**Afin de** piloter d'un coup d'œil à chaque niveau

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un utilisateur, when il ouvre « mes OKR », then il voit ses objectifs, avancement, confiance et prochains check-ins | ⬜ |
| Given un cycle, when j'ouvre la heatmap, then avancement et confiance sont visualisés par équipe/objectif | ⬜ |
| Given la liste « à risque », when elle s'affiche, then elle trie les OKR AT_RISK/OFF_TRACK par criticité | ⬜ |
| Error : given un cycle sans aucun OKR créé, when j'ouvre un des tableaux de bord, then un état vide explicite s'affiche (pas d'erreur, pas de heatmap vide muette) | ⬜ |
| Security : le tableau de bord « équipe »/« entreprise » n'affiche que les OKR visibles pour le rôle courant (respect des OKR marqués confidentiels — cf. US27.10.2) | ⬜ |
| A11y : la heatmap encode avancement/confiance par un second canal que la seule couleur (motif, icône ou libellé), et les tableaux/listes sont navigables au clavier avec libellés ARIA | ⬜ |

## Hors périmètre
- La définition des règles de calcul du statut ON_TRACK/AT_RISK/OFF_TRACK (portée par EN27.1) : ce dashboard consomme le statut, il ne le calcule pas
- L'export des dashboards en PDF/image/tableur (couvert par US27.9.2)
- La personnalisation avancée des dashboards (filtres sauvegardés, widgets configurables) — non demandée ici

## Notes d'implémentation
- Les 5 vues (mes OKR, équipe, entreprise, à risque, heatmap) consomment les agrégats calculés par le moteur EN27.1 (avancement, score, statut, confiance) sans recalcul côté frontend
- La liste « à risque » trie par criticité : OFF_TRACK avant AT_RISK, puis par proximité de fin de cycle
- Respecter la visibilité par défaut « transparence » (US27.10.1) tout en filtrant les OKR confidentiels (US27.10.2) selon le rôle de l'utilisateur consultant le dashboard

---
Item Type: US · Parent: F27.9 · Module: pilotage · Phase: phase-3 · Size: L · Priority: High
Stage: ⬜
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: Raffinage OKR état de l'art (Doerr/Google ; Quantive/Workboard/Viva Goals/Perdoo)
Dépendances: EN27.1 (modèle OKR & moteur)
