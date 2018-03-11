const dealRate = {
  color: ['#89d13b', '#3da5fe'],
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      crossStyle: {
        color: '#999'
      }
    }
  },
  toolbox: {
    feature: {
      dataView: {
        show: true,
        readOnly: false
      },
      magicType: {
        show: true,
        type: ['line', 'bar']
      },
      restore: {
        show: true
      },
      saveAsImage: {
        show: true
      }
    }
  },
  legend: {
    data: ['成单量', '成单率']
  },
  xAxis: [
    {
      type: 'category',
      data: [],
      axisPointer: {
        type: 'shadow'
      },
      axisTick: {
        show: false
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
      name: '（单）',
      interval: 3,
      axisTick: {
        show: false
      },
      splitLine: {
        lineStyle: {
          color: '#ebebeb'
        }
      },
      axisLabel: {
        formatter: '{value}'
      }
    },
    {
      type: 'value',
      name: '百分比',
      min: 0,
      max: 100,
      interval: 20,
      axisTick: {
        show: false
      },
      splitLine: {
        lineStyle: {
          color: '#ebebeb'
        }
      },
      axisLabel: {
        formatter: '{value}%'
      }
    }
  ],
  series: [
    {
      name: '成单量',
      type: 'bar',
      barWidth: '40%',
      data: []
    },
    {
      name: '成单率',
      type: 'line',
      yAxisIndex: 1,
      data: []
    }
  ]
}

export default dealRate
