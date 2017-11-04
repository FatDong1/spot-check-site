<template>
  <el-container class="container">
      <sidebar></sidebar>
    <el-container class="right">
      <el-header>
        <v-header></v-header>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import vHeader from './layout/header.vue'
  import sidebar from './layout/sidebar.vue'

  export default {
    components: {
      vHeader,
      sidebar
    }
  }
</script>

<style>

  body{
    width: 100vw;
  }
  .container {
    height: 100vh;
    width: 100%;
  }

  .el-header {
    background-color: #eff2f7;
    color: #ffffff;
    float: left;
  }

  .right{
    overflow-x: auto;
  }
</style>

