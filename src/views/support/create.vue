<template lang="pug">
.support-create
    .support__mobile-back(v-if="isMobile")
        router-link(to="/support")
            img(src="@/assets/images/back-triangle.svg")
            span Назад
    .layout__title.support-create__title
        Icon(icon="new-message" color="primary")
        span Новое обращение

    .support-create__category
        Input(type="select" :options="categories" label="Выберите категорию обращения" optionLabel="label" v-model="selectedCategory" style="z-index:1")

    .support-create__form
        .support-create__form-placeholder(v-if="message === ''") Напишите что нибудь...
        Icon(icon="attachment" color="primary")
        .support-create__form-input(contenteditable @input="onChangeMessage" ref="chatinput")
        Icon(icon="send" color="primary" @click.native="sendMessage")
</template>

<script>
import {
    Icon, Input
} from '@/components'

export default {
    name: 'SupportCreate',
    data () {
        return {
            selectedCategory: '',
            categories: [
                { label: 'Вопросы по газовым заправкам АО «Сахатранснефтегаз»', value: 0 },
                { label: 'Какая-то категория', value: 1 }
            ],
            message: '',
        }
    },
    methods: {
        onChangeMessage (e) {
            this.message = e.target.innerText
        },
        sendMessage () {
            if (this.message !== '') {
                
            }
        }
    },
    components: {
        Icon, Input
    },
    computed: {
        isMobile () {
            return screen.width < 760
        }
    },
}
</script>

<style lang="sass">
@import @/assets/styles/vars

.support-create
    @media screen and (max-width: $mobile-width)
        display: flex
        flex-direction: column
        height: calc(100vh - 56px)

    &__title
        padding: 1.5rem 1.5rem 0

        @media screen and (max-width: $mobile-width)
            padding: 16px 16px 0
            flex-shrink: 0

    &__category
        padding: 1.5rem
        @media screen and (max-width: $mobile-width)
            flex-grow: 1
            padding: 16px

    &__form
        border-top: 1px solid $color-border
        display: flex
        justify-content: space-between
        align-items: flex-start
        padding: 1rem 1.5rem
        position: relative

        @media screen and (max-width: $mobile-width)
            flex-shrink: 0

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
</style>

