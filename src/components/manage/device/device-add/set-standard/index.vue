<template>
<div>
  <el-table
    stripe
    :data="placeListData">
    <el-table-column type="index">
    </el-table-column>
    <!-- <el-table-column prop="name" :label="$t('business-name')">
      <template slot-scope="scope">
        {{ scope.row.name }}
        <span v-if="scope.row.status === -1" class="business-status">({{ $t('customer-approval-pending') }})</span>
      </template>
    </el-table-column> -->
    <el-table-column prop="place" label="检查部位"></el-table-column>
    <el-table-column prop="content" label="检查内容"></el-table-column>
    <el-table-column label="检查标准">
      <template slot-scope="scope">
        {{ scope.row.standard.length !== 0 ? scope.row.standard.join('、') : '暂无标准' }}
      </template>
    </el-table-column>
     <el-table-column label="选项">
      <template slot-scope="scope">
        <el-button @click="addStandard(scope.$index, scope.row)" type="text" size="small">添加标准</el-button>
      </template>
    </el-table-column>
  </el-table>
  <standard-dialog 
    :isVisible="isVisible"
    :standardData="standardData"
    @closeEditDialog="closeEditDialog"
    @editChange="handleDialogChange"></standard-dialog>
</div>
</template>

<script>
import StandardDialog from './dialog.vue'
export default {
  components: {
    StandardDialog
  },
  props: {
    step: {
      type: Number
    },
    data: {
      type: Object,
      default: () => {
        return {

        }
      }
    }
  },
  data () {
    return {
      isVisible: false,
      editIndex: 0,
      placeListData: [{
        place: '头部',
        content: '检查发烫程度',
        standard: ['test']
      }]
    }
  },
  computed: {
    standardData () {
      return this.placeListData[this.editIndex].standard || []
    }
  },
  methods: {
    closeEditDialog () {
      this.isVisible = false
    },
    addStandard (index, row) {
      this.isVisible = true
      this.editIndex = index
    },
    handleDialogChange () {
      // 重新获取数据
    }
  },
  watch: {
    step (val) {
      if (val === 1 || val === 3) {
        this.$emit('dispatch', this.placeListData)
      }
    }
  }
}
</script>

<style>

</style>
