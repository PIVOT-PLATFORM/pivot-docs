# US19.1.1 — Créer une session live

## Contexte

- **US** : [`us-creer-session.md`](pathname:///pivot-docs/backlog/EPIC-module-session/FEATURES/creation/us-creer-session) · Parent `F19.1` · Module `collaboratif` · Phase phase-3 · Sprint 22
- **PR** : `pivot-ui` [#270](https://github.com/PIVOT-PLATFORM/pivot-ui/pull/270) — Module Session live, PR1/2 (infra socle)
- **Commit figé** : `8581c9d` (`feat(ui): Module Session live — PR1/2, core infra + POLL/WORDCLOUD (#270)`)
- **Portée du figeage** : vues **frontend** de création et de liste (`pivot-ui`, lib `collaboratif-ui` — `session-form`, `session-list`) + contrat REST consommé. Producteur backend (`pivot-core`) hors périmètre de session — contrat figé **tel que consommé**.
- **Gate 4 au figeage** : convergence Autoloop, CI verte, squash-mergé sur `main`. Recette humaine en attente.

## Spec fonctionnelle

### Ce que fait la fonctionnalité

Point d'entrée animateur du module. Deux vues :

1. **`session-list`** — liste les sessions accessibles à l'appelant (créateur, ou membre de l'équipe
   quand un `teamId` est défini), avec un filtre de statut (`ALL` = pas de param `status`) et un
   accès « créer » / « ouvrir ».
2. **`session-form`** — crée une session : titre + sélecteur de **type d'activité** (les six types).
   Le formulaire n'envoie qu'un objet `config` **vide mais non-null** à la création ; le contenu
   détaillé de la config (questions de quiz, options de poll…) est complété ensuite depuis la vue de
   détail avant `start` (allègement explicite de l'AC « le contenu de la config peut être complété
   après création »). La réponse porte le **code court** (`joinCode`, 6 caractères) servant à rejoindre.

### Sécurité

| Propriété | Mécanisme |
|-----------|-----------|
| Isolation tenant | `tenantId` résolu **backend** depuis le `TenantContext` du token — jamais envoyé par le client (ni body, ni query, ni header) |
| Liste filtrée | `session-list` ne transmet que `teamId`/`status` ; la portée d'accès (créateur/équipe) est appliquée serveur |

## Contrat technique final

| Verbe | Chemin | Rôle | Corps / réponse |
|-------|--------|------|-----------------|
| `POST` | `/sessions` | animateur | `CreateSessionRequest { title, type, config, teamId? }` → `SessionResponse` |
| `GET` | `/sessions` | animateur | params `teamId?`/`status?` → `SessionSummaryResponse[]` |
| `GET` | `/sessions/{id}` | animateur | — → `SessionResponse` (détail autoritaire) |

### `SessionResponse`

```ts
{ id; title; type: SessionType; status: SessionStatus; joinCode: string;
  config: SessionConfig; teamId: number | null; participantCount;
  createdAt; startedAt: string | null; endedAt: string | null }
```

## Écarts vs ACs initiaux (outline Gate 1)

| AC outline | État | Note |
|-----------|------|------|
| `POST /sessions` (titre, type, config, teamId?) | ✅ | config vide à la création, complétée avant `start` |
| Types : QUIZ/POLL/WORDCLOUD/BRAINSTORM/QA | ✅ | + VOTE (6ᵉ type, ajouté au domaine) |
| Code court 6 chars | ✅ | `joinCode` |
| Session liée au tenant (TenantContext) | ✅ | backend |
| Sécurité : `tenantId` jamais du body | ✅ | résolu serveur |

## Gates

- **Gate 2** : `session-form` + `session-list` couverts en Vitest (création, filtre de liste). Suite `collaboratif-ui` verte au figeage.
- **Gate 4** : convergence Autoloop, CI verte, squash-merge `main`. Merge humain final en attente.
