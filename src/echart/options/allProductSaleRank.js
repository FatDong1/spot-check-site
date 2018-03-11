const allProductSaleRank = {
  color: ['#89d13b', '#64b6fe'],
  tooltip: {
    trigger: 'axis',
    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
      type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  legend: {
    top: '20px',
    data: ['销售数量', '销售金额']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  yAxis: [
    {
      type: 'category',
      data: [],
      axisLine: {
        show: false
      },
      axisTick: {
        show: false,
        alignWithLabel: true
      }
    }
  ],
  xAxis: [
    {
      type: 'value',
      show: false,
      boundaryGap: [0, 0.03]
    }
  ],
  series: [
    {
      name: '销售数量',
      type: 'bar',
      label: {
        normal: {
          show: true,
          position: 'right',
          formatter: '{c}套'
        }
      },
      barWidth: '35%',
      data: []
    },
    {
      name: '销售金额',
      type: 'bar',
      label: {
        normal: {
          show: true,
          position: 'right',
          formatter: '{c}万'
        }
      },
      barWidth: '35%',
      data: []
    }
  ]
}

export default allProductSaleRank
