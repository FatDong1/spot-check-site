<template>
  <section class="home-section width-50 p-l-6" id="dealPrice">
    <div class="echart-panel">
      <div class="echart-panel-header">
        <h4 class="title">成交价统计</h4>
        <el-cascader
          class="header-right"
          v-model="dealPriceSelectValue"
          placeholder="请选择事业部和产品"
          :options="businessAndProductOptions"
          @change="handleChange"
        ></el-cascader>
      </div>
      <div class="echart-panel-content" v-loading="dealPriceLoading">
        <div class="echart-wrap width-100">
          <div class="wrap-title">{{ dealPriceBusiness }}-{{ dealPriceProduct }}成交价统计</div>
          <div class="echart-content width-100" ref="dealPrice"></div>
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
        dealPriceChart: null,
        dealPriceOptions: Object.assign({}, chartOptions.dealPrice),
        dealPriceSelectValue: [],
        dealPriceLoading: false,
        dealPriceBusiness: '',
        dealPriceProduct: '',
        businessAndProductOptions: []
      }
    },
    methods: {
      refreshChart () {
        if (this.dealPriceLoading) {
          return false
        }
        let routes = this.$route.query
        this.$store.dispatch('crm-deal-price', {
          params: {
            productId: this.dealPriceSelectValue[1],
            beginDate: routes.beginDate ? routes.beginDate + ' 00:00:00' : '',
            endDate: routes.endDate ? routes.endDate + ' 23:59:59' : ''
          }
        }).then(data => {
          this.handleData(data)
          this.dealPriceChart.setOption(this.dealPriceOptions)
          window.addEventListener('resize', () => {
            this.dealPriceChart.resize()
          })
        })
      },
      handleData (data) {
        this.dealPriceOptions.xAxis.data = []
        this.dealPriceOptions.series[0].data = []
        data.value.forEach(item => {
          let month = item.month.split('-')[1] + '月'
          let amount = item.amount / 10000
          this.dealPriceOptions.xAxis.data.push(month)
          this.dealPriceOptions.series[0].data.push(amount)
        })
      },
      initChart () {
        this.dealPriceChart = echarts.init(this.$refs.dealPrice)
        const _this = this
        this.$nextTick(() => {
          scrollCall({
            parentId: 'app-main'
          }, [{
            id: 'dealPrice',
            call: () => {
              _this.refreshChart()
            }
          }])
        })
      },
      handleChange (value) {
        this.dealPriceSelectValue = value
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
        this.dealPriceSelectValue.push(this.businessAndProductOptions[0].value)
        this.dealPriceSelectValue.push(this.businessAndProductOptions[0].children[0].value)
        this.dealPriceBusiness = this.businessAndProductOptions[0].label
        this.dealPriceProduct = this.businessAndProductOptions[0].children[0].label
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
