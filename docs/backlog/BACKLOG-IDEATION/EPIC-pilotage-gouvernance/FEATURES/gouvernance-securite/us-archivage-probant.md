# US35.1.8 — Archivage probant

**En tant que** PMO
**Je veux** un archivage normalisé (type SEDA) des décisions, versions et pièces d'arbitrage, à valeur probante
**Afin de** répondre aux contrôles de légalité et CRC avec des archives opposables

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une décision, une version ou une pièce d'arbitrage, when un utilisateur habilité déclenche son archivage, then elle est packagée dans un format normalisé (type SEDA — bordereau de versement, métadonnées de contexte de décision) et déposée dans l'espace d'archivage probant | ⬜ |
| Given une pièce archivée, when un utilisateur consulte l'archive (contrôle de légalité, CRC), then il retrouve la pièce accompagnée de son contexte de décision complet (auteur, date, instance, version) et d'un moyen de vérifier son intégrité | ⬜ |
| Error : given une pièce non conforme au format d'archivage attendu (métadonnées incomplètes, format de fichier non supporté), system refuse l'archivage et place la pièce en exception avec un motif explicite, sans la marquer faussement comme archivée | ⬜ |
| Security : chaque pièce archivée est scellée par une empreinte d'intégrité (hash) et horodatée de façon à détecter toute altération ultérieure — toute tentative de modification post-archivage produit une nouvelle version tracée plutôt qu'un écrasement silencieux de l'original | ⬜ |
| Security : l'accès en écriture à l'archive (dépôt, mais surtout suppression) est réservé aux rôles autorisés ; aucune suppression définitive n'est possible avant l'expiration de la durée légale de conservation applicable au type de pièce | ⬜ |
| Security : le journal des opérations d'archivage (dépôt, consultation, tentative de modification) est conservé pour permettre de démontrer la valeur probante de l'archive devant un contrôle de légalité ou une CRC | ⬜ |

## Hors périmètre
- Interopérabilité complète avec un Système d'Archivage Électronique (SAE) tiers certifié NF Z42-013/NF461 — cette US produit un format d'export normalisé (SEDA), l'intégration avec un SAE externe certifié reste un sujet ultérieur si requis
- Politique de durée de conservation légale par type de document (référentiel de durées) — à cadrer avec le client au Gate 1, cette US porte le mécanisme d'archivage probant, pas la définition exhaustive du référentiel réglementaire
- Archivage des données hors du périmètre "décisions, versions, pièces d'arbitrage" (ex. échanges informels, brouillons non validés)
- Restauration/réimport d'une archive dans le système source — cette US couvre l'archivage, pas la réintégration

## Notes d'implémentation
- Le format cible SEDA (Standard d'Échange de Données pour l'Archivage), version en vigueur 2.2 (publiée par le ministère de la Culture, janvier 2022), implique une structure de bordereau de versement avec métadonnées descriptives — vérifier au Gate 1 le niveau d'exigence réel attendu (export SEDA 2.2 complet vs. format inspiré de SEDA) compte tenu du Size XL et de la Phase phase-3 ; **choix d'interopérabilité SEDA à valider par le mainteneur**, cette US n'en décide pas
- S'appuie sur US35.1.3 (Traçabilité des décisions) pour la source des décisions horodatées/historisées à archiver — cette US ajoute la couche de mise en forme probante et d'export, ne redéfinit pas la traçabilité elle-même
- Le scellement d'intégrité (hash + horodatage) doit être cohérent avec le mécanisme d'inaltérabilité déjà requis pour l'historique des décisions (US35.1.3) — éviter deux mécanismes de preuve d'intégrité distincts dans le même module `pivot-pilotage-core`
- Priorité Low / Phase phase-3 / Could (MoSCoW) — item bonus (Dossier §7-B6), à ne pas sur-investir avant confirmation de la demande client réelle

---
Item Type: US · Parent: F35.1 · Module: pilotage · Phase: phase-3 · Size: XL · Priority: Low
Stage: ⬜
Source: PP-058 · MoSCoW: Could · Lot: Lot 4 · Origine: Bonus B6
Profils: Privée sous droit public, Publique, État
Justification: Dossier §7-B6 : contrôles de légalité et CRC
Dépendances: —
