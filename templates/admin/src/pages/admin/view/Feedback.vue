<template>
  <div class="view-feedback">
    <v-popup v-model="showReply" :confirm="reply">
      <v-row>
        <label class="label">用户：</label>
        <span>{{current.author}}</span>
      </v-row>
      <v-row>
        <label class="label">联系方式：</label>
        <span>{{current.contact}}</span>
      </v-row>
      <v-row>
        <label class="label">反馈：</label>
        <span>{{current.content}}</span>
        <span>时间：{{current.created_time}}</span>
      </v-row>
      <v-row v-for="(reply, i) of current.reply" :key="i">
        <label class="label">回复：</label>
        <span>{{reply.content}}</span>
        <span>时间：{{reply.created_time}}</span>
      </v-row>
      <v-row>
        <textarea class="textarea" v-model="replyContent"></textarea>
      </v-row>
    </v-popup>

    <div class="below panel">
      <div class="l-head">待处理反馈</div>
      <div class="n-feedback" v-for="fb of feedbacks">
        <div class="f-head">
          <span>用户：{{fb.author}}</span>
          <span>联系方式：{{fb.contact}}</span>
          <span @click="del(fb.id)"><v-icon icon="delete"></v-icon></span>
        </div>
        <div class="f-body">
          <div class="line">
            <div class="f-content">
              <span>反馈：</span>
              <p>{{fb.content}}</p>
            </div>
            <span>{{fb.created_time}}</span>
          </div>
          <div class="line" v-for="reply of fb.reply">
            <div class="f-content">
              <span>回复：</span>
              <p>{{reply.content}}</p>
            </div>
            <span>{{reply.created_time}}</span>
          </div>
        </div>
        <div class="f-footer">
          <v-button @click="openReply(fb)">回复</v-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import './Feedback.less'

  export default {
    data() {
      return {
        current: {},
        feedbacks: [],
        showReply: false,
        replyContent: ''
      }
    },
    methods: {
      async getFeedbacks() {
        this.feedbacks = await $fetch.get('feedbacks').catch(this.error) || []
      },
      openReply(fb) {
        this.current = fb
        this.showReply = true
      },
      async reply() {
        const body = await $fetch.post('feedback-replies', {
          feedback_id: this.current.id,
          content: this.replyContent
        }).catch(this.error)
        if (body === undefined) return

        this.showReply = false
        this.getFeedbacks()
      },
      del(id) {
        this.modal({
          content: '确定删除？',
          confirm: async () => {
            const body = await $fetch.delete(`feedbacks/${id}`).catch(this.error)

            this.success('删除成功')
            this.feedbacks.forEach((fb, i) => {
              if (fb.id === id) {
                this.feedbacks.splice(i, 1)
              }
            })
            return true
          }
        })
      }
    },
    created() {
      this.getFeedbacks()
    }
  }
</script>
