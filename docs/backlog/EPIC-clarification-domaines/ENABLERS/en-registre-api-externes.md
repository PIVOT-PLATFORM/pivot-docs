# EN52.3 — Registre des API externes & sources de données (d'où viennent les infos)

**Type d'enabler** : architecture / intégration (documentaire)

**Objectif technique** : établir la **carte unique** de toutes les intégrations externes de PIVOT —
tout système hors-plateforme que la suite consomme ou alimente — avec, pour chacun : la donnée
échangée, le sens du flux, le protocole, le secret/authentification, et la différence dev vs prod.
C'est l'axe 4 (« d'où viennent les infos ») consolidé, référencé par chaque fiche de domaine.

**Justification** : la demande insiste sur « clarifier les API externes pour savoir d'où on récupère
les infos ». Ces flux sont aujourd'hui décrits par bribes (architecture cible, ADR-012 egress,
EN51.8 code-scanning, EN51.10 ITSM). Un registre unique est nécessaire pour la revue sécurité (surface
externe), le RGPD (sortie de données) et la souveraineté.

## Livrable

`docs/architecture/registre-api-externes.md` — un tableau maître + une fiche courte par intégration.

### Colonnes du registre

| Système externe | Domaine PIVOT consommateur | Données échangées | Sens | Protocole | Auth / secret | Dev | Prod |
|-----------------|----------------------------|-------------------|------|-----------|---------------|-----|------|

### Intégrations à recenser (état des lieux à établir — liste d'amorçage, non exhaustive)

| Système | Donnée | Sens | Statut |
|---------|--------|------|--------|
| **IdP OIDC entreprise** (JWKS) | Identités, claims, clés de signature | ↓in | Livré (auth enterprise) |
| **Serveur SMTP** | E-mails transactionnels (activation, reset, alertes, notif) | ↑out | Livré (Mailpit dev / SMTPS prod) |
| **ActiveMQ** (broker STOMP) | Événements temps réel inter-instances | ↕ | Livré (relay STOMP) |
| **PostgreSQL / Redis** | Persistance / cache | ↕ | Infra (source interne — noté pour complétude, TLS prod) |
| **GitHub Code-Scanning / Dependabot** | Alertes SARIF, correctifs sécurité | ↓in | Planifié (EN51.8) |
| **Connecteur ITSM par tenant** (ServiceNow…) | Incidents, changements, files support — **PII hors PIVOT** | ↓in (agrégat/lien profond) | Planifié (EN51.10) |
| **LDAP / annuaire / PGI** | Rattachement organisationnel, référentiels achats | ↓in | Idéation (POC PouetPouet, E38/E25) |
| **GeoIP** | Résolution IP → localisation (alerte connexion) | ↓in | v1-enterprise (US01.4.3b) |

> La colonne « Statut » distingue **livré** / **planifié (enabler référencé)** / **idéation** — le
> registre décrit l'existant *et* signale les intégrations prévues, sans les inventer.

### Par intégration livrée — champs obligatoires

Endpoint/host (dev + prod), donnée précise récupérée/émise, fréquence/déclencheur, secret et son
stockage (variable d'env, jamais en dur), politique egress ([ADR-012](pathname:///pivot-docs/adr/ADR-012-plan-trafic-gateway-mesh-egress)),
implication RGPD si donnée personnelle sort de la plateforme.

## Critères de complétion

- [ ] Given un domaine, when sa fiche décrit une source de données externe, then elle renvoie à une
      ligne du registre au lieu de la redécrire.
- [ ] Toute intégration **livrée** est documentée avec host dev+prod, donnée, sens, protocole, secret
      et son mode de stockage.
- [ ] Les intégrations **planifiées/idéation** figurent avec leur enabler/EPIC de référence et un
      statut explicite (pas confondues avec le livré).
- [ ] Security : aucun secret réel dans le registre (noms de variables d'env uniquement) ; chaque flux
      sortant de donnée personnelle est marqué RGPD.
- [ ] Error case : une fiche de domaine citant une source absente du registre est un finding (le
      registre doit être exhaustif sur le livré).
- [ ] `npm run lint` + `npm run build` verts.

## Notes

- Le registre est **descriptif** : il ne décide ni n'ajoute d'intégration. Une source souhaitable mais
  absente = finding pour arbitrage.
- Recoupe partiellement ADR-012 (egress) et les enablers EN51.8/EN51.10 — liens explicites, pas de
  duplication de contenu normatif.

---
Item Type: Enabler · Parent: E52 · Type: architecture · Module: core · Phase: Socle
Stage: ⬜ · Priority: High
Dépendances: EN52.1, ADR-012 (egress), EN51.8 (code-scanning), EN51.10 (ITSM), architecture/platform-overview
