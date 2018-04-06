import Vue from 'vue'
import Router from 'vue-router'
import home from '../components/manage/home/home-page/index.vue'
import manage from '../components/manage/index.vue'
import login from '../components/login/index.vue'
import userList from '../components/manage/user/userList.vue'
import addUser from '../components/manage/user/addUser.vue'

import account from '../components/manage/account/index.vue'

import workIndex from '../components/manage/work/work-index/index.vue'
import workList from '../components/manage/work/work-list/index.vue'
import workEdit from '../components/manage/work/work-edit/index.vue'

import deviceIndex from '../components/manage/device/device-index/index.vue'
import deviceList from '../components/manage/device/device-list/index.vue'
import deviceAdd from '../components/manage/device/device-add/index.vue'
import companyIndex from '../components/manage/company/company-index/index.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: manage,
      redirect: '/home',
      children: [
        // 首页
        {
          path: '/home',
          name: 'home',
          component: home
        },
        // 日常点检
        {
          path: '/work',
          name: 'work',
          component: workIndex,
          redirect: '/work/list',
          children: [{
            path: '/work/list',
            name: 'work-list',
            component: workList
          }, {
            path: '/work/detail/:state/:id',
            name: 'work-detail',
            component: workEdit
          }]
        },
        // 设备管理
        {
          path: '/device',
          name: 'device',
          component: deviceIndex,
          redirect: '/device/list',
          children: [{
            path: '/device/list',
            name: 'device-list',
            component: deviceList,
          }, {
            path: '/device/add',
            name: 'device-add',
            component: deviceAdd
          }]
        },
        // 组织架构管理
        {
          path: '/company',
          name: 'company',
          component: companyIndex
        },
        // 用户管理
        {
          path: '/manage/user/list',
          name: 'userList',
          component: userList,
          meta: [
            {
              name: '用户管理',
              url: ''
            },
            {
              name: '用户列表',
              url: ''
            }
          ]
        },
        {
          path: '/manage/user/add',
          name: 'addUser',
          component: addUser,
          meta: [
            {
              name: '用户管理',
              url: ''
            },
            {
              name: '添加用户',
              url: ''
            }
          ]
        },
        
        // 账户管理
        {
          path: '/account',
          name: 'account',
          component: account,
          meta: [
            {
              name: '账户管理'
            }
          ]
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})

router.beforeEach((to, from, next) => {
  let code = sessionStorage.getItem('CODE') || false
  if (code && to.name === 'login') {
    next({name: 'home'})
  } else if (!code && to.name === 'login') {
    next()
  } else if (!code) {
    next({name: 'login'})
  } else {
    next()
  }
})

export default router
