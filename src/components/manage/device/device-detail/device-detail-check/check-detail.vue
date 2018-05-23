<template>
  <view-container>
    <view-header>点检计划详情</view-header>
    <info-detail>
      <row-layout :column="2">
        <info-detail-item
          slot="left"
          :label-width="labelWidth"
          label="部件名称">
          {{ checkData.name }}
        </info-detail-item>
        <info-detail-item
          slot="right"
          :label-width="labelWidth"
          label="部件编号">
          {{ checkData.number }}
        </info-detail-item>
      </row-layout>
      <row-layout :column="column">
        <info-detail-item
          slot="left"
          :label-width="labelWidth"
          label="点检要素">
          {{ checkData.element }}
        </info-detail-item>
        <info-detail-item
          slot="right"
          :label-width="labelWidth"
          label="点检标准">
          {{ checkData.normType === '2' ? (checkData.norm + checkData.unit) : checkData.normOptions }}
        </info-detail-item>
      </row-layout>
      <row-layout :column="column">
        <info-detail-item
          slot="left"
          :label-width="labelWidth"
          label="可能劣化的部位">
          {{ checkData.special }}
        </info-detail-item>
        <info-detail-item
          slot="right"
          :label-width="labelWidth"
          label="设备点检状态">
          {{ checkData.deviceState }}
        </info-detail-item>
      </row-layout>
      <row-layout :column="column">
        <info-detail-item
          slot="left"
          :label-width="labelWidth"
          label="点检方法">
          {{ checkData.method }}
        </info-detail-item>
        <info-detail-item
          slot="right"
          :label-width="labelWidth"
          label="点检工具">
          {{ checkData.tool }}
        </info-detail-item>
      </row-layout>
      <row-layout :column="column">
        <info-detail-item
          slot="left"
          :label-width="labelWidth"
          label="点检周期">
          {{ checkData.cycle + '天' }}
        </info-detail-item>
        <info-detail-item
          slot="right"
          :label-width="labelWidth"
          label="点检开始日期">
          {{ checkData.startDate | formateDate }}
        </info-detail-item>
      </row-layout>
      <row-layout :column="column">
        <info-detail-item
          slot="left"
          :label-width="labelWidth"
          label="点检人员">
          {{ checkData.checker }}
        </info-detail-item>
        <info-detail-item
          slot="right"
          :label-width="labelWidth"
          label="点检创建日期">
          {{ checkData.createDate | formateDate }}
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
import chartOptionsNum from 'shared@/echart/options/deviceFutureNum.js'
import chartOptionsStr from 'shared@/echart/options/deviceFutureStr.js'
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  data () {
    return {
      column: 2,
      labelWidth: '120px',
      loading: false,
      echartsDom: null,
      echartOptionsNum: Object.assign({}, chartOptionsNum),
      echartOptionsStr: Object.assign({}, chartOptionsStr), 
    }
  },
  computed: {
    ...mapState('device-data', [
      'checkData'
    ])
  },
  methods: {
    // 初始化图表
    initChart (result, echartOptions) {
      let legend = result[0].deviceName + result[0].name +result[0].element + '趋势图'
      let xArr = []
      let yValue = []
      let yArr = []
      result.forEach((element) => {
        let date = new Date(element.checkDate)
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate()
        let dateStr = year + '年' + month +'月' + day + '日'
        xArr.push(dateStr)
        yValue.push(element.result)
      })
      if (result[0].normType === '1') {
        yArr = result[0].normOptions.split('，')
        echartOptions.yAxis[0].data = yArr
      } else {
        echartOptions.yAxis[0].name = '（' + result[0].unit + '）'
      }
      echartOptions.legend.data = [legend]
      echartOptions.series[0].name = legend
      echartOptions.xAxis.data = xArr   
      echartOptions.series[0].data = yValue
      this.echartsDom = echarts.init(this.$refs.deviceFuture)
      this.$nextTick(() => {
        this.echartsDom.setOption(echartOptions)
      })
    },
    fecchAllWorks () {
      this.$http({
        method: 'get',
        url: '/api/work/spot-check',
        params: {
          id: this.checkData.id
        }
      }).then((result) => {
        if (result.value[0] && result.value[0].normType === '2') {
          this.initChart(result.value, chartOptionsNum)
        } else {
          this.initChart(result.value, chartOptionsStr)
        }
      })
    },
  },
  computed: {
    ...mapState('device-data', [
      'checkData'
    ])
  },
  mounted () {
    this.fecchAllWorks()
  }
}
</script>

<style>
.echart-dom {
  width: 100%;
  height: 250px;
}
</style>
