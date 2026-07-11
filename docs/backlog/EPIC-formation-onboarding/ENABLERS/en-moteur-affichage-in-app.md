# EN41.1a — Moteur d'affichage in-app

**Type d'enabler** : architecture · frontend (shell E16, `@pivot/ui-core`)

**Objectif technique** : Fournir le **socle de rendu client** du framework d'onboarding : moteur capable d'afficher des **tours guidés**, **tooltips**, **checklists** et **empty states** en surimpression du shell (E16), avec **séquencement** d'une étape à l'autre (avancer / reculer / passer) et **ancrage** des étapes sur des éléments d'interface via des sélecteurs stables. Le moteur expose une API déclarative de définition d'un tour (liste ordonnée d'étapes, cible d'ancrage, contenu i18n) et gère l'affichage, le surlignage, la navigation clavier et le lecteur d'écran (a11y WCAG 2.1 AA). Il ne présuppose ni persistance serveur ni ciblage : ces briques se greffent dessus (EN41.1b/c).

**Justification** : Sans moteur de rendu commun, chaque module recoderait sa propre mécanique d'affichage → incohérence visuelle, régressions d'ancrage et coût. C'est le socle sur lequel reposent la persistance (EN41.1b), le ciblage (EN41.1c) et l'analytics (EN41.1d) ; il est livré **en premier**.

**Hors-périmètre** :
- Persistance serveur de l'état d'avancement et reprise inter-session — EN41.1b.
- Règles d'affichage conditionnel selon rôle / module / première visite — EN41.1c.
- Mesure d'usage et remontée analytique — EN41.1d.
- Rédaction éditoriale du contenu des tours (assurée par chaque équipe module, cf. Hors-périmètre EPIC).

**Critères de complétion** :
- [ ] Moteur de rendu tours / tooltips / checklists / empty states intégré au shell (E16), en surimpression non bloquante.
- [ ] API déclarative de définition d'un tour (étapes ordonnées, cible d'ancrage par sélecteur stable, contenu i18n FR/EN).
- [ ] Séquencement complet : avancer, reculer, passer (skip), terminer ; état d'étape courant tenu **en mémoire client** (pas de persistance ici).
- [ ] Ancrage robuste : sélecteurs stables, pas de coordonnées en dur ; étape dont la cible est absente **ignorée proprement** sans bloquer le tour.
- [ ] Accessibilité : navigation clavier + lecteur d'écran (WCAG 2.1 AA) ; i18n FR/EN.

**Critères d'acceptation (Given/When/Then)** :
- [ ] Given un tour déclaré (étapes ordonnées, cibles d'ancrage), when le moteur le démarre, then chaque étape s'affiche ancrée sur son élément d'interface et l'utilisateur peut avancer, reculer, passer et terminer au clavier comme à la souris.
- [ ] Given un tour en cours, when l'utilisateur atteint la dernière étape et la valide, then le moteur signale la complétion du tour (événement client) et rend la main au shell sans résidu visuel.
- [ ] Given un tour dont une étape cible un élément d'interface absent (déplacé / supprimé depuis la dernière mise à jour), when le moteur atteint cette étape, then l'étape est ignorée proprement (pas de tour bloqué ni d'élément fantôme surligné dans le vide) et le séquencement continue.
- [ ] Error case: given une définition de tour invalide (étape sans cible ni contenu, ou ordre incohérent), when le moteur tente de la charger, then il rejette la définition avec une erreur explicite et n'affiche aucun tour partiel.
- [ ] Security: given l'état d'avancement tenu en mémoire client, when plusieurs utilisateurs se succèdent sur un même poste, then aucun état n'est partagé implicitement entre eux (le moteur ne conserve rien en dehors de la session courante ; toute persistance est déléguée à EN41.1b rattachée au compte).

**Statut** : ⬜ À faire — socle du framework (livré en premier)

---
Item Type: Enabler · Parent: E41 · Module: core · Phase: phase-3 · Size: L · Priority: High
Stage: ⬜
Dépendances: E16 Shell applicatif & UX
