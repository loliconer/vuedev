import './app.less'
import 'src/js/base'
import App from './App.vue'

$fetch.get('user').then(user => {
  new Vue({
    render: h => h(App, {
      props: { user }
    })
  }).$mount('app')
}).catch(error => {
  if (error.code === 105) location.href = '/login.html'
})
