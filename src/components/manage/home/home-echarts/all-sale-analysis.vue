<template>
  <section class="home-section width-50 p-r-6" id="allSaleAnalysis">
    <div class="echart-panel">
      <div class="echart-panel-header">
        <h4 class="title">销售漏斗分析</h4>
        <el-cascader
          class="header-right"
          v-model="allSaleAnalysisSelectValue"
          placeholder="请选择事业部和产品"
          :options="businessAndProductOptions"
          @change="handleChange"
        ></el-cascader>
      </div>
      <div class="echart-panel-content" v-loading="allSaleAnalysisLoading">
        <div class="echart-wrap width-100">
          <div class="wrap-title">全部产品销售漏斗分析</div>
          <div class="echart-content width-50 m-l-_40 fl" ref="allSaleAnalysis"></div>
          <dl class="all-sale-data-table width-50">
            <dt class="title">
              <span class="col1">阶段</span>
              <span class="col2">销售单量</span>
              <span class="col3">预计销售金额</span>
            </dt>
            <dd class="row" v-for="item in allSaleTableListData" :key="item.state">
              <span class="col1">{{ item.state }}</span>
              <span class="col2">{{ item.unit }}单</span>
              <span class="col3"> {{ item.amount }}万</span>
            </dd>
          </dl>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import echarts from 'echarts/lib/echarts'
  import chartOptions from 'shared@/echart/'
  import { scrollCall } from 'mx-ui'
  import { getBusinessFieldParadic } from 'shared@/config/field-configuration'
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
        allSaleAnalysisChart: null,
        allSaleAnalysisOptions: Object.assign({}, chartOptions.allSaleAnalysis),
        allSaleAnalysisSelectValue: [],
        allSaleAnalysisLoading: false,
        businessAndProductOptions: [],
        allSaleTableListData: []
      }
    },
    methods: {
      refreshChart () {
        let routes = this.$route.query
        this.$store.dispatch('crm-all-sale-funnel', {
          params: {
            productId: this.allSaleAnalysisSelectValue[1],
            beginDate: routes.beginDate ? routes.beginDate + ' 00:00:00' : '',
            endDate: routes.endDate ? routes.endDate + ' 23:59:59' : ''
          }
        }).then(data => {
          this.handleData(data)
          this.allSaleAnalysisChart.setOption(this.allSaleAnalysisOptions)
          window.addEventListener('resize', () => {
            this.allSaleAnalysisChart.resize()
          })
        })
      },
      handleData (data) {
        this.allSaleAnalysisOptions.series[0].data = []
        let _this = this
        data.value.forEach(item => {
          let tempObj = {
            value: item.amount,
            name: getBusinessFieldParadic('state', item.state)
          }
          this.allSaleTableListData.push({
            state: getBusinessFieldParadic('state', item.state),
            unit: item.unit,
            amount: item.amount ? item.amount / 10000 : 0
          })
          _this.allSaleAnalysisOptions.series[0].data.push(tempObj)
        })
      },
      initChart () {
        this.allSaleAnalysisChart = echarts.init(this.$refs.allSaleAnalysis)
        const _this = this
        this.$nextTick(() => {
          scrollCall({
            parentId: 'app-main'
          }, [{
            id: 'allSaleAnalysis',
            call: () => {
              _this.refreshChart()
            }
          }])
        })
      },
      handleChange (value) {
        this.allSaleAnalysisSelectValue = value
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
        this.allSaleAnalysisSelectValue.push(this.businessAndProductOptions[0].value)
        this.allSaleAnalysisSelectValue.push(this.businessAndProductOptions[0].children[0].value)
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
