<template>
  <view-container>
    <view-header>公司组织架构</view-header>
    <el-tree
      :data="companyData"
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
      style="width: 50%">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span v-if="data.canAdd">
          <el-button
            type="text"
            size="mini"
            @click="() => append(data)">
            添加
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => remove(node, data)">
            删除
          </el-button>
        </span>
      </span>
    </el-tree>
    <company-dialog 
      :dialogFormVisible="dialogVisible" 
      @closeCompanyDialog="closeDialog"
      @successAdd="addPerson"></company-dialog>
  </view-container>
</template>

<script>
import CompanyDialog from '../company-dialog/index.vue'
export default {
  components: {
    CompanyDialog
  },
  data () {
    return {
      id: 11,
      currentData: '',
      dialogVisible: false,
      companyData: [{
        id: 1,
        label: '第一工厂',
        children: [{
          id: 4,
          label: '第一车间',
          canAdd: true,
          children: [{
            id: 9,
            label: '小明'
          }, {
            id: 10,           
            label: '小红'
          }]
        }]
      }, {
        id: 2,
        label: '第二工厂',
        children: [{
          id: 5,
          label: '第一车间',
          canAdd: true,
        }, {
          id: 6,
          label: '第二车间',
          canAdd: true,
        }]
      }, {
        id: 3,
        label: '第三工厂',
        children: [{
          id: 7,
          label: '第一车间',
          canAdd: true
        }, {
          id: 8,
          label: '第二车间',
          canAdd: true
        }]
      }]
    }
  },
  methods: {
    closeDialog () {
      this.dialogVisible = false
    },
    addPerson (form) {
      this.id = this.id + 1
      let data = this.currentData
      const newChild = { id: this.id, label: form.name, children: [] };
      if (!data.children) {
        this.$set(data, 'children', []);
      }
      data.children.push(newChild);
    },
    append(data) {
      this.currentData = data
     
      this.dialogVisible = true
      
    },

    remove(node, data) {
      this.$confirm('此操作将从组织架构永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const parent = node.parent
        const children = parent.data.children || parent.data
        const index = children.findIndex(d => d.id === data.id)
        children.splice(index, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })       
      })
    }
  }
}
</script>

<style>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>
