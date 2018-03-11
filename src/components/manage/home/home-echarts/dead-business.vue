<template>
  <section class="home-section width-50 p-l-6" id="deadBusiness">
    <div class="echart-panel">
      <div class="echart-panel-header">
        <h4 class="title">失活商机统计</h4>
        <el-select class="header-right" v-model="deadBusinessSelectValue"></el-select>
      </div>
      <div class="echart-panel-content" v-loading="deadBusinessLoading">
        <div class="echart-wrap width-100">
          <h4 class="title">所有产品失活商机统计</h4>
          <div class="echart-content width-100" ref="deadBusiness"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import echarts from 'echarts/lib/echarts'
  import chartOptions from 'shared@/echart/'
  import { scrollCall } from 'mx-ui'
  export default {
    data () {
      return {
        deadBusinessChart: null,
        deadBusinessOptions: Object.assign({}, chartOptions.deadBusinessAnalysis),
        deadBusinessSelectValue: '请选择事业部和产品',
        deadBusinessLoading: true
      }
    },
    methods: {
      refreshChart () {
        this.deadBusinessLoading = true
        // TODO 从服务端获取数据然渲染表单
        this.$nextTick(() => {
          this.deadBusinessChart.setOption(this.deadBusinessOptions)
          window.addEventListener('resize', () => {
            this.deadBusinessChart.resize()
          })
          this.deadBusinessLoading = false
        })
      },
      initChart () {
        this.deadBusinessChart = echarts.init(this.$refs.deadBusiness)
        const _this = this
        this.$nextTick(() => {
          scrollCall({
            parentId: 'home-page'
          }, [{
            id: 'deadBusiness',
            call: () => {
              _this.refreshChart()
            }
          }])
        })
      }
    },
    mounted () {
      this.initChart()
    }
  }
</script>

<style>
</style>
