<template>
  <el-form
    label-width="80px"
    :model="cycleData">
    <check-header>定周期</check-header>
    <row-layout :span="16">
      <el-form-item prop="content" label="周期">
        <el-input v-model="cycleData.cycle" :disabled="disabled"></el-input>
      </el-form-item>
    </row-layout>
    <row-layout :span="16">
      <el-form-item prop="remark" label="备注">
        <el-input type="textarea" rows="2" v-model="cycleData.reamrk" :disabled="disabled"></el-input>
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
      cycleData: {
        cycle: '',
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
      if (val === 2 || val === 4) {
        this.$emit('dispatch', this.placeListData)
      }
    }
  }
}
</script>

<style>

</style>
