module.exports = {
  title: 'Items Vault Docs',
  description: '',
  themeConfig: {
    nav: [
      //      { text: 'Home', link: '/' },
    ],
    sidebar: [
      {
        title: 'For users',
        collapsable: false,
        children: [
          '/guides/how-to-use',
        ]
      },
      {
        title: 'For developers',
        collapsable: true,
        children: [
          '/guides/tokenizing-a-game',
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
