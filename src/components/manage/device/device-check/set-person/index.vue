<template>
  <div>
    <el-input style="margin-bottom: 10px" placeholder="输入用户名进行过滤" v-model="filterText" @keyup.enter.native="test"></el-input>
    <el-tree
      class="filter-tree"
      node-key="id"
      :data="companyPerson"
      show-checkbox
      highlight-current
      default-expand-all
      :filter-node-method="filterNode"
      ref="personDom">
    </el-tree> 
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    send: {
      type: Number
    },
    data: {
      type: Array
    }
  },
  data () {
    return {
      filterText: '',
    }
  },
  computed: {
    ...mapState('company-data', [
      'companyPerson'
    ])
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    test () {
      console.log(this.$refs.personDom.getCheckedKeys());
      console.log(this.$refs.personDom.getCheckedNodes())
    }
  },
  watch: {
    send (curVal, oldVal) {
      let arr = this.$refs.personDom.getCheckedNodes()
      let result = []
      arr.forEach(function (element) {
        if (!element.children) {
          result.push(element.id)
        }
      })
      this.$emit('dispatch', result)
    },
    filterText(val) {
      this.$refs.personDom.filter(val);
    }
  }
}
</script>
