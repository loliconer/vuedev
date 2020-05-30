<template>
  <div id="app">
    <nav class="nav">
      <div class="container">
        <router-link class="router-link" to="/">首页</router-link>
        <router-link class="router-link" to="/about">关于</router-link>
      </div>
    </nav>
    <router-view/>
  </div>
</template>
