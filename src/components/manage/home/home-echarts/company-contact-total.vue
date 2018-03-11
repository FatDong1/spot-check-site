<template>
  <section class="home-section width-35 p-r-6" id="companyContractTotal">
    <div class="echart-panel echart-liquid-panel">
      <div class="echart-panel-header">
        <h4 class="title">年度营收概况</h4>
      </div>
      <div class="echart-panel-content" v-loading="companyContactLoading">
        <div class="echart-liquid" ref="companyContractTotal"></div>
        <ul class="company-contract">
          <li class="contract-item">
            <span class="contract-label">目标</span>
            <span class="contract-target">{{ companyContactAmount.goal }}</span>
            <div class="contract-background">
              <div class="contract-color-gray" :style="'width: ' + companyContractPercent.gray + '%;'"></div>
            </div>
          </li>
          <li class="contract-item">
            <span class="contract-label">已完成</span>
            <span class="contract-target">{{ companyContactAmount.complete }}</span>
            <div class="contract-background">
              <div class="contract-color-c-blue" :style="'width: ' + companyContractPercent.blue + '%;'"></div>
            </div>
          </li>
          <li class="contract-item">
            <span class="contract-label">已回款</span>
            <span class="contract-target">{{ companyContactAmount.payment }}</span>
            <div class="contract-background">
              <div class="contract-color-green" :style="'width: ' + companyContractPercent.green + '%;'"></div>
            </div>
          </li>
        </ul>
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
        companyContractTotalChart: null,
        companyContractTotalOptions: Object.assign({}, chartOptions.companyContractTotal),
        companyContractPercent: {
          gray: 100,
          blue: 70,
          green: 52
        },
        companyContactLoading: false,
        companyContactAmount: {
          goal: '￥8000万',
          complete: '￥7500万',
          payment: '￥6400万'
        }
      }
    },
    methods: {
      refreshChart () {
        if (this.companyContactLoading) {
          return false
        }
        const date = new Date()
        const fullYear = date.getFullYear()
        const beginDate = fullYear + '-01-01'
        const endDate = fullYear + '-12-31'
        this.$store.dispatch('crm-company-contact-total', {
          params: {
            beginDate: beginDate + ' 00:00:00',
            endDate: endDate + ' 23:59:59'
          },
          beforeSend: () => {
            this.companyContactLoading = true
          },
          success: (data) => {
            if (data.data && data.data.errorCode === 10010001) {
              return true
            }
          },
          complete: () => {
            this.companyContactLoading = false
          }
        }).then(data => {
          if (data.errorCode === 0) {
            this.handleData(data)
            this.companyContractTotalChart.setOption(this.companyContractTotalOptions)
            window.addEventListener('resize', () => {
              this.companyContractTotalChart.resize()
            })
          }
        })
      },
      // 处理后台数据
      handleData (data) {
        this.companyContactAmount.goal = '￥' + data.value.target / 10000 + '万'
        this.companyContactAmount.complete = '￥' + data.value.total / 10000 + '万'
        this.companyContactAmount.payment = '￥' + data.value.hasReturn / 10000 + '万'
        this.companyContractPercent.blue = data.value.total / data.value.target * 100
        this.companyContractPercent.green = data.value.hasReturn / data.value.target * 100
        let liquidData0 = (this.companyContractPercent.blue / 100).toFixed(2)
        if (this.companyContactAmount.goal === 0 || this.companyContactAmount.goal === null) {
          liquidData0 = 0
        }
        this.companyContractTotalOptions.series[0].data[0].value = liquidData0
        this.companyContractTotalOptions.series[0].data[1].value =
        liquidData0 < 1 ? liquidData0 - 0.1 : liquidData0
      },
      // 初始化图表
      initChart () {
        this.companyContractTotalChart = echarts.init(this.$refs.companyContractTotal)
        const _this = this
        this.$nextTick(() => {
          scrollCall({
            parentId: 'app-main'
          }, [{
            id: 'companyContractTotal',
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
