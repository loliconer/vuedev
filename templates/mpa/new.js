// Fast to generate a page
const fs = require('fs')
const path = require('path')
const app = process.argv[2]
const dir = `src/pages/${app}`

function mkdir(dir) {
  if (!fs.existsSync(path.dirname(dir))) mkdir(path.dirname(dir))
  fs.mkdirSync(dir)
}

mkdir(dir)
if (app.includes('/')) {
  const htmlDir = app.split('/').slice(0, -1).join('/')
  fs.mkdirSync(`public/${htmlDir}`)
}

const jsContent = `import 'src/js/base'
import init from 'src/js/init'
import App from './App.vue'
import './app.less'

init().then(user => {
  new Vue({
    render: h => h(App, {
      props: { user }
    })
  }).$mount('app')
}).catch(error => console.error(error))
`
fs.writeFileSync(`${dir}/app.js`, jsContent)

const lessContent = `@import (reference) "~src/less/Mixins";`
fs.writeFileSync(`${dir}/app.less`, lessContent)

const vueContent = `<template>
  <div id="app" class="app-">
    <nav-bar :user="user"></nav-bar>
  </div>
</template>
<script>
  export default {
    name: 'App',
    data() {
      return {}
    },
    props: {
      user: Object
    },
    methods: {},
    created() {}
  }
</script>`
fs.writeFileSync(`${dir}/App.vue`, vueContent)
