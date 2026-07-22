# US11.6.2 — Facteur de concentration (% max par jour moyen)

**En tant que** Scrum Master
**Je veux** appliquer un **facteur de concentration** (focus factor) — un pourcentage maximal de temps réellement productif par jour moyen (ex. 70 %), paramétrable
**Afin de** refléter qu'un jour ouvré n'est pas 100 % de dev (réunions, support, contexte)

**Gate 1 réalisé le 2026-07-22** — remplace la version outline précédente. Prolonge US11.6.1.
Référence POC : `computeMemberCapacity`/`effectiveFocus` de PouetPouet
(`apps/web/src/lib/capacity.ts`) — override membre > override événement > défaut, même précédence.

## Critères d'acceptation

### Facteur de concentration (backend `pivot-core`)

| Critère | 🤖 Dev |
|---------|--------|
| Given un événement, when `PATCH .../events/{id}` avec `{ focusFactorPercent }`, then le facteur est appliqué au niveau événement (tous les membres, sauf override individuel) — bornes `[10, 100]` | ⬜ |
| Given un membre, when `PATCH .../events/{id}/members/{memberId}` avec `{ focusFactorPercent }`, then ce facteur **surcharge** celui de l'événement pour ce seul membre | ⬜ |
| Given aucun facteur saisi (ni événement ni membre), when la capacité se calcule, then le facteur par défaut **70 %** s'applique — ou celui dérivé de la maturité agile si renseignée (US11.6.4, qui prévaut sur le défaut brut) | ⬜ |
| Given la capacité d'un membre, when elle se calcule, then **capacité nette (jours) = jours ouvrés nets (US11.6.1) × quotité (`availabilityPercent`, US11.2.1) × facteur de concentration effectif** | ⬜ |

### Cas d'erreur

| Critère | 🤖 Dev |
|---------|--------|
| Error : given `focusFactorPercent` hors bornes `[10, 100]` (borne basse non nulle : un facteur à 0 rendrait la capacité toujours nulle, signal probable d'une saisie erronée plutôt qu'une intention réelle), when modification événement/membre, then 400 code `INVALID_FOCUS_FACTOR` | ⬜ |

### Sécurité

| Critère | 🤖 Dev |
|---------|--------|
| Security : mêmes règles d'accès qu'US11.1.1/US11.2.1 (créateur ou membre de l'équipe, 404 anti-énumération) | ⬜ |

## Hors périmètre

- **Facteur par rôle** (mentionné au stub d'origine, « équipe / membre / rôle ») — PIVOT n'a pas de
  concept de rôle par membre d'événement à ce stade (`CapacityEventMember` n'a pas de champ
  `role`) ; seuls les niveaux événement et membre sont retenus pour ce lot.

## Notes d'implémentation

- **Backend** : `CapacityEvent` gagne `focusFactorPercent` nullable (défaut effectif 70 si `null`
  et pas de maturité renseignée — voir US11.6.4) ; `CapacityEventMember` gagne
  `focusFactorPercent` nullable (override). Migration additive, même fichier que le reste du lot.
  `CapacityEventService`/`CapacityMemberService` étendus pour la validation `[10, 100]`. Le calcul
  effectif (résolution événement/membre/défaut/maturité) est centralisé dans le moteur consolidé
  (US11.6.5), pas dupliqué à chaque endpoint.
- **Frontend** : champ facteur de concentration dans `capacity-event-form` (niveau événement) et
  dans la ligne de chaque membre de `capacity-event-detail` (override, affiché seulement si
  différent du défaut événement/maturité).

---
Item Type: US · Parent: F11.6 · Module: agilite · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: scrum-master
Dépendances: US11.6.1
