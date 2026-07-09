# US38.4.2 — Business case léger (valeur / effort / risque)

**En tant que** responsable innovation
**Je veux** attacher un **business case léger** (hypothèses, valeur attendue, coût/effort, risques) à un concept
**Afin de** objectiver la décision d'investir sans lourdeur excessive

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un concept, when je le documente, then un business case léger structuré est enregistré et versionné | ⬜ |
| Given deux concepts, when je les compare, then leurs business cases sont mis en regard | ⬜ |
| Error : given un business case soumis sans valeur attendue ni coût/effort renseignés, when je le valide, then l'enregistrement est refusé (champs structurants obligatoires) | ⬜ |
| Security : la modification d'un business case n'est autorisée qu'à son auteur ou à un rôle habilité (responsable innovation) ; les versions antérieures restent consultables (audit) et ne sont pas supprimables | ⬜ |
| A11y : le formulaire de saisie et la vue de comparaison de business cases sont utilisables au clavier, avec les valeurs comparées annoncées de façon exploitable par un lecteur d'écran (pas seulement une mise en regard visuelle en colonnes) | ⬜ |

## Hors périmètre
- Le scoring multicritère formel (US38.4.1) — le business case léger est narratif/structuré, pas un calcul de score pondéré
- La comparaison à grande échelle (portefeuille complet, arbitrage budgétaire) — couverte par F38.5 (portefeuille d'innovation)
- Un outillage financier avancé (VAN, TRI, simulation) — reste volontairement « léger », pas un business case financier complet

## Notes d'implémentation
- Le business case léger se rattache à un `Concept` du modèle SMI (EN38.1), avec versionnement (chaque modification crée une nouvelle version, sans écraser la précédente)
- La comparaison de deux business cases est une vue en regard des champs structurés (hypothèses, valeur attendue, coût/effort, risques), pas un calcul agrégé supplémentaire
- Champs volontairement simples (pas de finance avancée) pour rester cohérent avec l'esprit « léger » demandé — à ne pas complexifier au-delà de valeur/coût-effort/risques/hypothèses

---
Item Type: US · Parent: F38.4 · Module: pilotage · Phase: phase-3 · Size: M · Priority: Medium
Stage: ⬜
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: SMI — Système de Management de l'Innovation (état de l'art, ISO 56002/56000)
Dépendances: EN38.1 (modèle SMI & moteur)
