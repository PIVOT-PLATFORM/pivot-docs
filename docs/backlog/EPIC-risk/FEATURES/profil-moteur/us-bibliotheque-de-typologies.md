# US21.1.2 — Bibliothèque de typologies

**En tant que** PMO, Archi
**Je veux** « Bibliothèque de typologies »
**Afin de** adapter l'analyse de risque à la nature du projet

## Contexte

10 typologies préconfigurées (build, progiciel, migration, cloud, IA, cyber, transformation, réglementaire, R&D, public) avec familles dominantes.

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given le référentiel de typologies, when un PMO ou un Archi consulte la bibliothèque, then les 10 typologies préconfigurées sont listées, chacune avec ses familles de risques dominantes associées | ⬜ |
| Given une typologie existante, when un Archi l'édite ou en crée une nouvelle (nom, familles dominantes rattachées), then la typologie est enregistrée et devient sélectionnable dans le questionnaire de cadrage (US21.1.1) | ⬜ |
| Error : given une tentative de création d'une typologie sans famille dominante rattachée ou avec un nom déjà utilisé, system rejette la création et retourne un message d'erreur explicite | ⬜ |
| Security : seuls les rôles Archi et admin peuvent créer, modifier ou désactiver une typologie ; la consultation de la bibliothèque reste ouverte à tout membre de l'équipe projet (PMO, Chef de projet) | ⬜ |

## Hors périmètre
- Le calcul du poids d'impact par typologie sur les 6 dimensions (Délai, Coût, Qualité, Sécurité, Conformité, Réputation) — couvert par la matrice de pondération (US21.1.4), qui consomme cette bibliothèque.
- La sélection de la typologie dans le questionnaire de cadrage et son rattachement au profil projet — couverts par US21.1.1.
- La suggestion de risques types filtrée par typologie — couverte par US21.1.5.

## Notes d'implémentation
- Persistée via l'entité `Typology` (cf. EN21.1 — schéma Flyway `risk`), reliée à `RiskFamily` pour les familles dominantes.
- Les 10 typologies préconfigurées sont livrées comme données de référence (seed) à l'installation du module ; la bibliothèque reste extensible (ajout/édition par un Archi) sans redéploiement.
- Le rattachement aux familles dominantes doit référencer la taxonomie universelle 12 familles (US21.1.3).

---
Item Type: US · Parent: F21.1 · Module: risk · Phase: phase-3 · Size: M · Priority: Critical
Stage: ⬜
Rôle: officier-responsable-pmo, delegue-a-la-protection-des-donnees
Dépendances: —
