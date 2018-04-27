
export default {
  updateDeviceData (state, payload) {
    state.deviceData = payload
  },
  updatePointData (state, payload) {
    state.pointData = payload
  },
  updateNormData (state, payload) {
    state.normData = payload
  },
  updateMethodData (state, payload) {
    state.methodData = payload
  },
  updateCycleData (state, payload) {
    state.cycleData = payload
  },
  updatePersonData (state, payload) {
    state.personData = payload
  },
  updateCheckData (state, payload) {
    state.checkData = payload
  },
  updateCheckerId (state, payload) {
    state.checkerId.push(payload)
  }
}
