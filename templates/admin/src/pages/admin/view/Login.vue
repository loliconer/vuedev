<template>
  <div class="view-login">
    <header class="title">后台管理系统</header>
    <form class="form" @submit.prevent="login">
      <v-row>
        <v-input name="username" placeholder="用户名" required effect></v-input>
      </v-row>
      <v-row>
        <v-input type="password" name="password" required placeholder="密码" effect></v-input>
      </v-row>
      <v-row class="row-submit">
        <v-button submit>登录</v-button>
      </v-row>
    </form>
  </div>
</template>
<script>
  import './Login.less'
  import {mapState, mapMutations} from 'vuex'

  export default {
    computed: {
      ...mapState(['user'])
    },
    methods: {
      ...mapMutations({ setUserInfo: 'SET_USER_INFO' }),
      async login(ev) {
        const body = await $fetch.form('session', new FormData(ev.target)).catch(this.error)
        if (body === undefined) return
        if (!body.admin) return this.error('该用户无权限')

        this.setUserInfo(body)
        this.$router.push('/index.html')
      }
    }
  }
</script>
