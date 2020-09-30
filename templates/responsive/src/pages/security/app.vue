<template>
  <div id="app" class="page">
    <component :is="componentId"></component>
  </div>
</template>

<script>
  import {isMobile} from '@lovue/utils'

  export default {
    name: 'App',
    data() {
      return {
        componentId: ''
      }
    },
    created() {
      if (isMobile()) {
        this.componentId = () => import(/* webpackChunkName: "SecurityMobile" */'./mobile.vue')
      } else {
        this.componentId = () => import(/* webpackChunkName: "SecurityPC" */'./pc.vue')
      }
    }
  }
</script>
