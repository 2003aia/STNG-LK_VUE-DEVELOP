<template lang="pug">
button.button(:class="classObject" v-on:click="method ? method : ''" @click="onClick")
    Icon(:color="color" :icon="icon" :style="{marginRight: !square ? '.75rem' : ''}" v-if="icon && !iconRight")
    span
        slot(v-if="!square")
    Icon(:color="color" :icon="icon" :style="{marginRight: !square ? '.75rem' : ''}" v-if="icon && iconRight")
</template>

<script>
import Icon from '@/components/icon'

export default {
    name: 'Button',
    props: {
        icon: String,
        square: Boolean,
        variety: String,
        to: String,
        full: Boolean,
        iconRight: Boolean,
        size: String,
        method: Function,
    },
    components: {
        Icon
    },
    computed: {
        color () {
            if (!this.variety) {
                return 'white'
            } else if (this.variety === 'primary') {
                return 'white'
            } else if (this.variety === 'secondary') {
                return 'primary'
            }
        },
        classObject () {
            return {
                'button_square': this.square,
                'button_variety_secondary': this.variety === 'secondary',
                'button_variety_white': this.variety === 'white',
                'button_variety_white_bordered': this.variety === 'white-bordered',
                'button_variety_primary-light': this.variety === 'primary-light',
                'button_variety_primary-light-outline': this.variety === 'primary-light-outline',
                'button_variety_add-list': this.variety === 'add-list',
                'button_full': this.full,
                'button_size_small': this.size === 'small'
            }
        }
    },
    methods: {
        onClick () {
            if (this.to) {
                this.$router.push(this.to)
            }
        }
    }
}
</script>

<style lang="sass">
@import ~@/assets/styles/vars

.button
    background: $color-primary
    height: 3rem
    border: none
    cursor: pointer
    font:
        weight: 500
        size: .95rem
    color: #fff
    border-radius: 4px
    padding: 2px 1rem 0
    display: flex
    justify-content: center
    align-items: center
    border: 2px solid transparent

    span
        display: block
        margin-top: -.1rem

    &:focus
        outline: none

    span + .icon
        margin-right: 0 !important
        margin-left: .75rem

    &_square
        width: 3rem
        padding: 0

        img
            margin-right: 0

    &_size
        &_small
            font:
                size: 13px
            height: 40px
    
    &_variety
        &_secondary
            background: $color-secondary
            color: $color-primary

        &_white
            background: #fff
            color: $color-primary

            &_bordered
                background: #fff
                color: $color-primary
                border: 2px solid $color-border

            .icon
                svg
                    path
                        fill: $color-primary

        &_primary
            background: $color-primary
            color: #fff
            
            &-light
                background: $color-primary-light
                color: #fff

                &-outline
                    background: none
                    border: 2px solid $color-primary-light

        &_add-list
            width: 100%
            border: 2px dashed $color-border
            background: none
            color: $color-primary
            height: 4rem

            @media screen and (max-width: $mobile-width)
                height: auto
                padding: 16px 16px
    
    &_full
        width: 100%
</style>
