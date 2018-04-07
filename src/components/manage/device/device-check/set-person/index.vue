<template>
  <div>
    <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
    <el-tree
      class="filter-tree"
      :data="data2"
      show-checkbox
      :props="defaultProps"
      default-expand-all
      :filter-node-method="filterNode"
      ref="tree2">
    </el-tree> 
  </div>
</template>

<script>
export default {
  props: {
    step: {
      type: Number
    },
    data: {
      type: Object,
      default: () => {
        return {

        }
      }
    }
  },
  data () {
    return {
      filterText: '',
      data2: [{
        id: 1,
        label: '第一车间',
        children: [{
          id: 4,
          label: '第一工厂',
          children: [{
            id: 9,
            label: '小明'
          }, {
            id: 10,
            label: '小红'
          }]
        }]
      }, {
        id: 2,
        label: '第二车间',
        children: [{
          id: 5,
          label: '第一工厂',
          children: [{
            id: 100,
            label: '小红'
          }, {
            id: 101,
            label: '小哈哈'
          }]
        }]
      }, {
        id: 3,
        label: '第三车间',
        children: [{
          id: 7,
          label: '第一工厂',
          children: [{
            id: 102,
            label: '小兰'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },

  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    }
  },
  watch: {
    step (val) {
      if (val === 3) {
        this.$emit('dispatch', this.personListData)
      }
    },
    filterText(val) {
      this.$refs.tree2.filter(val);
    }
  }
}
</script>

<style>

</style>
