const newBusinessSpread = {
  color: ['#89d13b', '#fcb23c', '#64b6fe', '#c7c7cc'],
  tooltip: {
    trigger: 'axis',
    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
      type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  legend: {
    data: ['三个月', '六个月', '九个月', '客户备案']
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
      data: [],
      axisTick: {
        show: false,
        alignWithLabel: true
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
      name: '个',
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
      name: '三个月',
      type: 'bar',
      stack: '总量',
      barWidth: '45%',
      data: []
    },
    {
      name: '六个月',
      type: 'bar',
      stack: '总量',
      barWidth: '45%',
      data: []
    },
    {
      name: '九个月',
      type: 'bar',
      stack: '总量',
      barWidth: '45%',
      data: []
    },
    {
      name: '客户备案',
      type: 'bar',
      stack: '总量',
      barWidth: '45%',
      data: []
    }
  ]
}

export default newBusinessSpread
