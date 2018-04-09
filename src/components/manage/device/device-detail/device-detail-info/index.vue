<template>
  <info-detail>
    <row-layout :column="2">
      <info-detail-item
        slot="left"
        :label-width="labelWidth"
        label="设备名称">
        {{ deviceFormData.name }}
      </info-detail-item>
      <info-detail-item
        slot="right"
        :label-width="labelWidth"
        label="所属部门">
        {{ deviceFormData.department }}
      </info-detail-item>
    </row-layout>
    <row-layout :column="2">
      <info-detail-item
        slot="left"
        :label-width="labelWidth"
        label="设备种类">
        {{ deviceFormData.category }}
      </info-detail-item>
      <info-detail-item
        slot="right"
        :label-width="labelWidth"
        label="设备型号">
        {{ deviceFormData.deviceModel }}
      </info-detail-item>
    </row-layout>
    <row-layout :column="2">
      <info-detail-item
        slot="left"
        :label-width="labelWidth"
        label="出厂编号">
        {{ deviceFormData.serialNumber }}
      </info-detail-item>
      <info-detail-item
        slot="right"
        :label-width="labelWidth"
        label="使用地点">
        {{ deviceFormData.usePlace }}
      </info-detail-item>
    </row-layout>
    <row-layout :column="1">
      <info-detail-item
        :label-width="labelWidth"
        label="生产地址">
        {{ deviceFormData.productionAddress }}
      </info-detail-item>
    </row-layout>
    <row-layout :column="1">
      <info-detail-item
        :label-width="labelWidth"
        label="备注">
        {{ deviceFormData.remark }}
      </info-detail-item>
    </row-layout>
  </info-detail>
</template>

<script>
export default {
  data () {
    return {
      labelWidth: '100px',
      deviceFormData: {
        name: '',
        department: '',
        category: '',
        deviceModel: '',
        serialNumber: '',
        usePlace: '',
        productionAddress: '',
        remark: ''
      }
    }
  }
}
</script>

<style>

</style>
