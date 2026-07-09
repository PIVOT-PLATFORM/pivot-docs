# US36.1.1 — Interface comptabilité publique

**En tant que** DSI
**Je veux** des connecteurs avec les SI financiers publics (M57 ; Coriolis, Grand Angle…) important les réalisations avec rapprochement automatique
**Afin de** fiabiliser le réalisé budgétaire et supprimer la ressaisie (critère discriminant n°1)

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un SI financier public cible, when le connecteur s'exécute, then les réalisations sont importées et rapprochées automatiquement des projets | ⬜ |
| Le rapprochement identifie les écarts entre engagé/réalisé importé et données PPM | ⬜ |
| Error : given un rapprochement en échec (donnée non appariée), system la met en exception plutôt que de l'ignorer | ⬜ |
| Security/Gouvernance : les imports financiers sont tracés (source, horodatage) — traçabilité | ⬜ |

## Hors périmètre
- Le traitement des exceptions de rapprochement (écran de résolution manuelle par le DSI/PMO) n'est pas détaillé dans cette US, qui couvre l'import et la mise en exception ; la résolution outillée peut faire l'objet d'une US dédiée.
- L'écriture retour vers le SI financier public (export budgétaire depuis Pivot) n'est pas incluse : le flux est en import uniquement.
- Seuls les connecteurs cités (M57, Coriolis, Grand Angle) sont couverts ; l'ajout d'un connecteur vers un autre SI financier n'est pas dans le périmètre.

## Notes d'implémentation
- Connecteur par SI financier cible (M57, Coriolis, Grand Angle), avec mapping des données importées (engagé/réalisé) vers les entités `Project`/budgets du schéma `pilotage`.
- Le rapprochement automatique doit comparer les montants importés aux données PPM existantes et distinguer un écart normal d'une donnée non appariée (mise en exception).
- La traçabilité des imports (source, horodatage) est une exigence de gouvernance publique — à modéliser comme un journal d'import dédié plutôt qu'un simple log applicatif.
- Backend `pivot-pilotage-core`, FK `public.teams.id` pour rattacher les imports à l'organisation concernée.

---
Item Type: US · Parent: F36.1 · Module: pilotage · Phase: phase-3 · Size: XL · Priority: High
Stage: ⬜
Source: PP-017 · MoSCoW: Must (conditionnel) · Lot: Lot 2 · Origine: Différenciant PM élevé au rang d'exigence + Insight I2
Profils: Privée sous droit public, Publique, État
Justification: Dossier §8-I2 : critère discriminant n°1 ; cas Strasbourg, gain 1 j -> 1 h (Haute-Savoie)
Dépendances: —
