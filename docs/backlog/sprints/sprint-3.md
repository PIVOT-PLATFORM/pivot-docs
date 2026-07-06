# Sprint 3 — Espace compte + Administration

**Branches :** une branche par US/Enabler — `feat/{us-id}-{slug}` (voir [§Règles d'utilisation](./README.md#règles-dutilisation))
**Scope :** E02 (espace compte utilisateur) + E06 (administration tenant/superadmin)

| US | Titre | Size | Priorité | 🤖 Dev |
|----|-------|------|----------|--------|
| US02.1.1 | Voir et éditer son profil | M | High | 🔄 |
| US02.1.2 | Préférence de langue | S | Medium | 🔄 In progress |
| US02.2.1 | Changer son mot de passe | M | High | 🔄 |
| US02.2.2 | Changer son adresse email | M | High | 🔎 Review |
| US02.2.3 | Voir et révoquer ses sessions actives | M | Medium | 🔎 Review |
| US02.2.4 | Suppression de compte (RGPD) | M | High | 🔄 In progress |
| US02.3.1 | Export de ses données personnelles | M | High | 🔎 Review |
| US06.1.1 | Liste des utilisateurs du tenant (backend) | M | High | 🔎 Review |
| US06.1.2 | Liste des utilisateurs du tenant (Angular) | M | High | 🔄 In progress |
| US06.1.3 | Modifier le rôle d'un utilisateur | M | High | 🔄 In progress |
| US06.1.4 | Désactiver un compte | S | High | 🔄 In progress |
| US06.1.5 | Réactiver un compte désactivé | S | High | 🔄 In progress |
| US06.2.1 | Créer un tenant | L | Critical | 🔄 In progress |
| US06.2.2 | Désactiver un tenant | M | High | 🔎 Review |
| US06.2.3 | Liste des tenants | M | Medium | 🔄 |

> **Parallélisable :** US02.x ‖ US06.x — dépendances : US06.1.5 après US06.1.4 (et US06.1.2, le bouton vit dans la liste Angular) ; US02.2.4 après US02.2.1 ; US06.1.3/US06.1.4+US06.1.5 après US06.1.2 (UI partagée).
> **Vague 1 (2026-07-05) :** US06.1.1 en Review (`pivot-core` #127 mergée, backend seul — pas de composant `pivot-ui`). US02.1.1, US02.2.1, US06.2.3 en In progress : `pivot-core` mergé (#129, #128, #126) mais `pivot-ui` encore ouvert non mergé (#71, #70, #69 — voir fichiers US pour détail des gates).
> **Vague 2 (2026-07-05) :** US02.2.2, US02.2.3, US02.3.1, US06.2.2 en Review — voir fichiers US pour PR et détail des gates. US02.1.2 et US06.2.1 restent **In progress** : côté US02.1.2, `pivot-core` #130 est sorti de draft (CI en cours) mais pas encore mergé, et `pivot-ui` #72 reste draft ; côté US06.2.1, `pivot-core` #134 est mergé mais `pivot-ui` #76 (stackée sur #69, elle-même draft) reste draft — pas de `Stage: Review` tant que le volet Angular concerné n'est pas sorti de draft. `pivot-core` : PR#126 (US06.2.3), PR#134 (US06.2.1) et PR#135 (US06.2.2) avaient chacune créé indépendamment `SuperAdminTenantController`/`Service` — collision déjà réconciliée en une seule classe (`list()` + `create()` + `checkSlug()` + `updateStatus()`), les trois PR sont mergées sur `main`. **Point d'attention restant :** `pivot-ui` — PR#76 (US06.2.1) est rebasée sur la branche non mergée de PR#69 (US06.2.3) et inclut son commit — fusionner #69 en premier ou ensemble.
> **Vagues 3-4 (2026-07-05/06) :** Sprint 3 complet — 15/15 US implémentées. US06.1.2 (`pivot-ui` #82) consomme le contrat US06.1.1 déjà mergé. US02.2.4 : `pivot-core` #140 + `pivot-ui` #83, action irréversible (RGPD Art.17) — review Sécurité/RGPD obligatoire avant merge. US06.1.3 (`pivot-core` #141 + `pivot-ui` #84) et US06.1.4/US06.1.5 (`pivot-core` #142 + `pivot-ui` #85, une seule implémentation pour les deux US — même endpoint `PATCH .../status`) sont empilées en chaîne sur les branches de US06.1.2 pour éviter une collision sur `AdminUsersComponent`/`AdminUserController` : fusionner dans l'ordre #82 → #84 → #85 (`pivot-ui`) et #141 → #142 (`pivot-core`, US06.1.1 déjà mergée). CI verte sur les 7 PR. *(Point de situation 2026-07-06 : `pivot-core` #140 est sortie de draft — prête pour revue — les 6 autres PR restent draft. Aucune mergée à ce jour, aucune touchée par le mainteneur.)* Déviation documentée et cohérente entre #141/#142 : ce backend ne renvoie jamais 401 (pas d'`AuthenticationEntryPoint` custom) — un token invalide/révoqué renvoie systématiquement 403, y compris pour les cas où l'AC littérale dit "401".
