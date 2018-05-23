<template>
  <view-container>
    <view-header-flex>
      <span>{{ title }}</span>
    </view-header-flex>
    <info-detail>
      <row-layout :column="2">
        <info-detail-item
          slot="left"
          :label-width="labelWidth"
          label="姓名">
          {{ scoreData.name }}
        </info-detail-item>
        <info-detail-item
          slot="right"
          :label-width="labelWidth"
          label="性别">
          {{ scoreData.sex === 1 ? '男' : '女'}}
        </info-detail-item>
      </row-layout>
      <row-layout :column="column">
        <info-detail-item
          slot="left"
          :label-width="labelWidth"
          label="职位">
          {{ scoreData.job }}
        </info-detail-item>
        <info-detail-item
          slot="right"
          :label-width="labelWidth"
          label="部门">
          {{ scoreData.factory + scoreData.plant }}
        </info-detail-item>
      </row-layout>
      <row-layout :column="1">
        <info-detail-item
          :label-width="labelWidth"
          label="点检发现的问题"
          style="white-space: pre-line">{{ questions }}</info-detail-item>
      </row-layout>
      <row-layout :column="1">
        <info-detail-item
          :label-width="labelWidth"
          label="漏检的工单"
          style="white-space: pre-line">{{ expiredWorks }}</info-detail-item>
      </row-layout>
      <row-layout :column="1">
        <info-detail-item
          :label-width="labelWidth"
          label="绩效图表">
          <div class="echart-dom" ref="scoreAnalysis"></div>
        </info-detail-item>
      </row-layout>
    </info-detail>
    <tool-bar>
      <div slot="right">
        <el-button
          slot="right"
          type="primary"
          @click="decideScore">评分</el-button>
      </div>
    </tool-bar>
    <score-dialog :visible="showDialog" @closeScoreDialog="closeDialog"></score-dialog>
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
import chartOptions from 'shared@/echart/options/scoreAnalysis.js'
import { mapState, mapMutations, mapActions } from 'vuex'
import ScoreDialog from './dialog.vue'
export default {
  components: {
    ScoreDialog
  },
  data () {
    return {
      showDialog: false,
      column: 2,
      labelWidth: '120px',
      loading: false,
      ifShowEdit: false,
      radio: '1',
      textarea: '',
      echartsDom: null,
      questions: '',
      expiredWorks: '',
      echartOptions: Object.assign({}, chartOptions),
    }
  },
  methods: {
    // 初始化图表
    initChart (arr) {
      this.echartsDom = echarts.init(this.$refs.scoreAnalysis)
      let year = new Date().getFullYear() + '年'
      let name = this.scoreData.name
      this.echartOptions.legend.data = [name + year + '点检绩效图']
      this.echartOptions.series[0].name = name + year + '点检绩效图'
      this.echartOptions.series[0].data = arr
      this.$nextTick(() => {
        this.echartsDom.setOption(this.echartOptions)
      })
    },
    decideScore () {
      this.showDialog = true
    },
    modifyScore () {
      this.showDialog = true      
    },
    closeDialog (flag) {
      this.showDialog = false
      if (flag) {
        this.fetchScores()
      }
    },
    transformProblem (value) {
      let str = ''
      value.forEach(function (element, index) {
        let number = (index + 1) + '.'
        str = str + number + element.problem +'\n'
      })
      if (value.length === 0) {
        str = '暂无在点检时发现问题'
      }
      return str
    },
    transformWorks (value) {
      let str = ''
      value.forEach(function (element, index) {
        let number = (index + 1) + '.'
        let date = new Date(element.checkDate)
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate()
        let dateStr =  year + '年' + month +'月' + day + '日'
        str = str + number + '未在' + dateStr + '使用' + element.tool + '检查' + element.deviceName + '的' + element.name + '的' + element.element  +'要素\n'
      })
      if (value.length === 0) {
        str = '暂无有漏检情况'
      }
      return str
    },
    fetchProblem () {
      this.$http({
        method: 'get',
        url: '/api/work/problem',
        params: {
          checkerId: this.scoreData.id
        }
      }).then((result) => {
        console.log(result)
        this.questions = this.transformProblem(result.value)
      })
    },
    fetchExpiredWorks () {
      this.$http({
        method: 'get',
        url: '/api/work/expired/person',
        params: {
          checkerId: this.scoreData.id
        }
      }).then((result) => {
        console.log('expired', result)
        this.expiredWorks = this.transformWorks(result.value)
      })
    },
    fetchScores () {
      this.$http({
        method: 'get',
        url: '/api/score',
        params: {
          checkerId: this.scoreData.id
        }
      }).then((result) => {
        let arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        result.value.forEach((element) => {
          let index = element.assessDate.slice(-2, -1) - 1
          arr[index] = element.total
        })
        this.initChart(arr)
      })
    }
  },
  computed: {
    ...mapState('score-data', [
      'scoreData'
    ]),
    title () {
      return this.scoreData.name  + '点检绩效表'
    }
  },
  created () {
    this.fetchProblem()
    this.fetchExpiredWorks()
  },
  mounted () {
    this.fetchScores()
  }
}
</script>

<style>
.echart-dom {
  width: 100%;
  height: 250px;
}
</style>
