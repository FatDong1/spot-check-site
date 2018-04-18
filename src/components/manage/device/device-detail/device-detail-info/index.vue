<template>
  <info-detail>
    <row-layout :column="2">
      <info-detail-item
        slot="left"
        :label-width="labelWidth"
        label="设备名称">
        {{ deviceListData.name }}
      </info-detail-item>
      <info-detail-item
        slot="right"
        :label-width="labelWidth"
        label="所属部门">
        {{ deviceListData.department }}
      </info-detail-item>
    </row-layout>
    <row-layout :column="2">
      <info-detail-item
        slot="left"
        :label-width="labelWidth"
        label="设备种类">
        {{ deviceListData.category }}
      </info-detail-item>
      <info-detail-item
        slot="right"
        :label-width="labelWidth"
        label="设备型号">
        {{ deviceListData.deviceModel }}
      </info-detail-item>
    </row-layout>
    <row-layout :column="2">
      <info-detail-item
        slot="left"
        :label-width="labelWidth"
        label="出厂编号">
        {{ deviceListData.serialNumber }}
      </info-detail-item>
      <info-detail-item
        slot="right"
        :label-width="labelWidth"
        label="使用地点">
        {{ deviceListData.usePlace }}
      </info-detail-item>
    </row-layout>
    <row-layout :column="1">
      <info-detail-item
        :label-width="labelWidth"
        label="生产地址">
        {{ deviceListData.productionAddress }}
      </info-detail-item>
    </row-layout>
    <row-layout :column="1">
      <info-detail-item
        :label-width="labelWidth"
        label="备注">
        {{ deviceListData.remark }}
      </info-detail-item>
    </row-layout>
  </info-detail>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      labelWidth: '100px'
    }
  },
  computed: {
    ...mapState('device-data', [
      'deviceData'
    ])
  }
}
</script>

<style>

</style>
