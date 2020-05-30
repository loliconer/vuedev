<template>
  <aside class="admin-sidebar" :class="{collapsed: collapsed}">
    <div class="logo">
      <a href="#/">
        <img src="/img/logo-main.png" alt="logo">
        <span>茂源资本</span>
      </a>
    </div>
    <v-menu :menus="menus" mode="spa" vertical></v-menu>
  </aside>
</template>

<script>
  import './Sidebar.less'

  export default {
    data() {
      return {
        menus: [
          {
            name: '控制面板', icon: 'dashboard',
            children: [
              { name: '统计页', url: '/index.html' }
            ]
          },
          {
            name: '企业', icon: 'building',
            children: [
              { name: '企业管理', url: '/company/companies.html' },
              { name: '企业配置', url: '/company/configs.html' },
              { name: '图片上传', url: '/company/image-upload.html' }
            ]
          },
          {
            name: '用户', icon: 'user',
            children: [
              { name: '用户管理', url: '/user/users.html' },
              { name: '组管理', url: '/user/groups.html' },
              { name: '多用户组菜单管理', url: '/user/groups-menu.html' },
              { name: '用户审核', url: '/user/audit.html' }
            ]
          },
          {
            name: '系统', icon: 'system',
            children: [
              { name: '菜单管理', url: '/sys/menus.html' },
              { name: '反馈处理', url: '/sys/feedback.html' }
            ]
          }
        ]
      }
    },
    props: {
      collapsed: Boolean
    }
  }
</script>
