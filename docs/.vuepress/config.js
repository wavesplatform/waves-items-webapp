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
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': '/guides'
      }
    }
  },
}
