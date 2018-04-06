<template>
  <div>
    <view-content-float padding="0 0 15px">
      <h3 class="content-header">设备定点</h3>
      <el-button slot="right" size="small" class="btn-default" icon="el-icon-plus" @click="addPlace">新增定点</el-button>
    </view-content-float>
    <el-row :gutter="5" v-for="(item, index) in placeFormData" :key="index">
      <el-col :span="6">
        <label>检查部位：<el-input v-model="item.place" style="width: 60%"></el-input></label>
        </label>
      </el-col>
        <el-col :span="14">
        <label>检查内容： <el-input v-model="item.content" style="width: 70%"></el-input>
        </label>
      </el-col> 
      <el-col :span="4">
        <el-button size="small" class="btn-default" icon="el-icon-minus" @click="deletePlace(index)">删除定点</el-button>
      </el-col> 
    </el-row>
  </div>
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
      test: '123',
      placeFormData: [{
        place: '',
        content: ''
      }, {
        place: '',
        content: ''
      }]
    }
  },
  methods: {
    addPlace () {
      this.placeFormData.push({
        place: '',
        content: ''
      })
    },
    deletePlace (index) {
      this.placeFormData.splice(index, 1)
    }
  },
  watch: {
    step (val) {
      if (val === 0 || val === 2) {
        this.$emit('dispatch', this.placeFormData)
      }
    }
  }
}
</script>

<style>
.form-label {
  display: inline-block;
}
.el-row {
  margin-bottom: 10px !important;
}
</style>
