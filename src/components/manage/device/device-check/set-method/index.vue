<template>
  <el-form
    label-width="80px"
    :model="methodData">
    <check-header>定方法</check-header>
    <row-layout :span="16">
      <el-form-item prop="content" label="方法">
        <el-input v-model="methodData.method" :disabled="disabled"></el-input>
      </el-form-item>
    </row-layout>
    <row-layout :span="16">
      <el-form-item prop="remark" label="备注">
        <el-input type="textarea" rows="2" v-model="methodData.reamrk" :disabled="disabled"></el-input>
      </el-form-item>
    </row-layout>
  </el-form>
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
      isVisible: false,
      editIndex: 0,
      methodData: {
        method: '',
        remark: ''
      }
    }
  },
  computed: {
    standardData () {
      return this.placeListData[this.editIndex].standard || []
    }
  },
  methods: {
    closeEditDialog () {
      this.isVisible = false
    },
    addStandard (index, row) {
      this.isVisible = true
      this.editIndex = index
    },
    handleDialogChange () {
      // 重新获取数据
    }
  },
  watch: {
    step (val) {
      if (val === 1 || val === 3) {
        this.$emit('dispatch', this.placeListData)
      }
    }
  }
}
</script>

<style>

</style>
