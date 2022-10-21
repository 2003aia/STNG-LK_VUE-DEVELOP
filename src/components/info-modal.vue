<script>
export default {
  name: 'modal-info',
  data () {
    return {
      statusModal: true
    }
  },
  computed:{
    modal() { return this.$store.getters.modal }
  },

  methods: {
    close_modal() { this.$store.commit('setModalType', null); },
  },
}
</script>

<template lang="pug">
.modal-info(v-if="statusModal==true")
  .modal-info-overlay(@click="close_modal")
  .window.pay
    p {{modal.info}}
</template>

<style lang="sass">
@import @/assets/styles/vars

.modal-info
  width: 100vw
  height: 100vh
  position: fixed
  display: flex
  justify-content: center
  align-items: center
  z-index: 100
  background: none

  &-overlay
    position: fixed
    width: 100vw
    height: 100vh
    background: rgba(0, 0, 0, .2)
    z-index: 1

  .window
    width: 30rem
    background: white
    border-radius: 4px
    padding: 1.5rem
    box-sizing: border-box
    z-index: 2

  .pay
    color: $color-font-mute
    line-height: 1.5rem
</style>