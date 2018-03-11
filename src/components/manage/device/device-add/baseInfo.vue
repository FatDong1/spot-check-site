<template>
  <el-form
    label-width="120px"
    ref="customerForm"
    :rules="rules"
    :model="customerFormData">
    <h3 class="content-header">基本信息</h3>
    <row-layout :column="3">
      <el-form-item slot="left" prop="name" label="设备名称">
        <el-input v-model="customerFormData.name" :disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item slot="center" prop="department" label="所属部门">
        <el-select v-model="customerFormData.department" :disabled="disabled">
          <el-option
            v-for="item in departmentOptions"
            :key="item.value"
            :value="item.value"
            :label="item.title"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item slot="right" prop="category" label="设备类别">
        <el-input v-model="customerFormData.category" :disabled="disabled"></el-input>
      </el-form-item>
    </row-layout>
    <row-layout :column="3">
      <el-form-item slot="left" prop="deviceModel" label="设备型号">
        <el-input v-model="customerFormData.deviceModel" :disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item slot="center" prop="serialNumber" label="出厂编号">
        <el-input v-model="customerFormData.serialNumber" :disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item slot="right" prop="usePlace" label="使用地点">
        <el-input v-model="customerFormData.usePlace" :disabled="disabled"></el-input>
      </el-form-item>
    </row-layout>
    <row-layout :span="16">
      <el-form-item prop="productionAddress" label="生产地址">
        <el-input v-model="customerFormData.productionAddress" :disabled="disabled"></el-input>
      </el-form-item>
    </row-layout>
    <row-layout :span="16">
      <!-- 备注 -->
      <el-form-item prop="remark" label="备注">
        <el-input type="textarea" v-model="customerFormData.remark" :min="3" :disabled="disabled"></el-input>
      </el-form-item>
    </row-layout>
  </el-form>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {
        return {
          name: '',
          registrationNumber: '',
          industry: '',
          region: null,
          provinceArray: [],
          address: '',
          postcode: '',
          cellphone: '',
          fax: '',
          roleDeptId: null,
          companyWeb: '',
          companyScale: '',
          companyProfitability: '',
          remark: '',
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
            value: 'shejiyuanze',
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
      customerFormData: {}
    }
  }
}
</script>

<style lang="less" scoped>
.content-header {
  font-size: 14px;
  padding: 10px 0;
}

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
