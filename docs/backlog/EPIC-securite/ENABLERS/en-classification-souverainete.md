# EN43.11 — Classification de souveraineté (zones A/B/C)

**Type d'enabler** : gouvernance · souveraineté

**Objectif technique** : Modèle de classification transverse alignant les zones réseau sur trois classes de sensibilité (A souveraine / B contrôlée / C DMZ externe), pour contenir le rayon d'explosion d'une compromission.

**Justification** : Les mentions « souverain » déjà présentes dans le backlog (Zitadel, Forgejo, Rocket.Chat…) étaient ponctuelles, sans modèle structuré — chaque équipe module aurait fini par inventer sa propre notion de souveraineté. Un modèle unique à trois classes est le prérequis pour qu'EN43.7 (autorisation) et EN43.4 (egress) puissent appliquer une règle commune plutôt que des exceptions ad hoc.

**Critères de complétion** :
- [ ] Zone A — souveraine : modules/données sensibles, self-host, air-gap possible ; aucun flux sortant vers B/C
- [ ] Zone B — contrôlée : modules à périmètre maîtrisé (tenant UE, VPC) ; flux sortants filtrés, résidence UE contractualisée
- [ ] Zone C — DMZ externe : connexions API tierces ; passe par l'Egress Gateway (EN43.4), jamais de donnée sensible
- [ ] Chaque module/adaptateur du catalogue (EN28.2) porte un attribut de classe A/B/C
- [ ] Séparation stricte des environnements (dev/test/prod) documentée
- [ ] La compromission d'un module d'une zone ne franchit pas la frontière vers une zone plus sensible

**Dépendances** : EN28.2 (catalogue d'entités étendu)

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E43 · Type: gouvernance · Module: securite · Phase: phase-3 · Size: M
Stage: Backlog · Priority: Critical
