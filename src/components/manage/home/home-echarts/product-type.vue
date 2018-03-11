<template>
  <section class="home-section width-50 p-l-6" id="productType">
    <div class="echart-panel">
      <div class="echart-panel-header">
        <h4 class="title">商品类型统计</h4>
        <el-select
          class="header-right"
          placeholder="请选择事业部"
          v-model="productTypeSelectValue">
          <el-option
            v-for="item in businessOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
          </el-select>
      </div>
      <div class="echart-panel-content" v-loading="productTypeLoading">
        <div class="echart-wrap width-100">
          <div class="wrap-title">{{ productTypeBusiness }}商品类型统计</div>
          <div class="echart-content width-100" ref="productType"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import echarts from 'echarts/lib/echarts'
  import chartOptions from 'shared@/echart/'
  import { scrollCall } from 'mx-ui'
  import { getLibraryFieldParadic } from 'shared@/config/field-configuration'
  export default {
    props: {
      options: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    data () {
      return {
        productTypeChart: null,
        productTypeOptions: Object.assign({}, chartOptions.productType),
        productTypeSelectValue: null,
        productTypeLoading: false,
        productTypeBusiness: '数据云事业部',
        businessOptions: []
      }
    },
    methods: {
      refreshChart () {
        if (this.productTypeLoading) {
          return false
        }
        let routes = this.$route.query
        this.$store.dispatch('crm-product-type', {
          params: {
            departmentId: this.businessOptions[0].value,
            beginDate: routes.beginDate ? routes.beginDate + ' 00:00:00' : '',
            endDate: routes.endDate ? routes.endDate + ' 23:59:59' : ''
          },
          beforeSend: () => {
            this.productTypeLoading = true
          },
          success: (data) => {
            if (data.data && data.data.errorCode === 10010001) {
              return true
            }
          },
          complete: () => {
            this.productTypeLoading = false
          }
        }).then(data => {
          this.handleData(data)
          this.productTypeChart.setOption(this.productTypeOptions)
          window.addEventListener('resize', () => {
            this.productTypeChart.resize()
          })
        })
      },
      handleData (data) {
        this.productTypeOptions.series[0].data = []
        this.productTypeOptions.legend.data = []
        let _this = this
        data.value.forEach(item => {
          let tempObj = {
            value: item.amount,
            name: getLibraryFieldParadic('type', item.type)
          }
          _this.productTypeOptions.legend.data.push(tempObj.name)
          _this.productTypeOptions.series[0].data.push(tempObj)
        })
      },
      initChart () {
        this.productTypeChart = echarts.init(this.$refs.productType)
        const _this = this
        this.$nextTick(() => {
          scrollCall({
            parentId: 'app-main'
          }, [{
            id: 'productType',
            call: () => {
              _this.refreshChart()
            }
          }])
        })
      }
    },
    watch: {
      options () {
        this.businessOptions = this.options.map(item => {
          return {
            label: item.name,
            value: item.id
          }
        })
        this.productTypeSelectValue = this.businessOptions[0].value
      }
    },
    mounted () {
      this.initChart()
    }
  }
</script>

<style>
</style>
