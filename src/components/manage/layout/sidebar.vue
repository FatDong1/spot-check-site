<template>
  <el-menu
    mode="vertical"
    class="sidebar-menu"
    default-active="2"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#409eff"
    :router="router"
    unique-opened="true"
    :collapse="isCollapse">
    <el-menu-item index="/manage" style="font-size: 16px; color: #409eff">
      <i class="el-icon-menu" style="color: #409eff"></i>
      <span>设备点检系统</span>
    </el-menu-item>
    <el-submenu index="2">
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
    </el-menu-item>
    <el-tooltip effect="dark" placement="top" :content="content">
      <el-menu-item class="footer-collapse" @click="isCollapse = !isCollapse">
        <i v-if="!isCollapse" class="el-icon-d-arrow-left"></i>
        <i v-if="isCollapse" class="el-icon-d-arrow-right"></i>
      </el-menu-item>
    </el-tooltip>
  </el-menu>
</template>

<script>
  export default {
    data () {
      return {
        router: true,
        isCollapse: false
      }
    },
    methods: {},
    computed: {
      content () {
        if (this.isCollapse) {
          return '点击展开侧边栏'
        } else {
          return '点击折叠侧边栏'
        }
      }
    }
  }
</script>

<style>
  .sidebar-menu {
    position: relative;
  }
  .sidebar-menu:not(.el-menu--collapse) {
    display: block;
    width: 200px;
    height: 100%;
    border: none;
    min-height: 100vh;
  }

  .el-menu--collapse {
    min-height: 100vh;
  }
  .footer-collapse {
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;
    font-size: 30px;
  }
</style>
