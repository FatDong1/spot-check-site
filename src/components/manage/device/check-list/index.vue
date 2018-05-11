<template>
  <!--列表  -->
  <view-container>
    <view-header-flex>
      <span>点检计划列表</span>
      <el-button slot="right" size="small" class="btn-default" icon="el-icon-plus" @click="addCheck">新增点检</el-button>
    </view-header-flex>
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
        <el-table-column label="操作" width="150px">
          <template slot-scope="scope">
            <el-button
              type="text" 
              size="small"
              @click="handleView(scope.row)">查看</el-button>
            <el-button
              type="text" 
              size="small"
              @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
              type="text" 
              size="small"
              @click="handleAdd(scope.row)">选用</el-button>
          </template>
      </el-table-column>
      </el-table>
    </view-content>
    <check-dialog :visible="checkVisible" @closeCheckDialog="closeDialog"></check-dialog>
  </view-container>  
</template>

<script>
import CheckDialog from './check-dialog.vue'
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  components: {
    CheckDialog
  },
  data () {
    return {
      checkVisible: false,
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
    closeDialog () {
      this.checkVisible = false
    },
    handleEdit (row) {
      this.updateCheckerId(row.checkerId)
      this.updateCheckData(row)
      this.$router.push({
        name: 'device-check-add',
        query: {
          state: 'edit'
        }
      })
    },
    addCheck () {
      this.$router.push({
        name: 'device-check-add'
      })
    },
    handleAdd (row) {
      this.updateCheckData(row)
      this.checkVisible = true
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

