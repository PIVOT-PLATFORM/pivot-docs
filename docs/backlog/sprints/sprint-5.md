# Sprint 5 — Module Whiteboard (Socle E30, ex-E08)

**Branches :** une branche par US/Enabler — `feat/{us-id}-{slug}` (voir [§Règles d'utilisation](./README.md#règles-dutilisation))
**Scope :** noyau F08.x/EN08.x complet — désormais hébergé sous [`EPIC-collaboration`](../EPIC-collaboration/README.md) (E30), `Phase: Socle` propre, non verrouillé par le reste d'E30
**Pré-requis :** Sprint 2 terminé + Sprint 4 EN07.x validé (mergé, recette maintainer en attente) + Gate 1 US08.x validé par PO Agent ✅ (voir note du 2026-07-07)

| US | Titre | Size | Priorité | 🤖 Dev |
|----|-------|------|----------|--------|
| EN08.1 | Isolation WebSocket room par board | M | Critical | ⬜ |
| EN08.2 | Guard Angular module whiteboard | S | Critical | ⬜ |
| US08.1.1 | Utilisateur crée un tableau (backend) | M | Critical | ⬜ |
| US08.1.2 | Utilisateur liste ses tableaux (backend) | M | Critical | ⬜ |
| US08.1.3 | Angular : liste des tableaux | M | Critical | ⬜ |
| US08.1.4 | Renommer un tableau | S | High | ⬜ |
| US08.1.5 | Supprimer un tableau | S | Critical | ⬜ |
| US08.2.1 | Owner partage un tableau par lien public | M | High | ⬜ |
| US08.2.2 | Utilisateur rejoint un tableau via token | M | High | ⬜ |
| US08.2.3 | Angular : UI partage et gestion rôles | M | High | ⬜ |
| US08.3.1 | Connexion WebSocket au canvas | M | Critical | ⬜ |
| US08.3.2a | Angular : canvas whiteboard — composant local & outils de dessin | L | High | ⬜ |
| US08.3.2b | Angular : canvas whiteboard — synchronisation STOMP & états connexion | M | High | ⬜ |
| US08.3.2c | Angular : canvas whiteboard — présence des participants (curseurs) | S | Medium | ⬜ |
| US08.3.3 | Undo / Redo sur le canvas | M | High | ⬜ |
| US08.4.1 | Créer un tableau depuis un template | M | Medium | ⬜ |
| US08.5.1 | Présence des participants sur le canvas | M | High | ⬜ |

> **Gate 1 — READINESS (2026-07-07) :** PO Agent a passé en revue la DoR des 17 items du sprint (2
> Enablers + 15 US, dont US08.3.2 déjà décomposée en 08.3.2a/b/c). Tous ≥ 70/100 après complétion
> des ACs manquants (essentiellement sections `Hors périmètre`/`Notes d'implémentation` absentes,
> AC erreur/sécurité/A11y incomplets) — **`Stage: Backlog → Ready` sur les 17 fichiers**. Détail
> par item et conventions transverses posées (404 non-membre/cross-tenant vs 403 rôle insuffisant,
> contrat d'événements WS unique `JOIN/LEAVE/DRAW/CURSOR_MOVE/UNDO`, hard-delete US08.1.5) → PR
> `pivot-docs`. Chevauchement US08.5.1 ↔ US08.3.2c (deux specs de panneau participants) détecté et
> tranché : panneau de présence porté exclusivement par US08.5.1, US08.3.2c ne rend que l'overlay
> de curseurs. Un point produit reste ouvert, non bloquant pour Gate 1 mais à trancher avant
> l'implémentation : TTL par défaut/maximal du token de partage (US08.2.1) — voir sa section Notes
> d'implémentation. Le fichier `us-canvas-angular.md` (US08.3.2 pré-décomposition) reste
> `Stage: Decomposed`, hors score Gate 1.
>
> Sprint 5 reste non démarré côté implémentation : le second volet du prérequis (Sprint 4 EN07.x
> **validé** au sens recette, pas seulement mergé) dépend de la recette manuelle du mainteneur, pas
> d'un agent.
