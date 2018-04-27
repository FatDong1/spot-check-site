<template>
  <view-container>
    <view-header>工单列表</view-header>
    <view-content>
      <!--工单过滤-->
      <span class="filter-label">筛选:</span> 
      <el-select
        class="business-select"
        clearable
        v-model="stage"
        placeholder="工单状态"
        @change="changeStage">
        <el-option
          v-for="(item,index) in stageOptions"
          :key="index"
          :label="item.label"
          :value="item.value"></el-option>
      </el-select> 
      <el-cascader 
        clearable      
        :options="departmentOptions" 
        v-model="department" 
        style="width: 20%;"  
        @change="handleDepartment"      
        placeholder="点检设备的位置"></el-cascader>
    </view-content>
    <!--列表  -->
    <view-content>
      <el-table
        stripe
        v-loading="loading"
        :data="workListData">
        <el-table-column type="index">
        </el-table-column>
        <el-table-column prop="deviceName" label="设备名称"></el-table-column>
        <el-table-column prop="department" label="设备位置"></el-table-column>
        <el-table-column prop="name" label="点检部件"></el-table-column>
        <el-table-column prop="element" label="点检要素"></el-table-column>
        <el-table-column label="点检标准">
          <template slot-scope="scope">
            <span>{{ scope.row.normType === '2' ? (scope.row.norm + scope.row.unit) : scope.row.normOptions }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="tool" label="点检工具"></el-table-column>
        <el-table-column prop="method" label="点检方法"></el-table-column>
        <el-table-column prop="state" label="工单状态">
          <template slot-scope="scope">
            <span>{{ scope.row.state ? '完成' : '未完成' }}</span>
          </template>
        </el-table-column>        
        <el-table-column
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="handleView(scope.row)" type="text" size="small">查看</el-button>
            <el-button v-if="!scope.row.state" @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
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
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  data () {
    return {
      pageTotal: null,
      loading: false,
      currentPage: 1,
      stage: '',
      department: [],
      stageOptions: [{
        label: '未完成',
        value: 0
      }, {
        label: '已完成',
        value: 1
      }],
      workListData: []
    }
  },
  computed: {
    ...mapState([
      'departmentOptions'
    ])
  },
  methods: {
    ...mapMutations('work-data', [
      'updateWorkData'
    ]),
    // 改变工单阶段
    changeStage (state) {
      let query = Object.assign({}, this.$route.query, {
        state
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
    handleDepartment (value) {
      let str = value.join('')      
      let query = Object.assign({}, this.$route.query, {
        department: str
      })
      this.$router.push({
        query
      })
    },
    fetchPageWork (obj) {
      let user = JSON.parse(sessionStorage.getItem('user'))
      this.loading = true
      this.$http({
        method: 'get',
        url: '/api/work',
        params: {
          state: obj.state,
          name: obj.name,
          checkerId: user.id,
          page: obj.page,
          department: obj.department ? obj.department : ''
        }
      }).then((result) => {
        this.workListData = result.value      
        this.loading = false
      })
    },
    handleView (row) {
      this.updateWorkData(row)
      console.log(row)
      this.$router.push({
        name: 'work-view'
      })
    },
    handleEdit (row) {
      this.updateWorkData(row)      
      this.$router.push({
        name: 'work-edit'
      })
    }
  },
  watch: {
    $route (current, old) {
      let obj = {
        page: current.query.pageIndex,
        name: current.query.searchFilter ? current.query.searchFilter : '',
        state: current.query.state === undefined ? '' : current.query.state,
        department: current.query.department      
      }
      this.fetchPageWork(obj)
    }
  },
  created () {
    this.fetchPageWork({
      page: 1,
      state: '',
      name: '',
      department: this.department
    })
  }
}
</script>

<style lang="less" scoped>
.business-select {
  width: 120px;
  margin-right: 10px;
}

.business-status {
  color: #c2c2c2;
}

.el-button--mini {
  padding: 7px 10px;
}
</style>
