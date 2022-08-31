<template lang="pug">
.layout
    .layout__main
        .bills-list
            Card(
                :title="billItem.name"
                :key="billIndex"
                v-for="(billItem, billIndex) in bills"
                angle
                :index="billIndex"
                menu)
                template(v-slot:card)
                    .bills-list__card-menu(v-if="openedMenu.includes(billIndex)")
                        router-link(to="/bills/history").bills-list__card-menu-item История
                        router-link(to="#").bills-list__card-menu-item Удалить
                template(v-slot:client)
                    | {{ billItem.client.name }}
                    br
                    | {{ billItem.client.address }}
                template(v-slot:bill)
                    | Задолженность: 
                    span {{ billItem.billing.debt.toLocaleString('ru-RU') + ' руб.' }}
                    br
                    | Пени: 
                    span {{ billItem.billing.penalties.toLocaleString('ru-RU') + ' руб.' }}
                
                template(v-slot:footer)
                    Button(variety="white" to="/bills/pay") Оплатить
                    Button(variety="primary-light" to="/bills/counter")
                        | Внести показания {{ isMobile ? '' : 'счетчика' }}
                    Button(variety="primary-light-outline" to="/bills/history" v-if="!isMobile") История
                    Button(variety="primary-light-outline" v-if="!isMobile") Удалить
            
            Button(variety="add-list" to="/bills/create") Добавить лицевой счет
    LayoutSidebar
        router-link(to="#") Все обращения
        SidebarSupport
</template>

<script>
import {
    Card,
    Button,
    LayoutSidebar,
    SidebarSupport,
} from '@/components'

export default {
    name: 'BillsList',
    data () {
        return {
            openedMenu: []
        }
    },
    components: {
        Card, Button, LayoutSidebar, SidebarSupport
    },
    computed: {
        bills () {
            return this.$store.state.bills
        },
        isMobile () {
            return screen.width < 760
        }
    },
    mounted () {
        this.$store.dispatch('getBills')
    }
}
</script>

<style lang="sass">
@import @/assets/styles/vars

.layout
    &__main
        @media screen and (max-width: $mobile-width)
            padding: 16px !important

.bills-list
    @media screen and (max-width: $mobile-width)
        padding-bottom: 16px

    &__card-menu
        display: none

        @media screen and (max-width: $mobile-width)
            display: flex
            position: absolute
            flex-direction: column
            background: white
            right: 8px
            top: 46px
            width: 180px
            z-index: 90
            border-radius: 5px

            &:after
                content: ''
                position: absolute
                border-bottom: 6px solid white
                border-left: 8px solid transparent
                border-right: 8px solid transparent
                top: -6px
                right: 12px

        &-item
            padding: 12px 16px
            font:
                size: 13px
                weight: 500
            line-height: 20px
            border-bottom: 1px solid $color-border

            &:last-child
                border-bottom: none
</style>