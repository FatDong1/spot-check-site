const deadBusinessAnalysis = {
  color: ['#89d13b', '#64b6fe'],
  tooltip: {
    trigger: 'axis',
    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
      type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  legend: {
    data: ['本月', '今年累计']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      data: ['3个月', '6个月', '9个月'],
      axisTick: {
        show: false,
        alignWithLabel: true
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
      name: '万',
      axisTick: {
        show: false
      },
      splitLine: {
        lineStyle: {
          color: '#ebebeb'
        }
      },
      boundaryGap: [0, 0.01]
    }
  ],
  series: [
    {
      name: '本月',
      type: 'bar',
      barWidth: '20%',
      data: [70, 82, 100]
    },
    {
      name: '今年累计',
      type: 'bar',
      barWidth: '20%',
      data: [90, 62, 110]
    }
  ]
}

export default deadBusinessAnalysis
