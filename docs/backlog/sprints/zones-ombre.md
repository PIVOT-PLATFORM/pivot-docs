# Zones d'ombre à raffiner

Décisions produit / cadrages à traiter **avant** le sprint qui en dépend :

| # | Sujet | Échéance | Détail |
|---|-------|----------|--------|
| 1 | **Definition of Done Socle** | avant S6 | Le jalon « Socle terminé » n'a aucun critère écrit — rédiger la checklist (features, prod, recette PO) qui déclenche le déverrouillage phase-3 |
| 2 | ~~Arbitrage E08 ↔ E30~~ — **résolu** | tranché | **Décision (2026-07-06) : E08 devient le noyau incrémental de E30.** EPIC-whiteboard fusionné dans EPIC-collaboration — F08.1-F08.4/EN08.1-EN08.2/US08.x.x conservent leurs identifiants (pas de renumérotation) et leur `Phase: Socle` propre (non verrouillés), désormais hébergés physiquement sous `EPIC-collaboration/` ; le reste d'E30 reste `phase-3` verrouillé. Voir `EPIC-collaboration/README.md` §Couverture existante |
| 3 | **ADR-019 bus d'événements** | avant S9 | Référencé partout (boucle vivante E21, `form.submitted` E42, EN43.8, E29, ADR-008/009) mais aucune ADR ne le spécifie — chemin critique invisible de tout le plan phase-3 |
| 4 | **Statuts ADR-008→016** | S7 | Toutes « Proposé » alors que la décision d'acceptation a été prise (merge E43) — acter dans `docs/adr/` |
| 5 | **Enforcement taxonomie** | S8 | Référentiel mergé mais 0/700 US ne porte de champ `Rôle:`, script et CI exclus volontairement de la PR #65 |
| 6 | **Champ `Profils:` officieux** | S9 | Présent sur 228 US (Pilotage, E41), absent d'E42, non déclaré dans le modèle §2 du README backlog — officialiser ou retirer |
| 7 | **Cockpits sans porteur** | avant S10 | ADR-008 : composition portée par le shell (E16), « à définir après étude UX réelle » — aucune US ne porte ni l'étude ni la composition |
| 8 | **US39.1.7** | S9 | Dernier vestige « hors v2 adaptative, à confirmer » de la dissolution E31 — trancher |
| 9 | **Gate 1 à l'échelle** | continu | 558 US phase-3 devront passer DoR + Gate 1 — prévoir la passe DoR par EPIC au sprint précédant l'implémentation (comme fait sur pilotage/forms/onboarding), pas au fil de l'eau. E29/E30/E21 partiel restent à niveau inégal |
| 10 | **Hygiène repo** | S6 | 3 vulnérabilités Dependabot (1 high) · branche `fix/pages-deploy-settling-delay` en suspens (probablement couverte par #57) · PNG PlantUML cassent le build local |
| 11 | **Parité concurrentielle Whiteboard Socle** | avant lancement commercial (ou si besoin de parité day-1) | Revue Gate 1 du 2026-07-07 (benchmark Miro/Klaxoon/Microsoft Whiteboard) : le noyau Socle (US08.x) n'a ni sticky notes (US30.1.2), ni connecteurs/flèches (US30.1.3), ni commentaires ancrés (US30.2.3), ni vote structuré (US30.3.1), ni réactions temps réel (US30.11.1) — tous déjà identifiés mais verrouillés `phase-3` par la décision #2 ci-dessus. Décision maintenue à ce jour (2026-07-07) : ne pas rouvrir le verrou Socle, la révision Gate 1 s'est limitée à enrichir les outils déjà en scope (couleur, sélection multiple, duplication, groupement, guides d'alignement sur US08.3.2a). À trancher explicitement avant toute promesse commerciale de parité avec ces 3 outils : lesquels de ces items remontent en Socle (et à quel sprint), lesquels restent phase-3. |
