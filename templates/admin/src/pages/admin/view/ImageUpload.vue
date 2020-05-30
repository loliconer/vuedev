<template>
  <div class="view-image-upload">
    <div class="panel">
      <form class="form-one-row" style="margin-top: 0;" @submit.prevent="doUpload">
        <template v-if="trigger">
          <v-upload name="attachment" show-thumb></v-upload>
          <v-input name="description" placeholder="备注"></v-input>
          <v-button submit>上传</v-button>
        </template>
      </form>
    </div>
    <div class="panel">
      <v-table :columns="columns" :source="images">
        <template slot="path" slot-scope="{value: {path}}">
          <a class="link" :href="path" target="_blank">{{path}}</a>
        </template>
      </v-table>
    </div>
  </div>
</template>
<script>
  import './ImageUpload.less'

  export default {
    data() {
      return {
        columns: [
          {title: 'ID', prop: 'id'},
          {title: 'URL', prop: 'path'},
          {title: '名称', prop: 'name'},
          {title: '备注', prop: 'description'},
          {title: '上载时间', prop: 'created_time'}
        ],
        images: [],
        trigger: true
      }
    },
    methods: {
      async getImages() {
        const body = await $fetch.get('otc/company/upload_files').catch(this.error)
        if (body === undefined) return

        this.images = body
      },
      async doUpload({target}) {
        const body = await $fetch.form('otc/company/upload_files', new FormData(target)).catch(this.error)
        if (body === undefined) return

        this.success('上传成功')
        this.getImages()
        this.trigger = false
        this.$nextTick(() => this.trigger = true)
      }
    },
    created() {
      this.getImages()
    }
  }
</script>
