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
    <el-menu-item index="/work">
      <i class="el-icon-menu"></i>
      <span>工单</span>
    </el-menu-item>
    <el-menu-item index="/device">
      <i class="el-icon-menu"></i>
      <span>设备</span>
    </el-menu-item>
    <el-menu-item index="/account">
      <i class="el-icon-menu"></i>
      <span>账户</span>
    </el-menu-item>
    <!-- <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-tickets"></i>
        <span>日常点检</span>
      </template>
      <el-menu-item index="/manage/day-check/will">未完成</el-menu-item>
      <el-menu-item index="/manage/day-check/done">已完成</el-menu-item>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-edit"></i>
        <span>专业点检</span>
      </template>
      <el-menu-item index="/manage/profess-check/will">未完成</el-menu-item>
      <el-menu-item index="/manage/profess-check/done">已完成</el-menu-item>
    </el-submenu>
    <el-submenu index="4">
      <template slot="title">
        <i class="el-icon-location-outline"></i>
        <span>精密点检</span>
      </template>
      <el-menu-item index="/manage/precision-check/will">未完成</el-menu-item>
      <el-menu-item index="/manage/precision-check/done">已完成</el-menu-item>
    </el-submenu>
    <el-submenu index="5">
      <template slot="title">
        <i class="el-icon-setting"></i>
        <span>设备管理</span>
      </template>
      <el-menu-item index="/manage/device/list">设备列表</el-menu-item>
      <el-menu-item index="/manage/device/group">设备归类</el-menu-item>
    </el-submenu>
    <el-submenu index="6">
      <template slot="title">
        <i class="el-icon-service"></i>
        <span>用户管理</span>
      </template>
      <el-menu-item index="/manage/user/list">用户列表</el-menu-item>
      <el-menu-item index="/manage/user/add">创建用户</el-menu-item>
    </el-submenu>
    <el-submenu index="7">
      <template slot="title">
        <i class="el-icon-view"></i>
        <span>点检周期</span>
      </template>
      <el-menu-item index="/manage/cycle/day">日常点检</el-menu-item>
      <el-menu-item index="/manage/cycle/profess">专业点检</el-menu-item>
      <el-menu-item index="/manage/cycle/precision">精密点检</el-menu-item>
    </el-submenu>
    <el-menu-item index="/manage/notice">
      <i class="el-icon-date"></i>
      <span slot="title">公告管理</span>
    </el-menu-item>
    <el-menu-item index="/manage/account">
      <i class="el-icon-goods"></i>
      <span slot="title">账户管理</span>
    </el-menu-item> -->
  </el-menu>
</template>

<script>
  export default {
    data () {
      return {
        router: true,
        sidebarSelectItem: '/home'
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
