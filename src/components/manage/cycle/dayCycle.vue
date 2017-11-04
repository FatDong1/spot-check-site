<template>
  <div class="day-cycle">
    <div class="device-btn">
      <el-button type="primary" @click="handleAdd">新增日常点检</el-button>
        <el-input placeholder="搜索设备" style="width: 200px">
      </el-input>
      <el-button type="primary" icon="el-icon-search"></el-button>
    </div>
    <!-- 显示的设备列表 -->
    <el-table class="day-cycle-list" :data="dayCycleData" :fit="true" border>
      <el-table-column label="设备种类">
        <template slot-scope="scope">
          <span>{{ scope.row.group }}</span>
        </template>
      </el-table-column>
      <el-table-column label="开始日期">
        <template slot-scope="scope">
          <span>{{ scope.row.start }}</span>
        </template>
      </el-table-column>
      <el-table-column label="结束日期">
        <template slot-scope="scope">
          <span>{{ scope.row.end }}</span>
        </template>
      </el-table-column>
      <el-table-column label="周期 / 天">
        <template slot-scope="scope">
          <span>{{ scope.row.cycle }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
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
    <el-dialog title="编辑点检" :visible.sync="editFormVisible" label-width="100px" center>
      <el-form ref="editDayForm" :model="editDayForm" label-width="80px">
        <el-form-item label="设备种类">
          <el-input v-model="editDayForm.group" placeholder="请输入设备种类" style="width: 40%"></el-input>
        </el-form-item>
        <el-form-item label="开始日期">
          <el-date-picker
            v-model="editDayForm.start"
            type="date"
            placeholder="选择日期"
            >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="停止日期">
          <el-date-picker
            v-model="editDayForm.end"
            type="date"
            placeholder="选择日期"
            >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="点检周期">
          <el-input v-model="editDayForm.cycle" class="spot-cycle" placeholder="10"></el-input> 天
        </el-form-item>
      </el-form>
      <div class="dialog-footer" slot="footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmEdit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 新增的点检周期表格 -->
    <el-dialog title="新增点检" :visible.sync="addFormVisible" label-width="100px" center>
      <el-form ref="addDayForm" :model="addDayForm" label-width="80px">
        <el-form-item label="设备种类">
          <el-input v-model="addDayForm.group" placeholder="请输入设备种类" style="width: 40%"></el-input>
        </el-form-item>
        <el-form-item label="开始日期">
          <el-date-picker
            v-model="addDayForm.start"
            type="date"
            placeholder="选择日期"
            >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="停止日期">
          <el-date-picker
            v-model="addDayForm.end"
            type="date"
            placeholder="选择日期"
            >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="点检周期">
          <el-input v-model="addDayForm.cycle" class="spot-cycle" placeholder="10"></el-input> 天
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
        dayCycleData: [{
          group: '机床类',
          start: '2017-11-02',
          end: '2018-12-02',
          cycle: '12'
        }, {
          group: '机床类',
          start: '2017-11-02',
          end: '2018-12-02',
          cycle: '12'
        }, {
          group: '机床类',
          start: '2017-11-02',
          end: '2018-12-02',
          cycle: '12'
        }, {
          group: '机床类',
          start: '2017-11-02',
          end: '2018-12-02',
          cycle: '12'
        }],
        editDayForm: {
          start: '',
          end: '',
          cycle: '',
          group: ''
        },
        addDayForm: {
          start: '',
          end: '',
          cycle: '',
          group: ''
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
