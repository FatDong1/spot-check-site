<template>
  <view-container>
    <view-header>异常查看</view-header>
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
          {{ workData.normType === '2' ? (workData.norm + workData.unit) : workData.normOptions }}
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
      <row-layout :column="column">
        <info-detail-item
          slot="left"
          :label-width="labelWidth"
          label="点检结果">
          {{ workData.result }}
        </info-detail-item>
        <info-detail-item
          slot="right"
          :label-width="labelWidth"
          label="解决状态">
          {{ workData.isProblem === 0 ? '未解决' : '已解决' }}
        </info-detail-item>
      </row-layout>
      <row-layout :column="1">
        <info-detail-item
          :label-width="labelWidth"
          label="点检发现的问题">
          {{ workData.problem }}
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
    <tool-bar v-if="workData.isProblem === 0">
      <div slot="right">
        <el-button
        slot="right"
        type="primary"
        @click="saveWork">前往解决</el-button>
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
          id: this.workData.spotCheckId
        }
      }).then((result) => {
        if (result.value[0].normType === '2') {
          this.initChart(result.value, chartOptionsNum)
        } else {
          this.initChart(result.value, chartOptionsStr)
        }
      })
    },
    saveWork () {
      this.$router.push({
        name: 'unusual-edit'
      })
    }
  },
  computed: {
    ...mapState('unusual-data', [
      'workData'
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
