# US42.9.1 — Bibliothèque de modèles

**En tant que** concepteur de formulaire
**Je veux** créer un formulaire à partir d'un modèle (bibliothèque PIVOT ou modèles internes gouvernés par mon organisation)
**Afin de** démarrer plus vite sur des cas d'usage courants et harmoniser les formulaires entre équipes

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given la bibliothèque de modèles, when je sélectionne un modèle, then un formulaire éditable est créé en un clic avec les champs/logique/thème du modèle | ⬜ |
| Given un modèle interne créé par une équipe, when un autre concepteur du même tenant l'utilise, then il est identifié comme modèle interne gouverné (distinct des modèles fournis par PIVOT) | ⬜ |
| Error : given un modèle référençant une capacité désactivée sur le tenant (ex. IA gouvernée non activée), when il est utilisé, then les éléments concernés sont désactivés dans le formulaire créé, pas silencieusement ignorés | ⬜ |
| Security : un modèle interne gouverné n'est visible que dans son tenant d'origine — jamais partagé par défaut avec d'autres tenants de la plateforme | ⬜ |

## Hors périmètre

- Marketplace de modèles partagés entre organisations différentes — hors périmètre, les modèles internes restent au tenant

## Notes d'implémentation

- Un modèle interne gouverné suit les mêmes règles de propriétaire/classification que US42.7.1 dès sa création, pas seulement le formulaire final qui en dérive

---
Item Type: US · Parent: F42.9 · Module: forms · Phase: phase-3 · Size: M · Priority: High
Stage: ⬜
Source: FRM-901 · MoSCoW: Must · Origine: Socle 6/6 (Jotform 10 000+)
Justification: Benchmark formulaires (Typeform/Jotform/Tally/Formbricks/Qualtrics/Google) — recentré PIVOT
Dépendances: EN42.1 (moteur & schéma de formulaire)
