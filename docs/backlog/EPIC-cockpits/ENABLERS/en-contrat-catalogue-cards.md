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

## Contenu d'une entrée (schéma)

Miroir machine-readable de la matrice de la spec + du mapping card → source. Une entrée par card
(~40), toutes dérivées de [cockpits-dsi-bijection.md](pathname:///pivot-docs/specs/EPIC-shell-ux/cockpits-dsi-bijection).

```typescript
type Sensibilite = "standard" | "restreint" | "sensible";   // 🟢 | 🟡 | 🔴
type Mode        = "full" | "scope" | "aggregated" | "masked"; // ● | ◑ | ◐ | ○

interface CardContract {
  key: string;                 // slug stable, ex. "roi-vs-saas"
  label: string;               // "ROI vs SaaS"
  cockpit: "C1"|"C2"|"C3"|"C4"|"C5"|"C6"|"C7";
  registre: "pilotage" | "agilite" | "collaboratif" | "transverse";
  transverse: boolean;         // couche obligatoire (présente sur tous les cockpits, non masquable en interne)
  sensibilite: Sensibilite;
  visibilite: { interne: Mode; externalise: Mode; externePur: Mode };
  source: {
    events: string[];          // types PivotEvent consommés, ex. ["pilotage.budget.alert"]
    offBus?: string;           // source hors-bus : "REST /modules", "actuator", "ITSM (EN51.10)", "audit (EN51.7)"
    module: string;            // module porteur — pilote la décision `module-wip` (EN51.2)
  };
  actionnable: boolean;        // action de gouvernance possible (interne uniquement)
}
```

**Exemple** :

```json
{
  "key": "roi-vs-saas", "label": "ROI vs SaaS", "cockpit": "C1",
  "registre": "transverse", "transverse": true, "sensibilite": "sensible",
  "visibilite": { "interne": "full", "externalise": "masked", "externePur": "masked" },
  "source": { "events": ["pilotage.budget.alert"], "module": "budget", "offBus": "module E26 (non livré)" },
  "actionnable": false
}
```

**Critères de complétion** :
- [ ] Registre versionné (JSON/TS) des ~40 cards, dérivé de la matrice de la spec — 0 valeur inventée.
- [ ] Invariant validé en CI : toute card 🔴 est `○` (masquée) pour l'externe pur par défaut ; aucune
      card actionnable par un externe.
- [ ] Cohérence croisée avec `docs/taxonomie/roles.json` (mapping macro-rôle → cockpit).
- [ ] Chaque card référence son `module` porteur (permet au moteur de décider `module-wip`).
- [ ] Chaque card déclare sa `source.events` (types du [catalogue d'événements](pathname:///pivot-docs/events/))
      et/ou sa `source.offBus` — validé contre les types déclarés dans `docs/events/`.
- [ ] Contrat consommé par EN51.2 (composition) et EN51.5 (filtre d'accès) — pas de duplication.

## Notes

- Le registre reflète la matrice de la spec ; toute évolution de la spec se répercute par
  régénération, pas par édition manuelle divergente.

---
Item Type: Enabler · Parent: E51 · Type: architecture · Module: core · Phase: phase-3
Stage: ⬜ · Priority: Critical
Dépendances: spec `EPIC-shell-ux/cockpits-dsi-bijection.md`, `docs/taxonomie/roles.json`
