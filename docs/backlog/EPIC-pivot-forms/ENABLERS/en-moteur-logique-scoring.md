# EN42.1b — Moteur logique & scoring

**Type d'enabler** : architecture

**Objectif technique** : Construire, au-dessus du schéma d'EN42.1a, le **moteur de logique
conditionnelle** (affichage/masquage, branchements, sauts de page) et le **moteur de
calculs/scoring déterministe** (quiz) **rejouable côté serveur**, ainsi que la gestion des
**champs masqués** et du **pré-remplissage**. Le moteur est la référence faisant autorité : le
même schéma + les mêmes saisies produisent toujours le même résultat serveur, indépendamment du
rendu client.

**Justification** : La logique conditionnelle et le scoring déterminent ce que voit le répondant
et le résultat (score de quiz, branche empruntée). Un moteur serveur rejouable est indispensable
pour que le score ne dépende pas du client (intégrité) et pour rejouer/auditer une réponse.
Isoler cette couche du schéma (EN42.1a) et des événements (EN42.1c) donne un lot autonome dont la
seule dépendance est le modèle de formulaire.

**Hors-périmètre** :
- Modèle de formulaire/champ et validation des saisies (EN42.1a)
- Émission d'événements, API de réponses, webhooks (EN42.1c)
- Thème et rendu visuel (EN42.1d)
- Reprise/persistance des réponses partielles côté collecte (relève de la collecte EN42.1c et
  d'US42.4.3) — ici, seul le calcul déterministe de l'état logique est couvert

**Critères de complétion** :
- [ ] Moteur de logique conditionnelle : règles d'affichage/masquage, branchements et sauts
  évalués à partir des saisies, sur la base du schéma d'EN42.1a
- [ ] Moteur de calcul/scoring **déterministe** : le même schéma et les mêmes saisies produisent
  toujours le même score, entièrement recalculé côté serveur (aucune confiance au score client)
- [ ] Champs masqués et pré-remplissage (valeurs injectées par URL/API/recall) pris en compte par
  le moteur sans exposer les champs masqués au répondant
- [ ] Rejouabilité : une réponse enregistrée peut être réévaluée et produire à l'identique la
  branche empruntée et le score obtenu
- [ ] Robustesse : une règle référençant un champ inexistant ou une expression cyclique est
  détectée et rejetée à la validation du schéma, sans planter l'évaluation à l'exécution

**Critères d'acceptation (Given/When/Then)** :
- [ ] Given un formulaire avec une règle « si Q1 = Oui alors afficher Q2 », when le répondant
  répond « Oui » à Q1, then le moteur serveur marque Q2 comme visible dans l'état logique calculé.
- [ ] Given un quiz avec un barème défini, when la même réponse est rejouée deux fois côté serveur,
  then le score calculé est identique aux deux évaluations (déterminisme).
- [ ] Given un champ masqué pré-rempli par recall, when la réponse est soumise, then la valeur
  masquée est prise en compte par le moteur mais n'est jamais exposée dans l'état destiné au client.
- [ ] Error case: given un schéma dont une règle conditionnelle référence un champ supprimé ou
  introduit un cycle, when le schéma est validé/évalué, then le moteur retourne une erreur explicite
  (`400`) et refuse d'évaluer, sans boucle infinie ni score corrompu.
- [ ] Security: l'évaluation logique et le scoring s'exécutent dans le périmètre du tenant
  propriétaire du formulaire — un formulaire d'un autre tenant est traité comme inexistant (`404`
  non-membre/cross-tenant, jamais `403` révélateur) ; un rôle sans droit d'accès au barème/scoring
  confidentiel reçoit `403`.

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E42 · Module: forms · Phase: phase-3 · Size: L · Priority: Critical
Stage: ⬜
Justification: Moteur de logique conditionnelle + calculs/scoring déterministe rejouable serveur + champs masqués/pré-remplissage (issu de la décomposition d'EN42.1 XL)
Dépendances: EN42.1a (schéma & validation de formulaire)
