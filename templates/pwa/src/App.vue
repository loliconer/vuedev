<template>
  <div id="app">
    <div class="refresh-page" v-if="isShowRefresh">
      <span>网站有更新</span>
      <v-button type="text" @click="refreshSW">点击刷新</v-button>
      <v-icon icon="close" @click="isShowRefresh = false"></v-icon>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isShowRefresh: false
      }
    },
    methods: {
      refreshSW() {
        window.dispatchEvent(new CustomEvent('refreshSW'))
      }
    },
    created() {
      window.addEventListener('newSWContent', () => this.isShowRefresh = true)
    }
  }
</script>

<style lang="less">
  .refresh-page {
    .flex-start;
    position: fixed;
    bottom: var(--3unit);
    right: var(--3unit);
    padding: var(--unit) var(--3unit);
    border-radius: var(--unit);
    background-color: var(--main-color);
    color: var(--white);
    font-size: var(--small-font);

    .v-btn-text {
      color: var(--blue-color);
    }

    .icon-close {
      cursor: pointer;
    }
  }
</style>
