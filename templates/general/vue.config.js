const path = require('path')

class ReplaceVendorsPlugin {
  constructor() {}

  apply(compiler) {
    compiler.hooks.compilation.tap(this.constructor.name, compilation => {
      compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tap(this.constructor.name, htmlPluginData => {
        htmlPluginData.html = htmlPluginData.html.replace('vue.runtime.js', 'vue.runtime.min.js')
        return htmlPluginData
      })
    })
  }
}

module.exports = {
  lintOnSave: false,
  css: {
    loaderOptions: {
      less: {
        strictMath: 'on'
      }
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8020',
        changeOrigin: true
      },
      '/upload': {
        target: 'http://192.168.1.14',
        changeOrigin: true
      }
    }
  },
  chainWebpack: config => {
    config.plugins.delete('prefetch')

    // 特殊资源通过preload加载
    config.plugin('preload').tap(options => {
      options[0] = {
        rel: 'preload',
        as(entry) {
          if (/\.css$/.test(entry)) return 'style'
          if (/\.(woff||ttf)$/.test(entry)) return 'font'
          if (/\.png$/.test(entry)) return 'image'
          return 'script'
        },
        include: 'allAssets',
        fileBlacklist: [/\.map$/, /hot-update\.js$/]
      }
      return options
    })
  },
  configureWebpack: {
    externals: {
      vue: 'Vue'
    },
    resolve: {
      extensions: ['*', '.js', '.vue', '.json'],
      alias: {
        src: path.join(__dirname, 'src')
      }
    },
    plugins: process.env.NODE_ENV === 'production' ? [
      new ReplaceVendorsPlugin()
    ] : []
  }
}
