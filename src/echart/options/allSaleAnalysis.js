const allSaleAnalysis = {
  color: ['#c7c777', '#fdc163', '#90cbff', '#b0d984', '#bca4ed', '#fcb23c', '#64b6fe', '#89d13b'],
  title: {
    text: '漏斗图',
    subtext: '纯属虚构'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c}%'
  },
  toolbox: {
    feature: {
      dataView: {readOnly: false},
      restore: {},
      saveAsImage: {}
    }
  },
  calculable: true,
  series: [
    {
      name: '漏斗图',
      type: 'funnel',
      left: '10%',
      top: 20,
      // x2: 80,
      bottom: 60,
      width: '80%',
      height: 220,
      min: 0,
      max: 100,
      minSize: '0%',
      maxSize: '100%',
      sort: 'descending',
      gap: 0,
      label: {
        normal: {
          show: true,
          position: 'inside'
        },
        emphasis: {
          textStyle: {
            fontSize: 20
          }
        }
      },
      labelLine: {
        normal: {
          length: 10,
          lineStyle: {
            width: 1,
            type: 'solid'
          }
        }
      },
      itemStyle: {
        normal: {
          borderColor: '#fff',
          borderWidth: 1
        }
      },
      data: []
    }
  ]
}

export default allSaleAnalysis
