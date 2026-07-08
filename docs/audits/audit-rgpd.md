# Audit — rgpd

**Statut :** À compléter
**Dernière révision :** 2026-06-20
**Profil agent responsable :** Expert RGPD

## Résumé

Score de maturité pas encore calculé (`Statut: À compléter`) — cette section liste le contexte
et les points déjà identifiés pour préparer le premier passage d'audit formel, sur la base des
données personnelles réellement traitées par le schéma `public` et les modules métier.

## Points d'attention

- Registre Art. 30 — données identifiées à ce jour : `users` (email, prénom, nom, locale),
      `trusted_devices` (fingerprint, IP, rétention 90 jours vue dans les seeds), `audit_events`
      (IP, user-agent, type d'événement). Vérifier qu'un registre des traitements formel existe
      et couvre bien ces trois tables.
- Contenu généré par les utilisateurs dans les modules métier (whiteboard, quiz, session
      live, formulaire) — peut contenir des données personnelles saisies librement (ex. un
      participant qui écrit son nom/email dans un board). Aucune politique de rétention/
      suppression n'a encore été vérifiée pour ce contenu, contrairement aux tables du schéma
      `public` qui ont des TTL explicites.
- Droit à l'effacement / export des données — aucune preuve d'implémentation trouvée à ce
      jour (ni endpoint, ni US backlog identifiée) ; à confirmer si c'est un gap réel ou déjà
      couvert ailleurs dans le backlog.
- Bases légales par traitement — à documenter explicitement par table/finalité plutôt que
      supposées (ex. `audit_events` de sécurité = intérêt légitime, contenu whiteboard = contrat/
      consentement selon le contexte tenant).
- Cohérence avec la règle "isolation tenant" (sécurité) — bien que ce soit un sujet
      `audit-cyber.md`, le croisement RGPD est direct : une fuite cross-tenant est aussi une
      violation RGPD (accès non autorisé aux données d'un autre tenant/client).

## Historique des révisions

| Version | Date | Score | Évolutions principales |
|---------|------|-------|------------------------|
| v1 | 2026-06-20 | — | Initialisation |
| v3 | 2026-07-08 | — | Contexte et points d'attention initiaux (préparation premier audit formel) |
