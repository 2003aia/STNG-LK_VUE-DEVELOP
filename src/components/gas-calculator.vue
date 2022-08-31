<template lang="pug">
.gas-calculator
    .gas-calculator__description
        .gas-calculator__description-title Рассчитайте максимальный часовой расход газа
        .gas-calculator__description-content Калькулятор МЧРГ. Выберите оборудование, которое присутствует в вашем доме. На основе выбранного оборудования и его параметров будет произведён приблизительный расчёт МЧРГ

    .gas-calculator__blocks
        .gas-calculator__block(v-for="(item, index) in list" :key="index")
            .gas-calculator__block-remove(@click="removeBlock(index)")
                Icon(icon="trash" color="primary")
            .gas-calculator__block-title {{ item.name }}
            .gas-calculator__block-params
                .gas-calculator__block-param(v-for="(param, paramIndex) in item.params")
                    .gas-calculator__block-param-name {{ param.name }}
                    .gas-calculator__block-param-slider
                        .gas-calculator__block-param-slider-numbers
                            .gas-calculator__block-param-slider-number(v-for="(n, i) in (param.steps + 1)") {{ i }}
                        input(type="range" min="0" :max="param.steps" :value="0")

    
    .gas-calculator__buttons
        button.gas-calculator__button(
            v-for="(item, index) in items"
            @click="addBlock(item)"
            ) + {{ item.name }}
</template>

<script>
import {
    Icon,
} from '@/components'

export default {
    name: 'GasCalculator',
    props: {
        items: Array
    },
    data () {
        return {
            list: []
        }
    },
    methods: {
        addBlock (item) {
            this.list.push(item)
        },
        removeBlock (index) {
            this.list.splice(index, 1)
        }
    },
    components: {
        Icon,
    }
}
</script>

<style lang="sass">
@import @/assets/styles/vars

.gas-calculator
    &__description
        line-height: 1.5rem

        &-title
            font:
                size: 1rem
                weight: 500
    &__buttons
        display: flex
        width: calc(100% + ((1.5rem * 2) - 1.5rem))
        margin-left: -.75rem

        @media screen and (max-width: $mobile-width)
            flex-direction: column
            width: 100%
            margin: 0

    &__button
        width: 100%
        margin: 0 .75rem
        border: none
        background: $color-primary
        color: #ffffff
        text-transform: uppercase
        letter-spacing: 0.2em
        font-size: .65rem
        line-height: 1.5rem
        padding: .5rem 0
        border-radius: 4px
        cursor: pointer

        @media screen and (max-width: $mobile-width)
            margin: 8px 0

            &:last-child
                margin-bottom: 0

        &:focus
            outline: none

    &__blocks
        margin-top: 1.25rem
        width: calc(100% + ((1.5rem * 2) - 1.5rem))
        margin-left: -.75rem
        display: flex
        flex:
            direction: row
            wrap: wrap

        @media screen and (max-width: $mobile-width)
            width: 100%
            margin: 22px 0
    
    &__block
        width: calc(50% - 1.5rem)
        margin: 1.5rem .75rem
        border: 1px solid $color-border
        border-radius: 4px
        position: relative
        padding: 1.5rem

        @media screen and (max-width: $mobile-width)
            margin: 22px 0 0
            width: 100%

            &:first-child
                margin-top: 0

        &-remove
            position: absolute
            right: -9px
            top: 50%
            margin-top: -10px
            padding: 2px 0
            background: #fff
            cursor: pointer

            @media screen and (max-width: $mobile-width)
                top: -4px
                right: 2px
                background: white

        &-title
            color: $color-primary
            font-size: 15px
            line-height: 1.5rem
            font-weight: 500
            padding: 0 1rem .25rem 1px
            background: #fff
            position: absolute
            left: -1px
            top: -.75rem

        &-params
            display: flex
            flex-direction: column
        
        &-param
            display: flex
            align-items: center
            margin-bottom: 1.5rem

            @media screen and (max-width: $mobile-width)
                flex-direction: column

            &:last-child
                margin-bottom: 0

            &-name
                width: 100%
                font-size: 13px
                line-height: 1.5rem

                @media screen and (max-width: $mobile-width)
                    margin-bottom: 8px

            &-slider
                display: flex
                flex-direction: column
                width: 240px
                flex-shrink: 0

                &-numbers
                    display: flex
                    justify-content: space-between
                    font-size: 13px
                    line-height: 1rem
                    color: $color-font-mute
                    margin-bottom: .25rem
                    width: calc(100% - 6px)
                    margin-left: 3px

                input[type="range"]
                    height: 2px
                    background-color: $color-border
                    -webkit-appearance: none
                    appearance: none
                    
                    &:focus
                        outline: none

                    &::-webkit-slider-thumb
                        -webkit-appearance: none
                        appearance: none
                        width: 14px
                        height: 14px
                        border-radius: 50%
                        background: $color-primary
                        border: 2px solid #fff
                        cursor: pointer
                        position: relative

                        &::before
                            content: ''
                            position: absolute
                            top: 0
                            width: 100px
                            height: 2px
                            background: $color-primary

                    ::-webkit-slider-runnable-track
                        height: 10px
                        -webkit-appearance: none
                        color: #13bba4
                        margin-top: -1px
</style>