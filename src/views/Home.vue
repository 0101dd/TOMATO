<template lang="pug">
#home
  .input
    input(type="text" v-model="newinput" @keydown.enter="additem")
    input(type="button" @click="additem")
    font-awesome-icon.plus(:icon="['fas', 'plus']")
  div.square(:class="{ breakBlue: this.current == 'rest' }")
    //- 開始按鈕
    input(type="button" value="Start" v-if="status !== 1" @click="start")
    input(type="button" value="reset" v-else @click="reset" :class="{ breakBlueColor: this.current == 'rest'}")
    //- 切換頁面按鈕
  router-link(to="/list")
    font-awesome-icon.bars(:icon="['fas', 'bars']")
    //- 顯示task
  ul
    li(v-for="item in items")
      .red-dot
      span {{ item.name }}
  p ......Only show the first four tasks …...
  h2 Work
  h2 Break
  .bottom-line
  //- 顯示時間文字
  h1 {{ timeText }}
  h5 {{ timeSecond }}
</template>

<script>
export default {
  data () {
    return {
      // 0 = 停止
      // 1 = 倒數中
      // 2 = 暫停
      newinput: '',
      status: 0,
      timer: 0,
      isBreak: false
    }
  },
  methods: {
    additem () {
      if (this.newinput.length > 2) {
        this.$store.commit('additem', this.newinput)
        this.newinput = ''
      }
    },
    start () {
      if (this.status === 0 && this.items1.length > 0) {
        this.$store.commit('start')
      }
      if (this.current.length) {
        this.status = 1
        this.timer = setInterval(() => {
          this.$store.commit('countdown')
          if (this.timeleft <= -1) {
            this.finish(false)
          }
        }, 1000)
      }
    },
    finish () {
      clearInterval(this.timer)
      // 0 = 停止
      this.status = 0
      this.$store.commit('finish')

      if (this.items1.length > 0) {
        this.start()
      }
    },
    reset () {
      // 2 = 暫停
      this.status = 2
      clearInterval(this.timer)
    }
  },
  computed: {
    items () {
      return this.$store.state.items.map(item => {
        item.state = item.model.length > 2
        return item
      })
    },
    items1 () {
      return this.$store.state.items
    },
    current () {
      return this.$store.state.current
    },
    timeleft () {
      return this.$store.state.timeleft
    },
    timeText () {
      const m = Math.floor(this.timeleft / 60).toString().padStart(2, '0')
      // const s = Math.floor(this.timeleft % 60).toString().padStart(2, '0')
      return `${m}`
    },
    timeSecond () {
      const s = Math.floor(this.timeleft % 60).toString().padStart(2, '0')
      return `.${s}`
    }
  }
}
/*
this.$store.timeleft = timeBreak
*/
</script>
