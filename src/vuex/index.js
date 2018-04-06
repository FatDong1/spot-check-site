/**
 * @description: vuex 配置文件
 */
import Vue from 'vue'
import Vuex from 'vuex'
import state from './store/state'
import mutations from './store/mutations'
import actions from './store/actions'

// 商机
import workDataStore from '../components/manage/work/store/index'

Vue.use(Vuex)

const store = {}
// root
store.state = state
store.mutations = mutations
store.actions = actions
store.modules = {}
// 商机
store.modules['work-data'] = workDataStore

export default new Vuex.Store(store)
