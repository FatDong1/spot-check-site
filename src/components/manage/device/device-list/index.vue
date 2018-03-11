<template>
  <view-container>
    <view-header>设备列表</view-header>
    <view-content-float>
      <!--设备过滤-->
      <span class="filter-label">筛选:</span> 
      <el-cascader
        placeholder="试试搜索"
        size="small"
        :options="deviceDepartmentData"
        filterable
      ></el-cascader>
      <el-button slot="right" size="small" class="btn-default" icon="el-icon-plus" @click="addDevice">新增设备</el-button>
    </view-content-float>
    <!--列表  -->
    <view-content>
      <el-table
        stripe
        :data="workListData">
        <el-table-column type="index">
        </el-table-column>
        <!-- <el-table-column prop="name" :label="$t('business-name')">
          <template slot-scope="scope">
            {{ scope.row.name }}
            <span v-if="scope.row.status === -1" class="business-status">({{ $t('customer-approval-pending') }})</span>
          </template>
        </el-table-column> -->
        <el-table-column prop="name" label="设备名称"></el-table-column>
        <el-table-column prop="factory" label="设备归属"></el-table-column>
        <el-table-column prop="checkPlace" label="检查部位"></el-table-column>
        <el-table-column prop="checkContent" label="检查内容"></el-table-column>
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

export default {
  data () {
    return {
      pageTotal: null,
      currentPage: 1,
      workListData: [
        {
          name: '车床',
          factory: '第一工厂第一车间',
          checkPlace: '头部',
          checkContent: '点检的内容'
        },
        {
          name: '车床',
          factory: '第一工厂第一车间',
          checkPlace: '头部',
          checkContent: '点检的内容'
        },        
        {
          name: '车床',
          factory: '第一工厂第一车间',
          checkPlace: '头部',
          checkContent: '点检的内容'
        }
      ],
      deviceDepartmentData: [{
        value: 'shejiyuanze',
        label: '第一工厂',
        children: [{
          value: 'yizhi',
          label: '第一车间'
        }, {
          value: 'fankui',
          label: '第二车间'
        }, {
          value: 'xiaolv',
          label: '第三车间'
        }, {
          value: 'kekong',
          label: '第四车间'
        }]
      }, {
        value: 'shejiyuanze',
        label: '第二工厂',
        children: [{
          value: 'yizhi',
          label: '第一车间'
        }, {
          value: 'fankui',
          label: '第二车间'
        }, {
          value: 'xiaolv',
          label: '第三车间'
        }, {
          value: 'kekong',
          label: '第四车间'
        }]
      }]
    }
  },
  methods: {
    // 改变工单阶段
    changeStage (state) {
      console.log(state)
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
    addDevice () {
      this.$router.push({
        name: 'device-add'
      })
    }
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

