
export default {
  updateCompanyData (state, payload) {
    state.companyData = {
      plant: payload.plant,
      factory: payload.factory
    }
  }
}
