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
        :data="baseInfoData"
        :step="stepActive"
        @dispatch="handleBaseInfoDispatch"></base-info>
      <set-place 
        v-show="currentActive === 1"
        :step="stepActive"
        :data="placeData"
        @dispatch="handleSetPlaceDispatch">
      </set-place>
      <set-standard 
        v-show="currentActive === 2"
        :step="stepActive"
        @dispatch="handleSetStandardDispatch">
      </set-standard>
      <set-person 
        v-show="currentActive === 3"
        :step="stepActive"
        @dispatch="handleSetPersonDispatch">
      </set-person>
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
        @click="handleNextStepClick">下一步</el-button> 
      </div>
    </tool-bar>
  </view-container>
</template>

<script>
import BaseInfo from './baseInfo.vue'
import SetPlace from './setPlace.vue'
import SetStandard from './set-standard/index.vue'
import SetPerson from './set-person/index.vue'
export default {
  components: {
    BaseInfo,
    SetPlace,
    SetStandard,
    SetPerson
  },
  data () {
    return {
      stepType: 'next',
      stepActive: 0,
      currentActive: 0,
      baseInfoData: {
        name: ''
      },
      placeData: {

      }
    }
  },
  methods: {
    handleBaseInfoDispatch (data, node) {
      this.currentActive = this.stepActive
      // if (this.stepType === 'next') {
      //   node.validate(valid => {
      //     console.log(valid)
      //     if (valid) {
      //       this.updateCustomerForm(data)
      //       this.currentActive = this.stepActive
      //     } else {
      //       this.resetStep()
      //       return false
      //     }
      //   })
      // } else {
      //   this.updateCustomerForm(data)
      //   this.currentActive = this.stepActive
      // }
    },
    handleSetPlaceDispatch () {
       this.currentActive = this.stepActive
    },
    handleSetStandardDispatch () {
       this.currentActive = this.stepActive      
    },
    handleSetPersonDispatch () {
       this.currentActive = this.stepActive      
    },
    /**
     * 下一步 按钮点击事件
     */
    handleNextStepClick () {
      this.stepType = 'next'
      this.stepActive++
    },
    /**
     * 上一步 按钮点击事件
     */
    handlePrevStepClick () {
      this.stepType = 'prev'
      this.stepActive--
    },
    /**
     * 提交按钮点击事件
     */
    handleSubmit () {
      // 发送send信号
      // 将联系人组件列表状态 dispatch 到本组件
      this.send++
    },
  }
}
</script>

<style lang="less" scoped>
.steps-container {
  width: 40%;
}
</style>