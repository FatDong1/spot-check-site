<template>
  <view-content>
    <el-table
      stripe
      v-loading="isLoading"
      :data="checkListData">
      <el-table-column type="index">
      </el-table-column>
      <el-table-column prop="name" label="点检部件"></el-table-column>
      <el-table-column prop="number" label="部件编号"></el-table-column>
      <el-table-column prop="element" label="点检要素"></el-table-column>
      <el-table-column label="点检标准">
        <template slot-scope="scope">
          <span>{{ scope.row.normType === '2' ? (scope.row.norm + scope.row.unit) : scope.row.normOptions }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="tool" label="点检工具"></el-table-column>
      <el-table-column prop="method" label="点检方法"></el-table-column>  
      <el-table-column prop="deviceState" label="点检时设备状态"></el-table-column>
      <el-table-column prop="checkDate" label="点检日期">
        <template slot-scope="scope">
          <span>{{ scope.row.checkDate | formateDate }}</span>
        </template>
      </el-table-column> 
      <el-table-column prop="checker" label="点检人员"></el-table-column>     
      <el-table-column prop="state" label="工单状态">
        <template slot-scope="scope">
          <span>{{ scope.row.state ? '完成' : '未完成' }}</span>
        </template>
      </el-table-column>         
    </el-table>
  </view-content>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  data () {
    return {
      isLoading: false,
      checkListData: []
    }
  },
  computed: {
    ...mapState('device-data', [
      'deviceData'
    ])
  },
  methods: {
    handleView () {

    },
    fetchWorkExpired () {
      this.isLoading = true
      this.$http({
        method: 'get',
        url: '/api/work/expired',
        params: {
          deviceId: this.deviceData.id
        }
      }).then((result) => {
        this.isLoading = false
        this.checkListData = result.value
      }) 
    }
  },
  created () {
    this.fetchWorkExpired()
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
