import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const time = parseInt(process.env.VUE_APP_TIME)
const timebreak = parseInt(process.env.VUE_APP_TIMEBREAK)

export default new Vuex.Store({
  state: {
    items: [],
    current: '',
    finished: [],
    timeleft: time,
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
    },
    start (state) {
      if (state.break) {
        state.current = 'rest'
        state.timeleft = timebreak
      } else {
        state.current = state.items.shift().name
      }
    },
    countdown (state) {
      state.timeleft--
    },
    finish (state) {
      if (!state.break) {
        state.finished.push(state.current)
      }
      state.current = ''
      if (state.items.length > 0) {
        state.break = !state.break
      }
      state.timeleft = state.break ? timebreak : time
    },
    test (state) {
      state.timeleft = time
    }
  },
  getters: {
    timeBreak (state) {
      state.timeleft = timebreak
    }
  },
  actions: {
  },
  modules: {
  }
})
