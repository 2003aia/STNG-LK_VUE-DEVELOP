<template lang="pug">
.history__table.bills-history-payments
    div(v-if="!isMobile")
        .history__table-row.history__table-row_heading
            .history__table-cell(style="width:50%") Дата
            .history__table-cell(style="width:50%") Сумма платежа
            .history__table-cell Показания
        .history__table-row(v-for="item in data")
            .history__table-cell(style="width:50%") {{ item.date }}
            .history__table-cell(style="width:50%")
                span {{ formatPrice(item.amount) }}
            .history__table-cell
                .bills-history-payments__counter Счетчик №{{ item.counters[0].number }} - 
                    span {{ item.counters[0].value }}
                    img(src="@/assets/images/angle-down.svg")
                    .bills-history-payments__pop
                        .bills-history-payments__pop-item(v-for="(counter, counterIndex) in item.counters" v-if="counterIndex !== 0")
                            | Счетчик №{{ counter.number }} - 
                            span {{ counter.value }}


    div(v-if="isMobile")
        .mobile-table
            .mobile-table__item(v-for="item in data")
                .mobile-table__field
                    .mobile-table__key Дата
                    .mobile-table__value {{ item.date }}
                .mobile-table__field
                    .mobile-table__key Сумма платежа
                    .mobile-table__value {{ formatPrice(item.amount) }}
                .mobile-table__field
                    .mobile-table__key Показания
                    .mobile-table__value {{ item.counters[0].number }}
</template>

<style lang="sass">
@import @/assets/styles/vars

.bills-history-payments
    .history__table-cell
        color: $color-font-mute

    &__counter
        cursor: pointer
        display: flex
        align-items: center
        position: relative
        height: 16px
        margin-top: 20px

        img
            margin-left: 4px

        &:hover
            .bills-history-payments__pop
                opacity: 1
                visibility: visible
                top: 36px

    &__pop
        position: absolute
        background: $color-primary
        top: 30px
        left: -16px
        width: 200px
        border-radius: 0 4px 4px 4px
        z-index: 99
        visibility: hidden
        opacity: 0
        transition: .2s

        &:before
            content: ''
            border-bottom: 8px solid $color-primary
            border-right: 8px solid transparent
            position: absolute
            top: -8px

        &-item
            padding: 8px 16px
            border-bottom: 1px solid #547AC1
            line-height: 40px
            color: #ADC4F0

            &:last-child
                border-bottom: none

            span
                color: white

</style>

<script>
export default {
    name: 'BillsHistoryPayments',
    data () {
        return {
            data: [
                {
                    date: '09.10.2019',
                    amount: 5780,
                    counters: [
                        { number: '2281964', value: 256 },
                        { number: '2281948', value: 14 },
                        { number: '2281969', value: 167 },
                    ],
                },
                {
                    date: '16.09.2019',
                    amount: 780,
                    counters: [
                        { number: '2281964', value: 192 },
                        { number: '2281948', value: 14 },
                        { number: '2281969', value: 167 },
                    ]
                },
                {
                    date: '21.08.2019',
                    amount: 570,
                    counters: [
                        { number: '2281964', value: 192 },
                        { number: '2281948', value: 14 },
                        { number: '2281969', value: 167 },
                    ]
                }
            ]
        }
    },
    methods: {
        formatPrice (value) {
            return value.toLocaleString('ru-RU') + ' руб.'
        },
    },
    computed: {
        isMobile () {
            return screen.width < 760
        }
    }
}
</script>