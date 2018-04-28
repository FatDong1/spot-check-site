
export default {
  updateWorkData (state, payload) {
    state.workData = payload
  },
  updatePartData (state, payload) {
    state.workData.isProblem = payload.isProblem
    state.workData.reason = payload.reason
    state.workData.solution = payload.solution    
  }
}
