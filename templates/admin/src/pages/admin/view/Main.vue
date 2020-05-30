<template>
  <div class="main-layout" :class="{collapsed: asideCollapsed}">
    <div class="l">
      <sidebar :collapsed="asideCollapsed"></sidebar>
    </div>
    <div class="r">
      <navbar @toggle-aside="val => asideCollapsed = val"></navbar>
      <div class="content">
        <transition name="router" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
  import Navbar from './components/Navbar.vue'
  import Sidebar from './components/Sidebar.vue'

  export default {
    data() {
      return {
        asideCollapsed: false
      }
    },
    components: { Navbar, Sidebar }
  }
</script>
