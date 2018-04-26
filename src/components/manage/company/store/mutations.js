
export default {
  updateUserInfo (state, payload) {
    state.infoData = {
      plant: payload.plant,
      factory: payload.factory
    }
  }
}
