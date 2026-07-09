# US38.12.3 — Constitution d'équipes par compétences

**En tant que** porteur d'innovation
**Je veux** **constituer des équipes** autour d'une idée par appariement de compétences (skills-based team formation)
**Afin de** réunir les bons profils pour passer de l'idée au POC

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une idée et les compétences requises, when je cherche des coéquipiers, then des profils complémentaires sont suggérés | ⬜ |
| Given une équipe formée, when elle démarre, then elle est reliée à l'idée/POC et à sa capacité (E11) | ⬜ |
| Error : given aucune compétence requise renseignée ou aucun profil disponible correspondant, when je lance la recherche de coéquipiers, then aucune suggestion n'est forcée et un message explicite invite à ajuster les critères | ⬜ |
| Security : seuls les profils ayant déclaré leur disponibilité/opt-in (US38.12.2) sont suggérés comme coéquipiers ; l'ajout effectif d'un membre à l'équipe requiert son acceptation explicite (pas d'affectation forcée) | ⬜ |
| A11y : la liste de coéquipiers suggérés et le formulaire de constitution d'équipe sont utilisables au clavier et correctement restitués par lecteur d'écran | ⬜ |

## Hors périmètre
- Gestion fine de la capacité/charge de l'équipe une fois formée — délégué à E11 (Capacité), cette US ne fait que le lien
- Suivi de performance ou d'avancement de l'équipe après sa constitution (couvert par le pipeline d'innovation, US38.3.1)
- Recrutement externe (hors profils déjà enregistrés dans Pivot)

## Notes d'implémentation
- S'appuie sur les profils d'innovateurs (US38.12.2) pour la donnée compétences/disponibilité, et sur EN38.2 pour l'appariement (similaire au matchmaking IA, US38.11.5, mais orienté constitution d'équipe plutôt qu'experts/financeurs)
- Le lien équipe ↔ capacité (E11) suppose une interface ou un événement bus PIVOT existant côté module Capacité — à vérifier/valider avant implémentation
- Le consentement du coéquipier suggéré doit être capturé avant tout rattachement effectif à l'équipe

---
Item Type: US · Parent: F38.12 · Module: pilotage · Phase: phase-3 · Size: M · Priority: Low
Stage: ⬜
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: SMI — fonctionnalités innovantes (IA gouvernée, intelligence collective, corporate venturing)
Dépendances: EN38.1 · EN38.2 (moteur IA & graphe)
