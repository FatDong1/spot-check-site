<template>
  <el-dialog
    title="添加标准"
    :visible="isVisible"
    @close="closeEditDialog">
    <el-input
      placeholder="输入关键字进行过滤"
      v-model="filterText">
    </el-input>

    <el-tree
      class="filter-tree"
      :data="data2"
      show-checkbox
      :props="defaultProps"
      default-expand-all
      :filter-node-method="filterNode"
      ref="tree2">
    </el-tree> 
    <view-content-float>
      <div slot="right">
        <el-button @click="isVisible = false">取消</el-button> 
        <el-button type="primary" @click="isVisible = false">确定</el-button>
      </div>
    </view-content-float>
  </el-dialog>
</template>

<script>
export default {
  props: {
    isVisible: {
      type: Boolean,
      required: true
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
    closeEditDialog () {
      this.$emit('closeEditDialog')
    },

    saveStandard () {

    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    }
  },
  watch: {
      filterText(val) {
        this.$refs.tree2.filter(val);
      }
    },
}
</script>

<style>

</style>
