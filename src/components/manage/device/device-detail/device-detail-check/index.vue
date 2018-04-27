<template>
  <!--列表  -->
  <view-content>
    <el-table
      stripe
      v-loading="isLoading"
      :data="checkListData">
      <el-table-column type="index">
      </el-table-column>
      <el-table-column prop="name" label="部件名称"></el-table-column>
      <el-table-column prop="element" label="点检要素"></el-table-column>
      <el-table-column prop="special" label="可能劣化的部位"></el-table-column>
      <el-table-column label="点检标准">
        <template slot-scope="scope">
          <span>{{ scope.row.normType === '2' ? (scope.row.norm + scope.row.unit) : scope.row.normOptions }}</span>
        </template>
      </el-table-column>   
      <el-table-column prop="method" label="点检方法"></el-table-column>
      <el-table-column prop="deviceState" label="设备点检状态"></el-table-column>
      <el-table-column prop="tool" label="点检工具"></el-table-column>
      <el-table-column prop="cycle" label="点检周期（天）"></el-table-column>        
      <el-table-column prop="checker" label="点检人员"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
             type="text" 
             size="small"
            @click="handleView(scope.row)">查看</el-button>
          <el-button
             type="text" 
             size="small"
            @click="handleEdit(scope.row)">编辑</el-button>
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
      checkListData:[]
    }
  },
  computed: {
    ...mapState('device-data', [
      'deviceData'
    ])
  },
  methods: {
    ...mapMutations('device-data', [
      'updateCheckData',
      'updateCheckerId'
    ]),
    handleView (row) {
      this.updateCheckerId(row.checkerId)
      this.updateCheckData(row)
      this.$router.push({
        name: 'device-detail-check'
      })
    },
    handleEdit (row) {
      this.updateCheckerId(row.checkerId)
      this.updateCheckData(row)
      this.$router.push({
        name: 'device-check',
        query: {
          state: 'edit'
        }
      })
    },
    fetchCheckList () {
      this.isLoading = true
      this.$http({
        method: 'get',
        url: '/api/check',
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
    this.fetchCheckList()
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
