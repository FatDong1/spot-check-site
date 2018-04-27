<template>
  <view-container>
    <view-header-flex :width="'35%'">
      {{ $route.query.state === 'edit' ? '修改点检' : '新增点检' }}
      <el-steps
        slot="right"
        :space="200"
        :active="currentActive"
        align-center>
        <el-step title="定点"></el-step>
        <el-step title="定标准"></el-step>
        <el-step title="定方法"></el-step>
        <el-step title="定周期"></el-step>
        <el-step title="定人"></el-step>
      </el-steps>
    </view-header-flex>
    <view-content padding="20px 10px">
      <set-point
        v-show="currentActive === 0"
        :data="pointData"
        :step="stepActive"
        @dispatch="handlePointDispatch"></set-point>
      <set-norm 
        v-show="currentActive === 1"
        :step="stepActive"
        :data="normData"
        @dispatch="handleNormDispatch">
      </set-norm>
      <set-method 
        v-show="currentActive === 2"
        :step="stepActive"
        :data="methodData"
        @dispatch="handleMethodDispatch">
      </set-method>
      <set-cycle 
        v-show="currentActive === 3"
        :step="stepActive"
        :data="cycleData"
        @dispatch="handleCycleDispatch">
      </set-cycle>
      <set-person 
        v-show="currentActive === 4"
        :send="send"
        :step="stepActive"
        :data="personData"
        @dispatch="handlePersonDispatch">
      </set-person>
    </view-content>
    <tool-bar>
      <div slot="right">
        <el-button
        slot="right"
        v-if="currentActive > 0"
        @click="handlePrevStepClick">上一步</el-button>
       <el-button
        slot="right"
        type="primary"
        v-if="currentActive === 4"
        @click="handleSubmit">提交</el-button>
      <el-button
        slot="right"
        type="primary"
        v-if="currentActive < 4"
        @click="handleNextStepClick">下一步</el-button> 
      </div>
    </tool-bar>
  </view-container>
</template>

<script>
import SetPoint from './set-point/index.vue'
import SetNorm from './set-norm/index.vue'
import SetMethod from './set-method/index.vue'
import SetPerson from './set-person/index.vue'
import SetCycle from './set-cycle/index.vue'
import { mapMutations, mapState } from 'vuex'
export default {
  components: {
    SetPoint,
    SetNorm,
    SetMethod,
    SetPerson,
    SetCycle
  },
  data () {
    return {
      stepType: 'next',
      stepActive: 0,
      send: 0,
      currentActive: 0,
      pointData: {
        name: '',
        number: '',
        element: '',
        special: ''
      },
      normData: {
        norm: '',
        unit: '',
        normType: '2',
        normOptions: ''
      },
      methodData: {
        method: '',
        tool: '',
        deviceState: ''
      },
      cycleData: {
        cycle: '',
        startDate: new Date()
      },
      personData: []
    }
  },
  computed: {
    ...mapState('device-data', [
      'deviceData',
      'checkData'
    ])
  },
  methods: {
    ...mapMutations([
      'updateLoading'
    ]),
    initData () {
      this.pointData.name = this.checkData.name
      this.pointData.number = this.checkData.number
      this.pointData.element = this.checkData.element
      this.pointData.special = this.checkData.special
      
      this.normData.norm = this.checkData.norm
      this.normData.unit = this.checkData.unit
      this.normData.normType = this.checkData.normType
      this.normData.normOptions = this.checkData.normOptions

      this.methodData.method = this.checkData.method
      this.methodData.tool = this.checkData.tool      
      this.methodData.deviceState = this.checkData.deviceState
      
      this.cycleData.cycle = this.checkData.cycle
      this.cycleData.startDate = this.checkData.startDate

      this.personData.push(this.checkData.checker)
    },
    updatePointData (data) {
      this.pointData = data
    },
    updateNormData (data) {
      this.normData = data
    },
    updateMethodData (data) {
      this.methodData = data
    },
    updateCycleData (data) {
      this.cycleData = data
    },
    updatePersonData (data) {
      this.personData = data
    },
    handlePointDispatch (data, node) {
      if (this.stepType === 'next') {
        node.validate(valid => {
          if (valid) {
            this.updatePointData(data)
            this.currentActive = this.stepActive
          } else {
            this.resetStep()
            return false
          }
        })
      } else {
        this.updatePointData(data)
        this.currentActive = this.stepActive
      }
    },
    handleNormDispatch (data, node) {
      if (this.stepType === 'next') {
        node.validate(valid => {
          if (valid) {
            this.updateNormData(data)
            this.currentActive = this.stepActive
          } else {
            this.resetStep()
            return false
          }
        })
      } else {
        this.updateNormData(data)
        this.currentActive = this.stepActive
      }
    },
    handleMethodDispatch (data, node) {
      if (this.stepType === 'next') {
        node.validate(valid => {
          if (valid) {
            this.updateMethodData(data)
            this.currentActive = this.stepActive
          } else {
            this.resetStep()
            return false
          }
        })
      } else {
        this.updateMethodData(data)
        this.currentActive = this.stepActive
      }    
    },
    handlePersonDispatch (data) {
      this.updatePersonData(data)
      if (this.stepType === 'prev') {
        this.currentActive--
      }
    },
    handleCycleDispatch (data, node) {
      if (this.stepType === 'next') {
        node.validate(valid => {
          if (valid) {
            this.updateCycleData(data)
            this.currentActive = this.stepActive
          } else {
            this.resetStep()
            return false
          }
        })
      } else {
        this.updateCycleData(data)
        this.currentActive = this.stepActive
      }    
    },
    /**
     * 下一步 按钮点击事件
     */
    handleNextStepClick () {
      this.stepType = 'next'
      this.stepActive++
    },
    /**
     * 上一步 按钮点击事件
     */
    handlePrevStepClick () {
      this.stepType = 'prev'
      this.stepActive-- 
    },
    /**
     * 提交按钮点击事件
     */
    handleSubmit () {
      this.send++
      let state = this.$route.query.state
      let url = state === 'edit' ? '/api/check/update' : '/api/check'
      let backName = state === 'edit'  ? 'device-detail' : 'device-list'
      this.$nextTick(() => {
        this.updateLoading(true)
        let result = Object.assign({}, this.pointData, this.normData, this.methodData, this.cycleData)
        result['checkerId'] = this.personData
        result['deviceId'] = this.deviceData.id
        state === 'edit' ? result['id'] = this.checkData.id : ''
        this.$http({
          method: 'post',
          url: url,
          data: result
        }).then((result) => {
          this.$message({
            type: 'success',
            message: result.msg
          })
          this.updateLoading(false)          
          this.$router.push({
            name: backName
          })
        }).catch((err) => {
          this.$message({
            type: 'error',
            message: err.msg
          })
        })
      })
    },
    resetStep () {
      if (this.stepType === 'next') {
        this.stepActive--
      } else if (this.stepType === 'prev') {
        this.stepActive++
      }
    }
  },
  created () {
    if (this.$route.query.state === 'edit') {
      console.log('init................')
      // this.$nextTick(() => {
        this.initData()
      // })
      console.log(this.pointData, this.methodData, this.cycleData, this.normData)
    }
  }
}
</script>

<style lang="less" scoped>
.steps-container {
  width: 40%;
}
.content-header {
  font-size: 16px;
  padding: 20px 0;
}
</style>