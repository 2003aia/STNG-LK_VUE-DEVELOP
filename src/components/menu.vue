<template lang="pug">
.menu
    //- router-link(to="/").menu__item
        Icon(icon="home" color="font-mute")
        span Главная

    //- router-link(to="/bills").menu__item
        Icon(icon="bills" color="font-mute")
        span Лицевые счета

    router-link(to="/agreements/").menu__item
        Icon(icon="bills" color="font-mute")
        span Договора
    router-link(to="/services/requests").menu__item
        Icon(icon="bills" color="font-mute")
        span Мои заявки
    //- router-link(to="/history").menu__item
    //-     Icon(icon="history" color="font-mute")
    //-     span История платежей

    a(href="https://aostng.ru/service/chart5/").menu__item
        Icon(icon="services" color="font-mute")
        span Услуги

    router-link(to="/profile").menu__item
        Icon(icon="user" color="font-mute")
        span Мои данные
    
    //- router-link(to="/pre-entry").menu__item
    //-     Icon(icon="calendar" color="font-mute")
    //-     span Предварительная запись
    a(href="https://aostng.ru/prereg.php").menu__item
        Icon(icon="calendar" color="font-mute")
        span Предварительная запись
    
    router-link(to="/support").menu__item
        Icon(icon="comments" color="font-mute")
        span Мои обращения

    router-link(to="#" v-if="isMobile" @click.native="$store.dispatch('logoutUser')").menu__item
        Icon(icon="logout" color="font-mute")
        span Завершить сеанс

    //.menu__bottom(style="margin-bottom:24px")
        button.button.button_size_small(:class="{'button_sidebar_icon': ($route.name === 'services-requests' && !isMobile)}" style="width:100%" )
            span(v-if="$route.name !== 'services-requests' || isMobile") Узнать статус договора ТП
            img(src="@/assets/images/document.svg" v-if="$route.name === 'services-requests' && !isMobile")
</template>

<script>
import Icon from '@/components/icon'
import Button from '@/components/button'

export default {
    name: 'Menu',
    components: {
        Icon, Button
    },
    computed: {
        isMobile () {
            return this.$screen.width < 760
        }
    }
}
</script>

<style lang="sass">
@import @/assets/styles/vars

.button_sidebar_icon
    padding: 0
    width: 32px !important
    height: 32px
    margin-left: -6px

.menu
    display: flex
    flex:
        direction: column

    @media screen and (max-width: $mobile-width)
        width: 100%
    
    &__bottom
        width: 100%
        margin-top: 24px
        padding-right: 50px

        @media screen and (max-width: $mobile-width)
            padding: 0

    .button
        @media screen and (max-width: $mobile-width)
            width: 100%

    &__item
        display: flex
        margin-top: 1.5rem
        line-height: 2rem
        align-items: center
        text-decoration: none
        transition: .2s
        flex-shrink: 0

        .icon
            margin-right: 1.5rem
            flex-shrink: 0
        
        span
            font:
                weight: 500
                size: .95rem
            color: $color-font-mute

        &:hover,
        &.router-link-active
            color: $color-primary

            span
                color: $color-primary

            path
                fill: $color-primary
        
        &:first-child
            &.router-link-active
                span
                    color: $color-font-mute

                path
                    fill: $color-font-mute
            
            &.router-link-exact-active
                span
                    color: $color-primary

                path
                    fill: $color-primary
</style>
