<template lang="pug">
.services-request.layout__main
    .layout__title Подключение газа

    p
        strong Технологическое присоединение 
        | — комплексная услуга для физических лиц, ИП и юридических лиц, состоящая из организационных и технических действий и предусматривающая врезку и пуск газа, позволяющая объекту капитального строительства использовать газ, поступающий из сети газораспределения

    p
        strong Стоимость по технологическому присоединению определяется методическими указаниями по расчету размера платы за технологическое присоединение газоиспользующего оборудования к сетям газораспределения и (или) стандартизированных тарифных ставок, определяющих ее величину (далее - Методические указания) утв. Приказом ФСТ N 101-э/3 от 28 апреля 2014 г.
    
    .services-request__types
        .services-request__type(v-for="(type, typeIndex) in types")
            .services-request__type-info
                .services-request__type-title {{ type.name }}
                .services-request__type-price от {{ formatCurrency(type.price) }}
            .services-request__type-action
                Button(style="height:40px;font-size:.8125rem" to="form")
                    | Заказать {{ isMobile ? '' : 'услугу' }}
</template>

<script>
import {
    Button
} from '@/components'

export default {
    name: 'ServicesRequest',
    data () {
        return {
            types: [
                {
                    name: 'Физическим лицам',
                    price: 60000
                },
                {
                    name: 'Предпринимателям',
                    price: 60000
                },
                {
                    name: 'Юридическим лицам',
                    price: 60000
                }
            ]
        }
    },
    computed: {
        isMobile () {
            return screen.width < 760
        }
    },
    methods: {
        formatCurrency: value => {
            return value.toLocaleString('ru-RU', { minimumFractionDigits: 0 }) + ' руб.'
        }
    },
    components: {
        Button
    }
}
</script>

<style lang="sass">
@import @/assets/styles/vars

.services-request
    &__types
        display: flex
        margin-top: 2rem

        @media screen and (max-width: $mobile-width)
            flex-direction: column
    
    &__type
        width: 100%
        border-right: 1px solid $color-border
        margin-right: 1.5rem
        display: flex
        flex:
            direction: column
        
        &:last-child
            margin-right: 0
            border-right: none

        @media screen and (max-width: $mobile-width)
            display: flex
            flex-direction: row
            justify-content: space-between
            align-items: center
            border-right: none
            border-bottom: 1px solid $color-border
            margin-bottom: 16px
            padding-bottom: 16px

            &:last-child
                padding-bottom: 0
                border-bottom: none
                margin-bottom: 0

        &-title
            line-height: 1.5rem
            color: $color-primary
            font:
                size: .9375rem
                weight: 500
        
        &-price
            line-height: 1.5rem
            margin-top: .5rem
            font-size: .8125rem
            color: $color-font-mute

            @media screen and (max-width: $mobile-width)
                margin-top: 0

        &-action
            margin-top: 1rem

            @media screen and (max-width: $mobile-width)
                margin-top: 0
</style>