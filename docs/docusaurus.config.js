// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Nexa Rocks!',
  tagline: 'Solo, Pool & Cloud Mining NEXA Assets',
  url: 'https://docs.nexa.rocks',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'avasdao', // Usually your GitHub org/user name.
  projectName: 'nexa-rocks', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Nexa Rocks!',
        logo: {
          alt: 'Nexa Rocks! Logo',
          src: 'img/logo.png',
        },
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Mining 101',
          },
          {
            // to: '/blog', 
            href: 'https://blog.nexa.rocks',
            label: 'Blog', 
            position: 'left'
          },
          {
            href: 'https://github.com/avasdao/nexa-rocks',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Guides',
            items: [
              {
                label: 'Mining 101',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Nexa Homepage',
                href: 'https://nexa.org',
              },
              {
                label: 'Matrix Chat',
                href: 'https://matrix.to/#/#nexacoin:matrix.org',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/Nexamoney',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: 'https://blog.nexa.rocks',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/avasdao/nexa-rocks',
              },
            ],
          },
        ],
        copyright: `Copyright &copy; ${new Date().getFullYear()} Nexa Rocks! All rights reserved.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
