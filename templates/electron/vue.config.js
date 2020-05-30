module.exports = {
  // publicPath: '.',
  configureWebpack: {
    entry: {
      app: './src/renderer/index.js'
    },
  },
  pluginOptions: {
    electronBuilder: {
      mainProcessFile: 'src/background.js',
      builderOptions: {
        productName: 'Covear',
        appId: 'dapp.lovue.covear',
        directories: {
          output: 'release'
        },
        dmg: {
          window: {
            width: 540,
            height: 380
          },
          contents: [{
            x: 410,
            y: 230,
            type: 'link',
            path: '/Application'
          }, {
            x: 130,
            y: 230,
            type: 'file'
          }]
        },
        win: {
          target: [{
            target: 'nsis',
            arch: ['x64']
          }, {
            target: 'zip',
            arch: ['x64']
          }, {
            target: 'portable',
            arch: ['x64']
          }]
        },
        nsis: {
          oneClick: false,
          allowToChangeInstallationDirectory: true
        },
        linux: {
          category: 'Network',
          target: ['deb', 'snap', 'AppImage']
        }
      }
    }
  }
}
