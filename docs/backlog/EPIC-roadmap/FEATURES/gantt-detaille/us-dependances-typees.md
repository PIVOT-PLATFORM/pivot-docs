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

---
Item Type: US · Parent: F22.4 · Module: pilotage · Phase: phase-3 · Size: L · Priority: Critical
Stage: Backlog
Rôle: chef-de-projet
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: Parité MS Project en mode web — modèle temporel unique (EN22.1), altitude pilotée par le profil (E40)
Dépendances: EN22.1 (modèle temporel unique)
