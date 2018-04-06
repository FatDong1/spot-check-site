<template>
  <view-container>
    <view-header>工单录入</view-header>
    <info-detail>
      <row-layout :column="column">
        <info-detail-item
          slot="left"
          :label-width="labelWidth"
          label="设备名称">
          {{ workData.name }}
        </info-detail-item>
        <info-detail-item
          slot="right"
          :label-width="labelWidth"
          label="工单状态">
          {{ workData.stage }}
        </info-detail-item>
      </row-layout>
      <row-layout :column="column">
        <info-detail-item
          slot="left"
          :label-width="labelWidth"
          label="设备归属">
          {{ workData.factory }}
        </info-detail-item>
        <info-detail-item
          slot="right"
          :label-width="labelWidth"
          label="点检部位">
          {{ workData.checkPlace }}
        </info-detail-item>
      </row-layout>
      <row-layout :column="column">
        <info-detail-item
          :label-width="labelWidth"
          label="点检内容">
          {{ workData.checkContent }}
        </info-detail-item>
      </row-layout>
    </info-detail>
  </view-container>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  data () {
    return {
      column: 2,
      labelWidth: '120px',
      loading: false,
      businessDialogLoading: false,
      businessDialogVisible: false,
      uploadActionURL: '',
      ifShowEdit: false
    }
  },
  computed: {
    ...mapState('work-data', [
      'workData'
    ])
  },
  mounted () {
    console.log(this.workData, 123123)
  }
}
</script>

<style>

</style>
