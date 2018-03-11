const productType = {
  color: ['#64b6fe', '#89d13b', '#fcb23c', '#fd6f70', '#b494f5', '#b0d984'],
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    x: 'left',
    data: []
  },
  series: [
    {
      name: '访问来源',
      type: 'pie',
      radius: ['30%', '70%'],
      avoidLabelOverlap: false,
      label: {
        normal: {
          show: false,
          position: 'center'
        },
        emphasis: {
          show: true,
          textStyle: {
            fontSize: '30',
            fontWeight: 'bold'
          }
        }
      },
      labelLine: {
        normal: {
          show: false
        }
      },
      data: []
    }
  ]
}

export default productType
