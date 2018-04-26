
export default {
  updateWorkData (state, payload) {
    state.workData = payload
  },
  updatePartData (state, payload) {
    state.workData.isProblem = payload.isProblem
    state.workData.problem = payload.problem
    state.workData.result = payload.result    
  }
}
