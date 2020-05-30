import router, {hook} from './router'
import store from './store'
import 'src/js/lib/common'
import App from './App.vue'
import './app.less'

const userPromise = store.dispatch('init')
hook(userPromise)

new Vue({
  router,
  store,
  ...App
}).$mount('app')

