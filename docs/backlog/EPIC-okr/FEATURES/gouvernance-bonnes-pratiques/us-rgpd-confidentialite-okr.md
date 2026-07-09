# US27.10.2 — RGPD & confidentialité des OKR individuels

**En tant que** DPO
**Je veux** garantir la **confidentialité et la conformité RGPD** des OKR individuels (visibilité maîtrisée, minimisation, droits)
**Afin de** concilier transparence collective et protection des personnes

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un OKR individuel, when il est marqué confidentiel, then sa visibilité est restreinte (owner, manager, RH selon règle) | ⬜ |
| Given des données personnelles dans les OKR/CFR, when elles sont traitées, then finalité, base légale, conservation et droits (accès/rectification/effacement) sont assurés | ⬜ |
| Given l'usage éthique, when les OKR sont agrégés, then aucun profilage de performance individuelle n'en est dérivé automatiquement | ⬜ |
| Error : given une demande d'exercice de droit (effacement d'un OKR individuel), when des KR/check-ins y sont encore rattachés, then le système empêche une suppression incohérente ou anonymise en conservant l'intégrité des agrégats d'équipe | ⬜ |
| Security : la modification du marquage confidentiel d'un OKR individuel est réservée à son owner et est journalisée (qui, quand, ancien/nouveau statut) | ⬜ |
| A11y : le statut de confidentialité d'un OKR (badge/icône) est identifiable sans dépendre de la seule couleur et est annoncé aux lecteurs d'écran | ⬜ |

## Hors périmètre
- La doctrine de découplage rémunération/évaluation et les garde-fous anti-patterns — couverts par US27.10.1
- L'implémentation générique du registre de traitement RGPD de la plateforme (au-delà du périmètre OKR) — hors périmètre de cette US, qui documente la finalité/base légale/conservation spécifiques aux OKR
- La suppression en cascade automatique de comptes utilisateurs — relève du module Auth/IAM, pas de cette US

## Notes d'implémentation
- S'appuie sur le modèle EN27.1 (Objective owner: individu) : le champ confidentiel s'applique à l'Objective et se propage à ses KR/CheckIn
- La règle de visibilité par défaut (owner, manager direct, RH) doit être paramétrable sans FK inter-modules (cohérence ADR-006/008) — résolution du rôle "manager"/"RH" via le bus PIVOT ou un identifiant d'organisation partagé
- Le droit à l'effacement doit composer avec le besoin d'intégrité des agrégats d'équipe/entreprise (US27.9.1) : privilégier l'anonymisation (dissociation identité/valeurs) plutôt que la suppression physique quand des agrégats en dépendent
- Cette US et US27.10.1 partagent le même socle de gouvernance (EN27.1) mais portent des garanties distinctes : ici la protection des données personnelles, là le découplage rémunération/transparence

---
Item Type: US · Parent: F27.10 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: Raffinage OKR état de l'art (Doerr/Google ; Quantive/Workboard/Viva Goals/Perdoo)
Dépendances: EN27.1 (modèle OKR & moteur)
