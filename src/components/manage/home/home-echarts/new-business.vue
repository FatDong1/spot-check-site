<template>
  <section class="home-section width-100" id="newBusiness">
    <div class="echart-panel">
      <div class="echart-panel-header">
        <h4 class="title">新增商机</h4>
      </div>
      <div class="echart-panel-content">
        <div class="echart-wrap width-60" v-loading="newBusinessByTimeLoading">
          <div class="wrap-title">销售部新增商机</div>
          <div class="echart-content width-100" ref="newBusinessThisWeek"></div>
        </div>
        <div class="echart-wrap width-40" v-loading="newBusinessByBusinessLoading">
          <div class="wrap-title">事业部新增商机</div>
          <div class="echart-content width-100" ref="newBusinessSpread"></div>
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
        newBusinessThisWeekChart: null,
        newBusinessSpreadChart: null,
        newBusinessThisWeekOptions: Object.assign({}, chartOptions.newBusinessThisWeek),
        newBusinessSpreadOptions: Object.assign({}, chartOptions.newBusinessSpread),
        newBusinessByTimeLoading: false,
        newBusinessByBusinessLoading: false,
        newBusinessDateType: '本周'
      }
    },
    methods: {
      refreshChart () {
        this.getNewBusinessByTime()
        this.getNewBusinessByBusiness()
      },
      getNewBusinessByTime () {
        if (this.newBusinessByTimeLoading) {
          return false
        }
        let routes = this.$route.query
        this.$store.dispatch('crm-new-business-by-time', {
          params: {
            beginDate: routes.beginDate ? routes.beginDate + ' 00:00:00' : '',
            endDate: routes.endDate ? routes.endDate + ' 23:59:59' : ''
          },
          beforeSend: () => {
            this.newBusinessByTimeLoading = true
          },
          success: (data) => {
            if (data.data && data.data.errorCode === 10010001) {
              return true
            }
          },
          complete: () => {
            this.newBusinessByTimeLoading = false
          }
        }).then(data => {
          if (data.errorCode === 0) {
            this.handleBusinessByTimeData(data)
          }
        })
      },
      getNewBusinessByBusiness () {
        if (this.newBusinessByBusinessLoading) {
          return false
        }
        let routes = this.$route.query
        this.$store.dispatch('crm-new-business-by-business', {
          params: {
            beginDate: routes.beginDate ? routes.beginDate + ' 00:00:00' : '',
            endDate: routes.endDate ? routes.endDate + ' 23:59:59' : ''
          },
          beforeSend: () => {
            this.newBusinessByBusinessLoading = true
          },
          success: (data) => {
            if (data.data && data.data.errorCode === 10010001) {
              return true
            }
          },
          complete: () => {
            this.newBusinessByBusinessLoading = false
          }
        }).then(data => {
          if (data.errorCode === 0) {
            this.handleNewBusinessByBusinessData(data)
            this.newBusinessThisWeekChart.setOption(this.newBusinessThisWeekOptions)
            this.newBusinessSpreadChart.setOption(this.newBusinessSpreadOptions)
            window.addEventListener('resize', () => {
              this.newBusinessThisWeekChart.resize()
              this.newBusinessSpreadChart.resize()
            })
          }
        })
      },
      handleBusinessByTimeData (data) {
        this.newBusinessThisWeekOptions.xAxis[0].data = []
        this.newBusinessThisWeekOptions.series[0].data = []
        this.newBusinessThisWeekOptions.series[1].data = []
        this.newBusinessThisWeekOptions.series[2].data = []
        this.newBusinessThisWeekOptions.series[3].data = []
        let _this = this
        for (var key in data.value) {
          data.value[key].forEach(function (item, index) {
            if (item.businessLevel === '3个月内成单') {
              _this.newBusinessThisWeekOptions.series[0].data.push(item.number)
            } else if (item.businessLevel === '6个月内成单') {
              _this.newBusinessThisWeekOptions.series[1].data.push(item.number)
            } else if (item.businessLevel === '9个月内成单') {
              _this.newBusinessThisWeekOptions.series[2].data.push(item.number)
            } else if (item.businessLevel === '客户备案') {
              _this.newBusinessThisWeekOptions.series[3].data.push(item.number)
            }
          })
          _this.newBusinessThisWeekOptions.xAxis[0].data.push(key)
        }
      },
      handleNewBusinessByBusinessData (data) {
        this.newBusinessSpreadOptions.xAxis[0].data = []
        this.newBusinessSpreadOptions.series[0].data = []
        this.newBusinessSpreadOptions.series[1].data = []
        this.newBusinessSpreadOptions.series[2].data = []
        this.newBusinessSpreadOptions.series[3].data = []
        let _this = this
        for (var key in data.value) {
          data.value[key].forEach(function (item, index) {
            if (item.businessLevel === '3个月内成单') {
              _this.newBusinessSpreadOptions.series[0].data.push(item.number)
            } else if (item.businessLevel === '6个月内成单') {
              _this.newBusinessSpreadOptions.series[1].data.push(item.number)
            } else if (item.businessLevel === '9个月内成单') {
              _this.newBusinessSpreadOptions.series[2].data.push(item.number)
            } else if (item.businessLevel === '客户备案') {
              _this.newBusinessSpreadOptions.series[3].data.push(item.number)
            }
          })
          _this.newBusinessSpreadOptions.xAxis[0].data.push(key)
        }
      },
      initChart () {
        this.newBusinessThisWeekChart = echarts.init(this.$refs.newBusinessThisWeek)
        this.newBusinessSpreadChart = echarts.init(this.$refs.newBusinessSpread)
        const _this = this
        this.$nextTick(() => {
          scrollCall({
            parentId: 'app-main'
          }, [{
            id: 'newBusiness',
            call: () => {
              _this.refreshChart()
            }
          }])
        })
      },
      // 处理时间显示变化
      handleDateType () {
        let dateType = this.$route.query.dateType
        switch (dateType) {
          case 'annual':
            this.newBusinessDateType = '全年新增'
            break
          case 'halfYear':
            this.newBusinessDateType = '半年新增'
            break
          case 'quarter':
            this.newBusinessDateType = '季度新增'
            break
          case 'month':
            this.newBusinessDateType = '月新增'
            break
        }
      }
    },
    mounted () {
      this.handleDateType()
      this.initChart()
    },
    watch: {
      '$route.query' () {
        this.handleDateType()
        this.refreshChart()
      }
    }
  }
</script>

<style>
</style>
