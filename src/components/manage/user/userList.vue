<template>
  <div class="user-list">
    <!-- 查询模块 -->
    <el-form class="form-search" :inline="true" :model="formSearch">
      <el-form-item label="">
        <el-input placeholder="用户姓名" v-model="formSearch.name"></el-input>
      </el-form-item>
      <el-button type="primary" @click="search" @keyup.enter="search">查询</el-button>
    </el-form>
    <!-- 显示的用户列表 -->
    <el-table
      class="user-list__table"
      :data="tableData"
      border
      >
      <el-table-column
        prop="name"
        label="员工姓名"
       >
      </el-table-column>
      <el-table-column
        prop="job"
        label="负责点检"
      >
      </el-table-column>
      <el-table-column
        prop="device"
        label="负责设备">
      </el-table-column>
      <el-table-column
        prop="option"
        label="选项">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 隐藏的用户编辑表格 -->
    <el-dialog title="编辑用户" :visible.sync="editFormVisible" center>
      <el-form :model="userFormEdit">
        <el-form-item label="员工姓名" label-width="100px">
          <el-input v-model="userFormEdit.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="负责点检" label-width="100px">
          <el-input v-model="userFormEdit.job" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="负责设备" label-width="100px">
          <el-input v-model="userFormEdit.device" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [{
        name: '王小虎',
        job: '日常点检',
        device: '机床类'
      }, {
        name: '王小虎',
        job: '日常点检',
        device: '电气类'
      }, {
        name: '王小虎',
        job: '日常点检',
        device: '车床类'
      }, {
        name: '王小虎',
        job: '日常点检',
        device: '钻床类'
      }],
      formSearch: {
        name: ''
      },
      editFormVisible: false,
      userFormEdit: {
        name: 'xuhaodong',
        job: '专业点检',
        device: '车床类'
      }
    }
  },
  methods: {
    handleEdit (index, row) {
      this.editFormVisible = true
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    }
  }
}
</script>

<style>
.form-search {
  text-align: right;
}

.user-list__table {
  margin: 0 auto;
}
</style>
