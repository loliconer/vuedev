<template>
  <div class="page-home">
    <div class="container">
    </div>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'

  export default {
    name: 'home',
    computed: {
      ...mapState(['visitors'])
    },
    methods: {
      ...mapMutations(['setVisitors'])
    },
    created() {
      this.getVisitors()
    }
  }
</script>
