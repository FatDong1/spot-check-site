<template>
  <div class="echart-question">
    <div class="echart-dom" ref="echartQuestion"></div>
  </div>
</template>

<script>
import echarts from 'echarts/lib/echarts'
import chartOptions from 'shared@/echart/options/dealQuestion.js'
export default {
  data () {
    return {
      echartsDom: null,
      echartOptions: Object.assign({}, chartOptions),
    }
  },
  methods: {
    // 初始化图表
    initChart (arr) {
      this.echartsDom = echarts.init(this.$refs.echartQuestion)
      this.echartOptions.series[0].data = arr
      let year = new Date().getFullYear() + '年'
      this.echartOptions.legend.data = [year + '点检发现的问题量']
      this.echartOptions.series[0].name = year + '点检发现的问题量'
      this.$nextTick(() => {
        this.echartsDom.setOption(this.echartOptions)
      })
    },
    fetchNumber () {
      let user = JSON.parse(sessionStorage.getItem('user'))
      this.$http({
        method: 'get',
        url: '/api/work/number',
        params: {
          checkerId: user.id
        }
      }).then((result) => {
        let arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        result.value.forEach((element) => {
          let date = new Date(element.checkDate)
          let month = date.getMonth() + 1
          arr[month] = arr[month] + 1
        })
        this.initChart(arr)
      })
    }
  },
  mounted () {
    this.fetchNumber()
  }
}
</script>

<style>
.echart-question {
  display: inline-block;
  background: #fff;
  width: 100%;
  height: 250px;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}
.echart-dom {
  display: inline-block;
  width: 100%;
  height: 250px;
}
/* .echart-content {
  font-size: 16px;
  color: #606266;
  font-weight: 400;
} */
</style>
