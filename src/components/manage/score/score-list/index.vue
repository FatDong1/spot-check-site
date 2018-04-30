<template>
  <view-container>
    <view-header>绩效列表</view-header>
    <view-content-float>
      <!--设备过滤-->
      <span class="filter-label">筛选:</span> 
      <el-cascader
        placeholder="用户所在部门"
        size="small"
        v-model="department" 
        clearable
        @change="handleDepartment"
        :options="departmentOptions"
        filterable
      ></el-cascader>
    </view-content-float>
    <!--列表  -->
    <view-content>
      <el-table
        stripe
        v-loading="isLoading"
        :data="listData">
        <el-table-column type="index">
        </el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="userNumber" label="工号"></el-table-column>
        <el-table-column prop="sex" label="性别">
          <template slot-scope="scope">
            <span>{{ scope.sex === 1 ? '男' : '女'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="factory" label="所属工厂"></el-table-column>
        <el-table-column prop="plant" label="所属车间"></el-table-column>
        <el-table-column prop="job" label="职位"></el-table-column>
        <el-table-column
          label="操作"
          width="150">
          <template slot-scope="scope">
            <el-button @click="handleView(scope.row)" type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </view-content>
    <!-- view可视框的脚部，分页组件 -->
     <view-content-float>
      <el-pagination
        slot="right"
        layout="total, prev, pager, next, jumper"
        :page-size="10"
        :total="pageTotal"
        :current-page.sync="currentPage"
        @current-change="changePageIndex">
      </el-pagination>
    </view-content-float> 
  </view-container>
</template>

<script>
import { convertTimestamp } from 'shared@/utils/common.js'
import { mapState, mapMutations } from 'vuex'

export default {
  data () {
    return {
      pageTotal: null,
      currentPage: 1,
      department: [],
      isLoading: false,
      listData: []
    }
  },
  computed: {
    ...mapState([
      'departmentOptions'
    ])
  },
  methods: {
    ...mapMutations('score-data', [
      'updateScoreData'
    ]),
    handleDepartment (value) {
      let query = Object.assign({}, this.$route.query, {
        factory: value[0],
        plant: value[1]
      })
      this.$router.push({
        query
      })
    },
    // 当页数改变执行的函数
    changePageIndex (pageIndex) {
      let query = Object.assign({}, this.$route.query, {
        pageIndex
      })
      this.$router.push({
        query
      })
    },
    fetchPageUser (obj) {
      this.isLoading = true
      this.$http({
        method: 'get',
        url: '/api/users/page',
        params: {
          name: obj.name,
          page: obj.page,
          factory: obj.factory,
          plant: obj.plant
        }
      }).then((result) => {
        this.listData = result.value      
        this.isLoading = false
      })
    },
    handleView (row) {
      this.updateScoreData(row)
      this.$router.push({
        name: 'score-detail'
      })
    }
  },
  watch: {
    $route (current, old) {
      let obj = {
        page: current.query.pageIndex,
        name: current.query.searchFilter ? current.query.searchFilter : '',
        factory: current.query.factory ? current.query.factory : '',
        plant: current.query.plant ? current.query.plant : '',        
      }
      this.fetchPageUser(obj)
    }
  },
  created () {
    this.fetchPageUser({
      page: 1,
      name: '',
      factory: '',
      plant: ''
    })
  }
}
</script>

<style lang="less" scoped>
.el-cascader {
  width: 250px;
}

.el-button--mini {
  padding: 7px 10px;
}
</style>

