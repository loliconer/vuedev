module.exports = {
  devServer: {
    proxy: {
      '/admin': {
        target: 'http://localhost:8090',
        bypass() {
          return '/admin.html'
        }
      }
    }
  },
}
