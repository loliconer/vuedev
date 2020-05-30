<template>
  <div class="view-users">
    <div class="panel">
      <v-button @click="startAdd">新增用户</v-button>
      <form class="form-one-row" v-show="bShowAddForm" @submit.prevent="addUser">
        <v-input v-model="current.username" name="username" placeholder="用户名" required></v-input>
        <v-input v-model="current.email" type="email" name="email" placeholder="邮箱" resize required></v-input>
        <v-select :source="groups" v-model="current.groupid" multiple></v-select>
        <v-button :loading="loading" submit>保存</v-button>
      </form>
    </div>

    <div class="panel">
      <v-table :source="users" :columns="columns">
        <template #op="{value}">
          <v-button type="text" @click="editUser(value)">修改</v-button>
<!--          <v-button type="text" @click="delUser(value)">删除</v-button>-->
        </template>
      </v-table>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        bShowAddForm: false,
        loading: false,
        users: [],
        groups: [],
        current: {},
        columns: [
          { title: 'ID', prop: 'id' },
          { title: '用户名', prop: 'username' },
          { title: '邮箱', prop: 'email' },
          { title: '手机号', prop: 'mobile_num' },
          { title: '微信号', prop: 'wechat' },
          { title: '组', prop: 'group' },
          { title: '操作', prop: 'op', custom: true }
        ]
      }
    },
    methods: {
      async getUsers() {
        this.users = await $fetch.get('users').catch(this.error) || []
      },
      editUser(row) {
        this.bShowAddForm = true
        this.current = Object.assign({}, row)
      },
      startAdd() {
        this.bShowAddForm = true
        this.current = {
          groupid: []
        }
      },
      async addUser(ev) {
        if (this.loading) return
        this.loading = true

        const { id, username, email, groupid } = this.current
        let body
        if (id) {
          body = await $fetch.put(`users/${id}`, {
            username, email, group: groupid
          }).catch(this.error)
        } else {
          const form = new FormData(ev.target)
          form.append('group', groupid)
          body = await $fetch.form('admin/user', form).catch(this.error)
        }
        this.loading = false
        if (body === undefined) return

        this.success('保存成功')
        this.bShowAddForm = false
        this.getUsers()
      },
      delUser(user) {
        this.modal({
          content: '确认删除该用户？',
          confirm: async () => {
            const body = await $fetch.delete(`users/${user.id}`).catch(this.error)
            if (body === undefined) return

            this.success('删除成功')
            for (let i = 0; i < this.users.length; i++) {
              if (this.users[i].id === user.id) {
                this.users.splice(i, 1)
                break
              }
            }
            return true
          }
        })
      }
    },
    created() {
      this.getUsers()
    }
  }
</script>
