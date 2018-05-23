<template>
  <div class="home-container">
    <el-row :gutter="5">
      <el-col :span="6">
        <all-work :percent="percent"></all-work>
      </el-col>
      <el-col :span="14">
        <work-question></work-question>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="second-row">
      <el-col :span="20">
        <!-- <all-factory></all-factory> -->
      </el-col>
    </el-row>
  </div>
</template>

<script>
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/funnel'
import 'echarts/lib/chart/sankey'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/tooltip'
import 'echarts-liquidfill'
import AllWork from '../echart-panel/all-work/index.vue'
import WorkQuestion from '../echart-panel/work-question/index.vue'
import AllFactory from '../echart-panel/all-factory/index.vue'
export default {
  components: {
    AllWork,
    WorkQuestion,
    AllFactory
  },
  data () {
    return {
      percent: 1
    }
  },
  methods: {
    fetchPercent () {
      let user = JSON.parse(sessionStorage.getItem('user'))
      this.$http({
        method: 'get',
        url: '/api/work/today',
        params: {
          checkerId: user.id
        }
      }).then((result) => {
        let total = result.value.length
        let finish = 0
        result.value.forEach((element) => {
          if (element.state === 1) {
            finish = finish + 1
          }
        })
        if (total) {
          this.percent = (finish / total).toFixed(2) - 0
        } else {
          this.percent = 1
        }
      })
    }
  },
  created () {
    console.log(23333)
    this.fetchPercent()
  }
}
</script>


<style>
.home-container {
  vertical-align: middle;
  padding: 0 20px;
}
.second-row {
  margin-top: 20px;
}
</style>
