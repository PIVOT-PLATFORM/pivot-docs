# US18.5.3 — Améliorer la lisibilité de la liste des activités

**En tant que** utilisateur final
**Je veux** une largeur de nom d'activité élargie et la suppression de la colonne redondante Type d'activité
**Afin de** lire plus facilement la liste des activités

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given la liste des activités, when je la consulte, then la largeur de la colonne Nom d'activité est élargie de +40% | ⬜ |
| Given la liste des activités, when je la consulte, then la colonne redondante Type d'activité est supprimée | ⬜ |
| Error : given un nom d'activité très long, system l'affiche dans la colonne élargie sans casser la mise en page | ⬜ |
| Security/Gouvernance : la modification d'affichage n'altère ni les données ni les habilitations d'accès à la liste | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La recherche et le filtrage de la liste sont couverts par les US de recherche/navigation.

## Notes d'implémentation
- Liste des activités (module pilotage) : colonne Nom élargie de +40%, suppression de la colonne Type d'activité redondante.

---
Item Type: US · Parent: F18.5 · Module: pilotage · Phase: phase-3 · Size: XS · Priority: Medium
Stage: ⬜
Rôle: utilisateur-final
Source: Backlog OPPA (reconstitution v1–v2.1) — US-503
Dépendances: —
