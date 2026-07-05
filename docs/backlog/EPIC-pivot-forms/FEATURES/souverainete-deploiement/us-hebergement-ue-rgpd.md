# US42.8.2 — Hébergement UE / RGPD

**En tant que** DSI
**Je veux** une option d'hébergement cloud géré, localisée en France/UE et conforme RGPD, sans facturation à la réponse
**Afin de** proposer une alternative au self-host pour les tenants qui ne veulent pas opérer leur propre infrastructure

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un tenant souscrivant à l'offre cloud gérée, when ses données sont hébergées, then la localisation (France/UE) est documentée contractuellement et vérifiable (pays du datacenter) | ⬜ |
| Given un volume de réponses variable dans le temps, when la facturation est calculée, then elle ne dépend jamais du nombre de réponses collectées | ⬜ |
| Error : given une demande de portabilité des données depuis l'offre cloud (fin de contrat, changement d'hébergement), when elle est formulée, then un export complet au format d'échange ouvert (US42.11.1) est fourni dans un délai contractuel défini | ⬜ |
| Security : mêmes garanties SSO/RBAC/chiffrement que le self-host (EN42.2) — l'offre cloud gérée n'est pas un niveau de sécurité dégradé par rapport au self-host | ⬜ |

## Hors périmètre

- Hébergement hors UE avec clauses contractuelles types comme alternative — hors périmètre, cette US couvre l'option France/UE uniquement

## Notes d'implémentation

- La réversibilité (export au format ouvert) est ce qui évite le lock-in propre à une offre cloud gérée — dépend de US42.11.1

---
Item Type: US · Parent: F42.8 · Module: forms · Phase: phase-3 · Size: M · Priority: High
Stage: Backlog
Source: FRM-802 · MoSCoW: Must · Origine: Formbricks (Francfort), Tally (UE)
Justification: Benchmark formulaires (Typeform/Jotform/Tally/Formbricks/Qualtrics/Google) — recentré PIVOT
Dépendances: EN42.1 (moteur & schéma de formulaire)
