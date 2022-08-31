<template lang="pug">
.layout.bills-pay
    .layout__main
        Back(v-if="!isMobile" goto="/agreements/")
        .layout__title Оплата [Лицевой счет №101016437]
        div(:style="{margin:isMobile?'0 -16px':'0 -24px'}")
            .layout__tabs
                router-link.layout__tabs-item(to="/bills/counter" :class="{'layout__tabs-item_active': $route.name === 'bills-couter'}") Показания счетчиков
                router-link.layout__tabs-item(to="/bills/pay" :class="{'layout__tabs-item_active': $route.name === 'bills-pay'}") Оплата
            .history__table(v-if="!isMobile")
                .history__table-row.history__table-row_heading
                    .history__table-cell Услуга
                    .history__table-cell(style="width:40%") Задолженность
                    .history__table-cell(style="width:40%") Пени
                    .history__table-cell(style="width:40%") Итого
                .history__table-row
                    .history__table-cell Сетевой газ
                    .history__table-cell(style="width:40%") {{ formatPrice(gas.debt) }}
                    .history__table-cell(style="width:40%") {{ formatPrice(gas.penalties) }}
                    .history__table-cell(style="width:40%")
                        input(v-if="gas.debt !== 0 || gas.penalties !== 0" type="number" v-model="gas.toPay" placeholder="Введите сумму")
                        span(v-if="gas.debt === 0 && gas.penalties === 0") {{ formatPrice(0) }}
                .history__table-row
                    .history__table-cell Техобслуживание
                    .history__table-cell(style="width:40%") {{ formatPrice(maintenance.debt) }}
                    .history__table-cell(style="width:40%") {{ formatPrice(maintenance.penalties) }}
                    .history__table-cell(style="width:40%")
                        input(v-if="maintenance.debt !== 0 || maintenance.penalties !== 0" type="number" v-model="maintenance.toPay" placeholder="Введите сумму")
                        span(v-if="maintenance.debt === 0 && maintenance.penalties === 0") {{ formatPrice(0) }}
                .history__table-row
                    .history__table-cell Госпошлина
                    .history__table-cell(style="width:40%") {{ formatPrice(stadeDuty.debt) }}
                    .history__table-cell(style="width:40%") {{ formatPrice(stadeDuty.penalties) }}
                    .history__table-cell(style="width:40%")
                        input(v-if="stadeDuty.debt !== 0 || stadeDuty.penalties !== 0" type="number" v-model="stadeDuty.toPay" placeholder="Введите сумму")
                        span(v-if="stadeDuty.debt === 0 && stadeDuty.penalties === 0") {{ formatPrice(0) }}
                .history__table-row
                    .history__table-cell Штрафы
                    .history__table-cell(style="width:40%") {{ formatPrice(fines.debt) }}
                    .history__table-cell(style="width:40%") {{ formatPrice(fines.penalties) }}
                    .history__table-cell(style="width:40%")
                        input(v-if="fines.debt !== 0 || fines.penalties !== 0" type="number" v-model="fines.toPay" placeholder="Введите сумму")
                        span(v-if="fines.debt === 0 && fines.penalties === 0") {{ formatPrice(0) }}
                .history__table-row
                    .history__table-cell Подключение/отключение
                    .history__table-cell(style="width:40%") {{ formatPrice(connect.debt) }}
                    .history__table-cell(style="width:40%") {{ formatPrice(connect.penalties) }}
                    .history__table-cell(style="width:40%")
                        input(v-if="connect.debt !== 0 || connect.penalties !== 0" type="number" v-model="connect.toPay" placeholder="Введите сумму")
                        span(v-if="connect.debt === 0 && connect.penalties === 0") {{ formatPrice(0) }}
            
            .mobile-table.mobile-table_variant(v-if="isMobile")
                .mobile-table__item
                    .mobile-table__title Сетевой газ
                    .mobile-table__field
                        .mobile-table__key Задолженность
                        .mobile-table__value
                            span {{ formatPrice(gas.debt) }}
                    .mobile-table__field
                        .mobile-table__key Пени
                        .mobile-table__value {{ formatPrice(gas.penalties) }}
                    .mobile-table__field
                        .mobile-table__key Итого
                        .mobile-table__value
                            input(v-if="gas.debt !== 0 || gas.penalties !== 0" type="number" v-model="gas.toPay" placeholder="Введите сумму")
                            span(v-if="gas.debt === 0 && gas.penalties === 0") {{ formatPrice(0) }}
                .mobile-table__item
                    .mobile-table__title Техобслуживание
                    .mobile-table__field
                        .mobile-table__key Задолженность
                        .mobile-table__value
                            span {{ formatPrice(maintenance.debt) }}
                    .mobile-table__field
                        .mobile-table__key Пени
                        .mobile-table__value {{ formatPrice(maintenance.penalties) }}
                    .mobile-table__field
                        .mobile-table__key Итого
                        .mobile-table__value
                            input(v-if="maintenance.debt !== 0 || maintenance.penalties !== 0" type="number" v-model="maintenance.toPay" placeholder="Введите сумму")
                            span(v-if="maintenance.debt === 0 && maintenance.penalties === 0") {{ formatPrice(0) }}
                .mobile-table__item
                    .mobile-table__title Госпошлина
                    .mobile-table__field
                        .mobile-table__key Задолженность
                        .mobile-table__value
                            span {{ formatPrice(stadeDuty.debt) }}
                    .mobile-table__field
                        .mobile-table__key Пени
                        .mobile-table__value {{ formatPrice(stadeDuty.penalties) }}
                    .mobile-table__field
                        .mobile-table__key Итого
                        .mobile-table__value
                            input(v-if="stadeDuty.debt !== 0 || stadeDuty.penalties !== 0" type="number" v-model="stadeDuty.toPay" placeholder="Введите сумму")
                            span(v-if="stadeDuty.debt === 0 && stadeDuty.penalties === 0") {{ formatPrice(0) }}
                .mobile-table__item
                    .mobile-table__title Штрафы
                    .mobile-table__field
                        .mobile-table__key Задолженность
                        .mobile-table__value
                            span {{ formatPrice(fines.debt) }}
                    .mobile-table__field
                        .mobile-table__key Пени
                        .mobile-table__value {{ formatPrice(fines.penalties) }}
                    .mobile-table__field
                        .mobile-table__key Итого
                        .mobile-table__value
                            input(v-if="fines.debt !== 0 || fines.penalties !== 0" type="number" v-model="fines.toPay" placeholder="Введите сумму")
                            span(v-if="fines.debt === 0 && fines.penalties === 0") {{ formatPrice(0) }}
                .mobile-table__item
                    .mobile-table__title Подключение/отключение
                    .mobile-table__field
                        .mobile-table__key Задолженность
                        .mobile-table__value
                            span {{ formatPrice(connect.debt) }}
                    .mobile-table__field
                        .mobile-table__key Пени
                        .mobile-table__value {{ formatPrice(connect.penalties) }}
                    .mobile-table__field
                        .mobile-table__key Итого
                        .mobile-table__value
                            input(v-if="connect.debt !== 0 || connect.penalties !== 0" type="number" v-model="connect.toPay" placeholder="Введите сумму")
                            span(v-if="connect.debt === 0 && connect.penalties === 0") {{ formatPrice(0) }}
            
            .bills-pay__footer
                .bills-pay__total Итого к оплате
                    span {{ formatPrice(calculateTotal()) }}
                .bills-pay__pay
                    Button(size="small") Оплатить
