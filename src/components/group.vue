<template lang="pug">
.group
    slot
</template>

<script>
export default {
    name: 'Group'
}
</script>

<style lang="sass">
@import @/assets/styles/vars

.group
    width: 100%
    display: flex

    .input
        &__input
            border-radius: 0
            border-left: none

        &:first-child
            .input__input
                border-left: 1px solid $color-border
                border-radius: 4px 0 0 4px
        
        &:last-child
            .input__input
                border-radius: 0 4px 4px 0
</style>