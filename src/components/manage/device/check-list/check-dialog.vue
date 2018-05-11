<template>
  <el-dialog title="选用标准" :visible="visible" @close="closeDialog" v-loading="loading">
    <el-form label-width="120px">
      <el-form-item label="部件名称：">
        <el-select v-model="partName" placeholder="请选择" @change="handleChange">
          <el-option
            v-for="item in partOptions"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部件编号：">
        <span>{{ randomData.number ? randomData.number : '无'}}</span>
      </el-form-item>
      <el-form-item label="部件重量：">
        <span>{{ randomData.weight ? randomData.weight + 'g' : '无' }}</span>
      </el-form-item>
      <el-form-item label="部件价格：">
        <span>{{ randomData.price ? randomData.price + '元' : '无' }}</span>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    visible: {
      type: Boolean
    }
  },
  data () {
    return {
      partName: '',
      loading: false,
      partOptions: [],
      randomData: {
        number: '',
        weight: '',
        price: ''
      }
    }
  },
  computed: {
    ...mapState('device-data', [
      'deviceData',
      'checkData'
    ])
  },
  methods: {
    closeDialog () {
      this.$emit('closeCheckDialog')
    },
    getPartOptions (str) {
      this.partOptions = str.split('，')
    },
    handleChange () {
      let price = (Math.random() * (200 - 50) + 50).toFixed(0)
      let weight =(Math.random() * (500 - 100) + 100).toFixed(0)
      let n = (Math.random()).toPrecision(8)
      let number = (n + '').split('.')[1]
      this.randomData.number = number
      this.randomData.weight = weight
      this.randomData.price = price
    },
    confirm () {
      let result = Object.assign({}, this.checkData)
      result.name = this.partName
      result['deviceId'] = this.deviceData.id
      result['checkerId'] = [this.checkData.checkerId]
      this.loading = true
      this.$http({
        method: 'post',
        url: '/api/check',
        data: result
      }).then((result) => {
        this.$message({
          type: 'success',
          message: result.msg
        })
        this.$emit('closeCheckDialog')
        this.loading = false
        this.$router.push({
          name: 'device-list'
        })
      }).catch((err) => {
        this.loading = false        
        this.$message({
          type: 'error',
          message: err.msg
        })
      })
    }
  },
  created () {
    this.getPartOptions(this.deviceData.parts)
  }
}
</script>

<style>

</style>
