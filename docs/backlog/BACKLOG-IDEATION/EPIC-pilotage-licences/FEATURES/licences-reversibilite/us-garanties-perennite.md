# US37.1.2 — Garanties de pérennité

**En tant que** acheteur
**Je veux** une feuille de route engagée, un préavis de retrait de fonctionnalités et une protection tarifaire post-acquisition
**Afin de** sécuriser l'investissement contre les ruptures (rachat, retrait de produit)

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given le marché, when l'éditeur engage sa feuille de route, then elle est documentée et opposable | ⬜ |
| Un préavis contractuel est prévu avant tout retrait de fonctionnalité | ⬜ |
| Error : given un retrait de fonctionnalité sans préavis, system/le contrat prévoit un recours documenté | ⬜ |
| Security/Gouvernance : protection tarifaire post-acquisition inscrite au contrat (traçabilité contractuelle) | ⬜ |

## Hors périmètre
- Cette US porte sur les garanties contractuelles et documentaires (feuille de route, préavis, protection tarifaire) ; elle ne couvre pas de mécanisme applicatif de blocage automatique d'un retrait de fonctionnalité.
- La feuille de route produit détaillée (contenu, priorisation) est pilotée hors de cette US ; celle-ci ne couvre que son caractère engageant/opposable et sa publication.
- Ne couvre pas la réversibilité des données (US37.1.1) ni le format d'échange (US37.1.5).

## Notes d'implémentation
- Cette US est majoritairement contractuelle/documentaire (feuille de route publiée, clause de préavis, clause de protection tarifaire) : peu ou pas de développement applicatif attendu, à l'exception de la publication/consultation de la feuille de route si elle doit être exposée dans le produit.
- Si la feuille de route est publiée dans l'application, elle peut s'appuyer sur un contenu versionné (changelog / patch-notes) plutôt qu'un nouveau système de gestion de contenu.
- Le préavis et la protection tarifaire relèvent du contrat commercial (CGV/CGU) : à documenter en dehors du code, mais à référencer depuis le produit si un lien de consultation est requis.

---
Item Type: US · Parent: F37.1 · Module: pilotage · Phase: phase-3 · Size: S · Priority: High
Stage: ⬜
Source: PP-030 · MoSCoW: Must (conditionnel) · Lot: Lot 1 · Origine: Insight I5 (rachat Sciforma, retraite Project Online)
Profils: Grand groupe, Privée sous droit public, Publique, État
Justification: Dossier §8-I5
Dépendances: —
