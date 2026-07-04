---
sidebar_position: 0
sidebar_label: "Vue produit"
---

# Produit — PIVOT Portail

> Socle applicatif de la suite PIVOT : point d'entrée unique des utilisateurs, gestion des
> identités, des tenants et des équipes, activation des modules, shell UX commun à tous les outils.
> Repos : **`pivot-core`** · **`pivot-ui`**.

## EPICs rattachés

| Clé | EPIC | Phase | Statut |
|-----|------|-------|--------|
| E01 | [Auth & IAM](EPIC-auth-iam/README.md) | MVP | 🔄 Partiellement Done |
| E02 | [Espace compte](EPIC-espace-compte/README.md) | MVP | ⬜ À planifier |
| E03 | [Système de modules](EPIC-module-system/README.md) | MVP | 🔄 Sprint 2 |
| E06 | [Administration](EPIC-administration/README.md) | MVP | ⬜ À planifier |
| E15 | [Équipes transverses](EPIC-equipes/README.md) | phase-3 | ⏸️ Verrouillé |
| E16 | [Shell applicatif & UX](EPIC-shell-ux/README.md) | MVP | ✅ Sprint 1 Done |

## Périmètre

- Authentification (email/password, OAuth2 Google, OIDC enterprise multi-tenant), sessions, MFA appareil
- Espace compte utilisateur (profil, sécurité, RGPD)
- Registre et activation des modules par tenant (socle sur lequel reposent tous les autres produits)
- Administration tenant (utilisateurs, rôles) et super-admin (tenants, plans)
- Équipes transverses (`Team`, `TeamMember` en schéma `public`, partagées par tous les modules)
- Shell : navigation, grille des modules, notifications, thème, i18n, pages légales

## Hors périmètre

Les modules fonctionnels eux-mêmes — voir les produits *Outils collaboratifs*, *Outils d'agilité*,
*Pilotage de projet* et *Création de workflows*.
