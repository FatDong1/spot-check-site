/**
 * @description: 根路径下的 mutations
 */


export default {
  updateLoading (state, loading) {
    state.loading = loading
  },
  updateFlag (state, flag) {
    state.isAdmin = flag
  },
  updateCompanyData (state, payload) {
    state.companyData = payload
  }
}
