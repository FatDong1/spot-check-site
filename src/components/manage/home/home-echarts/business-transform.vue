<template>
  <section class="home-section width-100" id="businessTransform">
    <div class="echart-panel">
      <div class="echart-panel-header">
        <h4 class="title">商机转化图</h4>
        <el-select class="header-right" v-model="businessTransformSelectValue"></el-select>
      </div>
      <div class="echart-panel-content">
        <div class="echart-wrap width-100">
          <div class="echart-content width-100 m-l-60" ref="businessTransform"></div>
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
        businessTransformChart: null,
        businessTransformOptions: Object.assign({}, chartOptions.businessTransform),
        businessTransformSelectValue: '请选择事业部和产品',
        businessTransformLoading: true
      }
    },
    methods: {
      refreshChart () {
        this.businessTransformLoading = true
        // TODO 从服务端获取数据然渲染表单
        this.$nextTick(() => {
          this.businessTransformChart.setOption(this.businessTransformOptions)
          window.addEventListener('resize', () => {
            this.businessTransformChart.resize()
          })
          this.businessTransformLoading = false
        })
      },
      initChart () {
        this.businessTransformChart = echarts.init(this.$refs.businessTransform)
        const _this = this
        this.$nextTick(() => {
          scrollCall({
            parentId: 'home-page'
          }, [{
            id: 'businessTransform',
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
