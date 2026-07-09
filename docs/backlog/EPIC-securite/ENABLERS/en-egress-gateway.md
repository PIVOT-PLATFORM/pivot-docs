# EN43.4 — Egress Gateway (sortant)

**Type d'enabler** : architecture · sécurité

**Objectif technique** : Point de sortie unique et contrôlé du trafic vers les API externes — aucun module (adaptateur) n'a le droit d'ouvrir une connexion sortante directe.

**Justification** : Le trafic sortant est le point le plus négligé et le plus dangereux : c'est la voie de la SSRF, de l'exfiltration de données et des credentials codés en dur dans un adaptateur. Sans passerelle unique, chaque nouvel adaptateur OSS (E28) rouvre la même surface d'attaque.

**Critères de complétion** :
- [ ] Allowlist d'endpoints externes (aucun appel libre) — ferme la classe d'attaques SSRF
- [ ] Minimisation des données envoyées (aucune donnée de classe C sortante — cf. EN43.11)
- [ ] Inspection et journalisation de tout appel sortant
- [ ] Credentials externes récupérés depuis EN43.6 (secrets), jamais en dur dans un adaptateur
- [ ] Isolation des pannes (timeout, circuit breaker, bulkhead — cf. EN43.10) sur chaque intégration externe

**Dépendances** : EN43.6 (secrets), EN43.11 (classification souveraineté)

**Statut** : ⬜ À faire

---
Item Type: Enabler · Parent: E43 · Type: architecture · Module: securite · Phase: phase-3 · Size: L
Stage: ⬜ · Priority: Critical
