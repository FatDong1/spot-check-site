<template>
  <el-menu
    mode="vertical"
    class="app-sidebar"
    background-color="#2b3c5a"
    text-color="#fff"
    active-text-color="#409eff"
    :router="router"
    :default-active="sidebarSelectItem">
    <el-menu-item index="/home">
      <i class="el-icon-menu"></i>
      <span>首页</span>
    </el-menu-item>
    <el-menu-item index="/work?pageIndex=1">
      <i class="el-icon-tickets"></i>
      <span>工单录入</span>
    </el-menu-item>
    <el-menu-item index="/device"  v-if="isAdmin">
      <i class="el-icon-printer"></i>
      <span>设备管理</span>
    </el-menu-item>
    <el-menu-item index="/score?pageIndex=1" v-if="isAdmin">
      <i class="el-icon-news"></i>
      <span>绩效评分</span>
    </el-menu-item>
    <el-menu-item index="/company" v-if="isAdmin">
      <i class="el-icon-setting"></i>
      <span>组织架构</span>
    </el-menu-item>
    <el-menu-item index="/account">
      <i class="el-icon-location-outline"></i>
      <span>账户管理</span>
    </el-menu-item>
    <el-menu-item index="/about">
      <i class="el-icon-news"></i>
      <span>关于我们</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      router: true,
      sidebarSelectItem: '/home'
    }
  },
  computed: {
    isAdmin () {
      let obj = JSON.parse(sessionStorage.getItem('user'))
      return obj.isAdmin
    }
  },
  methods: {

  },
  created () {
    this.sidebarSelectItem = '/' + this.$route.name
  }
}
</script>

<style lang="less">
.app-sidebar {
  &.el-menu {
    width: 150px;
    border-right: none;
    font-size: 12px;
  }

  .el-menu-item,
  .el-submenu__title {
    position: relative;
    height: 40px;
    font-size: 12px;
    line-height: 40px;
  }

  .el-icon-menu {
    margin-right: 0;
  }

  .el-menu-item-group__title {
    padding-top: 0;
    padding-bottom: 0;
  }

  .sidebar-menu-icon {
    display: inline-block;
    width: 24px;
    height: 24px;
    background-size: 14px 14px;
    background-position: center center;
    background-repeat: no-repeat;
    vertical-align: middle;
  }
  .is-active {
    position: relative;

    &:before {
      content: '';
      display: block;
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 3px;
      background-color: #409eff;
    }
  }
}
</style>
