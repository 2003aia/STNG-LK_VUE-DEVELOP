<template lang="pug">
#app
    .app(v-if="!isLoggedIn")
        Auth
    .app(v-else)
        .app__overlay(v-if="$store.state.overlay" @click="$store.dispatch('hideOverlay')")
        .modal.modal_sign(v-if="$store.state.overlay")
            .modal__header
                Button(size="small") Скачать договор для ознакомления
            .modal__main
                .modal__plugin
                    .modal__plugin-text Плагин не доступен
                .modal__cert
                    .modal__cert-label Сертификат:
                    .modal__cert-value Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            .modal__footer
                Button(size="small") Подписать договор
        .app__header
            .app__wrapper
                router-link.app__header-logo(to='/')
                    img(src="@/assets/images/logo.png")
                .app__header-mobile-menu(@click="mobileMenu = !mobileMenu")
                    img(src="@/assets/images/burger.svg" v-if="!mobileMenu")
                    img(src="@/assets/images/menu-close.svg" v-if="mobileMenu")
                .app__header-actions
                    a.app__backward(href="/")
                        span Вернуться на основной сайт
                        Icon(color="font-mute" icon="backward")

                    .app__header-contacts
                        Icon(color="primary" icon="message")
                        span Контакты
                .app__header-user
                    router-link(to="/profile")
                        Button(icon="user" square style="flex-shrink:0")
                    ButtonClick(icon="exit" variety="secondary" full style="margin-right:0" @click="$store.dispatch('logoutUser')") Завершить сеанс
        .app__main(v-if="isLoggedIn")
            .app__wrapper
                .app__sidebar(
                    :class="{'app__sidebar_small': ($route.name === 'services-requests' && !isMobile),'app__sidebar_active': mobileMenu}"
                )
                    Menu
                .app__content
                    //- My
                    router-view
</template>

<script>
import {
    Menu,
    Button,
    Icon,
    ButtonClick
} from '@/components'

import Auth from '@/views/auth'
import My from '@/views/services/my'
export default {
    name: 'App',
    data () {
        return {
            mobileMenu: false,
        }
    },
    components: {
        ButtonClick, Menu, Icon, Button, Auth, My
    },
    watch: {
        $route (to, from) {
            this.mobileMenu = false
        }
    },
    computed: {
        isMobile () {
            return screen.width < 760
        },
        isLoggedIn () {
            return this.$store.getters.cuser.isLoggedIn
        }
    },
    mounted () {
        this.$store.dispatch('init')
    }
}
</script>

<style lang="sass">
@import ~@/assets/styles/fonts
@import ~@/assets/styles/vars

.app
    display: flex
    width: 100vw
    height: 100vh
    font-family: 'HelveticaNeueCyr'
    flex:
        direction: column
    overflow-y: auto
    overflow-x: hidden
    color: $color-font

    &__overlay
        position: fixed
        top: 0
        left: 0
        width: 100vw
        height: 100vh
        background: rgba(0,0,0,.2)
        z-index: 100
        display: flex
        justify-content: center
        align-items: center

    *
        box-sizing: border-box
    
    a
        color: $color-primary
        text-decoration: none
        font-weight: 500

    button, input
        font-family: 'HelveticaNeueCyr'
    
    p
        margin: 1rem 0
        line-height: 1.5rem
        font-size: .8125rem
    
    strong
        font-weight: 500

    &__header
        display: flex
        justify-content: center
        align-items: center
        border-bottom: 1px solid $color-border
        flex-shrink: 0

        @media screen and (max-width: $mobile-width)
            height: 56px

        &-mobile-menu
            display: none

            @media screen and (max-width: $mobile-width)
                display: flex
                width: 56px
                border-left: 1px solid $color-border
                align-items: center
                justify-content: center

        &-logo
            width: 18rem
            flex-shrink: 0
            padding: 1rem 0

            img
                width: 100%

            @media screen and (max-width: $mobile-width)
                width: auto
                padding: 0 16px
                display: flex
                align-items: center
                flex-grow: 1

                img
                    width: 221px

        &-actions
            flex-grow: 1
            padding: 0 1.5rem
            display: flex
            justify-content: space-between
            align-items: center

            @media screen and (max-width: $mobile-width)
                display: none
        
        &-user
            width: 18rem
            flex-shrink: 0
            padding-left: 1.5rem
            display: flex
            align-items: center
            border-left: 1px solid $color-border

            .button
                margin-right: .5rem

            @media screen and (max-width: $mobile-width)
                display: none

        &-contacts
            display: flex
            align-items: center
            color: $color-primary
            cursor: pointer

            .icon
                margin-top: .3rem

            span
                margin-left: .5rem
                font:
                    size: .95rem
                    weight: 500

            @media screen and (max-width: $mobile-width)
                display: none

    &__wrapper
        width: 77rem
        flex-shrink: 0
        height: 100%
        display: flex
        justify-content: space-between

        @media screen and (max-width: $mobile-width)
            width: 100vw

    &__backward
        display: flex
        text-decoration: none

        span
            margin-right: .75rem
            font:
                size: .95rem
                weight: 500
            color: $color-font-mute
        
        .icon
            margin-top: .2rem

    &__main
        display: flex
        justify-content: center
        align-items: flex-start
        flex-grow: 1

        @media screen and (max-width: $mobile-width)
            height: calc(100vh - 56px)
            max-height: calc(100vh - 56px)
            overflow-y: auto

    &__sidebar
        width: 18rem
        flex-shrink: 0
        border-right: 1px solid $color-border
        height: 100%

        &_small
            width: 42px
            .menu
                &__item
                    line-height: 32px

                    .icon
                        height: 32px
                span
                    display: none

        @media screen and (max-width: $mobile-width)
            position: fixed
            z-index: 100
            background: white
            width: 100vw
            height: calc(100vh - 56px)
            padding: 0 24px
            display: none
            overflow-y: auto

            &_active
                display: flex
    
    &__content
        width: 100%
        flex-grow: 1

.modal
    background: white
    padding: 24px
    position: absolute
    z-index: 100

    @media screen and (max-width: $mobile-width)
        padding: 16px

    &_sign
        width: 600px
        left: 50%
        top: 50%
        margin-left: -300px
        margin-top: -206px

        @media screen and (max-width: $mobile-width)
            width: calc(100vw - 64px)
            left: 32px
            margin-left: 0
            margin-top: 0
            top: 32px
    
    &__header,
    &__footer
        display: flex
        align-items: center
        justify-content: center

    &__header
        @media screen and (max-width: $mobile-width)
            .button
                height: auto
                padding: 10px 0
                line-height: 20px

    &__main
        padding: 16px 0

    &__plugin
        height: 100px
        border: 2px solid $color-border
        border-radius: 4px
        padding: 20px
        text-align: center
        color: $color-primary
        font-size: 13px
        line-height: 13px

        @media screen and (max-width: $mobile-width)
            height: auto

    &__cert
        margin-top: 16px

        &-label
            color: $color-primary
            text-align: center
            font:
                size: 13px
                weight: 500
            line-height: 13px

        &-value
            padding: 16px
            font-size: 13px
            line-height: 24px
            border: 2px solid $color-border
            border-radius: 4px
            margin-top: 16px

            @media screen and (max-width: $mobile-width)
                height: 100px
                overflow-y: auto
</style>
