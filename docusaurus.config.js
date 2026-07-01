// @ts-check
const fs = require('fs');
const path = require('path');
const { themes: prismThemes } = require('prism-react-renderer');

const organizationName = 'PIVOT-PLATFORM';
const projectName = 'pivot-docs';

// Docusaurus crée <id>_versions.json au premier `docs:version:<id>`. Tant que
// ce fichier n'existe pas, il n'y a qu'une seule version ("Next") : afficher
// un dropdown de version dans ce cas n'a aucun sens et n'affiche que "Next"
// sans rien à sélectionner. On ne l'active donc qu'une fois une version coupée.
function hasCutVersions(id) {
  return fs.existsSync(path.join(__dirname, `${id}_versions.json`));
}

/**
 * Une instance de plugin docs par dossier racine existant, sidebar auto-générée.
 *
 * `versioned: true` sur architecture/adr : ces sections sont figées à chaque
 * release produit (tag pivot-core/pivot-ui) via `npm run docs:version:<id> -- <version>`.
 * Les autres sections (cicd, audits, backlog, workflow) reflètent en continu
 * l'état courant du sprint/produit — versionner leur contenu n'aurait pas de sens.
 */
const sections = [
  { id: 'architecture', label: 'Architecture', path: 'docs/architecture', versioned: true },
  { id: 'adr', label: 'ADR', path: 'docs/adr', versioned: true },
  { id: 'cicd', label: 'CI/CD', path: 'docs/cicd' },
  { id: 'audits', label: 'Audits', path: 'docs/audits' },
  { id: 'backlog', label: 'Backlog', path: 'docs/backlog' },
  { id: 'workflow', label: 'Workflow', path: 'docs/workflow' },
];

const editUrl = `https://github.com/${organizationName}/${projectName}/edit/main/`;

// En build de preview PR (voir .github/workflows/docs-checks.yml), un bandeau
// avertit que le site déployé n'est pas la production tant que main n'a pas
// redéployé par-dessus.
const previewPr = process.env.DOCS_PREVIEW_PR;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'PIVOT Docs',
  tagline: 'Documentation générale de la suite collaborative PIVOT',
  favicon: 'img/favicon.svg',

  // Parseur markdown "classique" (pas MDX strict) : le contenu existant contient
  // du HTML brut (<caption>, <script> en exemple, {{ }} Angular) qui casserait le parsing JSX de MDX.
  markdown: {
    format: 'md',
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },

  url: `https://${organizationName.toLowerCase()}.github.io`,
  baseUrl: `/${projectName}/`,

  organizationName,
  projectName,
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'fr',
    locales: ['fr'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: false,
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  plugins: sections.map((section) => [
    '@docusaurus/plugin-content-docs',
    /** @type {import('@docusaurus/plugin-content-docs').Options} */
    ({
      id: section.id,
      path: section.path,
      routeBasePath: section.id,
      sidebarPath: require.resolve('./sidebars.js'),
      editUrl,
      editCurrentVersion: true,
    }),
  ]),

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      ...(previewPr && {
        announcementBar: {
          id: 'pr-preview-banner',
          content: `⚠️ Aperçu de la PR #${previewPr} — ceci remplace temporairement le site de production, jusqu'au prochain déploiement de <code>main</code>.`,
          backgroundColor: '#fbbf24',
          textColor: '#1f2937',
          isCloseable: false,
        },
      }),
      navbar: {
        title: 'PIVOT Docs',
        logo: {
          alt: 'PIVOT',
          src: 'img/logo.svg',
        },
        items: [
          ...sections.flatMap((section) => [
            {
              to: `/${section.id}`,
              label: section.label,
              position: 'left',
            },
            ...(section.versioned && hasCutVersions(section.id)
              ? [
                  {
                    type: 'docsVersionDropdown',
                    docsPluginId: section.id,
                    position: 'left',
                  },
                ]
              : []),
          ]),
          {
            href: `https://github.com/${organizationName}/${projectName}`,
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Repos',
            items: [
              { label: 'pivot-core', href: 'https://github.com/PIVOT-PLATFORM/pivot-core' },
              { label: 'pivot-ui', href: 'https://github.com/PIVOT-PLATFORM/pivot-ui' },
              { label: 'pivot-docs', href: 'https://github.com/PIVOT-PLATFORM/pivot-docs' },
            ],
          },
          {
            title: 'Documentation',
            items: sections.map((section) => ({
              label: section.label,
              to: `/${section.id}`,
            })),
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} PIVOT Platform — AGPL-3.0-or-later`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

module.exports = config;
