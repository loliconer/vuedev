module.exports = {
  title: 'title',
  description: '',
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }]
  ],
  themeConfig: {
    nav: [
      { text: '首页', link: '/' }
    ]
  },
  shouldPrefetch: () => false,
  port: 8104,
  evergreen: true
}
