<template lang="pug">
router-link.back(:to="goto + ''")
    .back__icon
        img(src="@/assets/images/back.svg")
    .back__label Вернуться назад
</template>

<script>
export default {
    name: 'Back',
    props: ['goto']
}
</script>

<style lang="sass">
@import @/assets/styles/vars

.back
    display: flex
    align-items: center
    cursor: pointer
    margin-bottom: 16px

    &__label
        margin-left: 14px
        color: $color-font-mute
        font-size: 13px
        line-height: 24px

    &__icon
        display: flex
        align-items: center
</style>