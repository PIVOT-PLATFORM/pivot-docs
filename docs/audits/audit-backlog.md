# Audit — backlog

**Statut :** À compléter
**Dernière révision :** 2026-07-08
**Profil agent responsable :** Product Owner + Scrum Master

## Résumé

Audit de la cohérence et de la traçabilité du backlog markdown (`docs/backlog/`) — source de
vérité unique de la plateforme (voir `pivot-docs/CLAUDE.md`). Catégorie absente jusqu'ici alors
que pivot-docs se définit elle-même comme "source de vérité du backlog" et que la cohérence du
backlog a déjà fait l'objet de plusieurs corrections rétroactives (Gate 5 rétroactifs sprints
1-4, reséquencement E17, audit de cohérence 41 EPICs — voir historique récent de `main`).

## Points d'attention

- [ ] Cohérence `Stage` frontmatter vs. état réel des PR/issues GitHub sur chaque repo
      (ex. items marqués `Stage: Backlog` alors qu'une PR est déjà mergée, ou l'inverse)
- [ ] Traçabilité AC → test : échantillonner des US `Stage: Done` et vérifier que chaque AC a
      bien un test associé (règle explicite de tous les CLAUDE.md : "AC sans test = non
      implémenté, peu importe le code présent")
- [ ] Doublons ou items fantômes entre `docs/backlog/` et les issues GitHub des repos
      applicatifs (déjà vérifié une fois pour 6 issues collaboratif le 2026-07-08, aucun cas
      trouvé à ce moment-là, mais pas un audit exhaustif de tous les repos)
- [ ] Dépendances déclarées entre US/Enablers (ex. Vague 0 sprint 5 EN17.x) — vérifier qu'aucun
      cycle ni dépendance non satisfaite ne bloque silencieusement un item marqué `Ready`
- [ ] Fraîcheur de `sprints/README.md` — le sprint courant est-il correctement identifié (pas
      de sprint antérieur laissé sans ✅ complet par oubli)

## Historique des révisions

| Version | Date | Score | Évolutions principales |
|---------|------|-------|------------------------|
| v1 | 2026-07-08 | — | Initialisation |
