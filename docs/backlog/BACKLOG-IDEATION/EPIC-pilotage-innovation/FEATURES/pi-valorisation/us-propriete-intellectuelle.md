# US38.7.1 — Propriété intellectuelle (brevets, savoir-faire)

**En tant que** responsable PI / juriste
**Je veux** gérer la **propriété intellectuelle** liée aux innovations (brevets, dépôts, savoir-faire, secret, licences)
**Afin de** protéger la valeur créée par l'innovation

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une innovation, when elle génère de la PI, then dépôts/brevets/savoir-faire sont rattachés avec statut et échéances | ⬜ |
| Error : given une échéance de dépôt/renouvellement dépassée sans action, when la date est atteinte, then le statut de l'actif PI passe automatiquement en alerte/expiré plutôt que de rester silencieusement « en cours » | ⬜ |
| Security : l'accès à un actif de PI (dépôt, savoir-faire, secret) est restreint aux rôles habilités (responsable PI/juriste, porteur de l'innovation concernée) ; toute consultation est tracée (journal d'accès) du fait de la confidentialité stratégique de ces données | ⬜ |

## Hors périmètre
- Le dépôt légal effectif auprès des offices de brevets (INPI, EPO, etc.) : hors périmètre, cette US suit le cycle de vie administratif de la PI dans Pivot, sans intégration avec les offices
- La valorisation économique et le transfert de la PI (licensing, cession) : couverts par US38.7.2
- La génération automatique de documents de dépôt : hors périmètre, seul le suivi de statut/échéances est couvert

## Notes d'implémentation
- Le « statut » d'un actif PI (brevet, savoir-faire, secret, licence) doit couvrir a minima : en instruction, déposé, accordé, en renouvellement, expiré/abandonné — avec échéances associées à chaque étape
- Un savoir-faire ou secret d'affaires peut ne jamais faire l'objet d'un dépôt formel ; le modèle doit permettre de tracer un actif PI sans échéance de dépôt (protection par le secret)
- S'appuie sur le modèle SMI d'EN38.1 pour le rattachement à l'innovation d'origine

---
Item Type: US · Parent: F38.7 · Module: pilotage · Phase: phase-3 · Size: M · Priority: Medium
Stage: ⬜
Profils: Grand groupe, Publique, État
Justification: SMI — Système de Management de l'Innovation (état de l'art, ISO 56002/56000)
Dépendances: EN38.1 (modèle SMI & moteur)
