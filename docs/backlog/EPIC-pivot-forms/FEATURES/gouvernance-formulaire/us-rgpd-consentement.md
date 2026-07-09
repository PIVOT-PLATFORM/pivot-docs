# US42.7.2 — RGPD & consentement

**En tant que** concepteur de formulaire
**Je veux** ajouter un bloc de consentement explicite et limiter la collecte aux données strictement nécessaires
**Afin de** collecter des données personnelles en conformité RGPD, pas comme une case à cocher de façade

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un formulaire collectant au moins un champ identifié comme donnée personnelle, when il est publié sans bloc de consentement configuré, then la publication est bloquée | ⬜ |
| Given un répondant qui refuse le consentement, when il tente de soumettre, then la soumission est bloquée pour les champs personnels concernés, mais un formulaire anonymisé reste possible si le concepteur l'a prévu | ⬜ |
| Error : given un consentement retiré après soumission (droit RGPD), when la demande de retrait est traitée, then les données personnelles associées sont purgées ou anonymisées selon la politique de rétention (US42.7.3) | ⬜ |
| Security : le texte de consentement précise la finalité, la durée de conservation et le destinataire des données — pas un texte générique identique quel que soit le formulaire | ⬜ |

## Hors périmètre

- Registre des traitements RGPD au niveau de l'organisation (Art. 30) — Forms alimente le registre via sa classification (US42.7.1), ne le remplace pas
- Gestion des demandes d'accès/rectification/effacement au niveau plateforme — relève d'un processus PIVOT transverse, pas de Forms seul

## Notes d'implémentation

- Le principe de minimisation implique que le schéma de champ (EN42.1) permette de marquer un champ comme « donnée personnelle », condition du blocage de publication ci-dessus

---
Item Type: US · Parent: F42.7 · Module: forms · Phase: phase-3 · Size: M · Priority: Critical
Stage: ⬜
Source: FRM-702 · MoSCoW: Must · Origine: Jotform, Tally, Formbricks
Justification: Benchmark formulaires (Typeform/Jotform/Tally/Formbricks/Qualtrics/Google) — recentré PIVOT
Dépendances: EN42.1 (moteur & schéma de formulaire)
