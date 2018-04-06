<template>
  <view-container>
    <view-header>公司组织架构</view-header>
    <el-tree
      :data="companyData"
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
      style="width: 50%">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button
            type="text"
            size="mini"
            @click="() => append(data)">
            添加
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => remove(node, data)">
            删除
          </el-button>
        </span>
      </span>
    </el-tree>
  </view-container>
</template>

<script>
export default {
  data () {
    return {
       companyData: [{
        id: 1,
        label: '第一工厂',
        children: [{
          id: 4,
          label: '第一车间',
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
        label: '第二工厂',
        children: [{
          id: 5,
          label: '第一车间'
        }, {
          id: 6,
          label: '第二车间'
        }]
      }, {
        id: 3,
        label: '第三工厂',
        children: [{
          id: 7,
          label: '第一车间'
        }, {
          id: 8,
          label: '第二车间'
        }]
      }]
    }
  },
  methods: {
    append(data) {
      const newChild = { id: id++, label: 'testtest', children: [] };
      if (!data.children) {
        this.$set(data, 'children', []);
      }
      data.children.push(newChild);
    },

    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    }
  }
}
</script>

<style>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>
