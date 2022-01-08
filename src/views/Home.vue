<template lang="pug">
#home
  .input
    input(type="text" v-model="newinput" @keydown.enter="additem")
    input(type="button" @click="additem")
    font-awesome-icon.plus(:icon="['fas', 'plus']")
  div.square(:class="{ breakBlue: this.current == 'rest' }")
    //- 開始按鈕
    input(:class="{ breakBlueColor: this.current == 'rest' }" type="button" value="Start" v-if="status !== 1" @click="start")
    input( :class="{ breakBlueColor: this.current == 'rest' }" type="button" value="reset" v-else @click="reset")
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
  //- .bottom-line
  b-progress(:value="value" height="43px" class="mb-2" :style="progress" variant="red" max="1500")
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
      isBreak: true,
      value: 0,
      progress: {
        backgroundColor: '#87AAC4',
        position: 'absolute',
        bottom: '-8px',
        width: '100%'
      }
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
          this.value++
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
      this.value = 0

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
</script>
