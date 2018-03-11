<template>
  <section class="home-section width-50 p-r-6" id="dealRate">
    <div class="echart-panel">
      <div class="echart-panel-header">
        <h4 class="title">成单率统计</h4>
        <el-cascader
          class="header-right"
          v-model="dealRateSelectValue"
          placeholder="请选择事业部和产品"
          :options="businessAndProductOptions"
          @change="handleChange"
        ></el-cascader>
      </div>
      <div class="echart-panel-content" v-loading="dealRateLoading">
        <div class="echart-wrap width-100">
          <div class="wrap-title">产品成单率统计</div>
          <div class="echart-content width-100" ref="dealRate"></div>
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
    props: {
      options: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    model: {
      prop: 'value',
      event: 'change'
    },
    data () {
      return {
        dealRateChart: null,
        dealRateOptions: Object.assign({}, chartOptions.dealRate),
        dealRateSelectValue: [],
        dealRateLoading: false,
        businessAndProductOptions: []
      }
    },
    methods: {
      refreshChart () {
        if (this.dealRateLoading) {
          return false
        }
        let routes = this.$route.query
        this.$store.dispatch('crm-deal-rate', {
          params: {
            productId: this.dealRateSelectValue[1],
            beginDate: routes.beginDate ? routes.beginDate + ' 00:00:00' : '',
            endDate: routes.endDate ? routes.endDate + ' 23:59:59' : ''
          },
          beforeSend: () => {
            this.dealRateLoading = true
          },
          success: (data) => {
            if (data.data && data.data.errorCode === 10010001) {
              return true
            }
          },
          complete: () => {
            this.dealRateLoading = false
          }
        }).then(data => {
          if (data.errorCode === 0) {
            this.handleData(data)
            this.dealRateChart.setOption(this.dealRateOptions)
            window.addEventListener('resize', () => {
              this.dealRateChart.resize()
            })
          }
        })
      },
      handleData (data) {
        this.dealRateOptions.xAxis[0].data = []
        this.dealRateOptions.series[0].data = []
        this.dealRateOptions.series[1].data = []
        let _this = this
        data.value.forEach(function (item) {
          let monthArray = item.month.split('-')
          _this.dealRateOptions.xAxis[0].data.push(monthArray[1] + '月')
          _this.dealRateOptions.series[0].data.push(item.num)
          _this.dealRateOptions.series[1].data.push(item.rate)
        })
      },
      initChart () {
        this.dealRateChart = echarts.init(this.$refs.dealRate)
        const _this = this
        this.$nextTick(() => {
          scrollCall({
            parentId: 'app-main'
          }, [{
            id: 'dealRate',
            call: () => {
              _this.refreshChart()
            }
          }])
        })
      },
      handleChange (value) {
        this.dealRateSelectValue = value
        this.refreshChart()
      },
      initProductOptions () {
        this.businessAndProductOptions = this.options.map(item => {
          let children = []
          item.products.forEach(product => {
            children.push({
              label: product.name,
              value: product.id
            })
          })
          return {
            label: item.name,
            value: item.id,
            children: children
          }
        })
        this.dealRateSelectValue.push(this.businessAndProductOptions[0].value)
        this.dealRateSelectValue.push(this.businessAndProductOptions[0].children[0].value)
      }
    },
    watch: {
      options () {
        this.initProductOptions()
      }
    },
    mounted () {
      this.initChart()
    }
  }
</script>

<style>
</style>
