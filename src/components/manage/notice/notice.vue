<template>
  <div class="notice">
    <div class="device-btn">
      <el-button type="primary" @click="handleAdd">新增公告</el-button>
    </div>
    <!-- 显示的设备列表 -->
    <el-table class="notice-list" :data="noticeData" :fit="true" border>
      <el-table-column label="开始日期">
        <template slot-scope="scope">
          <span>{{ scope.row.start }}</span>
        </template>
      </el-table-column>
      <el-table-column label="公告标题">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="公告内容">
        <template slot-scope="scope">
          <span>{{ scope.row.content }}</span>
        </template>
      </el-table-column>
      </el-table-column>
      <el-table-column label="选项">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit">编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑的点检周期表格 -->
    <el-dialog title="编辑公告" :visible.sync="editFormVisible" label-width="100px" center>
      <el-form ref="editNoticeForm" :model="editNoticeForm" label-width="80px">
        <el-form-item label="开始日期">
          <el-date-picker
            v-model="editNoticeForm.start"
            type="date"
            placeholder="选择开始日期"
            >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="公告标题">
          <el-input v-model="editNoticeForm.title"></el-input>
        </el-form-item>
        <el-form-item label="公告内容">
          <el-input type="textarea" :rows="3" v-model="editNoticeForm.content"></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-footer" slot="footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmEdit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 新增的点检周期表格 -->
    <el-dialog title="新增公告" :visible.sync="addFormVisible" label-width="100px" center>
      <el-form ref="addNoticeForm" :model="addNoticeForm" label-width="80px">
        <el-form-item label="开始日期">
          <el-date-picker
            v-model="addNoticeForm.start"
            type="date"
            placeholder="选择开始日期"
            >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="公告标题">
          <el-input v-model="addNoticeForm.title"></el-input>
        </el-form-item>
        <el-form-item label="公告内容">
          <el-input type="textarea" :rows="3" v-model="addNoticeForm.content"></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-footer" slot="footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmEdit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        editFormVisible: false,
        addFormVisible: false,
        noticeData: [{
          start: '2017-11-02',
          title: '明天不用上班',
          content: '由于...明天不用上班'
        }, {
          start: '2017-11-02',
          title: '明天不用上班',
          content: '由于...明天不用上班'
        }, {
          start: '2017-11-02',
          title: '明天不用上班',
          content: '由于...明天不用上班'
        }, {
          start: '2017-11-02',
          title: '明天不用上班',
          content: '由于...明天不用上班'
        }],
        editNoticeForm: {
          start: '',
          title: '',
          content: ''
        },
        addNoticeForm: {
          start: '',
          title: '',
          content: ''
        }
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
        console.log(2333)
      }
    }
  }
</script>

<style>
.device-btn {
  text-align: right;
  margin-bottom: 20px;
}

.day-cycle-list {
  width: 100%;
  margin-top: 20px;
  table-layout: fixed;
}

.spot-cycle {
  width: 10%;
  margin-right: 10px;
}
</style>
