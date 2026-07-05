# ADR-012 — Plan de trafic : API Gateway + Service Mesh + Egress Gateway

**Date :** 2026-07-05
**Statut :** Proposé
**Décideurs :** Architecte plateforme, RSSI
**Contexte technique :** organisation `PIVOT-PLATFORM`

---

## Contexte

La grande erreur est de traiter tous les flux réseau pareil. Un portail qui relie des modules internes et des API externes fait face à trois régimes de trafic aux propriétés très différentes : entrant (utilisateur/externe → portail), interne (module ↔ module), sortant (portail → API externes).

## Décision

Trois dispositifs distincts, un par régime :

1. **Nord-sud (entrant) → API Gateway.** Point d'entrée unique : authentification, limitation de débit/quotas anti-abus, WAF, validation de schéma des requêtes, terminaison TLS. Rien n'entre sans passer par là.
2. **Est-ouest (interne) → Service Mesh.** Chiffrement mutuel (mTLS, cf. ADR-011) et authentification d'identité de charge, avec retries/circuit breakers/timeouts gérés par le maillage plutôt que par chaque module. Un module ne peut appeler que ce que la politique du maillage autorise (cf. ADR-013).
3. **Sortant → Egress Gateway.** Le point le plus négligé et le plus dangereux : tout appel sortant passe par une passerelle de sortie avec allowlist d'endpoints externes — aucun appel libre. Ferme la classe d'attaques SSRF et empêche l'exfiltration silencieuse.

Le frontend ne touche jamais un module directement : un BFF (Backend for Frontend) agrège pour lui sans stocker de donnée sensible.

## Conséquences

- **Positif :** chaque régime de trafic a un point de contrôle unique, auditable, sans logique de sécurité dupliquée dans chaque module.
- **Négatif :** trois briques d'infrastructure à opérer (Gateway, Mesh, Egress Gateway) plutôt qu'un simple reverse-proxy.
- **Interdit :** un module (adaptateur ou natif) qui ouvre une connexion sortante directe vers une API externe, en dehors de l'Egress Gateway.

## Alternatives écartées

- Un unique reverse-proxy générique pour tous les régimes de trafic : ne distingue pas les propriétés de sécurité propres à chaque régime (authN utilisateur vs identité de charge vs allowlist sortante), et concentre un risque disproportionné sur un seul composant.
- Laisser chaque adaptateur gérer ses propres appels sortants : impossible à auditer et à contenir à l'échelle de dizaines d'adaptateurs.

## Historique

| Version | Date | Évolution |
|---------|------|-----------|
| v1 | 2026-07-05 | Décision initiale |
