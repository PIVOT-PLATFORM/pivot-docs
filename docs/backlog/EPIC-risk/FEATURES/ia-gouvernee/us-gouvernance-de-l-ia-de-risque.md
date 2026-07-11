# US21.7.4 — Gouvernance de l'IA de risque

**En tant que** DPO, Archi
**Je veux** « Gouvernance de l'IA de risque »
**Afin de** accélérer l'identification des risques sous contrôle humain

## Contexte

Traçabilité des suggestions, localisation des traitements, validation humaine obligatoire.

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une production IA du module risque (suggestion de risque, détection de signal faible, aide à la rédaction d'action), when elle est générée, then un enregistrement de traçabilité est créé (modèle utilisé, horodatage, entrée fournie, sortie produite, localisation du traitement) consultable par le DPO et l'Archi | ⬜ |
| Given une suggestion IA en attente, when un utilisateur habilité la valide ou la rejette, then la décision humaine (auteur, date, motif optionnel) est journalisée et seule une validation explicite fait entrer la suggestion dans le registre officiel des risques ; aucun niveau de risque, score ou statut n'est jamais fixé automatiquement par l'IA | ⬜ |
| Error : given une production IA dont la localisation de traitement ne peut pas être déterminée ou documentée (ex. sous-traitant hors périmètre déclaré), system bloque l'affichage de la suggestion à l'utilisateur et alerte le DPO plutôt que de l'exposer sans traçabilité | ⬜ |
| Security : le journal de traçabilité IA est accessible en lecture au DPO et à l'Archi uniquement ; toute suggestion non validée explicitement par un humain reste à l'état `candidat` et ne peut ni déclencher d'action automatique, ni être exposée dans les vues de restitution (F21.8) comme un risque officiel ; conformité RGPD sur les données personnelles éventuellement présentes dans les entrées/sorties IA (minimisation, durée de conservation du journal) | ⬜ |

## Hors périmètre
- La génération elle-même des suggestions de risques, de la détection de signaux faibles et de l'aide à la rédaction — couvertes respectivement par US21.7.1, US21.7.2, US21.7.3 ; cette US pose le socle de gouvernance transverse que ces trois US doivent respecter.
- Le choix, l'entraînement ou l'hébergement du modèle IA sous-jacent — hors périmètre produit, contrainte d'infrastructure/fournisseur.
- Le pack de conformité AI Act complet (documentation réglementaire, analyse de risque du système IA lui-même) — couvert par US21.6.6 ; cette US couvre la gouvernance opérationnelle (traçabilité, validation humaine), pas la conformité réglementaire documentaire.

## Notes d'implémentation
- Constitue le socle de garde-fous que US21.7.1 (suggestion de risques), US21.7.2 (signaux faibles) et US21.7.3 (aide à la rédaction) doivent respecter dès leur introduction — aucune de ces US ne doit être livrée sans ce socle minimal de traçabilité et validation humaine.
- Le journal de traçabilité est un enregistrement distinct de l'entité `Risk` (US21.1.6) : une suggestion rejetée ou non traitée doit rester traçable même si elle n'intègre jamais le registre.
- La « localisation des traitements » (contexte RGPD/souveraineté) doit s'articuler avec les réponses du questionnaire de cadrage relatives à l'IA et à la souveraineté (US21.1.1) et avec le pack RGPD du module (US21.6.5).

---
Item Type: US · Parent: F21.7 · Module: risk · Phase: phase-3 · Size: M · Priority: Medium
Stage: ⬜
Rôle: delegue-a-la-protection-des-donnees
Dépendances: US21.7.1
