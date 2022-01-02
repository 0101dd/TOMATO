<template lang="pug">
#list
  .input
    input(type="text" style="border: none;" v-model="newinput" @keydown.enter="additem")
    input(type="button" @click="additem")
    font-awesome-icon.plus(:icon="['fas', 'plus']" @click="additem")
  router-link(to="/")
    font-awesome-icon.close(:icon="['fas', 'times']")
  .all
    h1 All Tasks
    ul
      li(v-for="item in items")
        label
          input(type="checkbox")
          .circle
            .dot
          span(style="font-family: Arial Rounded MT;") {{ item.name }}
          br
      li(v-for="item in finished")
        label
          input(type="checkbox")
          .circle
            .dot(style="display: block")
          span(style="font-family: Arial Rounded MT;text-decoration: line-through;") {{ item }}
  .line
  .done
    h1 Had done
    ul
      li(v-for="item in finished") • {{ item }}
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
    },
    edititem (index) {
      this.$store.commit('edititem', index)
    },
    delitem (index) {
      this.$store.commit('delitem', index)
    },
    submitedit (index) {
      if (this.items[index].state) {
        this.$store.commit('submitedit', index)
      }
    },
    canceledit (index) {
      this.$store.commit('canceledit', index)
    }
  },
  computed: {
    items () {
      return this.$store.state.items
      // .map(item => {
      //   item.state = item.model.length > 2
      //   return item
      // })
    },
    finished () {
      return this.$store.state.finished
    }
  }
}
</script>
