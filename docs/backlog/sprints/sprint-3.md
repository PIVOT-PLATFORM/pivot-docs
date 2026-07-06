# Sprint 3 — Espace compte + Administration

**Branches :** une branche par US/Enabler — `feat/{us-id}-{slug}` (voir [§Règles d'utilisation](./README.md#règles-dutilisation))
**Scope :** E02 (espace compte utilisateur) + E06 (administration tenant/superadmin)

| US | Titre | Size | Priorité | 🤖 Dev |
|----|-------|------|----------|--------|
| US02.1.1 | Voir et éditer son profil | M | High | ✅ |
| US02.1.2 | Préférence de langue | S | Medium | ✅ |
| US02.2.1 | Changer son mot de passe | M | High | ✅ |
| US02.2.2 | Changer son adresse email | M | High | ✅ |
| US02.2.3 | Voir et révoquer ses sessions actives | M | Medium | ✅ |
| US02.2.4 | Suppression de compte (RGPD) | M | High | ✅ |
| US02.3.1 | Export de ses données personnelles | M | High | ✅ |
| US06.1.1 | Liste des utilisateurs du tenant (backend) | M | High | ✅ |
| US06.1.2 | Liste des utilisateurs du tenant (Angular) | M | High | ✅ |
| US06.1.3 | Modifier le rôle d'un utilisateur | M | High | ✅ |
| US06.1.4 | Désactiver un compte | S | High | ✅ |
| US06.1.5 | Réactiver un compte désactivé | S | High | ✅ |
| US06.2.1 | Créer un tenant | L | Critical | ✅ |
| US06.2.2 | Désactiver un tenant | M | High | ✅ |
| US06.2.3 | Liste des tenants | M | Medium | ✅ |

> **Sprint 3 — 15/15 US mergées.** Statuts resynchronisés le 2026-07-06 après audit du code sur `main` (pivot-core + pivot-ui) : le tableau et plusieurs fichiers US affichaient encore `In progress`/`🔎 Review` par retard de mise à jour alors que toutes les PR concernées étaient déjà mergées. PR vérifiées mergées : `pivot-core` #126, #127, #128, #129, #130, #134, #135, #140, #141, #142 · `pivot-ui` #69, #70, #71, #72, #76, #82, #83, #84, #85. US06.1.3/US06.1.4/US06.1.5 : PR#141/#142 documentent une déviation assumée — un token invalide/révoqué renvoie `403` (jamais `401`, ce backend n'a pas d'`AuthenticationEntryPoint` custom) ; l'intention de l'AC est respectée et testée, seul le code HTTP littéral diffère. US02.2.4 (suppression de compte RGPD, action irréversible) a reçu la revue Sécurité + RGPD obligatoire avant merge. Ce resync passe chaque US à `Stage: Review` dans son fichier — `Stage: Done` reste réservé à la recette manuelle du mainteneur, non posé ici.
>
> **Parallélisable (historique) :** US02.x ‖ US06.x — dépendances respectées : US06.1.5 après US06.1.4 (et US06.1.2, partagé) ; US02.2.4 après US02.2.1 ; US06.1.3/US06.1.4+US06.1.5 après US06.1.2 (UI partagée, empilement de branches). `pivot-core` : PR#126 (US06.2.3), PR#134 (US06.2.1) et PR#135 (US06.2.2) avaient chacune créé indépendamment `SuperAdminTenantController`/`Service` — collision réconciliée en une seule classe (`list()` + `create()` + `checkSlug()` + `updateStatus()`).
