# EN43.11 — Classification de souveraineté (zones A/B/C)

**Type d'enabler** : gouvernance · souveraineté

**Contexte** : Modèle de classification transverse, absent jusqu'ici du repo (les mentions « souverain » existantes — Zitadel, Forgejo, Rocket.Chat… — étaient ponctuelles, sans modèle structuré). Aligne les zones réseau sur trois classes de sensibilité, pour contenir le rayon d'explosion d'une compromission.

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
Item Type: Enabler · Parent: E43 · Type: gouvernance · Module: securite · Phase: phase-3
Stage: Backlog · Priority: Highest
