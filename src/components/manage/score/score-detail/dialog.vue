<template>
  <el-dialog title="绩效评分" :visible="visible" @close="closeDialog">
    <el-form :model="scoreData" label-width="120px">
      <el-form-item label="姓名：">
        <span>{{ scoreData.name }}</span>
      </el-form-item>
      <el-form-item label="性别：">
        <span>{{ scoreData.sex === 1 ? '男' : '女' }}</span>
      </el-form-item>
      <el-form-item label="职位：">
        <span>{{ scoreData.job }}</span>
      </el-form-item>
      <el-form-item label="绩效月份：">
        <el-date-picker
          v-model="assessDate"
          type="month"
          style="width: auto"
          placeholder="选择绩效评估月份">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="工作态度分数：">
        <el-input style="width: 50%; margin-right: 10px" v-model.number="attitude" auto-complete="off"></el-input>分
      </el-form-item>
      <el-form-item label="工作出勤分数：">
        <el-input style="width: 50%; margin-right: 10px" v-model.number="attendance" auto-complete="off"></el-input>分
      </el-form-item>
      <el-form-item label="工作能力分数：">
        <el-input style="width: 50%; margin-right: 10px" v-model.number="ability" auto-complete="off"></el-input>分
      </el-form-item>
      <el-form-item label="工作效率分数：">
        <el-input style="width: 50%; margin-right: 10px" v-model.number="efficiency" auto-complete="off"></el-input>分
      </el-form-item>
      <el-form-item label="平均分：">
        <span>{{ total }}</span>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="decideScore">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    visible: {
      type: Boolean
    }
  },
  data () {
    return {
      assessDate: '',
      attitude: 0,
      attendance: 0,
      ability: 0,
      efficiency: 0
    }
  },
  computed: {
    ...mapState('score-data', [
      'scoreData'
    ]),
    total () {
      return ((this.attitude + this.attendance + this.ability + this.efficiency) / 4).toFixed(0)
    }
  },
  methods: {
    closeDialog () {
      this.$emit('closeScoreDialog')
    },
    decideScore () {
      let year = this.assessDate.getFullYear()
      let month = this.assessDate.getMonth() + 1
      let result = {
        attitude: this.attitude,
        attendance: this.attendance,
        ability: this.ability,
        efficiency: this.efficiency,
        total: this.total,
        assessDate: year + '年' + month + '月',
        userId: this.scoreData.id
      }
      this.$http({
        method: 'post',
        url: '/api/score',
        data: result
      }).then((result) => {
        this.$emit('closeScoreDialog', 1)
        this.$message({
          message: result.msg,
          type: 'success'
        })
      })
    }
  }
}
</script>

<style>

</style>
