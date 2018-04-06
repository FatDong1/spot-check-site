/**
 * @description: 根路径下的 mutations
 */


export default {
  changeAccessToken (state, token) {
    state.accessToken = token
  },
  changeAccessTokenHeader (state, header) {
    state.accessTokenHeader = header
  },
  changeUserInfo (state, data) {
    if (data) {
      state.userInfo.name = data.cn
      state.userInfo.avatar = data.headImgUrl
      state.userInfo.userId = data.username
    }
  }
}
