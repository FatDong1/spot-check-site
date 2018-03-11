import Vue from 'vue'
import Router from 'vue-router'
import home from '../components/manage/home/home.vue'
import manage from '../components/manage/index.vue'
import login from '../components/login/index.vue'
import userList from '../components/manage/user/userList.vue'
import addUser from '../components/manage/user/addUser.vue'
import dayCheckDone from '../components/manage/check/day-check/dayCheckDone.vue'
import dayCheckWill from '../components/manage/check/day-check/dayCheckWill.vue'
import professCheckDone from '../components/manage/check/profess-check/professCheckDone.vue'
import professCheckWill from '../components/manage/check/profess-check/professCheckWill.vue'
import precisionCheckDone from '../components/manage/check/precision-check/precisionCheckDone.vue'
import precisionCheckWill from '../components/manage/check/precision-check/precisionCheckWill.vue'
import account from '../components/manage/account/index.vue'
import dayCycle from '../components/manage/cycle/dayCycle.vue'
import professCycle from '../components/manage/cycle/professCycle.vue'
import precisionCycle from '../components/manage/cycle/precisionCycle.vue'
import notice from '../components/manage/notice/notice.vue'

import workIndex from '../components/manage/work/work-index/index.vue'
import workList from '../components/manage/work/work-list/index.vue'
import deviceIndex from '../components/manage/device/device-index/index.vue'
import deviceList from '../components/manage/device/device-list/index.vue'
import deviceAdd from '../components/manage/device/device-add/index.vue'

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
        // 点检管理
        {
          path: '/manage/cycle/day',
          name: 'dayCycle',
          component: dayCycle,
          meta: [
            {
              name: '点检周期'
            },
            {
              name: '日常点检'
            }
          ]
        },
        {
          path: '/manage/cycle/profess',
          name: 'professCycle',
          component: professCycle,
          meta: [
            {
              name: '点检周期'
            },
            {
              name: '专业点检'
            }
          ]
        },
        {
          path: '/manage/cycle/precision',
          name: 'precisionCycle',
          component: precisionCycle,
          meta: [
            {
              name: '点检周期'
            },
            {
              name: '精密点检'
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
