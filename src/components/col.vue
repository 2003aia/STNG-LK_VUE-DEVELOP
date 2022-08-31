<template lang="pug">
.col(:style="{marginLeft, marginRight, flexShrink: shrink}")
    slot
</template>

<script>
export default {
    name: 'Col',
    props: {
        shrink: Number
    },
    computed: {
        marginLeft () {
            return this.$parent.gutter / 2 + this.$parent.unit 
        },
        marginRight () {
            return this.$parent.gutter / 2 + this.$parent.unit 
        }
    },
}
</script>

<style lang="sass">
@import @/assets/styles/vars

.col
    width: 100%
    display: flex
    align-items: flex-end
    flex-grow: 1
    flex-shrink: 1

    &:first-child
        margin-left: 0 !important
    
    &:last-child
        margin-right: 0 !important

    @media screen and (max-width: $mobile-width)
        margin: 0 0 8px !important
</style>