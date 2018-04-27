<template>
  <view-container>
    <view-header>工单录入</view-header>
    <info-detail>
      <row-layout :column="2">
        <info-detail-item
          slot="left"
          :label-width="labelWidth"
          label="设备名称">
          {{ workData.deviceName }}
        </info-detail-item>
        <info-detail-item
          slot="right"
          :label-width="labelWidth"
          label="点检部件">
          {{ workData.name }}
        </info-detail-item>
      </row-layout>
      <row-layout :column="column">
        <info-detail-item
          slot="left"
          :label-width="labelWidth"
          label="设备位置">
          {{ workData.usePlace }}
        </info-detail-item>
        <info-detail-item
          slot="right"
          :label-width="labelWidth"
          label="设备种类">
          {{ workData.category }}
        </info-detail-item>
      </row-layout>
      <row-layout :column="column">
        <info-detail-item
          slot="left"
          :label-width="labelWidth"
          label="设备型号">
          {{ workData.deviceModel }}
        </info-detail-item>
        <info-detail-item
          slot="right"
          :label-width="labelWidth"
          label="出厂编号">
          {{ workData.serialNumber }}
        </info-detail-item>
      </row-layout>
      <row-layout :column="1">
        <info-detail-item
          :label-width="labelWidth"
          label="设备备注">
          {{ workData.remark }}
        </info-detail-item>
      </row-layout>
      <row-layout :column="column">
        <info-detail-item
          slot="left"
          :label-width="labelWidth"
          label="部件编号">
          {{ workData.number }}
        </info-detail-item>
        <info-detail-item
          slot="right"
          :label-width="labelWidth"
          label="可能劣化的部位">
          {{ workData.special }}
        </info-detail-item>
      </row-layout>
      <row-layout :column="column">
        <info-detail-item
          slot="left"
          :label-width="labelWidth"
          label="点检周期">
          {{ workData.cycle + '天' }}
        </info-detail-item>
        <info-detail-item
          slot="right"
          :label-width="labelWidth"
          label="点检日期">
          {{ workData.checkDate | formateDate }}
        </info-detail-item>
      </row-layout>
      <row-layout :column="column">
        <info-detail-item
          slot="left"
          :label-width="labelWidth"
          label="点检要素">
          {{ workData.element }}
        </info-detail-item>
        <info-detail-item
          slot="right"
          :label-width="labelWidth"
          label="点检标准">
          {{ workData.norm + workData.unit }}
        </info-detail-item>
      </row-layout>
      <row-layout :column="column">
        <info-detail-item
          slot="left"
          :label-width="labelWidth"
          label="点检工具">
          {{ workData.tool }}
        </info-detail-item>
        <info-detail-item
          slot="right"
          :label-width="labelWidth"
          label="点检方法">
          {{ workData.method }}
        </info-detail-item>
      </row-layout>
      <row-layout :column="2" :isInput="workData.result ? false : true">
        <info-detail-item
          v-if="workData.normType === '2'"
          slot="left"
          :label-width="labelWidth"
          label="点检结果">
          <span v-if="workData.result">{{ workData.result }}</span>
          <el-input size="mini" v-else v-model="result" placeholder="请输入点检的结果" style="width: 50%"></el-input>
          <span>{{ workData.unit }}</span>
        </info-detail-item>
        <info-detail-item
          v-if="workData.normType === '1'"
          slot="left"
          :label-width="labelWidth"
          label="点检结果">
          <span v-if="workData.result">{{ workData.result }}</span>
          <el-select v-else v-model="result" placeholder="请选择部件的状态" style="width: 50%">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </info-detail-item>
        <info-detail-item
          slot="right"
          :label-width="labelWidth"
          label="是否正常">
          <span v-if="workData.isProblem !== null">{{ workData.isProblem == 1 ? '正常' : '异常' }}</span>
          <div v-else>
            <el-radio v-model="isProblem" label="1">正常</el-radio>
            <el-radio v-model="isProblem" label="0">异常</el-radio>
          </div>
        </info-detail-item>
      </row-layout>
      <row-layout :column="1">
        <info-detail-item
          :label-width="labelWidth"
          label="点检发现的问题">
          <span v-if="workData.problem !== null">{{ workData.problem }}</span>
          <el-input 
            v-else
            v-model="problem"
            type="textarea"
            :rows="2"
            placeholder="请输入点检过程中发现的问题"></el-input>
        </info-detail-item>
      </row-layout>
      <row-layout :column="1">
        <info-detail-item
          :label-width="labelWidth"
          label="趋势图表">
          <div class="echart-dom" ref="deviceFuture"></div>
        </info-detail-item>
      </row-layout>
    </info-detail>
    <tool-bar v-if="!workData.result">
      <div slot="right">
        <el-button
        slot="right"
        type="primary"
        @click="saveWork">提交</el-button>
      </div>
    </tool-bar>
  </view-container>
</template>

<script>
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/funnel'
import 'echarts/lib/chart/sankey'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/tooltip'
import echarts from 'echarts/lib/echarts'
import chartOptions from 'shared@/echart/options/deviceFuture.js'
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  data () {
    return {
      problem: '',
      isProblem: '',
      result: '',
      options: [],
      column: 2,
      labelWidth: '120px',
      loading: false,
      echartsDom: null,
      echartOptions: Object.assign({}, chartOptions),
    }
  },
  methods: {
    ...mapMutations('work-data', [
      'updatePartData'
    ]),
    // 初始化图表
    initChart () {
      this.echartsDom = echarts.init(this.$refs.deviceFuture)
      this.$nextTick(() => {
        this.echartsDom.setOption(this.echartOptions)
      })
    },
    saveWork () {
      let obj = {
        id: this.workData.workId,
        result: this.result,
        problem: this.problem,
        isProblem: this.isProblem
      }
      this.$http({
        method: 'post',
        url: '/api/work',
        data: obj
      }).then((result) => {
        this.updatePartData(obj)
        this.$message({
          type: 'success',
          message: result.msg
        })
      }).catch((err) => {
        this.$message({
          type: 'error',
          message: result.msg
        })
      })
    }
  },
  computed: {
    ...mapState('work-data', [
      'workData'
    ])
  },
  created () {
    if (this.workData.normType === '1') {
      this.options = this.workData.normOptions.split('，')
    }
  },
  mounted () {
    this.initChart()
  }
}
</script>

<style>
.echart-dom {
  width: 100%;
  height: 250px;
}
</style>
