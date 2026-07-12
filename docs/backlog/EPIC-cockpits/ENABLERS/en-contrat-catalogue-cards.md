# EN51.3 — Contrat / registre du catalogue de cards

**Type d'enabler** : architecture / contrat

**Objectif technique** : Rendre **machine-readable** le catalogue de cards spécifié dans
[cockpits-dsi-bijection.md](pathname:///pivot-docs/specs/EPIC-shell-ux/cockpits-dsi-bijection)
(§ Catalogue de cards & matrice de sensibilité) : pour chaque card, sa clé, son cockpit, sa
**sensibilité** (🟢/🟡/🔴), sa **visibilité par classe d'identité**, sa **source de données** et le
**module porteur**. C'est le **contrat figé en Gate 4**.

**Justification** : Le moteur (EN51.2) et le filtre d'accès (EN51.5) ont besoin d'une source de
vérité unique et versionnée, pas d'une table markdown recopiée dans le code. Une card ne peut être
posée sur un cockpit que si son entrée existe dans ce registre.

## Contenu d'une entrée

```text
key · label · cockpit(JTBD) · registre(Pilotage/Agilité/Collaboratif/Transverse)
sensibilite: 🟢|🟡|🔴
visibilite: { interne, externalise, externe_pur }  (● | ◑ | ◐ | ○)
source: { module, endpoint|absente }
obligatoire: bool  (jamais masquable en interne)
```

**Critères de complétion** :
- [ ] Registre versionné (JSON/TS) des ~40 cards, dérivé de la matrice de la spec — 0 valeur inventée.
- [ ] Invariant validé en CI : toute card 🔴 est `○` (masquée) pour l'externe pur par défaut ; aucune
      card actionnable par un externe.
- [ ] Cohérence croisée avec `docs/taxonomie/roles.json` (mapping macro-rôle → cockpit).
- [ ] Chaque card référence son `module` porteur (permet au moteur de décider `module-wip`).
- [ ] Contrat consommé par EN51.2 et EN51.5 (pas de duplication).

## Notes

- Le registre reflète la matrice de la spec ; toute évolution de la spec se répercute par
  régénération, pas par édition manuelle divergente.

---
Item Type: Enabler · Parent: E51 · Type: architecture · Module: core · Phase: phase-3
Stage: ⬜ · Priority: Critical
Dépendances: spec `EPIC-shell-ux/cockpits-dsi-bijection.md`, `docs/taxonomie/roles.json`
