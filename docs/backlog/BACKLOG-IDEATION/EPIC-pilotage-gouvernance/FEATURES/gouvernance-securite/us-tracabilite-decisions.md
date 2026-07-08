# US35.1.3 — Traçabilité des décisions

**En tant que** direction
**Je veux** horodater et historiser tous les arbitrages, re-priorisations et décisions d'instance, avec export pour contrôle (légalité, CRC)
**Afin de** répondre à l'exigence démocratique de traçabilité des décisions publiques

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un arbitrage, une re-priorisation ou une décision d'instance, when elle est actée par un utilisateur habilité, then elle est horodatée, attribuée à son auteur et ajoutée à l'historique des décisions du projet/programme/portefeuille concerné | ⬜ |
| Given un besoin de contrôle (contrôle de légalité, CRC), when un utilisateur habilité demande l'export des décisions d'une période ou d'un périmètre donné, then un export structuré (horodatage, auteur, nature de la décision, contexte) est produit | ⬜ |
| Error : given une tentative de modification a posteriori d'une décision déjà historisée, system refuse l'écrasement et conserve la version antérieure de façon inaltérable, en créant si besoin une nouvelle entrée d'historique distincte | ⬜ |
| Security : l'historique des décisions ne peut être modifié ou supprimé par aucun rôle applicatif, y compris administrateur — seule une nouvelle version peut être ajoutée ; toute tentative de modification/suppression de l'historique est journalisée comme un incident de sécurité | ⬜ |
| Security : chaque entrée d'historique est attribuée de façon non répudiable à son auteur (authentification forte requise pour acter une décision d'instance) et l'export produit est vérifiable (intégrité de l'export garantie, par exemple par empreinte) afin d'être opposable devant un contrôle de légalité ou une CRC | ⬜ |

## Hors périmètre
- Format d'archivage normalisé à valeur probante longue durée (type SEDA) — couvert par US35.1.8 (Archivage probant), qui consomme cette traçabilité comme source
- Workflow de validation/circuit de signature des décisions d'instance (qui doit approuver avant qu'une décision soit actée) — cette US couvre l'horodatage/historisation une fois la décision prise, pas le processus d'approbation en amont
- Registre des risques et de leurs plans d'action — couvert par US35.1.2 (Registre des risques), notion distincte des arbitrages/re-priorisations

## Notes d'implémentation
- L'historique doit être conçu en append-only dans `pivot-pilotage-core` (schéma Flyway `pilotage`) : toute modification métier ultérieure d'une décision crée une nouvelle ligne d'historique liée à la précédente, jamais un UPDATE destructif
- Sert de source de données pour US35.1.8 (Archivage probant) — le modèle d'événement de décision (auteur, horodatage, nature, contexte) doit être conçu pour être réutilisable tel quel par l'export SEDA de cette US aval
- Le format d'export pour contrôle de légalité/CRC (Dossier §8-I9) est à cadrer avec le client au Gate 1 : format tabulaire simple (CSV/PDF) vs. format plus structuré — le MoSCoW "Must (conditionnel)" suggère de valider le besoin réel avant de sur-designer
- Le mécanisme d'inaltérabilité (append-only + non-répudiation de l'auteur) doit être cohérent avec celui attendu pour l'archivage probant (US35.1.8) afin d'éviter deux implémentations distinctes de la même garantie

---
Item Type: US · Parent: F35.1 · Module: pilotage · Phase: phase-3 · Size: L · Priority: High
Stage: Backlog
Source: PP-022 · MoSCoW: Must (conditionnel) · Lot: Lot 2 · Origine: Insight I9
Profils: Grand groupe, Privée sous droit public, Publique, État
Justification: Dossier §8-I9 : exigence démocratique
Dépendances: —
