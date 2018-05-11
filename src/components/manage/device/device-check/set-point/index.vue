<template>
  <el-form
    label-width="120px"
    :rules="rules"
    ref="pointDom"
    :model="data">
    <check-header>定点</check-header>
    <row-layout :column="3">
      <el-form-item slot="left" prop="name" label="部件名称">
        <el-select v-model="data.name" placeholder="请选择">
          <el-option
            v-for="item in partOptions"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>
    </row-layout>
    <row-layout :column="3">
      <el-form-item slot="left" prop="number" label="点检编号">
        <el-input v-model="data.number" :disabled="disabled"></el-input>
      </el-form-item>
    </row-layout>
    <row-layout :column="3">
      <el-form-item slot="left" prop="element" label="点检要素">
        <el-input v-model="data.element" :disabled="disabled"></el-input>
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
      disabled: false,
      pointData: {},
      partOptions: [],
      rules: {
        name: [
          { required: true, message: '请输入部件名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        number: [
          { required: true, message: '请输入点检编号', trigger: 'blur' }
        ],
        element: [
          { required: true, message: '请输入点检要素', trigger: 'blur'}
        ],
        special: [
          { required: true, message: '请输入可能劣化的部位', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState([
      'departmentOptions'
    ]),
    ...mapState('device-data', [
      'deviceData'
    ])
  },
  methods: {
    getPartOptions (str) {
      this.partOptions = str.split('，')
    }
  },
  watch: {
    step (curVal, oldVal) {
      if (oldVal === 0) {
        this.$emit('dispatch', this.data, this.$refs.pointDom)
      }
    }
  },
  created () {
    this.getPartOptions(this.deviceData.parts)
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
