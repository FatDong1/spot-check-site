<template>
  <el-form
    label-width="120px"
    :rules="rules"
    ref="normDom"
    label-suffix="："
    :model="data">
    <view-content-float>
      <h3>定标准</h3>
      <el-button 
        v-if="data.normType === '1'"
        slot="right" 
        size="small" 
        class="btn-default" 
        icon="el-icon-plus" 
        @click="addOptions">新增选项</el-button>
    </view-content-float>
    <row-layout :span="16">
      <el-form-item prop="normType" label="标准类型"> 
        <el-radio v-model="data.normType" label="1" @change="changeType">定性</el-radio>
        <el-radio v-model="data.normType" label="2" @change="changeType">定量</el-radio>
      </el-form-item>
    </row-layout>
    <row-layout :span="16" v-if="data.normType === '2'">
      <el-form-item prop="norm" label="标准">
        <el-input v-model="data.norm" style="width: 50%"></el-input>
      </el-form-item>
    </row-layout>
    <row-layout :span="16" v-if="data.normType === '2'">
      <el-form-item prop="unit" label="数据单位">
        <el-input v-model="data.unit" style="width: 50%"></el-input>
      </el-form-item>
    </row-layout>
    <row-layout :span="16" v-if="data.normType === '1'" v-for="(item ,index) in options" :key="index">
      <el-form-item prop="normOptions" :label="'可选项' + (index + 1)">
         <el-input :value="item" style="width: 50%" @change="changeOption" @focus="focusInput(index)"></el-input> 
      </el-form-item>
    </row-layout>
  </el-form>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    step: {
      type: Number
    },
    data: {
      type: Object
    }
  },
  data () {
    return {
      options: [''],
      focusIndex: 0,
      result: [],
      rules: {

      }
    }
  },
  computed: {
    ...mapState('device-data', [
      'checkData'
    ])
  },
  methods: {
    changeType (value) {
      if (value === '2') {
        this.options = ['']
      } else {
        this.data.norm = ''
        this.data.unit = ''
      }
    },
    changeOption (value) {
      if (this.result[this.focusIndex]) {
        this.result.splice(this.focusIndex, 1, value)
      } else {
        this.result.push(value)
      }
    },
    addOptions () {
      this.options.push('')
    },
    focusInput (index) {
      this.focusIndex = index
    }
  },
  watch: {
    step (curVal, oldVal) {
      if (oldVal === 1) {
        let obj = {
          norm: this.data.norm,
          unit: this.data.unit,
          normType: this.data.normType,
          normOptions: this.result.join('，')
        }
        this.$emit('dispatch', obj, this.$refs.normDom)
      }
    }
  },
  created () {
    if (this.checkData.normType === '1' && this.$route.query.state === 'edit') {
      let arr = this.checkData.normOptions.split('，')
      this.options = arr
    }
  }
}
</script>

<style lang="less" scoped>
.form-label {
  display: inline-block;
}

</style>

