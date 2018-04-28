import Vue from 'vue'
import Router from 'vue-router'
import home from '../components/manage/home/home-page/index.vue'
import manage from '../components/manage/index.vue'
import login from '../components/login/index.vue'

import account from '../components/manage/account/index.vue'

import workIndex from '../components/manage/work/work-index/index.vue'
import workList from '../components/manage/work/work-list/index.vue'
import workEdit from '../components/manage/work/work-edit/index.vue'
import workView from '../components/manage/work/work-view/index.vue'

import unusualIndex from '../components/manage/unusual/unusual-index/index.vue'
import unusualList from '../components/manage/unusual/unusual-list/index.vue'
import unusualEdit from '../components/manage/unusual/unusual-edit/index.vue'
import unusualView from '../components/manage/unusual/unusual-view/index.vue'

import deviceIndex from '../components/manage/device/device-index/index.vue'
import deviceList from '../components/manage/device/device-list/index.vue'
import deviceCheck from '../components/manage/device/device-check/index.vue'
import deviceAdd from '../components/manage/device/device-add/index.vue'
import deviceDetail from '../components/manage/device/device-detail/index.vue'
import deviceCheckDetail from '../components/manage/device/device-detail/device-detail-check/check-detail.vue'

import scoreIndex from '../components/manage/score/index.vue'
import scoreList from '../components/manage/score/score-list/index.vue'
import scoreDetail from '../components/manage/score/score-detail/index.vue'

import companyIndex from '../components/manage/company/company-index/index.vue'
import aboutIndex from '../components/manage/about/index.vue'

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
        // 工单列表
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
            path: '/work/edit',
            name: 'work-edit',
            component: workEdit
          }, {
            path: '/work/view',
            name: 'work-view',
            component: workView
          }]
        },
        {
          path: '/unusual',
          name: 'unusual',
          component: unusualIndex,
          redirect: '/unusual/list',
          children: [{
            path: '/unusual/list',
            name: 'unusual-list',
            component: unusualList
          }, {
            path: '/unusual/edit',
            name: 'unusual-edit',
            component: unusualEdit
          }, {
            path: '/unusual/view',
            name: 'unusual-view',
            component: unusualView
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
            path: '/device/check',
            name: 'device-check',
            component: deviceCheck
          }, {
            path: '/device/add',
            name: 'device-add',
            component: deviceAdd
          }, {
            path: '/device/detail',
            name: 'device-detail',
            component: deviceDetail
          }, {
            path: '/device/detail/check',
            name: 'device-detail-check',
            component: deviceCheckDetail
          }]
        },
        // 人员绩效
        {
          path: '/score',
          redirect: '/score/list',
          component: scoreIndex,
          children: [
            {
              path: '/score/list',
              name: 'score-list',
              component: scoreList
            },
            {
              path: '/score/detail',
              name: 'score-detail',
              component: scoreDetail
            }
          ]
        },
        // 组织架构管理
        {
          path: '/company',
          name: 'company',
          component: companyIndex
        },

        // 账户管理
        {
          path: '/account',
          name: 'account',
          component: account
        },
        {
          path: '/about',
          name: 'about',
          component: aboutIndex
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
  let code = sessionStorage.getItem('user') || false
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
