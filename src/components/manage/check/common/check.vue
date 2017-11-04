<template>
  <div class="check-list">
    <!-- 查询模块 -->
    <el-form class="form-search" :inline="true" :model="formSearch">
      <el-form-item label="">
        <el-input placeholder="设备名称" v-model="formSearch.name"></el-input>
      </el-form-item>
      <el-button type="primary" @click="search" @keyup.enter="search">查询</el-button>
    </el-form>
    <!-- 点检列表 -->
    <el-table class="check-list__table" :data="tableData">
      <el-table-column type="expand"  label-width="100px">
        <template slot-scope="props" inline>
          <el-form label-position="left" class="table-expand" inline>
            <el-form-item label="设备名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="设备归类">
              <span>{{ props.row.group }}</span>
            </el-form-item>
            <el-form-item label="截至日期">
              <span>{{ props.row.date }}</span>
            </el-form-item>
            <el-form-item label="点检记录">
              <span>{{ props.row.record }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="截止日期" sortable>
      </el-table-column>
      <el-table-column prop="name" label="设备名称">
      </el-table-column>
      <el-table-column prop="group" label="设备种类">
      </el-table-column>
      <el-table-column prop="option" label="操作">
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
    <!-- 编辑点检表 -->
    <el-dialog title="编辑点检表" :visible.sync="dialogFormVisible" center>
      <el-form :model="formEdit">
        <el-form-item label="设备名称：" label-width="100px">
          <span>{{formEdit.name}}</span>
        </el-form-item>
        <el-form-item label="设备种类：" label-width="100px">
          <span>{{formEdit.group}}</span>
        </el-form-item>
        <el-form-item label="点检记录：" label-width="100px">
          <el-input type="textarea" :rows="3" v-model="formEdit.record" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [{
        name: '车床',
        date: '2017-11-02',
        group: '机床类',
        record: '哈哈哈哈哈'
      }, {
        name: '车床',
        date: '2017-11-02',
        group: '机床类',
        record: '哈哈哈哈哈'
      }, {
        name: '车床',
        date: '2017-11-02',
        group: '机床类',
        record: '哈哈哈哈哈'
      }, {
        name: '车床',
        date: '2017-11-02',
        group: '机床类',
        record: '哈哈哈哈哈'
      }],
      formSearch: {
        name: ''
      },
      dialogFormVisible: false,
      formEdit: {
        name: '',
        group: '',
        record: ''
      }
    }
  },
  methods: {
    handleEdit (index, row) {
      this.formEdit.name = row['name']
      this.formEdit.group = row['group']
      this.dialogFormVisible = true
      console.log(index, row)
      console.log(row['name'])
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

.check-list__table {
  margin: 0 auto;
  border: 1px solid #ececec;
}


.table-expand {
  font-size: 0;
}

.table-expand label {
  width: 90px;
  color: #99a9bf;
}

.table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
