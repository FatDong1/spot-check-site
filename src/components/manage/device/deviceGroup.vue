<template>
  <div>
    <div class="device-btn">
      <el-button type="primary" @click="handleAdd">新增设备归类</el-button>
        <el-input placeholder="搜索设备种类" style="width: 200px">
      </el-input>
      <el-button type="primary" icon="el-icon-search"></el-button>
    </div>
    <!-- 显示的设备列表 -->
    <el-table class="device-group-list" :data="tableData" :fit="true" border>
      <el-table-column label="设备归类名称">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="包含设备">
        <template slot-scope="scope">
          <span>{{ scope.row.children }}</span>
        </template>
      </el-table-column>
      <el-table-column label="描述">
        <template slot-scope="scope">
          <span>{{ scope.row.desc }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit">编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="deleteUserGroup"
            >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 隐藏的新增设备归类 form -->
    <el-dialog title="新增设备归类" :visible.sync="addFormVisible" label-width="100px" label-position="right" center>
      <el-form :model="addGroupForm">
        <el-form-item label="归类名称" >
          <el-input v-model="addGroupForm.name" auto-complete="off" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="包含设备">
          <el-transfer
            filter-placeholder="请输入设备名称"
            v-model="rightData"
            :filter-method="filterMethod"
            :titles="['全部设备', '机床类']"
            :data="allDevice"
            filterable>
          </el-transfer>
        </el-form-item>
      </el-form>
      <div class="dialog-footer" slot="footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 隐藏的编辑设备归类form -->
    <el-dialog title="修改设备归类" :visible.sync="editFormVisible" label-width="100px" center>
      <el-form :model="editForm">
        <el-form-item label="归类名称">
          <el-input v-model="editForm.name" auto-complete="off" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="包含设备">
          <el-transfer
            filter-placeholder="请输入设备名称"
            v-model="rightData"
            :filter-method="filterMethod"
            :titles="['全部设备', '机床类']"
            :data="allDevice"
            filterable>
          </el-transfer>
        </el-form-item>
      </el-form>
      <div class="dialog-footer" slot="footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmEdit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        tableData: [{
          name: '机床类',
          children: '车床、钻床',
          desc: '这个设备....'
        }, {
          name: '机床类',
          children: '车床、钻床',
          desc: '这个设备....'
        }, {
          name: '机床类',
          children: '车床、钻床',
          desc: '这个设备....'
        }, {
          name: '机床类',
          children: '车床、钻床',
          desc: '这个设备....'
        }],
        addFormVisible: false,
        editFormVisible: false,
        addGroupForm: {
          name: '',
          children: '',
          desc: ''
        },
        editForm: {
          name: '',
          children: '',
          desc: ''
        },
        allDevice: [
          {
            key: '车床'
          },
          {
            key: '钻床'
          },
          {
            key: '铣床'
          }
        ],
        filterMethod (query, item) {
          return item.key.indexOf(query) > -1
        },
        rightData: []
      }
    },
    methods: {
      handleEdit (index, row) {
        this.editFormVisible = true
        console.log(index, row)
      },
      handleAdd () {
        this.addFormVisible = true
      },
      confirmEdit () {
        console.log(this.rightData)
        this.editFormVisible = true
      },
      deleteUserGroup () {
        this.$confirm('此操作将永久删除该用户组, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
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
.device-btn {
  text-align: right;
}
.device-group-list {
  width: 100%;
  margin-top: 20px;
  table-layout: fixed;
}
</style>
