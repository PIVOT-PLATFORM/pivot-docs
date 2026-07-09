# US22.4.3 — Dépendances typées (FS/SS/FF/SF) + retard/avance

**En tant que** chef de projet
**Je veux** lier les tâches par les 4 types de dépendances (FS, SS, FF, SF) avec retard/avance (lag/lead)
**Afin de** modéliser l'enchaînement réel des tâches

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given deux tâches, when je crée un lien FS/SS/FF/SF, then l'ordonnancement respecte le type et le retard/avance (± jours) | ⬜ |
| Given un cycle de dépendances, when je tente de le créer, then le système le détecte et le refuse | ⬜ |
| Given un lien, when je le crée à la souris entre deux barres, then il est typé FS par défaut et modifiable | ⬜ |
| Error : given une tentative de créer un lien vers la tâche elle-même ou un doublon d'un lien existant, then le système refuse la création avec un message explicite | ⬜ |
| Security : seul un utilisateur avec un rôle d'édition sur le projet peut créer/modifier/supprimer une dépendance ; les tentatives refusées sont journalisées | ⬜ |
| A11y : la création/modification d'un lien de dépendance est réalisable sans souris (sélection clavier des deux tâches + choix du type via menu accessible), avec annonce du lien créé pour les lecteurs d'écran | ⬜ |

## Hors périmètre
- La création de lien par glisser-déposer à la souris directement sur les barres du Gantt : couverte par US22.4.10 (cette US couvre le modèle de dépendance et sa validation, pas l'interaction directe)
- Le calcul du chemin critique et des marges découlant des dépendances : couvert par US22.4.7
- La résolution automatique des conflits entre dépendance et contrainte de date : couverte par US22.4.4

## Notes d'implémentation
- La détection de cycle doit s'exécuter côté serveur (moteur EN22.1) avant tout persistance du lien, pour rester fiable en co-édition concurrente
- Le lag/lead (retard/avance) est exprimé en unités de temps calendaire ou ouvré selon le calendrier de la tâche cible (dépendance avec US22.4.5) : à clarifier au moment de l'implémentation si les deux modes doivent coexister
- Les 4 types FS/SS/FF/SF doivent être modélisés comme un champ typé sur l'entité Dépendance du graphe temporel unique (EN22.1), pas comme des cas particuliers ad hoc

---
Item Type: US · Parent: F22.4 · Module: pilotage · Phase: phase-3 · Size: L · Priority: Critical
Stage: ⬜
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: Parité MS Project en mode web — modèle temporel unique (EN22.1), altitude pilotée par le profil (E40)
Dépendances: EN22.1 (modèle temporel unique)
