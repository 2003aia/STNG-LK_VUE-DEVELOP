<script>
export default {
  name: 'tabs',
  props: ['items', 'border']
}
</script>

<template lang="pug">
.tabs(
  :class="{'tabs_border_bottom': border === 'bottom'}"
)
  router-link.item(
    v-for="(item, index) in items"
    :key="index"
    :class="{'item_active': $route.name === 'support-ticket'}"
    :to="item.path") {{ item.label }}
    
</template>

<style lang="sass" scoped>
@import @/assets/styles/vars

.tabs
  line-height: 1.15
  -webkit-box-direction: normal
  box-sizing: border-box
  display: flex
  padding: 0 .5rem

  &_border
    &_bottom
      border:
        bottom: 1px solid $color-border

  @media screen and (max-width: $mobile-width)
    padding: 0 .75rem

  .item
    -webkit-box-direction: normal
    box-sizing: border-box
    line-height: 1.5rem
    margin: 0 1rem
    display: flex
    padding: 1.125rem 0 calc(1.125rem - 2px)
    color: $color-font-mute
    text-decoration: none
    font-weight: 500

    @media screen and (max-width: $mobile-width)
      font-size: .8rem
      padding: .8rem 0 calc(.8rem - 2px)
      margin: 0 .75rem

  .router-link-exact-active,
  .item_active
    border-bottom: 2px solid $color-primary
    color: $color-primary
</style>