<template lang="pug">
.card(:class="classObject")
    .card__bg-icon(v-if="type === 'connect-bill'" style="top:54px;right:66px")
        img(src="@/assets/images/bill-big-icon.svg")
    .card__bg-icon(v-if="type === 'connect-gas'" style="top:48px;right:40px")
        img(src="@/assets/images/bill-big-icon2.svg")
    .card__angle(v-if="angle")
        img(src="@/assets/images/angle.svg")
    .card__menu(v-if="menu" @click="menuToggle")
        img(src="@/assets/images/dots.svg")
    slot(name="card")
    .card__title {{ title }}
    .card__subtitle Имя контрагента:  
        span {{contrName}} 
    .card__content
        slot
        .card__content-client(v-if="$slots.client")
            slot(name="client")
        .card__content-bill(v-if="$slots.bill")
            slot(name="bill")
        //- .card__content-bill(v-if="$slots.bill")
        //-     slot(name="bill2")    
    .card__footer(v-if="$slots.footer")
        slot(name="footer")
</template>

<script>
export default {
    name: 'Card',
    props: {
        variety: String,
        title: String,
        angle: Boolean,
        type: String,
        menu: Boolean,
        index: Number,
        contrName: String,
    },
    computed: {
        classObject () {
            return {
                'card_secondary': this.variety === 'secondary'
            }
        }
    },
    methods: {
        menuToggle () {
            let that = this
            let result = this.$parent.openedMenu.findIndex(function (i) {
                return i === that.index
            })

            if (result === -1) {
                this.$parent.openedMenu.push(this.index)
            } else {
                this.$parent.openedMenu.splice(result, 1)
            }
            
        }
    }
}
</script>

<style lang="sass">
@import @/assets/styles/vars

.card
    background: $color-primary
    padding: 1.5rem
    display: flex
    flex:
        direction: column
    border:
        radius: 8px
    position: relative

    @media screen and (max-width: $mobile-width)
        padding: 16px

    &__bg-icon
        position: absolute
        z-index: 0

    &__angle
        width: 2rem
        height: 2rem
        position: absolute
        top: 0
        right: 0
        background: #fff
        z-index: 0

        @media screen and (max-width: $mobile-width)
            display: none

        &::before
            content: ''
            width: 1rem
            height: 1rem
            bottom: -.5rem
            left: -.5rem
            position: absolute
            background: $color-primary
            z-index: -1

    &__menu
        display: none
        position: absolute

        @media screen and (max-width: $mobile-width)
            display: flex
            top: 13px
            right: 13px
            width: 30px
            height: 30px
            align-items: center
            justify-content: center

    &__title
        color: #fff
        margin-bottom: .5rem
        font:
            size: 1.13rem
            weight: 500
        line-height: 1.5rem

        @media screen and (max-width: $mobile-width)
            font-size: 16px
    &__subtitle
        // color: #fff
        color: $color-font-mute-light

        margin-bottom: .5rem
        font:
            size: .8125rem
            // weight: 500
        line-height: 1.5rem

        @media screen and (max-width: $mobile-width)
            font-size: 16px
        span
            color: #fff
    &__content
        color: $color-font-mute-light
        font:
            size: .8125rem
        line-height: 1.5rem
        display: flex
        position: relative
        z-index: 1

        @media screen and (max-width: $mobile-width)
            flex-direction: column

        div
            width: 100%

        &-client, &-bill
            width: 50%

        span, a
            color: #fff
            text-decoration: none
    
    &__footer
        margin-top: 1rem
        display: flex

        .button
            height: 2.5rem
            margin-right: .5rem
            font-size: .8125rem

        @media screen and (max-width: $mobile-width)
            .button:last-child
                margin-right: 0
    &_secondary
        background: $color-secondary

        .card__title
            color: $color-primary

        .card__content
            color: $color-font-mute

    &__meta
        margin-left: 1.5rem
        display: flex
        align-items: center
        font:
            size: .8125rem
        color: $color-font-mute

        span
            color: $color-primary
            margin-left: 3px

        &:first-child
            margin-left: 1rem
</style>