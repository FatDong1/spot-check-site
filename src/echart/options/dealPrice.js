const dealPrice = {
  color: ['#3da5fe'],
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['成交价']
  },
  toolbox: {
    show: true,
    feature: {
      dataZoom: {
        yAxisIndex: 'none'
      },
      dataView: {
        readOnly: false
      },
      magicType: {
        type: ['line', 'bar']
      },
      restore: {},
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    axisTick: {
      show: false
    },
    data: []
  },
  yAxis: {
    type: 'value',
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
  series: [
    {
      name: '成交价',
      type: 'line',
      data: [],
      markPoint: {
        data: [
          {type: 'max', name: '最大值'},
          {type: 'min', name: '最小值'}
        ]
      },
      markLine: {
        data: [
          {type: 'average', name: '平均值'}
        ]
      }
    }
  ]
}

export default dealPrice
