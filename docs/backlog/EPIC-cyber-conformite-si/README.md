# E53 — Cybersécurité & conformité SI

## Objectif

Issue du benchmark **« Organisations DSI dans les grands groupes »** (section 4 — Cybersécurité et
conformité), cette EPIC couvre le besoin d'une **politique de sécurité unique et opposable à
toutes les DSI métier**, exigence critique pour un client classé **OIV (Opérateur d'Importance
Vitale)** : SOC/CERT centralisé, SIEM Groupe, IAM/SSO unifié, gestion des vulnérabilités
(CI/CD security gates) et PAM (Privileged Access Management).

**E53 est une capacité PPM de gouvernance/reporting — pas une réimplémentation technique du
SOC/SIEM/PAM.** PIVOT permet à une DSI Groupe cliente de **suivre et gouverner** sa posture de
sécurité (référentiel de politique, agrégation des incidents, registre de vulnérabilités,
registre des accès à privilèges) au-dessus de ses propres outils SOC/SIEM/IAM/PAM — PIVOT ne
se substitue pas à ces outils ni ne les réimplémente.

**Distinction avec [E35 — Gouvernance & sécurité (pilotage)](../EPIC-pilotage-gouvernance/README.md)** :
E35 porte les contrôles de gouvernance et de sécurité **sur les données du module Pilotage
lui-même** (RBAC/SSO/audit/DLP appliqués aux portefeuilles, projets et tâches sensibles gérés
par PIVOT) — un périmètre applicatif interne au domaine Pilotage. E53 porte, elle, sur le
**suivi de la posture de cybersécurité du SI du client** (politique Groupe, incidents SOC/CERT,
vulnérabilités applicatives, comptes à privilèges) — un objet métier transverse au client, sans
lien avec la sécurité des données de pilotage elles-mêmes.

**Distinction avec [E43 — Sécurité & Zero Trust](../EPIC-securite/README.md)** : E43 est la
sécurité **de la plateforme PIVOT elle-même** (BFF, API Gateway, service mesh, IAM interne,
secrets, SIEM interne à PIVOT) — un ensemble d'Enablers transverses qui protègent PIVOT en tant
que produit. E53 est une capacité fonctionnelle **offerte au client** pour qu'il gouverne *sa
propre* posture de sécurité SI — PIVOT n'y joue pas le rôle de SOC/SIEM/PAM technique, seulement
celui d'outil de suivi/reporting PPM.

Le rôle **RSSI** n'est pas redéfini ici : il est rattaché au référentiel de rôles partagé porté
par [E49 — Organisation & gouvernance DSI](../EPIC-organisation-gouvernance-dsi/README.md)
(**EN49.2 — Modèle de rôles & RACI**), réutilisé tel quel par E53. Le registre de vulnérabilités
(F53.3) dépend du référentiel applicatif Groupe porté par
[E50 — Architecture d'entreprise & urbanisation](../EPIC-architecture-entreprise/README.md)
(**US50.1.1 — Inventaire des applications**) pour rattacher chaque vulnérabilité à une
application/domaine cartographié.

## Repo cible (architecture multi-repo)
- Backend : **`pivot-pilotage-core`** (schéma Flyway `pilotage`, FK → `public.teams.id`)
- Frontend : **`pivot-pilotage-ui`** (consomme `@pivot/ui-core` + `@pivot/design-system`)
- Pré-requis EN17 : pivot-core-starter + @pivot/ui-core publiés avant implémentation

## Phase
⏸️ **phase-3** — VERROUILLÉ · AC issus du benchmark, à affiner au Gate 1 PO Agent

## Origine
Généré depuis le benchmark **« Organisations DSI dans les grands groupes »** (section 4 —
Cybersécurité et conformité) — document distinct du CSV benchmark PPM secteur public
(`BENCHMARK.md`, ex-PR #38) qui a servi à seeder E32–E40. Ce nouveau benchmark seede également
E49 (Organisation & gouvernance DSI), E50 (Architecture d'entreprise & urbanisation), E51
(Gouvernance de la donnée) et E52 (Gouvernance Citizen Development).

## Dépendances
- Dépend de : [E18 — Domaine Pilotage](../EPIC-pilotage/README.md) (ombrelle) ·
  [E49 — Organisation & gouvernance DSI](../EPIC-organisation-gouvernance-dsi/README.md)
  (rôle RSSI — **EN49.2** Modèle de rôles & RACI) ·
  [E50 — Architecture d'entreprise & urbanisation](../EPIC-architecture-entreprise/README.md)
  (registre applicatif auquel rattacher les vulnérabilités — **US50.1.1** Inventaire des
  applications)

---

## Suivi d'avancement

| Élément | 🤖 Dev |
|---------|--------|
| **F53.1 — Politique de sécurité** | |
| [US53.1.1 — Référentiel de politique de sécurité Groupe](FEATURES/politique-securite/us-referentiel-politique-securite.md) | ⬜ |
| **F53.2 — Suivi des incidents** | |
| [US53.2.1 — Tableau de bord SOC/CERT](FEATURES/suivi-incidents/us-tableau-bord-soc-cert.md) | ⬜ |
| **F53.3 — Vulnérabilités** | |
| [US53.3.1 — Registre de vulnérabilités](FEATURES/vulnerabilites/us-registre-vulnerabilites.md) | ⬜ |
| **F53.4 — Accès à privilèges** | |
| [US53.4.1 — Registre des comptes à privilèges](FEATURES/acces-privileges/us-registre-comptes-privileges.md) | ⬜ |
