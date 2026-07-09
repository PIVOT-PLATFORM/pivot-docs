# US38.8.3 — Hackathons & challenges avec l'écosystème externe

**En tant que** responsable open innovation
**Je veux** organiser des **hackathons / challenges ouverts à l'écosystème externe** (startups, partenaires, universités, communauté)
**Afin de** capter des idées et des talents au-delà de l'organisation

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un hackathon externe, when je le lance, then l'écosystème (startups, partenaires, universités) est invité et le format s'appuie sur le moteur d'événements interne (US38.15.1) pour inscription, équipes, jury et prix | ⬜ |
| Given les livrables externes, when l'événement se clôt, then les idées primées entrent dans l'entonnoir (F38.3) et les partenariats prometteurs alimentent le suivi des collaborations (US38.8.1) | ⬜ |
| Error : given un participant externe qui tente de s'inscrire après la clôture des inscriptions du hackathon, when il soumet le formulaire, then l'inscription est refusée avec message explicite | ⬜ |
| Security : l'inscription de participants externes (sans compte interne) ne doit exposer que les données strictement nécessaires à l'organisation de l'événement (nom, structure, équipe) ; les jurys et l'organisateur seuls voient les livrables/candidatures avant clôture, pas les autres participants externes | ⬜ |

## Hors périmètre
- Le moteur d'événements lui-même (inscription, équipes, jury, prix) : implémenté une fois par US38.15.1, cette US le réutilise pour un public externe sans le redévelopper
- Le suivi long terme des partenariats issus du hackathon : couvert par US38.8.1, cette US se limite au constat de fin d'événement qui alimente ce suivi
- Les hackathons/événements internes réservés aux collaborateurs : couverts par US38.15.1, hors périmètre ici (cette US ne concerne que l'ouverture à l'écosystème externe)

## Notes d'implémentation
- Dépend strictement de US38.15.1 : ne pas dupliquer le moteur d'inscription/équipes/jury/prix, seulement l'ouvrir à des comptes externes et ajouter le lien vers l'entonnoir et le suivi de collaborations
- Le passage des idées primées vers l'entonnoir (F38.3) doit réutiliser le point d'entrée standard de création d'idée, avec une origine tracée (« issue d'un hackathon externe ») pour la traçabilité et les KPIs (F38.9)
- S'appuie sur le modèle SMI d'EN38.1

---
Item Type: US · Parent: F38.8 · Module: pilotage · Phase: phase-3 · Size: M · Priority: Low
Stage: ⬜
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: SMI — Système de Management de l'Innovation (état de l'art, ISO 56002/56000) ; distinct de US38.15.1 (événements internes) par le périmètre écosystème externe
Dépendances: EN38.1 (modèle SMI & moteur) · US38.15.1 (moteur d'événements)
