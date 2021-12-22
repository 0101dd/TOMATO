import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    items: [],
    current: '',
    finished: [],
    // timeleft: time,
    break: false
  },
  mutations: {
    additem (state, data) {
      state.items.push({
        name: data,
        model: data
      })
    },
    edititem (state, data) {
      state.items[data].edit = true
    },
    delitem (state, data) {
      state.items.splice(data, 1)
    },
    submitedit (state, data) {
      state.items[data].name = state.items[data].model
      state.items[data].edit = false
    },
    canceledit (state, data) {
      state.items[data].model = state.items[data].name
      state.items[data].edit = false
    }
  },
  actions: {
  },
  modules: {
  }
})
