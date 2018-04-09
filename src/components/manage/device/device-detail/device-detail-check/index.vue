<template>
  <!--列表  -->
  <view-content>
    <el-table
      stripe
      :data="checkListData">
      <el-table-column type="index">
      </el-table-column>
      <el-table-column prop="name" label="设备名称"></el-table-column>
      <el-table-column prop="number" label="工单状态"></el-table-column>
      <el-table-column prop="element" label="设备归属"></el-table-column>
      <el-table-column prop="unit" label="检查部位"></el-table-column>
      <el-table-column prop="special" label="检查内容"></el-table-column>
      <el-table-column prop="norm" label="设备名称"></el-table-column>
      <el-table-column prop="method" label="工单状态"></el-table-column>
      <el-table-column prop="cycle" label="检查部位"></el-table-column>        
      <el-table-column prop="checker" label="设备归属"></el-table-column>
    </el-table>
  </view-content>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  data () {
    return {
      checkListData: [
        {
          name: '外壳',
          number: '1234',
          element: '温度',
          unit: '摄氏度',
          special: '外壳尾部',
          norm: '35℃',
          method: '用手摸',
          checker: '小明',
          cycle: '一周'
        },
        {
          name: '外壳',
          number: '1234',
          element: '温度',
          unit: '摄氏度',
          special: '外壳尾部',
          norm: '35℃',
          method: '用手摸',
          checker: '小明',
          cycle: '一周'
        },        
        {
          name: '外壳',
          number: '1234',
          element: '温度',
          unit: '摄氏度',
          special: '外壳尾部',
          norm: '35℃',
          method: '用手摸',
          checker: '小明',
          cycle: '一周'
        }
      ]
    }
  },
  methods: {
    
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
