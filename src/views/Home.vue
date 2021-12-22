<template lang="pug">
#home
  .input
    input(type="text" v-model="newinput" @keydown.enter="additem")
    input(type="button" @click="additem")
    font-awesome-icon.plus(:icon="['fas', 'plus']")
  div.square
    input(type="button" value="Start")
  router-link(to="/list")
    font-awesome-icon.bars(:icon="['fas', 'bars']")
  ul
    li(v-for="item in items")
      .red-dot
      span {{ item.name }}
</template>

<script>
export default {
  data () {
    return {
      newinput: ''
    }
  },
  methods: {
    additem () {
      if (this.newinput.length > 2) {
        this.$store.commit('additem', this.newinput)
        this.newinput = ''
      }
    }
  },
  computed: {
    items () {
      return this.$store.state.items.map(item => {
        item.state = item.model.length > 2
        return item
      })
    }
  }
}
</script>
