# US42.7.3 — Rétention et purge des réponses

**En tant que** DPO
**Je veux** définir une politique de rétention par formulaire et déclencher une purge automatique des réponses à échéance
**Afin de** ne pas conserver de données personnelles au-delà de la durée nécessaire (minimisation RGPD)

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une politique de rétention configurée sur un formulaire (durée en jours/mois), when l'échéance est atteinte pour une réponse, then elle est purgée automatiquement sans intervention manuelle | ⬜ |
| Given une purge programmée, when elle s'exécute, then un journal de purge est conservé (nombre de réponses purgées, date, formulaire) sans conserver les données elles-mêmes | ⬜ |
| Error : given une réponse liée à un contentieux ou une obligation légale de conservation prolongée, when l'échéance de purge standard est atteinte, then un mécanisme de rétention légale permet de suspendre la purge sur cette réponse spécifiquement | ⬜ |
| Security : la purge est irréversible et ne laisse pas de copie résiduelle (sauvegardes comprises, selon la politique de sauvegarde globale de la plateforme) | ⬜ |

## Hors périmètre

- Anonymisation partielle (au lieu d'une purge complète) — hors périmètre de cette itération, qui couvre la purge complète à échéance
- Politique de rétention différenciée par champ au sein d'un même formulaire — la politique s'applique au niveau du formulaire entier

## Notes d'implémentation

- Priorité relevée à **High** (initialement Medium) : la purge automatique est ce qui rend la classification de sensibilité (US42.7.1) et le consentement (US42.7.2) réellement opposables dans le temps, pas seulement déclaratifs
- Le mécanisme de rétention légale (AC Error) doit être une exception explicite et tracée, jamais un moyen détourné de contourner la politique par défaut

---
Item Type: US · Parent: F42.7 · Module: forms · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Rôle: delegue-a-la-protection-des-donnees
Source: FRM-703 · MoSCoW: Should · Origine: Vide de marché + gouvernance données
Justification: Benchmark formulaires (Typeform/Jotform/Tally/Formbricks/Qualtrics/Google) — recentré PIVOT
Dépendances: EN42.1 (moteur & schéma de formulaire)
