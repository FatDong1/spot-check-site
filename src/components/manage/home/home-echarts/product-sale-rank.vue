<template>
  <section class="home-section width-50 p-r-6" id="productSaleRank">
    <div class="echart-panel">
      <div class="echart-panel-header">
        <h4 class="title">商品销售排行</h4>
        <el-select
          class="header-right"
          placeholder="请选择事业部"
          v-model="productSaleRankSelectValue">
          <el-option
            v-for="item in businessOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
          </el-select>
      </div>
      <div class="echart-panel-content" v-loading="productSaleRankLoading">
        <div class="echart-wrap width-100">
          <div class="wrap-title">TOP 5 产品</div>
          <div class="echart-content z-index-10 width-100 height-320px m-t-_15" ref="productSaleRank"></div>
          <el-button class="product-sale-btn" type="text" @click="clickCheckAllProductBtn">查看全部产品</el-button>
        </div>
      </div>
      <el-dialog
        title="产品销售排行"
        v-if="allProductSaleDialogShow"
        :visible.sync="allProductSaleDialogShow">
        <el-select
          class="product-sale-rank-select"
          placeholder="请选择事业部"
          v-model="productSaleRankSelectValue">
          <el-option
            v-for="item in businessOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
          </el-select>
        <div class="wrap-title">全部产品</div>
        <div
          class="echart-content width-100 height-500px m-t-_25"
          ref="allProductSaleRank"
          :style="'height: ' + allProductSaleHeight + 'px;'"></div>
      </el-dialog>
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
    data () {
      return {
        productSaleRankChart: null,
        allProductSaleRankChart: null,
        productSaleRankOptions: Object.assign({}, chartOptions.productSaleRank),
        allProductSaleRankOptions: Object.assign({}, chartOptions.allProductSaleRank),
        allProductSaleDialogShow: false,
        allProductSaleHeight: 300,
        productSaleRankSelectValue: null,
        productSaleRankLoading: false,
        allProductSaleRankLoading: false,
        productSaleData: [],
        allProductSaleData: [],
        businessOptions: []
      }
    },
    methods: {
      refreshChart () {
        this.getProductSaleRank()
      },
      initChart () {
        this.productSaleRankChart = echarts.init(this.$refs.productSaleRank)
        const _this = this
        this.$nextTick(() => {
          scrollCall({
            parentId: 'app-main'
          }, [{
            id: 'productSaleRank',
            call: () => {
              _this.refreshChart()
            }
          }])
        })
      },
      getProductSaleRank () {
        if (this.productSaleRankLoading) {
          return false
        }
        let routes = this.$route.query
        this.$store.dispatch('crm-product-sale-rank', {
          params: {
            departmentId: this.productSaleRankSelectValue,
            beginDate: routes.beginDate ? routes.beginDate + ' 00:00:00' : '',
            endDate: routes.endDate ? routes.endDate + ' 23:59:59' : ''
          },
          beforeSend: () => {
            this.productSaleRankLoading = true
          },
          success: (data) => {
            if (data.data && data.data.errorCode === 10010001) {
              return true
            }
          },
          complete: () => {
            this.productSaleRankLoading = false
          }
        }).then(data => {
          if (data.errorCode === 0) {
            this.handleData(data)
            this.productSaleRankChart.setOption(this.productSaleRankOptions)
            window.addEventListener('resize', () => {
              this.productSaleRankChart.resize()
            })
          }
        })
      },
      handleData (data) {
        this.productSaleRankOptions.yAxis[0].data = []
        this.productSaleRankOptions.series[0].data = []
        this.productSaleRankOptions.series[1].data = []
        this.allProductSaleRankOptions.yAxis[0].data = []
        this.allProductSaleRankOptions.series[0].data = []
        this.allProductSaleRankOptions.series[1].data = []

        let _this = this
        this.productSaleData = data.value.slice(0, 5)
        this.allProductSaleData = data.value.slice(0)
        this.productSaleData.forEach(function (item) {
          item.amount = item.amount / 10000
          _this.productSaleRankOptions.yAxis[0].data.push(item.name)
          _this.productSaleRankOptions.series[0].data.push(item.unit)
          _this.productSaleRankOptions.series[1].data.push(item.amount)
        })
        this.allProductSaleData.forEach(function (item) {
          _this.allProductSaleRankOptions.yAxis[0].data.push(item.name)
          _this.allProductSaleRankOptions.series[0].data.push(item.unit)
          _this.allProductSaleRankOptions.series[1].data.push(item.amount)
        })
      },
      clickCheckAllProductBtn () {
        // 因为echarts的初始化要固定高和宽，而所有产品的数量不固定，所以要根据产品数量计算echarts的高度
        const productAmount = this.allProductSaleData.length
        this.allProductSaleHeight = productAmount * 80 + 80
        this.allProductSaleDialogShow = true
        let _this = this
        this.$nextTick(function () {
          _this.allProductSaleRankChart = echarts.init(this.$refs.allProductSaleRank)
          _this.allProductSaleRankChart.setOption(this.allProductSaleRankOptions)
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
        this.productSaleRankSelectValue = this.businessOptions[0].value
      }
    },
    mounted () {
      this.initChart()
    }
  }
</script>

<style>
</style>
