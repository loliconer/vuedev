module.exports = {
  pwa: { // GenerateSW mode
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true
    }
  },
  pwa2: { // InjectManifest mode. Use custom service-worker.js
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'src/service-worker.js'
    }
  }
}
