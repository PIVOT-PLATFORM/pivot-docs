# US34.1.1 — IA de synthèse gouvernée

**En tant que** PMO
**Je veux** produire des synthèses de pilotage et de comité par IA avec localisation des traitements, traçabilité des productions et contrôle humain
**Afin de** gagner du temps sur les synthèses tout en gardant l'IA sous gouvernance

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given des données de portefeuille, when le PMO demande une synthèse IA, then une synthèse est générée et soumise à validation humaine (relecture/édition/rejet) avant toute diffusion au comité | ⬜ |
| Given une synthèse générée, when le PMO consulte ses métadonnées, then la localisation des traitements IA (France/UE) et le modèle utilisé sont documentés et vérifiables | ⬜ |
| Error : given une donnée de portefeuille hors périmètre autorisé du PMO, system exclut la donnée de la synthèse plutôt que de la produire par erreur | ⬜ |
| Security : chaque production IA est tracée (données sources utilisées, modèle, auteur de la demande, horodatage) et ne peut être diffusée sans validation humaine explicite (pas de diffusion auto) | ⬜ |
| A11y : l'écran de relecture/validation de la synthèse (affichage, édition, boutons valider/rejeter) est utilisable au clavier et respecte les contrastes et labels ARIA requis par le WCAG 2.1 AA | ⬜ |

## Hors périmètre
- Ne couvre pas la génération de synthèses totalement automatiques sans étape de validation humaine (hors gouvernance visée par cette US).
- Ne couvre pas le format de diffusion final vers le comité (email, export, présentation) : cette US s'arrête à la validation ; la diffusion elle-même peut faire l'objet d'une US séparée.
- Ne couvre pas le choix du modèle IA sous-jacent ni les garanties de non-réutilisation des données d'entraînement (traité par US34.1.4 IA souveraine).

## Notes d'implémentation
- Dépend fonctionnellement de US34.1.4 (IA souveraine) pour la garantie de localisation France/UE des traitements ; cette US consomme cette garantie plutôt que de la réimplémenter.
- Les données de portefeuille consommées proviennent du schéma `pilotage` (Flyway), avec filtrage par périmètre d'habilitation du PMO avant envoi au modèle IA (pas de fuite de données hors scope au moment de la génération, pas seulement au moment de l'affichage).
- La traçabilité (données, modèle, auteur, horodatage) doit être stockée de façon durable et consultable a posteriori, pas seulement affichée à l'écran au moment de la validation.

---
Item Type: US · Parent: F34.1 · Module: pilotage · Phase: phase-3 · Size: L · Priority: High
Stage: ⬜
Rôle: officier-responsable-pmo
Source: PP-031 · MoSCoW: Should · Lot: Lot 3 · Origine: 2/3 (VIA, Copilot) + Insight I7
Profils: Grand groupe, Privée sous droit public, Publique, État
Justification: Dossier §5.2 + §8-I7
Dépendances: —
