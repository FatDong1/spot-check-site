<template>
  <el-dialog
    title="添加标准"
    :visible="isVisible"
    @close="closeEditDialog">
     <el-button
      size="small" class="btn-default" icon="el-icon-plus"
      style="margin-bottom: 20px"
      @click="addStandard">新增选项</el-button> 
     <el-table :data="contentData">
      <el-table-column type="index"></el-table-column>
      <el-table-column label="标准的选项">
        <template slot-scope="scope">
          <span v-if="scope.row.content">{{ scope.row.content }}</span>
          <el-input
            v-else
            size="small"
            v-model="newStandard"
            placeholder="请输入检查标准的选项"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            type="text"
            v-if="scope.row.state === 'noExist'"
            @click="saveStandard(scope.$index, scope.row)">保存</el-button>
          <el-button
            type="text"
            v-else-if="scope.row.state === 'exist'"
            @click="deleteStandard(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table> 
  </el-dialog>
</template>

<script>
export default {
  props: {
    isVisible: {
      type: Boolean,
      required: true
    },
    standardData: {
      type: Array
    }
  },
  data () {
    return {
      newStandard:''
    }
  },
  computed: {
    contentData () {
      let arr = []
      let data = this.standardData || []
      data.forEach(function (element) {
        let obj = {
          state: 'exist',
          content: element
        }
        arr.push(obj)
      })
      return arr
    }
  },
  methods: {
    closeEditDialog () {
      this.$emit('closeEditDialog')
    },
    addStandard () {
      // 保存input只出现一次
      let lastIndex = this.contentData.length - 1
      if (this.contentData[lastIndex].content === '') {
        this.$message('请先输入选项内容')
        return
      }
      this.contentData.push({
        state: 'noExist',
        content: ''
      })
    },
    saveStandard () {

    },
    deleteStandard (index, row) {
      this.contentData.splice(index, 1)
      this.$emit('editChange')
    }
  }
}
</script>

<style>

</style>
