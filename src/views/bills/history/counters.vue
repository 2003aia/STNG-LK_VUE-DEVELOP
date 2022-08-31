<template lang="pug">
.history__table.bills-history-counters
    div(v-if="!isMobile")
        .history__table-row.history__table-row_heading
            .history__table-cell(style="width:50%") Дата
            .history__table-cell(style="width:50%") Счетчик
            .history__table-cell Показания
        .history__table-row(v-for="item in data")
            .history__table-cell(style="width:50%") {{ item.date }}
            .history__table-cell(style="width:50%")
                span {{ item.counter }}
            .history__table-cell
                span {{ item.value }}
    div(v-if="isMobile")
        .mobile-table
            .mobile-table__item(v-for="item in data")
                .mobile-table__field
                    .mobile-table__key Дата
                    .mobile-table__value {{ item.date }}
                .mobile-table__field
                    .mobile-table__key Счетчик
                    .mobile-table__value {{ item.counter }}
                .mobile-table__field
                    .mobile-table__key Показания
                    .mobile-table__value {{ item.value }}
</template>

<script>
export default {
    name: 'BillsHistoryCounters',
    data () {
        return {
            data: [
                {
                    date: '09.10.2019',
                    counter: '№2281964',
                    value: 256
                },
                {
                    date: '16.09.2019',
                    counter: '№2281969',
                    value: 317
                },
                {
                    date: '12.09.2019',
                    counter: '№2281964',
                    value: 196
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
        formatPrice (value) {
            return value.toLocaleString('ru-RU') + ' руб.'
        },
    }
}
</script>

<style lang="sass">
@import @/assets/styles/vars

.bills-history-counters
    span
        color: $color-primary
</style>