</template>

<script>
import { Back, Button } from '@/components'

export default {
    name: 'BillsPay',
    components: {
        Back, Button
    },
    data () {
        return {
            gas: {
                label: 'Сетевой газ',
                debt: 760,
                penalties: 0,
                toPay: ''
            },
            maintenance: {
                label: 'Техобслуживание',
                debt: 7296,
                penalties: 0,
                toPay: ''
            },
            stadeDuty: {
                label: 'Техобслуживание',
                debt: 0,
                penalties: 0,
                toPay: ''
            },
            fines: {
                label: 'Госпошлина',
                debt: 0,
                penalties: 0,
                toPay: ''
            },
            connect: {
                label: 'Штрафы',
                debt: 0,
                penalties: 0,
                toPay: ''
            }
        }
    },
    methods: {
        formatPrice (value) {
            return value.toLocaleString('ru-RU') + ' руб.'
        },
        calculateTotal () {
            return (this.gas.toPay === '' ? 0 : +this.gas.toPay) + 
                (this.maintenance.toPay === '' ? 0 : +this.maintenance.toPay) + 
                (this.stadeDuty.toPay === '' ? 0 : +this.stadeDuty.toPay) + 
                (this.fines.toPay === '' ? 0 : +this.fines.toPay) + 
                (this.connect.toPay === '' ? 0 : +this.connect.toPay)
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

.bills-pay
    border-right: 1px solid $color-border
    .layout__title
        font-size: 17px
        margin-bottom: 24px

        @media screen and (max-width: $mobile-width)
            margin-bottom: 0
            font-size: 15px

    &__footer
        display: flex
        justify-content: flex-end
        align-items: center
        margin-top: 15px
        padding-right: 80px

        @media screen and (max-width: $mobile-width)
            flex-direction: row-reverse
            padding: 0 16px 16px
            margin-top: 0

            .button
                margin-right: 13px

        &_variant
            @media screen and (max-width: $mobile-width)
                flex-direction: column
                align-items: flex-start

                & > div
                    width: 100%

            .button
                @media screen and (max-width: $mobile-width)
                    width: 100%
                    margin-right: 0
                    flex-grow: 1

    &__total
        font:
            size: 13px
        color: $color-font
        margin-right: 24px

        @media screen and (max-width: $mobile-width)
            margin-right: 0
            margin-bottom: 16px

        span
            color: $color-primary
            margin-left: 8px

    &__print
        margin-left: 8px

        @media screen and (max-width: $mobile-width)
            width: 60%

    &__pay
        @media screen and (max-width: $mobile-width)
            width: 40%
</style>