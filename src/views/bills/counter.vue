<template lang="pug">
.layout.bills-counter
    .layout__main
        Back(v-if="!isMobile" goto="/bills")
        .layout__title Оплата [Лицевой счет №101016437]
        div(:style="{margin:isMobile?'0 -16px':'0 -24px'}")
            .layout__tabs
                router-link.layout__tabs-item(to="/bills/counter" :class="{'layout__tabs-item_active': $route.name === 'bills-counter'}") Показания счетчиков
                router-link.layout__tabs-item(to="/bills/pay" :class="{'layout__tabs-item_active': $route.name === 'bills-pay'}") Оплата
            .history__table(v-if="!isMobile")
                .history__table-row.history__table-row_heading
                    .history__table-cell № счетчика
                    .history__table-cell Показания счетчика
                    .history__table-cell Дата поверки
                    .history__table-cell Новые показания
                .history__table-row(v-for="item in rows")
                    .history__table-cell {{ item.number }}
                    .history__table-cell {{ item.value }}
                    .history__table-cell
                        div(:style="{color:getColor(item.date)}") {{ formatDate(item.date) }}
                    .history__table-cell
                        input(type="number" v-model="item.newValue" placeholder="Введите показания счетчика")
            
            .mobile-table.mobile-table_variant(v-if="isMobile")
                .mobile-table__item(v-for="item in rows")
                    .mobile-table__title {{ item.number }}
                    .mobile-table__field
                        .mobile-table__key Показания счетчика
                        .mobile-table__value {{ item.value }}
                    .mobile-table__field
                        .mobile-table__key Дата поверки
                        .mobile-table__value
                            div(:style="{color:getColor(item.date)}") {{ formatDate(item.date) }}
                    .mobile-table__field
                        .mobile-table__key Новые показания
                        .mobile-table__value
                            input(type="number" v-model="item.newValue" placeholder="Введите показания")
            .bills-counter__footer.bills-counter__footer_variant
                .bills-counter__description В случае неправильного ввода показаний счетчика, следует обратиться в абонентский отдел УГРС по тел. 8(4112) 46-00-30, 46-00-41, 46-00-71.
                .bills-counter__submit
                    Button(size="small") Подтвердить
</template>

<script>
import { Back, Button } from '@/components'
import DatePicker from 'vue2-datepicker'
import moment from 'moment'

export default {
    name: 'BillsCounter',
    components: {
        Back, Button, DatePicker
    },
    data () {
        return {
            rows: [
                {
                    number: '№2281964',
                    value: 1680,
                    date: '2020-10-10',
                    newValue: ''
                },
                {
                    number: '№2281969',
                    value: 2850,
                    date: '2020-03-25',
                    newValue: ''
                }
            ]
        }
    },
    methods: {
        formatDate (date) {
            return moment(date).format('DD.MM.YYYY')
        },
        getColor (date) {
            let deadline = moment(date).subtract(7, 'days')
            return deadline >= moment() ? '#7F8DA8' : '#C10909'
        }
    },
    computed: {
        isMobile () {
            return screen.width < 760
        }
    }
}
</script>

<style lang="sass">
@import @/assets/styles/vars

.bills-counter
    border-right: 1px solid $color-border

    .layout__title
        font-size: 17px
        margin-bottom: 24px

        @media screen and (max-width: $mobile-width)
            margin-bottom: 0
            font-size: 15px

    &__footer
        display: flex
        align-items: center
        padding: 24px

        &_variant
            @media screen and (max-width: $mobile-width)
                flex-direction: column-reverse !important

        @media screen and (max-width: $mobile-width)
            flex-direction: row-reverse
            padding: 0 16px 16px
            margin-top: 0

            .button
                margin-right: 13px
                width: 100%

    &__submit
        @media screen and (max-width: $mobile-width)
            width: 100%

    &__description
        width: 600px
        color: $color-font-mute
        font:
            size: 13px
        line-height: 24px

        @media screen and (max-width: $mobile-width)
            width: 100%
            margin-top: 16px
            text-align: center
</style>