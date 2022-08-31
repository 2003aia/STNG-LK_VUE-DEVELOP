<template lang="pug">
.layout.history
    .layout__main
        .layout__title История платежей

        .history__table
            .history__table-row.history__table-row_heading
                .history__table-cell Дата
                .history__table-cell Сумма платежа
                .history__table-cell(style="width:50%") Показания
            .history__table-row(v-for="historyItem in history")
                .history__table-cell {{ formatDate(historyItem.date) }}
                .history__table-cell
                    span {{ formatCurrency(historyItem.amount) }}
                .history__table-cell(style="width:50%")
                    span {{ historyItem.meters }}
    LayoutSidebar
        router-link(to="#") Все обращения
</template>

<script>
import moment from 'moment'

import {
    LayoutSidebar,
} from '@/components'

export default {
    name: 'History',
    components: {
        LayoutSidebar,
    },
    computed: {
        history () {
            return this.$store.state.history
        }
    },
    mounted () {
        this.$store.dispatch('getHistory')
    },
    methods: {
        formatDate (date) {
            return moment(date).format('DD.MM.YYYY')
        },
        formatCurrency: value => {
            return value.toLocaleString('ru-RU', { minimumFractionDigits: 2 }) + ' руб.'
        }
    }
}
</script>

<style lang="sass">
@import @/assets/styles/vars
.history
    .layout__main
        padding: 0

        .layout__title
            margin: 1.5rem !important
    
    &__table
        border-top: 1px solid $color-border
        padding: 0 1.5rem

        @media screen and (max-width: $mobile-width)
            padding: 16px

        &-row
            border-bottom: 1px solid $color-border
            display: flex

            &_heading
                .history__table-cell
                    color: $color-font-mute
        
        &-cell
            width: 100%
            flex-grow: 1
            line-height: 56px
            font-size: .8125rem
            color: $color-font

            span
                color: $color-primary

        input
            border: none
            width: 100%
            font-size: 13px

            &:focus
                outline: none

        .mx-datepicker
            input
                padding: 0
</style>