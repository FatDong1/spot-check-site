const newBusinessThisWeek = {
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
      },
      axisLabel: {
        interval: 0,
        formatter: function (value) {
          var ret = '' // 拼接加\n返回的类目项
          var maxLength = 4 // 每项显示文字个数
          var valLength = value.length // X轴类目项的文字个数
          var rowN = Math.ceil(valLength / maxLength) // 类目项需要换行的行数
          if (rowN > 1) { // 如果类目项的文字大于3,
            for (var i = 0; i < rowN; i++) {
              var temp = '' // 每次截取的字符串
              var start = i * maxLength // 开始截取的位置
              var end = start + maxLength // 结束截取的位置
              // 这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
              temp = value.substring(start, end) + '\n'
              ret += temp // 凭借最终的字符串
            }
            return ret
          } else {
            return value
          }
        }
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
      barWidth: '15%',
      data: []
    },
    {
      name: '六个月',
      type: 'bar',
      barWidth: '15%',
      data: []
    },
    {
      name: '九个月',
      type: 'bar',
      barWidth: '15%',
      data: []
    },
    {
      name: '客户备案',
      type: 'bar',
      barWidth: '15%',
      data: []
    }
  ]
}

export default newBusinessThisWeek
