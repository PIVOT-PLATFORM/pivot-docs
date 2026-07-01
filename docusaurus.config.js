// @ts-check
const { themes: prismThemes } = require('prism-react-renderer');

const organizationName = 'PIVOT-PLATFORM';
const projectName = 'pivot-docs';

/** Une instance de plugin docs par dossier racine existant, sidebar auto-générée. */
const sections = [
  { id: 'architecture', label: 'Architecture', path: 'docs/architecture' },
  { id: 'adr', label: 'ADR', path: 'docs/adr' },
  { id: 'cicd', label: 'CI/CD', path: 'docs/cicd' },
  { id: 'audits', label: 'Audits', path: 'docs/audits' },
  { id: 'backlog', label: 'Backlog', path: 'docs/backlog' },
  { id: 'workflow', label: 'Workflow', path: 'docs/workflow' },
];

const editUrl = `https://github.com/${organizationName}/${projectName}/edit/main/`;

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
      navbar: {
        title: 'PIVOT Docs',
        logo: {
          alt: 'PIVOT',
          src: 'img/logo.svg',
        },
        items: [
          ...sections.map((section) => ({
            to: `/${section.id}`,
            label: section.label,
            position: 'left',
          })),
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
