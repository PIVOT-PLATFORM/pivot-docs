# US21.1.4 — Matrice de pondération des impacts

**En tant que** PMO, Archi
**Je veux** « Matrice de pondération des impacts »
**Afin de** adapter l'analyse de risque à la nature du projet

## Contexte

Vecteur de poids par typologie sur 6 dimensions (Délai, Coût, Qualité, Sécurité, Conformité, Réputation).

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une typologie de la bibliothèque (US21.1.2), when un Archi définit ou modifie son vecteur de poids sur les 6 dimensions (Délai, Coût, Qualité, Sécurité, Conformité, Réputation), then la matrice est enregistrée et versionnée | ⬜ |
| Given un profil projet rattaché à une typologie pondérée, when le score de gravité multidimensionnelle est calculé (US21.2.2), then les poids d'impact de la typologie du projet sont appliqués automatiquement sans saisie manuelle | ⬜ |
| Error : given une tentative d'enregistrement d'un vecteur de poids incomplet (dimension manquante) ou hors des bornes autorisées, system rejette l'enregistrement et retourne les dimensions invalides | ⬜ |
| Security : seuls les rôles Archi et admin peuvent créer ou modifier une matrice de pondération ; une modification impacte le scoring de tous les projets rattachés à la typologie, donc l'action est journalisée (auteur, date, ancien/nouveau vecteur) | ⬜ |

## Hors périmètre
- Le calcul du score de gravité multidimensionnelle lui-même, qui consomme cette matrice — couvert par US21.2.2.
- La définition des typologies et de leurs familles dominantes — couverte par US21.1.2.
- La définition des 6 dimensions d'impact elles-mêmes (elles sont fixes pour ce lot, pas de dimension personnalisée).

## Notes d'implémentation
- Persistée via l'entité `ImpactWeight` (cf. EN21.1 — schéma Flyway `risk`), reliée à `Typology` (US21.1.2) avec un vecteur de poids sur les 6 dimensions fixes.
- Le versionnement de la matrice est nécessaire pour ne pas réécrire silencieusement le scoring historique des risques déjà évalués : une modification s'applique aux nouveaux calculs, l'historique conserve la trace du vecteur utilisé au moment du calcul.
- Consommée automatiquement par le moteur de scoring (F21.2), en particulier la gravité multidimensionnelle (US21.2.2) — aucune action manuelle requise côté Chef de projet.

---
Item Type: US · Parent: F21.1 · Module: risk · Phase: phase-3 · Size: M · Priority: Critical
Stage: ⬜
Rôle: officier-responsable-pmo, delegue-a-la-protection-des-donnees
Dépendances: US21.1.2
