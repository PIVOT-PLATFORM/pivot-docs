# US27.1.2 — Mettre à jour et suivre l'avancement des Key Results

**En tant que** membre d'équipe
**Je veux** mettre à jour la valeur actuelle de mes Key Results
**Afin de** refléter l'avancement réel et maintenir les OKR à jour

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un Key Result d'un objectif dont le cycle est ouvert ou en cours, when j'envoie sa nouvelle valeur actuelle, then elle est enregistrée et l'avancement du KR (%) se recalcule aussitôt | ⬜ |
| Given une mise à jour de KR, when elle est enregistrée, then l'historique conserve valeur, date et auteur (sans écraser les mises à jour précédentes) | ⬜ |
| Given une valeur actuelle dépassant la cible du KR, when l'avancement se calcule, then il est **borné à 100 %** (jamais au-delà) | ⬜ |
| Error : given une valeur non numérique, négative sur un KR qui ne l'autorise pas, ou un cycle gelé/clôturé, when la mise à jour est soumise, then l'API retourne 400 (ou 409 si cycle clôturé) sans modifier le KR | ⬜ |
| Security : given un utilisateur, when il met à jour un Key Result, then seul l'owner du KR (ou un manager habilité sur l'équipe) peut modifier la valeur ; les autres membres restent en lecture seule | ⬜ |
| A11y : le contrôle de saisie de la valeur actuelle (champ + barre de progression) est conforme WCAG 2.1 AA (label associé, valeur/état annoncés aux lecteurs d'écran) | ⬜ |

## Hors périmètre
- La création de l'objectif et de ses Key Results initiaux (cf. US27.1.1)
- Le check-in complet (valeur + niveau de confiance + commentaire horodaté) — cette US couvre la mise à jour de la valeur du KR ; le check-in enrichi est traité par F27.4 (US27.4.1)
- Le calcul du statut ON_TRACK/AT_RISK/OFF_TRACK et de la tendance à partir du pace attendu (cf. US27.4.2)
- Les types de KR (métrique/jalon/booléen/%) et leurs règles de calcul spécifiques (cf. US27.1.3)

## Notes d'implémentation
- Entité `KeyResult` (baseline/actuel/cible, unité, poids) posée par EN27.1 — cette US couvre uniquement la mise à jour de la valeur actuelle et son historisation, pas la définition initiale.
- La mise à jour n'est autorisée que si le cycle du parent `Objective` n'est pas clôturé (cf. US27.2.1) ; un cycle gelé reste modifiable côté check-ins/valeurs (seule la définition des objectifs est verrouillée).
- Le calcul d'avancement (%) doit borner strictement à [0, 100] indépendamment de la valeur brute stockée, pour permettre de conserver la valeur réelle (utile pour analyse) tout en affichant un pourcentage cohérent.
- Chaque mise à jour de valeur doit produire une entrée d'historique immuable (valeur + date + auteur), réutilisable par le futur dashboard OKR (F27.9) sans dépendre de cette US.

---
Item Type: US · Parent: F27.1 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: macro:ingenierie-developpement
Dépendances: US27.1.1
