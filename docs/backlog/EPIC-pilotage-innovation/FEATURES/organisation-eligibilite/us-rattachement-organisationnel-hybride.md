# US38.16.1 — Rattachement organisationnel hybride & éligibilité par sous-arbre

**En tant que** responsable innovation
**Je veux** rattacher idées, catégories et challenges à l'organisation en réutilisant le référentiel **LDAP externe** ET une **hiérarchie interne** déclarée dans l'app, avec des catégories **scopées et héritées** et une **éligibilité de challenge limitée à un sous-arbre**
**Afin de** cadrer la visibilité et la participation sans dupliquer un référentiel organisationnel déjà géré ailleurs

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une organisation dont l'annuaire est exposé via un LDAP externe, when une idée/catégorie/challenge est rattachée, then elle peut être associée à un nœud de cet annuaire | ⬜ |
| Given un besoin de structuration hors du périmètre LDAP (groupe transverse, structure ad hoc à l'innovation), when un responsable innovation crée une hiérarchie interne, then elle est déclarée directement dans l'app, **en complément** du LDAP — rattachement hybride, pas un remplacement | ⬜ |
| Given une catégorie scopée à un nœud organisationnel, when elle est consultée depuis un nœud descendant, then elle est héritée (visible) sans redéfinition | ⬜ |
| Given un challenge dont l'éligibilité est limitée à un sous-arbre organisationnel, when un contributeur hors de ce sous-arbre tente d'y participer, then sa participation est refusée | ⬜ |
| Error : given un nœud LDAP et un nœud de hiérarchie interne portant le même libellé, when ils coexistent, then aucune fusion implicite n'a lieu — les deux référentiels restent distincts et explicitement identifiables | ⬜ |
| Security : seul un rôle habilité (responsable innovation ou admin du périmètre) peut définir le rattachement organisationnel d'une catégorie ou l'éligibilité d'un challenge | ⬜ |

## Hors périmètre
- L'implémentation du client LDAP lui-même et son pod mock de développement — réutilisés depuis **E25 Commande publique** (`mock-service-kit`/`external-client.ts`), pas réécrits ici
- La modification du référentiel LDAP source (lecture seule depuis l'innovation, comme pour E25)

## Notes d'implémentation
- Réutilise le pattern **hybride LDAP externe + hiérarchie interne déclarative** livré dans PouetPouet (POC, ADR-0012) et le client externe déjà bâti pour E25 (`mock-service-kit`, `external-client.ts`) — pas de second client LDAP à développer
- Catégories/éligibilité scopées et héritées : structure arborescente, la portée d'un nœud s'applique à tous ses descendants sauf redéfinition explicite

---
Item Type: US · Parent: F38.16 · Module: pilotage · Phase: phase-3 · Size: L · Priority: Medium
Stage: ⬜
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: SMI — rattachement organisationnel, source POC PouetPouet v0.29.0 (PR3 #225, ADR-0012)
Dépendances: EN38.1 · E25 (pattern `mock-service-kit`/`external-client` réutilisé, pas de FK directe)
