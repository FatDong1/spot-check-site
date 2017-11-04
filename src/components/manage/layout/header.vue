<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item
        :key="index"
        :to="item.url"
        v-for="(item, index) in $route.meta">{{item.name}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        王小虎<i class="el-icon-caret-bottom el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="a">注销</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  methods: {
    handleCommand (command) {
      if (command === 'a') {
        this.$storage.remove('CODE')
        this.$router.push({name: 'login'})
      }
    }
  }
}
</script>

<style>
.el-breadcrumb,
.el-dropdown {
  display: inline-block;
  background-color: #EFF2F7;
  height: 60px;
  line-height: 60px;
}

.el-dropdown {
  position: absolute;
  right: 10px;
}

</style>
