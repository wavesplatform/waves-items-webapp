module.exports = {
  title: 'Items Vault Docs',
  description: '',
  themeConfig: {
    nav: [
      //      { text: 'Home', link: '/' },
    ],
    sidebar: [
      {
        title: 'Guides',
        collapsable: false,
        children: [
          '/guides/tokenizing-a-game',
        ]
      },
      {
        title: 'SDK',
        collapsable: false,
        children: [
          '/sdk/items-protocol',
          '/sdk/lib',
        ]
      },
    ],
    docsRepo: 'https://github.com/wavesplatform/waves-items-webapp',
    docsDir: 'docs',
    docsBranch: 'master',
    editLinks: true,
    editLinkText: 'Help us improve this page!'
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': '/guides'
      }
    }
  },
}
