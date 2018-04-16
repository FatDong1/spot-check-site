<template>
  <div id="app" v-loading="loading">
    <router-view/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'app',
  computed: {
    ...mapState(['loading'])
  }
}
</script>

<style lang="less">
@import './assets/css/global.less';
html, body, #app {
  height: 100%;
}

body {
  margin: 0;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
</style>
