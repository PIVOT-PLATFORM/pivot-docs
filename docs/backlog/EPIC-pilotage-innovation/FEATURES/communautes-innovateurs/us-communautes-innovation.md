# US38.12.1 — Communautés d'innovation

**En tant que** responsable innovation
**Je veux** animer des **communautés d'innovation** thématiques (espaces d'échange, défis, événements, fils de discussion)
**Afin de** faire vivre une culture d'innovation par le collectif

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un thème, when je crée une communauté, then membres, espace d'échange, campagnes et événements y sont rattachés | ⬜ |
| Given une communauté, when elle est active, then les idées/discussions y circulent et alimentent l'idéation (F38.2) | ⬜ |
| Error : given un nom de communauté déjà existant ou un thème vide, when je tente de créer la communauté, then la création échoue avec un message d'erreur explicite (pas de communauté dupliquée ou orpheline créée) | ⬜ |
| Security : la création/l'administration d'une communauté (renommage, suppression, gestion des membres) est réservée au responsable innovation ou à un animateur désigné ; rejoindre une communauté respecte son statut d'accès (ouverte / sur invitation) | ⬜ |
| A11y : la liste des communautés et leur espace d'échange (fils de discussion) sont navigables au clavier, avec structure de titres cohérente pour lecteur d'écran | ⬜ |

## Hors périmètre
- Moteur de messagerie/chat temps réel complet (l'espace d'échange s'appuie sur les briques existantes de discussion/commentaires du SMI, pas un nouveau système de messagerie)
- Gestion logistique détaillée des événements de communauté — couvert par US38.15.1 (Organisation d'événements internes d'innovation)
- Modération de contenu avancée (filtrage automatique, signalement) — hors périmètre Socle de cette US

## Notes d'implémentation
- S'articule avec F38.2 (Idéation & campagnes) : une communauté peut porter des campagnes/défis existants, elle n'en redéfinit pas le mécanisme
- Le rattachement communauté ↔ campagnes ↔ événements doit rester cohérent avec le modèle SMI (EN38.1) pour éviter la duplication de données
- Prévoir un statut d'accès par communauté (ouverte à tous / sur invitation) dès la création, pour supporter l'AC sécurité

---
Item Type: US · Parent: F38.12 · Module: pilotage · Phase: phase-3 · Size: M · Priority: Medium
Stage: ⬜
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: SMI — fonctionnalités innovantes (IA gouvernée, intelligence collective, corporate venturing)
Dépendances: EN38.1 · EN38.2 (moteur IA & graphe)
