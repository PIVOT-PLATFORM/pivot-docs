# US22.6.4 — Export & rapports de pilotage

**En tant que** PMO
**Je veux** exporter en Excel / PDF / image et générer des rapports (avancement, charge, écarts)
**Afin de** diffuser et archiver le pilotage

## Critères d'acceptation

| Critère | 🤖 Dev |
|---------|--------|
| Given un plan, when j'exporte en Excel, then tâches/dates/ressources/avancement sont exploitables | ⬜ |
| Given un rapport d'avancement, when je le génère, then il synthétise % réalisé, écarts baseline et jalons | ⬜ |
| Given un export en image (PNG/SVG) ou PowerPoint, when je le déclenche, then le rendu correspond à la vue courante (US22.6.1) et sa mise en forme (US22.6.3) | ⬜ |
| Error : given un plan sans baseline figée, when je génère un rapport d'écarts, then le système signale l'absence de baseline au lieu d'afficher des écarts erronés | ⬜ |
| Security : l'export ne contient que les projets/tâches sur lesquels l'utilisateur a un droit de lecture (filtrage par tenantId et par droits d'équipe) | ⬜ |
| A11y : la page de génération de rapport (choix du format, aperçu) est navigable au clavier et conforme WCAG 2.1 AA | ⬜ |

## Hors périmètre

- La définition des baselines elles-mêmes et le calcul des écarts (US22.2.5/US22.4.9) : cette US consomme les écarts déjà calculés, elle ne les calcule pas
- La mise en forme des styles de barres/jalons/impression (US22.6.3) : cette US réutilise cette mise en forme pour l'export, elle ne la définit pas
- Les formats d'interopérabilité MS Project/.mpp/.xml MSPDI et les autres formats d'échange (F22.7) : hors de cette US, dédiée aux rapports de pilotage (Excel/PDF/image/PowerPoint)
- La planification ou l'envoi automatique/récurrent des rapports (diffusion programmée) : non couvert ici, export à la demande uniquement

## Notes d'implémentation

- L'export Excel doit inclure au minimum les colonnes tâches/dates/ressources/% avancement ; il réutilise le modèle temporel unique (EN22.1) comme source de données, pas une copie dénormalisée
- Le rapport d'avancement dépend des baselines (US22.2.5) déjà figées : si aucune n'existe, l'AC Error s'applique
- L'export image/PDF/PowerPoint (US22.7.9) partage vraisemblablement le même moteur de rendu que l'export de cette US — éviter la duplication d'un second pipeline d'export
- Volumétrie : pour les plans de grande taille (10 000+ tâches, cf. EN22.2), l'export doit rester asynchrone/paginé pour ne pas bloquer l'UI

---
Item Type: US · Parent: F22.6 · Module: pilotage · Phase: phase-3 · Size: M · Priority: High
Stage: Backlog
Profils: PME, Grand groupe, Privée sous droit public, Publique, État
Justification: Parité MS Project en mode web — modèle temporel unique (EN22.1), altitude pilotée par le profil (E40)
Dépendances: EN22.1 (modèle temporel unique)
