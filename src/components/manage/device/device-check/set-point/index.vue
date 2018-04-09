<template>
  <el-form
    label-width="120px"
    ref="deviceForm"
    :model="data">
    <check-header>定点</check-header>
    <row-layout :column="3">
      <el-form-item slot="left" prop="name" label="部件名称">
        <el-input v-model="data.name" :disabled="disabled"></el-input>
      </el-form-item>
    </row-layout>
    <row-layout :column="3">
      <el-form-item slot="left" prop="number" label="部件编号">
        <el-input v-model="data.number" :disabled="disabled"></el-input>
      </el-form-item>
    </row-layout>
    <row-layout :column="3">
      <el-form-item slot="left" prop="element" label="点检要素">
        <el-input v-model="data.element" :disabled="disabled"></el-input>
      </el-form-item>
    </row-layout>
    <row-layout :column="3">
      <el-form-item slot="left" prop="unit" label="数据单位">
        <el-input v-model="data.unit" :disabled="disabled"></el-input>
      </el-form-item>
    </row-layout>
    <row-layout :span="16">
      <el-form-item prop="special" label="可能劣化的部位">
        <el-input v-model="data.special" :disabled="disabled"></el-input>
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
          name: '',
          number: '',
          element: '',
          unit: '',
          special: ''
        }
      }
    }
  },
  data () {
    return {
      regionOption: [],
      enterpriseNatureOption: [],
      taxpayerTypeOption: [],
      selectItem: null,
      disabled: false,
      inputDisabled: false,
      deviceFormData: {},
      departmentOptions: [{
        value: 'shejiyuanze',
        label: '第一工厂',
        children: [{
          value: 'yizhi',
          label: '第一车间'
        }, {
          value: 'fankui',
          label: '第二车间'
        }, {
          value: 'xiaolv',
          label: '第三车间'
        }, {
          value: 'kekong',
          label: '第四车间'
        }]
      }, {
        value: 'shejiyuanze1',
        label: '第二工厂',
        children: [{
          value: 'yizhi',
          label: '第一车间'
        }, {
          value: 'fankui',
          label: '第二车间'
        }, {
          value: 'xiaolv',
          label: '第三车间'
        }, {
          value: 'kekong',
          label: '第四车间'
        }]
      }]
    }
  },
  watch: {
    step (val) {
      if (val === 1) {
        this.$emit('dispatch', this.deviceFormData, this.$refs.deviceForm)
      }
    },
  }
}
</script>

<style lang="less" scoped>


.customer-name-wrap {
  .el-autocomplete {
    width: 100%;
  }

  .confirm-btn {
    position: absolute;
    top: 0;
    right: -66px;
  }
}

.customer-center-box {
  margin-bottom: 20px;
  text-align: center;

  & > .el-autocomplete {
    width: 300px;
  }
}

.customer-item {
  padding: 5px 0;
  border-bottom: 1px solid #f2f2f2;
  line-height: 24px;
  .info {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #999999;
  }
}
</style>
