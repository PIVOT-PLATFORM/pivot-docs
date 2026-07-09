# US35.1.4 — SSO et audit

**En tant que** DSI
**Je veux** un SSO (SAML/OIDC) avec MFA et des journaux d'audit exportables
**Afin d'** intégrer l'authentification à l'annuaire de l'organisation et alimenter le SIEM

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un fournisseur d'identité (IdP) SAML ou OIDC configuré pour le tenant, when un utilisateur initie une connexion, then il est redirigé vers l'IdP, authentifié (avec MFA héritée de l'IdP) puis une session Pivot est ouverte sans ressaisie de mot de passe local | ⬜ |
| Given une action d'accès ou d'administration sur le module pilotage, when elle se produit, then un événement d'audit (auteur, action, ressource, horodatage, résultat) est enregistré et exportable vers le SIEM (format standard type CEF/Syslog ou API de pull) | ⬜ |
| Error : given un échec d'authentification SSO ou un rejet MFA par l'IdP, system refuse l'accès, n'ouvre aucune session et journalise la tentative (sans exposer d'information sur la cause précise à l'utilisateur) | ⬜ |
| Error : given un IdP indisponible ou une réponse SAML/OIDC invalide (signature incorrecte, assertion expirée), system rejette la tentative de connexion et journalise l'anomalie sans créer de session | ⬜ |
| Security : l'authentification SSO valide strictement la signature et l'expiration des assertions SAML/tokens OIDC reçus de l'IdP (protection contre le rejeu et l'usurpation d'assertion) ; aucune session n'est créée sur une assertion invalide | ⬜ |
| Security : les journaux d'audit sont horodatés, non modifiables a posteriori depuis l'application, et couvrent au minimum : connexions/déconnexions, échecs d'authentification, actions d'administration (changement de rôle, périmètre, classification) — conservés selon la politique de rétention légale applicable | ⬜ |
| Security : l'export des journaux vers le SIEM est réservé aux rôles d'administration sécurité et s'effectue sur un canal authentifié (pas d'export anonyme ni de journal accessible en clair sans droit) | ⬜ |

## Hors périmètre
- Fourniture ou hébergement de l'IdP lui-même (SAML/OIDC) — Pivot est fournisseur de service (SP), l'IdP est fourni par l'organisation cliente
- Définition fine des rôles et périmètres de visibilité consommés après authentification — couverte par US35.1.1 (Droits par rôle et périmètre)
- Politique MFA (facteurs, enrôlement) — déléguée à l'IdP de l'organisation, non réimplémentée par Pivot
- Connecteur SIEM propriétaire spécifique à un éditeur donné — seul un format d'export standard est garanti, l'intégration fine reste à la charge du client

## Notes d'implémentation
- S'appuie sur le socle Auth & IAM existant (E01, OIDC multi-tenant) — cette US ajoute le support SAML et le raccordement MFA hérité de l'IdP, ainsi que la production d'un journal d'audit exportable, plutôt que de redéfinir l'authentification de zéro
- Le journal d'audit est un flux transverse : chaque action sensible du module pilotage (`pivot-pilotage-core`, schéma Flyway `pilotage`) doit émettre un événement structuré ; prévoir un format d'événement commun réutilisable par les autres US de gouvernance (droits, classification, DLP) qui journalisent également
- Format d'export SIEM à cadrer avec les IdP/SIEM les plus fréquents côté secteur public (cahiers ADM/SEC/GOV) ; privilégier un format standard (CEF ou JSON structuré) plutôt qu'un format propriétaire
- Dépendance transverse : EN17 (pivot-core-starter + `@pivot/ui-core`) doit être publié avant implémentation (cf. README de l'Epic)

---
Item Type: US · Parent: F35.1 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Source: PP-027 · MoSCoW: Must · Lot: Lot 2 · Origine: Cahiers des 3
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: Cahiers ADM/SEC/GOV
Dépendances: —
