# US22.4.10a — Déplacement/redimensionnement des barres et création de lien par glisser

**En tant que** chef de projet
**Je veux** déplacer et redimensionner les barres du Gantt à la souris, et créer un lien de dépendance en tirant d'une barre à une autre
**Afin de** éditer les dates, la durée et l'enchaînement des tâches aussi directement qu'un client lourd

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une barre de tâche, when je la déplace horizontalement, then ses dates de début et de fin se décalent et le moteur d'ordonnancement (EN22.1) recalcule les tâches dépendantes | ⬜ |
| Given une barre de tâche, when je saisis l'une de ses poignées d'extrémité pour la redimensionner, then sa durée est mise à jour et le recalcul des dépendances est déclenché | ⬜ |
| Given deux barres, when je tire depuis le bord d'une barre source jusqu'à une barre cible, then un lien de dépendance FS est créé par défaut (typage détaillé délégué à US22.4.3) | ⬜ |
| Error : given un déplacement ou un redimensionnement qui violerait une contrainte de date bloquante ou créerait un cycle de dépendance, then l'action à la souris est annulée, la barre revient à sa position initiale et un message explicite s'affiche | ⬜ |
| Security : seul un utilisateur membre du projet avec un rôle d'édition peut déplacer, redimensionner ou lier une barre ; un non-membre reçoit 404 (isolation multi-tenant, aucune fuite d'existence), un membre en lecture seule reçoit 403 sur toute tentative de modification | ⬜ |
| A11y : pendant le glisser, les valeurs en cours (nouvelles dates, nouvelle durée) sont annoncées via une région ARIA `live`, et chaque barre expose un rôle et un libellé accessibles décrivant sa tâche et ses dates | ⬜ |

## Hors périmètre
- Le typage détaillé du lien (FS/SS/FF/SF) et le retard/avance (lag/lead) : couverts par US22.4.3 (cette US crée le lien FS par défaut via glisser)
- Le zoom de l'échelle de temps et l'ajustement de l'avancement à la poignée : couverts par US22.4.10b
- L'équivalent clavier complet des interactions (formulaire d'édition accessible) et la virtualisation du rendu : couverts par US22.4.10c
- La co-édition temps réel multi-utilisateurs (résolution de conflits simultanés) : couverte par EN22.2

## Notes d'implémentation
- Toute modification directe (déplacement, redimensionnement, création de lien) doit passer par le même moteur de validation et de recalcul que les formulaires structurés (EN22.1), pour garantir la cohérence entre édition directe et édition structurée
- Le recalcul déclenché par le glisser doit être `debounce`/`throttle` : ne pas relancer un recalcul complet du planning à chaque pixel de déplacement, mais valider et persister une seule fois au relâchement de la souris
- La détection de cycle et la vérification des contraintes bloquantes s'exécutent côté serveur (EN22.1) avant persistance ; l'annulation visuelle côté client est optimiste et réconciliée avec la réponse du serveur

---
Item Type: US · Parent: F22.4 · Module: pilotage · Phase: phase-3 · Size: L · Priority: Critical
Stage: ⬜
Dépendances: EN22.1 (modèle temporel unique), US22.4.3 (dépendances typées, pour le modèle de lien créé par glisser)
