# US42.1.2 — Types de champs variés

**En tant que** concepteur de formulaire
**Je veux** disposer d'une bibliothèque de types de champs (texte, choix unique/multiple, échelle/note, NPS, date, adresse, e-mail, nombre, matrice/Likert, upload de fichier)
**Afin de** couvrir la plupart des besoins de collecte sans champ personnalisé codé

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given l'éditeur, when j'ajoute un champ, then tous les types de la bibliothèque sont proposés avec leurs options de paramétrage propres (ex. bornes min/max pour un champ nombre, échelle 1-10 pour NPS) | ⬜ |
| Given un champ upload de fichier, when un répondant y dépose un fichier, then le type et la taille sont vérifiés avant acceptation | ⬜ |
| Error : given un fichier hors des types/tailles autorisés pour un champ upload, when le répondant tente de le déposer, then il est rejeté avec un message explicite (type/taille attendus) | ⬜ |
| Security : les fichiers uploadés sont scannés et stockés hors du chemin d'exécution de l'application (pas de fichier exécutable servi tel quel) | ⬜ |
| A11y : chaque type de champ expose le label, l'état requis/erreur et les instructions via les attributs ARIA appropriés (WCAG 2.1 AA) | ⬜ |

## Hors périmètre

- Types de champs métier spécifiques à un module PIVOT (ex. sélecteur de risque E21, de projet E22) — relèvent d'une intégration ultérieure, pas du socle générique
- OCR / extraction de données depuis un fichier uploadé — hors périmètre

## Notes d'implémentation

- Le schéma de champ (types, contraintes) est porté par EN42.1 — cette US consomme le modèle, ne le redéfinit pas
- Stockage des fichiers : cohérent avec la politique de rétention (US42.7.3) et l'auto-hébergement (US42.8.1) — pas de dépendance à un stockage tiers non souverain

---
Item Type: US · Parent: F42.1 · Module: forms · Phase: phase-3 · Size: L · Priority: Critical
Stage: ⬜
Source: FRM-002 · MoSCoW: Must · Origine: Socle 6/6
Justification: Benchmark formulaires (Typeform/Jotform/Tally/Formbricks/Qualtrics/Google) — recentré PIVOT
Dépendances: EN42.1 (moteur & schéma de formulaire)
