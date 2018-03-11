const nodes = [{
  name: '九个月',
  value: 25,
  itemStyle: {
    normal: {
      color: '#64B6FE'
    }
  }
}, {
  name: '六个月（历时1个月）',
  value: 6,
  itemStyle: {
    normal: {
      color: '#B494F5'
    }
  }
}, {
  name: '六个月（历时2个月）',
  value: 7,
  itemStyle: {
    normal: {
      color: '#B494F5'
    }
  }
}, {
  name: '六个月（历时3个月）',
  value: 7,
  itemStyle: {
    normal: {
      color: '#B494F5'
    }
  }
}, {
  name: '六个月（原始）',
  value: 5,
  itemStyle: {
    normal: {
      color: '#B494F5'
    }
  }
}, {
  name: '三个月（历时1个月）',
  value: 6,
  itemStyle: {
    normal: {
      color: '#FCB23C'
    }
  }
}, {
  name: '三个月（历时2个月）',
  value: 7,
  itemStyle: {
    normal: {
      color: '#FCB23C'
    }
  }
}, {
  name: '三个月（历时3个月）',
  value: 7,
  itemStyle: {
    normal: {
      color: '#FCB23C'
    }
  }
}, {
  name: '三个月（原始）',
  value: 5,
  itemStyle: {
    normal: {
      color: '#FCB23C'
    }
  }
}, {
  name: '赢单',
  value: 15,
  itemStyle: {
    normal: {
      color: '#89D13B'
    }
  }
}, {
  name: '作废库',
  value: 10,
  itemStyle: {
    normal: {
      color: '#B4B9C4'
    }
  }
}]
const links = [{
  source: '九个月',
  target: '六个月（历时1个月）',
  value: 6
}, {
  source: '九个月',
  target: '六个月（历时2个月）',
  value: 7
}, {
  source: '九个月',
  target: '六个月（历时3个月）',
  value: 7
}, {
  source: '九个月',
  target: '作废库',
  value: 5
}, {
  source: '九个月',
  target: '作废库',
  value: 5
}, {
  source: '六个月（历时1个月）',
  target: '三个月（历时1个月）',
  value: 6
}, {
  source: '六个月（历时2个月）',
  target: '三个月（历时2个月）',
  value: 7
}, {
  source: '六个月（历时3个月）',
  target: '三个月（历时3个月）',
  value: 7
}, {
  source: '六个月（原始）',
  target: '赢单',
  value: 5
}, {
  source: '六个月（历时2个月）',
  target: '三个月（失活）',
  value: 3
}, {
  source: '三个月（历时1个月）',
  target: '赢单',
  value: 6
}, {
  source: '三个月（历时2个月）',
  target: '赢单',
  value: 7
}, {
  source: '三个月（历时3个月）',
  target: '赢单',
  value: 7
}, {
  source: '三个月（原始）',
  target: '赢单',
  value: 5
}]

const businessTransform = {
  // color: ['#c7c777', '#fdc163', '#b0d984', '#90cbff', '#bca4ed', '#fcb23c', '#64b6fe', '#89d13b'],
  tooltip: {
    trigger: 'item',
    triggerOn: 'mousemove'
  },
  series: [
    {
      type: 'sankey',
      layout: 'none',
      data: nodes,
      links: links,
      itemStyle: {
        normal: {
          borderWidth: 1,
          borderColor: '#aaa'
        }
      },
      lineStyle: {
        normal: {
          curveness: 0.5,
          color: 'source'
        }
      }
    }
  ]
}

export default businessTransform
