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
      companyData: []
    }
  },
  methods: {
    fetchCompany () {
      this.$http('/api/users').then((result) => {
        let temp = [{
          id: 1,
          label: '第一工厂',
          children: [{
            id: 11,
            label: '第一车间',
            canAdd: true,
            children: []
          },{
            id: 12,
            label: '第二车间',
            canAdd: true,
            children: []
          }]
        }, {
          id: 2,
          label: '第二工厂',
          children: [{
            id: 21,
            label: '第一车间',
            canAdd: true,
            children: []
          }, {
            id: 22,
            label: '第二车间',
            canAdd: true,
            children: []
          }]
        }, {
          id: 3,
          label: '第三工厂',
          children: [{
            id: 7,
            label: '第一车间',
            canAdd: true,
            children: []
          }, {
            id: 8,
            label: '第二车间',
            canAdd: true,
            children: []
          }]
        }]
        console.log(temp[1])
        result.value.forEach((element) => {
          console.log(element)
          let tempObj = {
            id: element.id,
            label: element.name
          }
          if (element.factory === '第一工厂') {
            if (element.plant === '第一车间') {
              temp[0].children[0].children.push(tempObj)
            } else if (element.plant === '第二车间') {
              temp[0].children[1].children.push(tempObj)
            }
          } else if (element.factory === '第二工厂') {
            if (element.plant === '第一车间') {
              temp[1].children[0].children.push(tempObj)
            } else if (element.plant === '第二车间') {
              temp[1].children[1].children.push(tempObj)
            }
          } else if (element.factory === '第三工厂') {
            if (element.plant === '第一车间') {
              temp[2].children[0].children.push(tempObj)
            } else if (element.plant === '第二车间') {
              temp[2].children[1].children.push(tempObj)
            }
          }
        })
        console.log(temp)
        this.companyData = temp
      })
    },

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
  },
  created () {
    this.fetchCompany()
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
