<template lang="pug">
.layout.support.layout_column
    .support__mobile-back(v-if="isMobile && mobileScreen === 'chat'")
        a(@click="mobileScreen = 'requests'")
            img(src="@/assets/images/back-triangle.svg")
            span Назад
    .layout__top(
        :style="{borderBottom:isMobile?'1px solid #E6ECF5':''}"
        v-if="($route.name !== 'support-create' && !isMobile) || ($route.name !== 'support-create' && isMobile && mobileScreen === 'requests')")
        .layout__tabs
            router-link.layout__tabs-item(to="/support" :class="{'layout__tabs-item_active': $route.name === 'support'}") Обращения
            router-link.layout__tabs-item(to="/support/archive" :class="{'layout__tabs-item_active': $route.name === 'support-archive'}") Архив
        .layout__actions
            Button(class="button_new-request" variety="white" icon="new-message" iconRight to="/support/create") Новое обращение
    .layout__content
        router-view
</template>

<script>
import Vue from "vue";
import moment from 'moment';

import {
    Button, Icon
} from '@/components'

moment.locale('ru')

export default {
    name: 'Requests',
    data () {
        return {
            profile: {
                id: "",
                login: "",
            },
            tabs: [
                {
                    label: 'Обращения',
                    path: '/support'
                },
            ]
        }
    },
    computed: {
        isMobile () {
            return screen.width < 760
        },
        currentRoute () { return this.$route.params.currentRoute },
    
        tickets() { return this.$store.getters['supportModule/tickets'] },

        routeName() { return this.$route.name; }
    },
    methods: {

    },

    async mounted () {
        await this.$store.dispatch("supportModule/init");
    },
    components: {
        Button, Icon
    },
    watch:{
        tickets(value) {
            if (value.length > 0 && this.routeName === 'support'){
                this.$router.push({
                    name: 'support-ticket',
                    params:{
                        id: value[0].id
                    }
                })
            }
        },
        async routeName(value) {
            if (value === 'support') {
                await this.$store.dispatch("supportModule/init");
            }
        },
    }
}
</script>

<style lang="sass">
@import @/assets/styles/vars
@import @/assets/styles/layout

.support
    border-right: 1px solid $color-border

    @media screen and (max-width: $mobile-width)
        border-right: none

    .button_new-request
        @media screen and (max-width: $mobile-width)
            span
                display: none

    &__mobile-back
        padding: 16px 16px 0
        font:
            size: 13px
            weight: 500

        a
            display: inline-flex
            align-items: center
            color: $color-font-mute

            img
                margin-right: 5px

    &__back
        padding: 16px
        border-bottom: 1px solid $color-border
        color: $color-font-mute
        display: flex
        align-items: center

        img
            width: 6px

        span
            margin-left: 16px

    &__layout
        height: 100%
        display: flex

    &__requests
        width: 311px
        flex-shrink: 0
        border-right: 1px solid $color-border

        @media screen and (max-width: $mobile-width)
            width: 100%
            border-right: none
            display: none
            padding: 0 16px

            &_active
                @media screen and (max-width: $mobile-width)
                    display: block

    &__scrollable
        overflow-y: auto
        flex-grow: 1

        &::-webkit-scrollbar
            width:  6px
            height: 100%

        &::-webkit-scrollbar-thumb
            background: $color-border
            border-radius: 3px

        &::-webkit-scrollbar-track
            background: none

    &__chat
        flex-grow: 1
        height: calc(100vh - 146px)
        border-top: 1px solid $color-border
        flex:
            direction: column

        @media screen and (max-width: $mobile-width)
            display: none

        &_active
            @media screen and (max-width: $mobile-width)
                display: flex !important
                border-top: none
                height: calc(100vh - 56px - 31px)

        &_active
            display: none

        &-description
            margin: 1.5rem
            text-align: center
            color: $color-label
            font-size: 13px
            line-height: 1.5rem

            @media screen and (max-width: $mobile-width)
                margin: 16px
                text-align: left

                span
                    font:
                        size: 15px
                        weight: 500
                    line-height: 24px
                    color: $color-primary

        &-form
            border-top: 1px solid $color-border
            display: flex
            justify-content: space-between
            align-items: flex-start
            padding: 1rem 1.5rem
            position: relative

            &-placeholder
                position: absolute
                font-size: 13px
                line-height: 1.5rem
                left: 4.1rem
                z-index: -1
                color: $color-label

            .icon
                margin-top: .2rem
                cursor: pointer
            
            &-input
                width: 100%
                margin: 0 1.5rem
                font-size: 13px
                line-height: 1.5rem

                &:focus
                    outline: none

    &__messages
        flex-grow: 1
        padding: 0 1.5rem
        display: flex
        flex:
            direction: column
        align-items: flex-end

        @media screen and (max-width: $mobile-width)
            padding: 0 16px

    &__message
        width: 443px
        flex-shrink: 0
        padding: 1rem
        background: $color-secondary
        position: relative
        border-radius: 8px 8px 0 8px
        margin-bottom: 2rem
        font-size: 13px
        line-height: 1.5rem

        @media screen and (max-width: $mobile-width)
            width: calc(100vw - 16px - 32px)

        &-date
            color: $color-font-mute

        &-angle
            position: absolute
            right: 0
            bottom: -14px

        &_answer
            border-radius: 8px 8px 8px 0
            background: $color-primary
            color: #fff
            align-self: flex-start

            .support__message-date
                color: $color-font-mute-light

            .support__message-angle
                left: 0
                right: auto
                transform: scale(-1, 1)

    &__request
        border-top: 1px solid $color-border
        padding: 1rem 1.5rem
        font-size: 13px
        line-height: 1.5rem
        cursor: pointer

        @media screen and (max-width: $mobile-width)
            padding: 1rem 0
            &:first-child
                border-top: none

        &:last-child
            border-bottom: 1px solid $color-border

            @media screen and (max-width: $mobile-width)
                border-bottom: none

        &-title
            display: flex
            align-items: center

        &-status
            width: 6px
            height: 6px
            border-radius: 50%
            margin-left: 8px

            &_success
                background: $color-green

            &_error
                background: $color-red

        &-number
            color: $color-primary
        
        &-date
            color: $color-font-mute

        &_active
            background: $color-secondary
</style>