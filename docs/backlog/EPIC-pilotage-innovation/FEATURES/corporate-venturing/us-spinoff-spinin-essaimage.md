# US38.13.3 — Spin-off / spin-in & essaimage

**En tant que** responsable innovation / juriste
**Je veux** outiller le **spin-off / spin-in / essaimage** (création d'entité, carve-out, réintégration) d'une innovation
**Afin de** faire aboutir une innovation même hors du périmètre initial

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given une innovation mature, when un spin-off/essaimage est décidé, then le dossier (entité, PI, participation, gouvernance) est suivi | ⬜ |
| Given un spin-in, when une pépite externe est réintégrée, then son intégration au portefeuille est tracée | ⬜ |
| Error : given un dossier de spin-off sans innovation source rattachée, when il est soumis, then la création est refusée (traçabilité de l'origine obligatoire) | ⬜ |
| Security : la décision de spin-off/spin-in (création d'entité, transfert de PI, participation) est réservée aux rôles habilités (responsable innovation, juriste, COMEX) et chaque changement de statut du dossier est tracé (qui, quand) | ⬜ |

## Hors périmètre
- Les démarches administratives/juridiques de création d'entité (immatriculation, statuts) : suivi du dossier uniquement, pas d'automatisation juridique
- Le transfert effectif de la propriété intellectuelle (contrats, cession) : suivi de l'état, la valorisation/transfert détaillé relève de US38.7.2
- La gestion financière de la participation résultante : suivie au niveau dossier, le montage financier détaillé est hors périmètre (cf. US38.13.4 pour le lien CVC)

## Notes d'implémentation
- S'appuie sur EN38.1 (modèle SMI) pour rattacher le dossier à l'innovation source (Idea/Concept/InnovationItem) et tracer la gouvernance associée
- Le spin-in doit permettre de rattacher une entité externe à un point du portefeuille (H1/H2/H3, F38.5) sans dupliquer le modèle d'innovation
- Lien possible avec US38.13.4 (écosystème start-up & CVC) quand le spin-off implique une prise de participation externe

---
Item Type: US · Parent: F38.13 · Module: pilotage · Phase: phase-3 · Size: M · Priority: Low
Stage: ⬜
Profils: Grand groupe, Publique, État
Justification: SMI — fonctionnalités innovantes (IA gouvernée, intelligence collective, corporate venturing)
Dépendances: EN38.1 · EN38.2 (moteur IA & graphe)
