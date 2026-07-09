# ADR-026 — Briques natives à construire (planning poker, CLM) et périmètre

**Date :** 2026-07-09
**Statut :** Proposé
**Décideurs :** Architecte plateforme, Product Owner
**Contexte technique :** `pivot-agilite-core`/`-ui` (planning poker) · `pivot-pilotage-core`/`-ui` (CLM)

---

## Contexte

ADR-009 §2 tranche déjà, brique par brique, la question « adaptateur ou natif ? » : natif quand aucun adaptateur n'est possible/rentable via le contrat à six capacités. Son §5 (table de sélection par domaine) marque **Planning poker** et **CLM (cycle de vie contractuel)** comme « PIVOT natif », tous deux annotés « vide côté OSS » — aucune alternative mature identifiée pendant le balayage de domaines d'ADR-009. Ce qu'ADR-009 ne tranche pas : le périmètre v1 réel de ces deux briques, le repo/schéma qui les porte, et un critère durable pour les futures décisions « brique native » au-delà de ces deux cas. C'est l'objet de cet ADR (référencé dans la table « ADR à produire » d'ADR-009, priorité P2).

Les deux briques ne partent pas du même point :

- **Planning poker** a déjà un EPIC complet et cadré : [E09 — Module Scrum Poker](pathname:///pivot-docs/backlog/EPIC-scrum-poker/), repo cible `pivot-agilite-core`/`-ui` (schéma `agilite`, FK → `public.teams.id`), `Module: agilite`, 3 features stubées (F09.1 Rooms, F09.2 Tickets/votes, F09.3 Participant anonyme) + EN09.1 (isolation WebSocket par room). Le README d'E09 documente déjà un choix de périmètre explicite, issu d'un benchmark (PlanningPoker.com, TeamRetro) : pas de palier payant (marché gratuitisé depuis 2020), et une fonctionnalité de référence du benchmark (distribution des votes à la révélation) explicitement notée « absente du périmètre actuel ». Cette ADR **fige** cette frontière plutôt que d'en réinventer une.
- **CLM** n'a qu'un seul stub, US28.5.2 — « CLM natif » — logé sous F28.5 « Contrats & communication » de [E28 — Intégration open source](pathname:///pivot-docs/backlog/EPIC-integration-open-source/). F28.5 est un panier hétéroclite : il mélange, sous un même tag `Module: contrats` (absent de la taxonomie `Module` de `pivot-docs/CLAUDE.md` : core/auth/admin/oidc/pilotage/agilite/collaboratif), une brique native (CLM, US28.5.2), un adaptateur de signature électronique (Documenso US28.5.1, Docuseal US28.5.4) et une messagerie souveraine en mode Lien (Element/Matrix US28.5.3, Rocket.Chat US28.5.5). De plus, E28 tout entier est **verrouillé tant qu'ADR-009 n'est pas Accepté** — un blocage pensé pour le socle adaptateurs (EN28.1–EN28.13), pas pour une brique native qui n'a aucune dépendance fonctionnelle sur ce socle.

Deux précédents du backlog encadrent la décision de placement de CLM :

1. [EPIC-risk](pathname:///pivot-docs/backlog/EPIC-risk/) référence directement CLM à deux reprises comme rattaché au domaine Pilotage : US21.4.5 (« La gestion du cycle de vie de Vendor et Contract eux-mêmes — entités portées par le module CLM (Pilotage), hors périmètre risque ») et US21.8.4 (même formulation). Ce n'est pas une supposition de cet ADR : c'est déjà écrit dans le backlog existant.
2. [ADR-008](pathname:///pivot-docs/adr/ADR-008-domaines-modules-cockpits) a tranché que « Pilotage » est un **domaine**, pas un module unique : plusieurs modules de capacité (Roadmap E22, Portefeuille E23, ADR projet E24, Commande publique E25, Budget E26, OKR E27, Cahiers de tests E13) partagent aujourd'hui `pivot-pilotage-core`/`-ui` et le schéma `pilotage` — la scission physique en repos distincts reste **incrémentale** (ADR-008 Conséquences). Seul un module devenu un domaine à part entière (Gestion des risques, E21 : 40+ US sur 8 axes, réutilisé par plusieurs rôles de cockpit) a justifié un repo/schéma dédié (`pivot-risk-core`/`-ui`, schéma `risk`).

Un troisième précédent éclaire le découpage v1-vs-différé : le noyau whiteboard (F08.x/EN08.x, fusionné dans [E30 — Collaboration](pathname:///pivot-docs/backlog/EPIC-collaboration/)) a été scindé d'un périmètre benchmark bien plus large (98 items `BL-###` issus de Miro/Klaxoon/FigJam/Microsoft Whiteboard) : un socle `Phase: Socle` livré indépendamment (CRUD tableaux, partage/rôles, canvas temps réel, templates — 17/17 Done), le reste (facilitation, IA, diagrammes, sécurité/gouvernance avancée, plateformes, chantiers SI) restant `phase-3`. C'est le même geste que cet ADR applique à planning poker et CLM.

## Décision

### 1. Critère durable — au-delà de planning poker et CLM

Une fois qu'ADR-009 §2 a orienté une brique vers « natif », deux questions restent ouvertes qu'ADR-009 ne traite pas. Cet ADR pose la procédure à suivre pour toute future brique native, pas seulement les deux traitées ici :

| Étape | Question | Règle |
|---|---|---|
| 1 | La brique est-elle déjà routée « natif » par ADR-009 §2 (comité d'architecture, brique par brique) ? | Prérequis — sans ça, cet ADR ne s'applique pas |
| 2 | À quel domaine existant (Pilotage/Agilité/Collaboratif, ADR-008) la brique se rattache-t-elle ? | Ancrage par **preuve déjà écrite au backlog** (dépendances, entités partagées citées par d'autres epics) — jamais par ressemblance de surface. Une brique sans ancrage clair dans un domaine existant est un signal qu'elle mérite sa propre discussion de domaine, pas une extension de cet ADR. |
| 3 | Où démarre le code ? | **Par défaut : dans le repo/schéma déjà existant du domaine d'ancrage.** Pas de nouveau repo à la création — cohérent avec le principe d'ADR-008 (scission incrémentale). |
| 4 | Quand scinder en repo/schéma dédié ? | Seulement quand le volume de backlog de la brique devient comparable au précédent réel qui a justifié une scission (Risque : 40+ US, 8 axes, réutilisé par plusieurs rôles de cockpit) — jamais par anticipation. |
| 5 | Quel périmètre v1 ? | La plus petite boucle bout-en-bout qui remplit le besoin exprimé par l'US fondatrice, en différant explicitement tout ce qui vient d'un benchmark concurrentiel ou d'une extension « pendant qu'on y est » — même discipline que le socle whiteboard (F08.x) face au reste d'E30. |

### 2. Planning poker — périmètre v1

**Dans le périmètre v1** (déjà stubé, cette ADR le confirme comme frontière v1 et non comme brouillon ouvert) :

| US | Contenu retenu |
|---|---|
| US09.1.1 — Créer une room | Room (nom, séquence **Fibonacci fixe par défaut**), code d'invitation unique (6 caractères), créateur = facilitateur, expiration configurable (24h par défaut) |
| US09.1.2 — Rejoindre via code | Join par code, 404 explicite si invalide/expiré/autre tenant, accès STOMP `/topic/agilite/poker/{roomId}` après join |
| US09.2.1 — Voter en temps réel | Facilitateur crée un ticket, vote masqué jusqu'à révélation, changement de vote autorisé avant révélation, compteur « X/Y ont voté » sans fuite de valeur |
| US09.2.2 — Révéler et calculer le consensus | Révélation broadcastée, calcul moyenne/médiane/valeur majoritaire, reset et revote possibles, estimation finale validée et sauvegardée sur le ticket |
| US09.3.1 — Participation anonyme | Accès par code sans compte (`ROLE_GUEST`), pseudonyme, vote autorisé mais ni création de ticket ni révélation, identifié par `sessionId` temporaire (aucune persistance BDD), expiration 2h d'inactivité |
| EN09.1 | Isolation WebSocket par room |

Repo/schéma : **`pivot-agilite-core`** (schéma `agilite`, FK → `public.teams.id`) / **`pivot-agilite-ui`**, `Module: agilite` — déjà en place, cet ADR ne rouvre pas ce choix.

**Explicitement différé** (v2+, avec la justification déjà visible au backlog) :

- **Jeu de cartes paramétrable par équipe** (Fibonacci vs T-shirt vs suite personnalisée) — mentionné en périphérie du README d'E09 comme US09.1.3, mais **aucun fichier US n'existe encore** et US09.1.1 fige aujourd'hui Fibonacci en dur. Différé jusqu'à preuve que la boucle Fibonacci fixe suffit.
- **Distribution des votes à la révélation** (moyenne/médiane/**dispersion**) — fonctionnalité de référence PlanningPoker.com, déjà notée par le README d'E09 comme « absente du périmètre actuel ». Confirmé hors v1 par cet ADR.
- **Vote asynchrone** (estimation hors session live) — aucun support au backlog, non ajouté.
- **Intégrations tierces** (import de tickets Jira/Plane/GitLab) — relèverait du registre adaptateur (E28/ADR-009), pas de cette brique native.
- **Compte invité persistant** — exclu explicitement par US09.3.1 (`sessionId` seul, pas de BDD).

### 3. CLM — périmètre v1

**Dans le périmètre v1** (dérivé de US28.5.2 et des références croisées d'EPIC-risk) :

- Entités **`Contract`** et **`Vendor`** gérées nativement (pas d'adaptateur — « vide côté OSS », ADR-009 §5), table `pilotage.contracts` / `pilotage.vendors`, FK → `public.teams.id` (ADR-006).
- Suivi d'échéance contractuelle minimal : un contrat référence un vendor et une date d'échéance/renouvellement ; l'arrivée à échéance émet un événement traçable — `pilotage.contract.due` sur le topic `pilotage.events.pilotage.contract.due` (convention ADR-025, même schéma d'événement que le reste de la plateforme).
- Champs de rattachement suffisants pour que le module Risque corrèle par référence logique (`contract_ref`/`vendor_ref`, jamais de FK inter-modules — ADR-006/ADR-008) : ceci débloque directement US21.4.5 (Liens vers Vendor/Contract) et US21.8.4 (Vue Contract Manager), qui dépendent déjà de l'existence de ces entités côté Pilotage.
- Frontière de consommation claire avec la signature électronique : CLM **ne réimplémente pas** la signature — elle **consomme** `contract.signed`, déjà prévu comme événement émis par les adaptateurs Documenso/Docuseal (US28.5.1/US28.5.4, F28.5), sur le même bus (ADR-025). CLM est le consommateur naturel de cet événement, pas son producteur.

Repo/schéma : **`pivot-pilotage-core`** (schéma `pilotage`, tables `contracts`/`vendors`, FK → `public.teams.id`) / **`pivot-pilotage-ui`**, `Module: pilotage` — **pas** un nouveau couple `pivot-contrats-core`/`-ui`. Deux preuves déjà écrites au backlog fondent ce choix plutôt qu'une préférence arbitraire : (a) EPIC-risk rattache littéralement CLM au « module CLM (Pilotage) » à deux reprises ; (b) le volume actuel de CLM (une seule US stub) est sans commune mesure avec le seuil réel qui a justifié la scission de Risque en repo dédié (40+ US, 8 axes). CLM démarre donc comme les autres petites capacités du domaine (Roadmap, Portefeuille, Budget, OKR, ADR projet, Commande publique, Cahiers de tests) : dans le repo/schéma partagé du domaine.

Le tag `Module: contrats` actuellement posé sur US28.5.1–US28.5.5 ne correspond à aucune valeur de la taxonomie `Module` documentée dans `pivot-docs/CLAUDE.md`. Pour la part native (CLM), le tag correct est `Module: pilotage`. Pour la part adaptateur/lien (signature, messagerie), la correction de tag reste hors périmètre décisionnel de cet ADR — signalée en Conséquences comme action de suivi.

**Explicitement différé** (v2+) :

- **Avenants** (workflow complet, versioning de clauses) — nommés dans le « Je veux » de l'US fondatrice mais jamais détaillés ; différé jusqu'à preuve que la boucle contrat+échéance plate suffit.
- **Signature électronique elle-même** — reste un sujet adaptateur (Documenso/Docuseal, F28.5/E28) ; CLM v1 ne fait que consommer l'événement.
- **Messagerie souveraine** (Element/Matrix, Rocket.Chat) — malgré le tag `Module: contrats` partagé aujourd'hui, ceci est un sujet de communication en mode Lien sans rapport fonctionnel avec CLM ; cet ADR ne fait pas autorité pour la déplacer mais signale l'incohérence de rattachement.
- **Commande publique** (E25) — chevauchement de surface (fournisseurs, contrats) mais reste son propre module ; CLM v1 ne tente pas de l'absorber.
- **Provisionnement budgétaire lié aux contrats** — reste dans Budget (E26).
- **Toute alternative adaptateur pour CLM** — non applicable : ADR-009 §5 et US28.5.2 confirment tous deux « vide côté OSS », aucun candidat identifié lors du balayage de domaines d'ADR-009.

### 4. Activation module

Les deux briques s'activent via le contrat `PivotModule` existant (ADR-003) — aucun mécanisme nouveau :

- Planning poker : `moduleId: 'agilite'` (déjà en place, inchangé).
- CLM : partage le `moduleId: 'pilotage'` du domaine — pas un `moduleId` séparé comme `risk` (EN21.2), CLM restant une sous-capacité du domaine Pilotage à ce stade de volume, pas un module autonome au sens d'ADR-008. Un `moduleId` dédié n'est à envisager que si CLM franchit le même seuil de scission repo que Risque (cf. §1, étape 4).

## Alternatives écartées

- **Nouveau couple de repos `pivot-contrats-core`/`-ui` pour CLM** : écarté pour v1 — une seule US au backlog, aucune réutilisation cross-rôle démontrée aujourd'hui, contrairement au volume réel (40+ US, réutilisation multi-rôle) qui a justifié la scission de Risque. À revisiter seulement si le backlog CLM grandit comparablement (cf. Points ouverts).
- **Élargir tout de suite le périmètre v1 de planning poker** (deck paramétrable + distribution des votes dès v1) : écarté — le README d'E09 note déjà lui-même la distribution des votes comme hors périmètre actuel, et le deck paramétrable n'a même pas d'US écrite ; les embarquer maintenant retarderait la livraison de la boucle création/rejoindre/voter/révéler, à l'inverse de la discipline déjà appliquée au socle whiteboard (F08.x) face au reste benchmarké d'E30.
- **Construire CLM comme adaptateur sur un outil CLM/contrats OSS** : écarté — ADR-009 §5 et l'US fondatrice US28.5.2 confirment tous deux « vide côté OSS » ; aucun outil candidat n'a été identifié pendant le balayage de domaines d'ADR-009, il n'y a donc rien à adapter.
- **Laisser CLM sous E28/F28.5 tel quel** : écarté — E28 est verrouillé dans son ensemble tant qu'ADR-009 n'est pas Accepté, et toute sa prémisse est le socle adaptateurs (EN28.1–EN28.13) ; conditionner la livraison d'une brique native à un calendrier d'acceptation d'un cadre adaptateur sans rapport contredit la lecture même d'ADR-009 §1, où natif est un des quatre modes, pas un sous-produit du mode adaptateur.

## Conséquences

**Positif**
- Les deux briques ont désormais une frontière v1 concrète et livrable au lieu d'un stub ouvert — débloque le challenge Gate 1 PO Agent sur chacune.
- CLM sort de la chaîne de dépendance d'E28 (bloquée sur l'acceptation d'ADR-009) en étant rattachée au domaine Pilotage, où elle peut démarrer dès que les prérequis EN17 de `pivot-pilotage-core` sont satisfaits, indépendamment du sort d'ADR-009.
- Réutilise deux précédents déjà actés (seuil de scission repo de Risque, découpage Socle-vs-benchmark du whiteboard) plutôt que d'inventer une nouvelle doctrine — cohérence de maison.
- Pose une procédure réutilisable (§1) pour toute future brique native au-delà de planning poker et CLM.

**Négatif**
- Chirurgie de backlog nécessaire : US28.5.2 (et son frontmatter Module/Parent) doit être déplacée hors d'EPIC-integration-open-source/F28.5 vers une feature du domaine Pilotage ; F28.5 doit être re-décrite puisqu'elle ne contiendra plus d'item natif une fois CLM partie (ne restent que l'adaptateur signature + la messagerie Lien) — coordination PO Agent + Scrum Master requise (règle `pivot-docs/CLAUDE.md`, changement de structure backlog).
- Le tag `Module: contrats` posé aujourd'hui sur US28.5.1–.5 est incohérent avec la taxonomie `Module` ; corrigé ici pour CLM (`pilotage`), mais la part adaptateur/lien qui reste dans F28.5 nécessite sa propre décision de tag, non traitée par cet ADR.
- Le périmètre v1 de planning poker laisse volontairement non livrées des fonctionnalités reconnues par le benchmark (dispersion des votes, deck paramétrable) — acceptable au regard du précédent whiteboard, mais c'est un engagement produit à revisiter, pas un renoncement définitif.

**Interdit**
- Construire un adaptateur CLM « pour faire simple » sans preuve nouvelle qu'un outil OSS mature est apparu depuis le balayage d'ADR-009 — seul le critère §2 d'ADR-009 peut rouvrir ce choix.
- Démarrer CLM dans un nouveau repo `pivot-contrats-core`/`-ui` sans qu'un volume de backlog comparable au précédent réel de Risque (E21) ne soit d'abord constaté.
- Étendre silencieusement le périmètre v1 de planning poker (deck configurable, distribution des votes, intégrations tierces) sans passer par une nouvelle US explicite et un nouveau Gate 1.

## Points ouverts

- Seuil de scission repo : cet ADR s'ancre sur le précédent Risque (~40 US, 8 axes) sans fixer de nombre absolu — à objectiver si/quand le backlog CLM grossit réellement.
- Relocalisation backlog de US28.5.2 (et re-description de F28.5) non encore exécutée — action de suivi PO Agent, pas résolue par cet ADR lui-même.
- CLM aura-t-elle un jour son propre `moduleId` (comme `risk`) une fois sortie du partage de `pilotage` ? Différé au même seuil de scission (§1, étape 4).
- Tag `Module` correct pour la part adaptateur/lien restante de F28.5 (signature, messagerie) — hors périmètre de cet ADR, à trancher séparément.
- Deck paramétrable et distribution des votes pour planning poker : candidats réels pour une v2, non planifiés ici, aucun sprint cible.

## Historique

| Version | Date | Évolution |
|---------|------|-----------|
| v1 | 2026-07-09 | Décision initiale |
