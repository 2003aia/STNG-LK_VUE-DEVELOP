<template lang="pug">
.layout.bills-history
    .layout__main
        Back(v-if="!isMobile" goto="/agreements/")
        .layout__title История [Лицевой счет №101016437]
        div(:style="{margin:isMobile?'0 -16px':'0 -24px'}")
            .layout__tabs
                router-link.layout__tabs-item(to="/bills/history" :class="{'layout__tabs-item_active': $route.name === 'bills-history-payments'}") Платежи
                router-link.layout__tabs-item(to="/bills/history/counters" :class="{'layout__tabs-item_active': $route.name === 'bills-history-counters'}")
                    | Показания{{ isMobile ? '': ' счетчиков' }}
                .bills-history__date-filter
                    .bills-history__date-filter-input
                        date-picker(
                            v-model="filter.date"
                            :editable="false"
                            :clearable="true"
                            :format="isMobile?'DD.MM':'DD.MM.YYYY'"
                            :range="true"
                            placeholder="Выбрать период"
                            :class="{'datepicker_filled': filter.date}")
                    .bills-history__date-filter-icon
                        img(src="@/assets/images/calendar.svg")
            router-view
    LayoutSidebar
        router-link(to="#") Все обращения
        SidebarSupport
</template>

<script>
import { Back, LayoutSidebar, SidebarSupport } from '@/components'
import DatePicker from 'vue2-datepicker'

export default {
    name: 'BillsHistory',
    data () {
        return {
            filter: {
                date: ''
            }
        }
    },
    computed: {
        isMobile () {
            return screen.width < 760
        }
    },
    components: {
        Back, LayoutSidebar, DatePicker, SidebarSupport
    }
}
</script>

<style lang="sass">
@import @/assets/styles/vars

.bills-history
    border-right: 1px solid $color-border
    .layout__title
        font-size: 17px
        margin-bottom: 24px

        @media screen and (max-width: $mobile-width)
            margin-bottom: 0
            font-size: 15px

    .layout__tabs
        position: relative

    &__footer
        display: flex
        justify-content: flex-end
        align-items: center
        margin-top: 15px
        padding-right: 80px

    &__total
        font:
            size: 13px
        color: $color-font
        margin-right: 24px

        span
            color: $color-primary
            margin-left: 8px

    &__date-filter
        display: flex
        position: absolute
        right: 24px
        top: 12px
        align-items: center
        cursor: pointer

        @media screen and (max-width: $mobile-width)
            right: 16px

        &-icon
            margin-left: 10px

        .mx-icon-clear
            z-index: 100
            right: auto
            left: -18px

        input
            font-size: 12px
            border: none
            cursor: pointer
            padding: 0
            text-align: right

            @media screen and (max-width: $mobile-width)
                width: 100px
</style>