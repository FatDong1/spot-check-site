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
       <el-date-picker
        class="business-date-picker"
        clearable
        v-model="workUpdateTime"
        type="daterange"
        align="center"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="workPickerData"
        @change="changeWorkUpdateTime">
      </el-date-picker>  
    </view-content>
    <!--列表  -->
    <view-content>
      <el-table
        stripe
        :data="workListData">
        <el-table-column type="index">
        </el-table-column>
        <el-table-column prop="name" label="设备名称"></el-table-column>
        <el-table-column prop="stage" label="工单状态"></el-table-column>
        <el-table-column prop="factory" label="设备归属"></el-table-column>
        <el-table-column prop="checkPlace" label="检查部位"></el-table-column>
        <el-table-column prop="checkContent" label="检查内容"></el-table-column>
        <el-table-column
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="handleView(scope.row)" type="text" size="small">查看</el-button>
            <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
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
      currentPage: 1,
      workUpdateTime: '',
      workPickerData: {
         shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      stage: '',
      stageOptions: [{
        label: '未完成',
        value: 'will'
      }, {
        label: '已完成',
        value: 'done'
      }],
      workListData: [
        {
          name: '车床',
          stage: '完成',
          checkPlace: '头部',
          checkContent: '点检的内容',
          factory: '第一工厂第一车间'
        },
        {
          name: '车床',
          stage: '完成',          
          checkPlace: '头部',
          factory: '第一工厂第一车间',
          checkContent: '点检的内容'
        },        
        {
          name: '车床',
          stage: '完成',          
          checkPlace: '头部',
          factory: '第一工厂第一车间',
          checkContent: '点检的内容'
        }
      ]
    }
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
    // 改变时间
    changeWorkUpdateTime (updateAt) {
      let beginDate, endDate
      if (!updateAt) {
        delete this.$route.query.beginDate
        delete this.$route.query.endDate
      } else {
        beginDate = convertTimestamp(updateAt[0], 'yyyy-MM-dd')
        endDate = convertTimestamp(updateAt[1], 'yyyy-MM-dd')
      }
      let query = Object.assign({}, this.$route.query, {
        beginDate,
        endDate
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
    handleView (row) {
      console.log(112, row)      
      this.updateWorkData(row)
      this.$router.push({
        name: 'work-detail',
        params: {
          id: 1
        }
      })
    },
    handleEdit (row) {
      console.log(112, row)
      this.updateWorkData(row)      
      this.$router.push({
        name: 'work-detail',
        params: {
          id: 1
        }
      })
    }
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
