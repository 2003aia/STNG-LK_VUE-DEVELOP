<template lang="pug">
.layout-sidebar
    slot
</template>

<script>
export default {
    name: 'LayoutSidebar'
}
</script>

<style lang="sass">
@import @/assets/styles/vars

.layout-sidebar
    width: 18rem
    flex-shrink: 0
    padding-top: 1.5rem
    border-left: 1px solid $color-border
    height: 100%

    @media screen and (max-width: $mobile-width)
        display: none

    a
        padding: 1.5rem
</style>