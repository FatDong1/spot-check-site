<template>
  <section class="home-section width-65 p-l-6" id="contractTotal">
    <div class="echart-panel">
      <div class="echart-panel-header">
        <h4 class="title">签约合同</h4>
      </div>
      <div class="echart-panel-content" v-loading="contactLoading">
        <div class="echart-label-box">
          <el-radio v-model="contractSelectRadio" label="1" @change="handleRadioChange">销售区域签约合同金额</el-radio>
          <el-radio v-model="contractSelectRadio" label="2" @change="handleRadioChange">事业部签约合同金额</el-radio>
          <el-radio v-model="contractSelectRadio" label="3" @change="handleRadioChange">事业部回款金额</el-radio>
        </div>
        <div class="echart-content width-100" ref="contractTotal"></div>
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
        contractTotalChart: null,
        contractTotalOptions: Object.assign({}, chartOptions.contractTotal),
        contactLoading: false,
        contactFirstFlag: false,
        contactSecondFlag: false,
        contractSelectRadio: '1',
        contractYearBeginDate: '',
        contractYearEndDate: '',
        contractDateType: ''
      }
    },
    methods: {
      refreshChart () {
        this.getDataFirst()
        this.getDataSecond()
      },
      // // 第一次请求后台数据
      getDataFirst () {
        if (this.contactFirstFlag) {
          return false
        }
        let url = ''
        if (this.contractSelectRadio === '1') {
          url = 'crm-contact-region-total'
        } else if (this.contractSelectRadio === '2') {
          url = 'crm-contact-business-total'
        } else {
          url = 'crm-contact-business-return-total'
        }
        let routes = this.$route.query
        this.$store.dispatch(url, {
          params: {
            beginDate: routes.beginDate ? routes.beginDate + ' 00:00:00' : '',
            endDate: routes.endDate ? routes.endDate + ' 23:59:59' : ''
          },
          beforeSend: () => {
            this.contactLoading = true
            this.contactFirstFlag = true
          },
          success: (data) => {
            if (data.data && data.data.errorCode === 10010001) {
              return true
            }
          },
          complete: () => {
            this.contactFirstFlag = false
          }
        }).then(data => {
          if (data.errorCode === 0) {
            this.handleFirstData(data)
            this.contractTotalChart.setOption(this.contractTotalOptions)
            window.addEventListener('resize', () => {
              this.contractTotalChart.resize()
            })
          }
        })
      },
      // 第二次请求后台数据
      getDataSecond () {
        if (this.contactSecondFlag) {
          return false
        }
        let url = ''
        if (this.contractSelectRadio === '1') {
          url = 'crm-contact-region-total'
        } else if (this.contractSelectRadio === '2') {
          url = 'crm-contact-business-total'
        } else {
          url = 'crm-contact-business-return-total'
        }
        this.$store.dispatch(url, {
          params: {
            beginDate: this.contractYearBeginDate + ' 00:00:00',
            endDate: this.contractYearEndDate + ' 23:59:59'
          },
          beforeSend: () => {
            this.contactSecondFlag = true
            const _this = this
            window.setTimeout(function () {
              _this.contactLoading = false
            }, 60)
          },
          success: (data) => {
            if (data.data && data.data.errorCode === 10010001) {
              return true
            }
          },
          complete: () => {
            this.contactSecondFlag = false
          }
        }).then(data => {
          if (data.errorCode === 0) {
            this.handleSecondData(data)
            this.contractTotalChart.setOption(this.contractTotalOptions)
            window.addEventListener('resize', () => {
              this.contractTotalChart.resize()
            })
          }
        })
      },
      // 处理第一次请求的后台数据
      handleFirstData (data) {
        this.contractTotalOptions.xAxis[0].data = []
        this.contractTotalOptions.series[0].data = []
        let _this = this
        data.value.forEach(function (item) {
          item.title = item.title ? item.title : '未知部门'
          item.amount = item.amount ? item.amount / 10000 : 0
          _this.contractTotalOptions.xAxis[0].data.push(item.title)
          _this.contractTotalOptions.series[0].data.push(item.amount)
        })
        this.contractTotalOptions.legend.data[0] = this.contractDateType
        this.contractTotalOptions.series[0].name = this.contractDateType
      },
      // 处理第二次请求的后台数据
      handleSecondData (data) {
        this.contractTotalOptions.series[1].data = []
        let _this = this
        data.value.forEach(function (item) {
          item.amount = item.amount ? item.amount / 10000 : 0
          _this.contractTotalOptions.series[1].data.push(item.amount)
        })
      },
      // 初始化图表
      initChart () {
        this.contractTotalChart = echarts.init(this.$refs.contractTotal)
        const _this = this
        this.$nextTick(() => {
          scrollCall({
            parentId: 'app-main'
          }, [{
            id: 'contractTotal',
            call: () => {
              _this.refreshChart()
            }
          }])
        })
      },
      // 处理单选框变化
      handleRadioChange (value) {
        this.refreshChart()
      },
      // 处理年份变化
      handleYear () {
        let data = this.$route.query
        this.contractYearBeginDate = data.beginDate ? data.beginDate.substr(0, 5) + '01-01' : ''
        this.contractYearEndDate = data.endDate ? data.endDate.substr(0, 5) + '12-31' : ''
      },
      // 处理时间显示变化
      handleDateType () {
        let dateType = this.$route.query.dateType
        switch (dateType) {
          case 'annual':
            this.contractDateType = '全年新增'
            break
          case 'halfYear':
            this.contractDateType = '半年新增'
            break
          case 'quarter':
            this.contractDateType = '季度新增'
            break
          case 'month':
            this.contractDateType = '月新增'
            break
        }
      }
    },
    mounted () {
      this.handleDateType()
      this.handleYear()
      this.initChart()
    },
    watch: {
      '$route.query' () {
        this.handleDateType()
        this.handleYear()
        this.refreshChart()
      }
    }
  }
</script>

<style>
</style>
