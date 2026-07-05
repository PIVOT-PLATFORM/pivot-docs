# US27.10.1 — Découplage rémunération & transparence

**En tant que** DSI
**Je veux** **découpler les OKR de l'évaluation/rémunération** et rendre les OKR **transparents par défaut**, avec des garde-fous anti-patterns
**Afin de** préserver l'ambition (pas de sandbagging) et la confiance, conformément à la doctrine Doerr

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un OKR, when il est exploité, then il **n'est pas** utilisé comme critère automatique d'évaluation/rémunération individuelle (séparation documentée) | ⬜ |
| Given les OKR d'un cycle, when la transparence est activée, then ils sont visibles dans l'organisation par défaut (sauf OKR marqués confidentiels) | ⬜ |
| Given des anti-patterns (OKR = to-do list, > 5 O/KR, sandbagging), when détectés, then un garde-fou/alerte pédagogique est affiché | ⬜ |
| Error : given une tentative d'intégration technique avec un module RH/rémunération (import de score OKR comme note de performance), when elle est détectée, then elle est bloquée et journalisée comme violation de la doctrine de découplage | ⬜ |
| Security : aucune API ou export du module OKR n'expose un champ « score utilisable en évaluation individuelle » ; seuls les rôles habilités (DSI, admin gouvernance) peuvent modifier le réglage de transparence par défaut d'un cycle | ⬜ |
| A11y : l'alerte pédagogique de garde-fou est perceptible sans dépendre de la seule couleur (icône + texte) et reste consultable au clavier | ⬜ |

## Hors périmètre
- La confidentialité fine des OKR individuels au niveau des permissions (owner/manager/RH) — couverte par US27.10.2
- L'implémentation d'un module RH/rémunération tiers — cette US ne fait que garantir qu'aucun couplage n'existe côté OKR
- La détection automatique du sandbagging par analyse statistique avancée (hors état de l'art demandé ici) — le garde-fou reste une alerte de seuil simple (volume, patterns déclaratifs)

## Notes d'implémentation
- Le découplage est avant tout une garantie d'architecture : le modèle OKR (EN27.1) ne doit exposer aucune donnée exploitable directement comme critère RH, et la documentation produit doit l'énoncer explicitement (doctrine Doerr)
- La transparence par défaut s'applique au niveau du cycle ; le marquage "confidentiel" d'un OKR individuel est une exception gérée par US27.10.2
- Les garde-fous de volume (> 5 O ou > 5 KR) recoupent ceux déjà posés par US27.1.4 — cette US ajoute le volet "sandbagging"/anti-pattern générique et la doctrine de découplage, sans redéfinir le seuil

---
Item Type: US · Parent: F27.10 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: Backlog
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: Raffinage OKR état de l'art (Doerr/Google ; Quantive/Workboard/Viva Goals/Perdoo)
Dépendances: EN27.1 (modèle OKR & moteur)
