# EN51.5 — Filtre d'accès interne / externe & masquage par sensibilité

**Type d'enabler** : sécurité / architecture

**Objectif technique** : Appliquer, à la composition d'un cockpit, la politique d'accès spécifiée
dans [cockpits-dsi-bijection.md](pathname:///pivot-docs/specs/EPIC-shell-ux/cockpits-dsi-bijection)
(§ Accès interne / externe) et fixée par [ADR-028](pathname:///pivot-docs/adr/ADR-028-acces-identites-externes)
(définition de l'externe, OIDC fragment externe, scoping projets + transverse) : selon la **classe
d'identité** (Interne / Interne externalisé / Externe pur) et la **sensibilité** de la card, décider
`● complet` / `◑ scope engagement` / `◐ agrégé` / `○ masqué`.

**Justification** : La bijection dit *quel* cockpit ; ce filtre dit *combien* on en montre. Sans lui,
un prestataire externe verrait des données financières, de sécurité ou nominatives. C'est le
garde-fou de **protection des données**.

## Garde-fous (cf. spec)

1. **Scoping par engagement** — restreint aux tenant/domaine/projet du contrat.
2. **Masquage par sensibilité** — cards 🔴 masquées/agrégées pour les externes (inversion de la règle
   interne « obligatoire jamais masquable »).
3. **Lecture seule par défaut** — actions de gouvernance réservées à l'interne.
4. **Time-box & révocation** — accès lié à la durée de mission, expiration automatique.
5. **Traçabilité renforcée** — toute consultation externe journalisée (alimente EN51.7).

**Critères de complétion** :
- [ ] Résolution `classe d'identité` depuis le périmètre (DSI / externalisé / externe pur).
- [ ] Application de la matrice de visibilité du contrat EN51.3 (card × classe → ●/◑/◐/○).
- [ ] Invariant testé : aucune card 🔴 exposée en clair à un externe pur ; aucune action mutative
      côté externe.
- [ ] Scoping effectif : un externe ne reçoit que les données de son engagement (filtré côté API,
      pas seulement masqué côté UI).
- [ ] Exceptions maîtrisées implémentées (auditeur : lecture seule dossier de preuve ; éditeur N3 :
      incidents de son produit ; infogérant : run de son périmètre).
- [ ] Journalisation de chaque accès externe.

## Notes

- Le masquage doit être **côté serveur** pour les données sensibles : un `○`/`◐` n'est pas qu'un
  style CSS, la donnée nominative/secrète ne doit pas transiter vers un client externe.

---
Item Type: Enabler · Parent: E51 · Type: securite · Module: core · Phase: phase-3
Stage: ⬜ · Priority: Critical
Dépendances: ADR-028 (accès externe), EN51.2, EN51.3, E01 (identité/périmètre), EN51.7 (journalisation)
