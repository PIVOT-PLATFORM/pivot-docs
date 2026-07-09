# US21.4.5 — Liens vers Vendor/Contract

**En tant que** Contract Manager
**Je veux** rattacher un risque à un fournisseur (Vendor) et à un contrat (Contract)
**Afin de** suivre les risques liés à un fournisseur ou une clause contractuelle dans le cadre de la gestion des contrats (CLM)

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un risque de type fournisseur, when le Contract Manager le rattache à un Vendor et un Contract existants, then le risque affiche les deux liens et apparaît dans la vue Contract Manager (US21.8.4) | ⬜ |
| Given un risque déjà rattaché à un Vendor, when le contrat associé à ce Vendor arrive à échéance (événement bus), then le risque est signalé comme à réévaluer | ⬜ |
| Error : given un identifiant Vendor ou Contract inexistant fourni au rattachement, system refuse l'opération et retourne une erreur 404 explicite sans créer de lien orphelin | ⬜ |
| Security : seul un utilisateur avec le rôle Contract Manager ou Chef de projet sur le projet du risque peut créer ou supprimer un lien Vendor/Contract | ⬜ |

## Hors périmètre
- La gestion du cycle de vie de Vendor et Contract eux-mêmes — entités portées par le module CLM (Pilotage), hors périmètre risque.
- La création automatique de risques à partir d'un contrat — non couverte ici (rattachement manuel uniquement).
- La détection de concentration de risques multi-fournisseurs — traitée par US21.5.2 (Risques systémiques).

## Notes d'implémentation
- Corrélation par référence (`vendor_ref` / `contract_ref`) via le bus PIVOT, pas de FK inter-modules (cf. ADR-006) — cohérent avec le rattachement `project_ref` de l'entité Risk (US21.1.6).
- L'entité Risk est déjà déclarée reliable à Vendor et Contract au catalogue (cf. README EPIC-risk) ; cette US couvre l'UI et la validation du rattachement.
- Dépend de l'existence de l'entité Risk (US21.1.6) pour disposer des champs de rattachement.

---
Item Type: US · Parent: F21.4 · Module: risk · Phase: phase-3 · Size: S · Priority: Medium
Stage: ⬜
Dépendances: US21.1.6
