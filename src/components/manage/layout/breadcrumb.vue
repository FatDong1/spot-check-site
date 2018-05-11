<template>
 <view-content-float class="app-breadcrumb" padding="0">
    <el-breadcrumb separator=">">
      <div class="el-breadcrumb-head">您的位置：</div>
      <el-breadcrumb-item
        v-for="(item, index) in breadcrumbOptions"
        :key="index"
        :to="{ path: item.to }">
        {{ item.title }}
        </el-breadcrumb-item>
    </el-breadcrumb>
     <el-input
      class="app-search"
      slot="right"
      :placeholder="searchPlaceholder"
      @keyup.enter.native="changeSearchFilter"
      v-model="searchFilter"
      v-show="searchShow">
       <i class="el-input__icon el-icon-search" slot="suffix" @click="changeSearchFilter"></i> 
    </el-input> 
  </view-content-float>
</template>

<script>
// 面包屑配置对象
const breadcrumbConfig = {}
breadcrumbConfig['home'] = { to: '/home', title: '首页' }
breadcrumbConfig['work'] = { to: '/work/list', title: '工单列表' }
breadcrumbConfig['work-view'] = { to: '/work/view', title: '工单查看' }
breadcrumbConfig['work-edit'] = { to: '/work/edit', title: '工单录入' }

breadcrumbConfig['unusual'] = { to: '/unusual/list', title: '异常列表' }
breadcrumbConfig['unusual-view'] = { to: '/unusual/view', title: '异常查看' }
breadcrumbConfig['unusual-edit'] = { to: '/unusual/edit', title: '解决异常' }

breadcrumbConfig['company'] = { to: '/company', title: '组织架构' }

breadcrumbConfig['device'] = { to: '/device/list', title: '设备列表' }
breadcrumbConfig['device-add'] = { to: '/device/add', title: '新增设备' }
breadcrumbConfig['device-detail'] = { to: '/device/detail', title: '设备详情' }
breadcrumbConfig['device-check-add'] = { to: '/device/check/add', title: '新增点检' }
breadcrumbConfig['device-check-list'] = { to: '/device/check/list', title: '点检计划列表' }
breadcrumbConfig['device-detail-check'] = { to: '/device/detail/check', title: '点检详情' }

breadcrumbConfig['score-list'] = { to: '/score', title: '绩效列表' }
breadcrumbConfig['score-detail'] = { to: '/score/detail', title: '绩效详情' }

breadcrumbConfig['account'] = { to: '/account', title: '账户管理' }
breadcrumbConfig['about'] = { to: '/about', title: '关于我们' }

export default {
  data () {
    return {
      breadcrumbOptions: [{}],
      searchShow: true,
      searchPlaceholder: '请输入名称',
      searchFilter: ''
    }
  },
  methods: {
    changeBreadcrumbOptions () {
      this.breadcrumbOptions = Array.prototype.slice.call(arguments).map((option) => {
        return breadcrumbConfig[option]
      })
    },
    changeSearchFilter () {
      let query = Object.assign({}, this.$route.query, {
        searchFilter: this.searchFilter
      })
      this.$router.push({
        query
      })
    },
    setBreadcrumb (to) {
      switch (to.name) {
        case 'home':
          this.searchShow = false
          this.changeBreadcrumbOptions('home')
          break
        case 'work-list':
          this.searchShow = true
          this.searchPlaceholder = '请输入设备名称'
          this.changeBreadcrumbOptions('home', 'work')
          break
        case 'work-view':
          this.searchShow = false
          this.changeBreadcrumbOptions('home', 'work', 'work-view')
          break
        case 'work-edit':
          this.searchShow = false
          this.changeBreadcrumbOptions('home', 'work', 'work-edit')
          break
        case 'unusual-list':
          this.searchShow = true
          this.searchPlaceholder = '请输入设备名称'
          this.changeBreadcrumbOptions('home', 'unusual')
          break
        case 'unusual-view':
          this.searchShow = false
          this.changeBreadcrumbOptions('home', 'unusual', 'unusual-view')
          break
        case 'unusual-edit':
          this.searchShow = false
          this.changeBreadcrumbOptions('home', 'unusual', 'unusual-edit')
          break
        case 'device-list':
          this.searchShow = true
          this.searchPlaceholder = '请输入设备名称'
          this.changeBreadcrumbOptions('home', 'device')
          break
        case 'device-add':
          this.searchShow = false
          this.changeBreadcrumbOptions('home', 'device', 'device-add')
          break
        case 'device-detail':
          this.searchShow = false
          this.changeBreadcrumbOptions('home', 'device', 'device-detail')
          break
        case 'device-detail-check':
          this.searchShow = false
          this.changeBreadcrumbOptions('home', 'device', 'device-detail', 'device-detail-check')
          break
        case 'device-check-list':
          this.searchShow = false
          this.changeBreadcrumbOptions('home', 'device', 'device-check-list')
          break
        case 'device-check-add':
          this.searchShow = false
          if (this.$route.query.state === 'edit') {
            breadcrumbConfig['device-check-add'].title = '修改点检'
          } else {
            breadcrumbConfig['device-check-add'].title = '新增点检'
          }
          this.changeBreadcrumbOptions('home', 'device', 'device-check-list', 'device-check-add')
          break
        case 'score-list':
          this.searchShow = true
          this.searchPlaceholder = '请输入人员名称'
          this.changeBreadcrumbOptions('home', 'score-list')
          break
        case 'score-detail':
          this.searchShow = false
          this.changeBreadcrumbOptions('home', 'score-list', 'score-detail')
          break
        case 'company':
          this.searchShow = true
          this.searchPlaceholder = '请输入人员名称'
          this.changeBreadcrumbOptions('home', 'company')
          break
        case 'account':
          this.searchShow = false
          this.changeBreadcrumbOptions('home', 'account')
          break
        case 'about':
          this.searchShow = false
          this.changeBreadcrumbOptions('home', 'about')
          break
        default:
          console.error('app-breadcrumb', 'route.name 不存在')
          this.breadcrumbOptions = [{}]
      }
    }
  },
  created () {
    this.setBreadcrumb(this.$route)
  },
  mounted () {
    this.$router.afterEach((to) => {
      this.setBreadcrumb(to)
    })
  }
}
</script>

<style lang="less" scoped>
.el-breadcrumb {
  height: 30px;
  padding: 8px 10px;
  font-size: 12px;
  line-height: 30px;
  color: #5a5e66;
}

.el-breadcrumb-head {
  float: left;
  margin-right: 10px;
}

.el-breadcrumb__separator {
  font-weight: 400;
}

.app-breadcrumb {
  margin-bottom: 10px;
}

.app-search {
  margin-top: 4px;
  width: 240px;
}

.el-icon-search {
  cursor: pointer;
}
</style>
