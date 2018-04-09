<template>
  <el-form
    label-width="80px"
    :model="normData">
    <check-header>定标准</check-header>
    <row-layout :span="16">
      <el-form-item prop="content" label="标准">
        <el-input v-model="normData.content" :disabled="disabled"></el-input>
      </el-form-item>
    </row-layout>
    <row-layout :span="16">
      <el-form-item prop="remark" label="备注">
        <el-input type="textarea" rows="2" v-model="normData.reamrk" :disabled="disabled"></el-input>
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
      normData: {
        content: '',
        remark: ''
      }
    }
  },
  methods: {

  },
  watch: {
    step (val) {
      if (val === 0 || val === 2) {
        this.$emit('dispatch', this.normData)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.form-label {
  display: inline-block;
}

</style>

