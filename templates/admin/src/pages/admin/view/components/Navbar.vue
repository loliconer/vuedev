<template>
  <nav class="admin-nav">
    <div class="toggle-aside" @click="asideCollapsed = !asideCollapsed">
      <v-icon :icon="`menu-${asideCollapsed?'fold':'unfold'}`"></v-icon>
    </div>
    <div class="nav-items">
      <div class="ni-search">
        <v-icon icon="search" size="16"></v-icon>
      </div>
      <div class="ni-notify">
        <v-icon icon="bells" size="16"></v-icon>
      </div>
      <div class="v-dropdown-wrap">
        <div class="d-trigger">{{user.username}}</div>
        <div class="v-dropdown align-right">
          <div class="d-item"><v-icon icon="setting"></v-icon>个人中心</div>
          <div class="d-item"><v-icon icon="setting"></v-icon>修改密码</div>
          <div class="d-divider"></div>
          <div class="d-item" @click="startLogout"><v-icon icon="setting"></v-icon>退出登录</div>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
  import './Navbar.less'
  import {mapState, mapActions} from 'vuex'

  export default {
    data() {
      return {
        asideCollapsed: false
      }
    },
    watch: {
      asideCollapsed(val) {
        this.$emit('toggle-aside', val)
      }
    },
    computed: {
      ...mapState(['user'])
    },
    methods: {
      ...mapActions(['logout']),
      async startLogout() {
        const body = await this.logout().catch(this.error)
        if (body === undefined) return

        this.$router.replace('/login.html')
      }
    }
  }
</script>
