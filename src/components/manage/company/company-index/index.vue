<template>
  <view-container>
    <view-header>公司组织架构</view-header>
    <el-tree
      ref="companyTree"
      v-loading="loading"
      :data="companyData"
      node-key="id"
      default-expand-all
      :filter-node-method="filterNode"
      :expand-on-click-node="false"
      style="width: 50%">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button
            v-if="data.canAdd"
            type="text"
            size="mini"
            @click="() => append(node, data)">
            添加
          </el-button>
          <el-button
            v-if="data.canDel"
            type="text"
            size="mini"
            @click="() => remove(node, data)">
            删除
          </el-button>
        </span>
      </span>
    </el-tree>
    <company-dialog
      v-if="dialogVisible"
      :dialogFormVisible="dialogVisible" 
      @closeCompanyDialog="closeDialog"
      @successAdd="addPerson"></company-dialog>
  </view-container>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import CompanyDialog from '../company-dialog/index.vue'

export default {
  components: {
    CompanyDialog
  },
  data () {
    return {
      loading: '',
      id: 11,
      currentData: '',
      dialogVisible: false,
    }
  },
  computed: {
    ...mapState([
      'companyData'
    ])
  },
  methods: {
    ...mapMutations([
      'updateCompanyData'
    ]),
    ...mapMutations('company-data', [
      'updateUserInfo'
    ]),
    fetchCompany () {
      this.$http({
        method: 'get',
        url: '/api/users' 
      }).then((result) => {
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
        result.value.forEach((element) => {
          let tempObj = {
            id: element.id,
            label: element.name,
            canDel: true
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
        this.updateCompanyData(temp)
      })
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    closeDialog () {
      this.dialogVisible = false
    },
    addPerson () {
      this.fetchCompany()
    },
    append(node, data) {
      let obj = {
        factory: node.parent.data.label,
        plant: data.label
      }
      this.updateUserInfo(obj)
      this.currentData = data
      this.dialogVisible = true
      
    },
    remove(node, data) {
      this.$confirm('此操作将从组织架构永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http({
          method: 'delete',
          url: '/api/user',
          params: {
            id: data.id
          }
        }).then((data) => {
          this.$message({
            type: 'success',
            message: data.msg
          })
          this.fetchCompany()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })       
      })
    }
  },
  watch: {
    $route (val) {
      this.$refs.companyTree.filter(val.query.searchFilter)
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
