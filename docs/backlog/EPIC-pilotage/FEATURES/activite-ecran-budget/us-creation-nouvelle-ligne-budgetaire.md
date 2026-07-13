# US18.18.15 — Bouton « + Ligne budgétaire » — création d'une nouvelle ligne

**En tant que** contrôleur de gestion SI (profil budget)
**Je veux** créer une nouvelle ligne budgétaire via un écran de saisie aux champs contrôlés
**Afin de** ajouter une ligne conforme aux règles de gestion budgétaires

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given le clic sur « + Ligne budgétaire », when l'écran de saisie s'ouvre, then Titre est un texte obligatoire ≤ 50 caractères, Utilisateur/Prescripteur une liste obligatoire, Type une liste obligatoire (CAPEX/APCO/OPEX), MO/HMO une liste obligatoire, Phase une liste obligatoire (Opportunité, Cadrage, Conception, Réalisation, RUN, Suivi des bénéfices), Nature une liste obligatoire et Pôle/Usine en charge (CCS) obligatoire | ⬜ |
| Given le champ MO/HMO, when Type = APCO, then la liste est grisée sur HMO | ⬜ |
| Given les champs facultatifs, when je saisis, then Priorité (auto depuis l'activité sinon N/A) et Typologie (auto sinon N/A) sont facultatifs, Commentaire est un texte de 400 caractères, Objet de gestion exclut les obsolètes, Contrat et Bénéficiaire (MOA/Financeur) sont facultatifs | ⬜ |
| Given le champ Produit, when le type d'activité est Build/Run, then il est auto ; pour GRP/TRV il est libre ; la Version financière est renseignée automatiquement selon l'onglet | ⬜ |
| Error : given un champ obligatoire non renseigné (Titre, Utilisateur/Prescripteur, Type, MO/HMO, Phase, Nature, Pôle/Usine CCS) ou un Titre > 50 caractères, system bloque la création | ⬜ |
| Security/Gouvernance : la création n'est possible que pour les utilisateurs autorisés à modifier le budget de l'onglet concerné | ⬜ |
| A11y : navigation clavier et compatibilité lecteur d'écran conformes WCAG 2.1 AA | ⬜ |

## Hors périmètre
- La saisie des montants annuels, gérée dans le tableau budgétaire.
- Le chargement des référentiels alimentant les listes (Nature, Objet de gestion, Contrat…).

## Notes d'implémentation
- Module pilotage (OPDN), écran Budget, bouton « + Ligne budgétaire », écran de saisie.
- Champs : Titre (obligatoire ≤ 50 car.), Utilisateur/Prescripteur (liste obligatoire), Priorité (auto sinon N/A, facultatif), Typologie (auto sinon N/A, facultatif), Commentaire (400 car., facultatif), Type (liste obligatoire CAPEX/APCO/OPEX), MO/HMO (liste obligatoire ; APCO ⇒ grisé sur HMO), Objet de gestion (facultatif, obsolètes exclus), Phase (liste obligatoire : Opportunité, Cadrage, Conception, Réalisation, RUN, Suivi des bénéfices), Nature (liste obligatoire), Contrat (facultatif), Produit (auto Build/Run, libre GRP/TRV), Bénéficiaire MOA/Financeur (facultatif), Pôle/Usine en charge CCS (obligatoire), Version financière (auto selon l'onglet).

---
Item Type: US · Parent: F18.18 · Module: pilotage · Phase: phase-3 · Size: L · Priority: High
Stage: ⬜
Rôle: controleur-de-gestion-si
Source: SPEC_OPDN — B.15 Activité — écran Budget
Dépendances: —
