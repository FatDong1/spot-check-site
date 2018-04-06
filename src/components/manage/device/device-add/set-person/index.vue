<template>
<div>
  <el-table
    stripe
    :data="personListData">
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
    <el-table-column prop="standard" label="检查标准"></el-table-column>
    <el-table-column label="检查人员">
      <template slot-scope="scope">
        {{ scope.row.person.length !== 0 ? scope.row.person.join('、') : '暂无' }}
      </template>
    </el-table-column>
     <el-table-column label="选项">
      <template slot-scope="scope">
        <el-button @click="addPerson(scope.$index, scope.row)" type="text" size="small">添加点检人员</el-button>
      </template>
    </el-table-column>
  </el-table>
   <person-dialog
    :isVisible="isVisible"
    @closeEditDialog="closeEditDialog"
    @editChange="handleDialogChange"></person-dialog> 
</div>
</template>

<script>
import PersonDialog from './dialog.vue'
export default {
  components: {
    PersonDialog
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
      personListData: [{
        place: '头部',
        content: '检查发烫程度',
        person: ['小明'],
        standard: ['一般']
      }]
    }
  },

  methods: {
    closeEditDialog () {
      this.isVisible = false
    },
    addPerson (index, row) {
      this.isVisible = true
    },
    handleDialogChange () {
      // 重新获取数据
    }
  },
  watch: {
    step (val) {
      if (val === 2) {
        this.$emit('dispatch', this.personListData)
      }
    }
  }
}
</script>

<style>

</style>
