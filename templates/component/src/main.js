import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  data: {},
  components: {
    [App.name]: App
  },
  methods: {}
}).$mount('#app')
