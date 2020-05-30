<template>
  <div class="view-home">
    <div class="row-stat">
      <div class="s-card">
        <div class="s-card-body">
          <div class="stat-title">用户数</div>
          <div class="stat-count">{{users}}</div>
        </div>
      </div>

      <div class="s-card">
      </div>
    </div>
  </div>
</template>
<script>
  import './Home.less'

  export default {
    data() {
      return {
        users: 0
      }
    },
    methods: {
      async getUsers() {
        this.users = (await $fetch.get('users').catch(this.error) || []).length
      }
    },
    created() {
      this.getUsers()
    }
  }
</script>
