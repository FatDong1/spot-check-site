<template>
  <view-container>
    <view-header-flex :width="'35%'">
      新增设备
      <el-steps
        slot="right"
        :space="200"
        :active="currentActive"
        align-center>
        <el-step title="基本信息"></el-step>
        <el-step title="定点"></el-step>
        <el-step title="定标准"></el-step>
        <el-step title="定人"></el-step>
      </el-steps>
    </view-header-flex>
    <view-content padding="20px 10px">
      <base-info
        v-show="currentActive === 0"
        :data="baseInfoData"></base-info>
      <!-- <fill-in-info
        v-show="currentActive === 1"
        :step="stepActive"
        :data="businessData"
        @dispatch="handleFillInInfoDispatch"></fill-in-info>
      <input-product
        v-show="currentActive === 2"
        :step="stepActive"
        @dispatch="handleInputProductDispatch"></input-product>
      <fill-in-contact
        v-show="currentActive === 3"
        :send="send"
        :data="contactList"
        @dispatch="handleFillInContactDispatch"></fill-in-contact> -->
    </view-content>
    <tool-bar>
      <div slot="right">
        <el-button
        slot="right"
        v-if="currentActive > 0"
        @click="handlePrevStepClick">上一步</el-button>
       <el-button
        slot="right"
        type="primary"
        v-if="currentActive === 3"
        @click="handleSubmit">提交</el-button>
      <el-button
        slot="right"
        type="primary"
        v-if="currentActive < 3"
        :disabled="btnDisabled"
        @click="handleNextStepClick">下一步</el-button> 
      </div>
    </tool-bar>
  </view-container>
</template>

<script>
import BaseInfo from './baseInfo.vue'
export default {
  components: {
    BaseInfo
  },
  data () {
    return {
      currentActive: 0,
      baseInfoData: {
        name: ''
      }
    }
  },
  methods: {
    handlePrevStepClick () {

    },
    handleSubmit () {

    },
    handleNextStepClick () {

    }
  }
}
</script>

<style lang="less" scoped>
.steps-container {
  width: 40%;
}
</style>