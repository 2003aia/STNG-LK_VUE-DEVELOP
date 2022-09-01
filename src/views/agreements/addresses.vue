<template lang="pug">
.agreements-addresses.layout
    loading(getter="is_loading" v-if="is_loading" class="layout__main")
    .layout__main(v-else)
        Back(goto="/agreements/")
        .layout__title.agreements-addresses__header
            .agreements-addresses__title Адреса - {{ getCurrent['number'] ? `Договор №${getCurrent['number']}` : getCurrent['name'] }}
            .agreements-addresses__actions
                a.agreements-addresses__download-link(href="#") Скачать шаблон загрузки данных
        .agreements-addresses__list
            .agreements-addresses__item(v-for="address of addresses")
                //- .agreements-addresses__item-title {{address.object + ' ' + address.objectId | capitalize }}
                .agreements-addresses__item-title {{address.object + ' ' | capitalize }}

                .agreements-addresses__item-actions
                    Button(:to="`/agreements/${getCurrent.id}/${address.objectId}/counters`" :onClick="()=>$router.push({name: 'agreements-address-counters', params: address})" size="small" v-if="!getAgreements.typeenterindication") Внести показания
                    Button(:to="`/agreements/${getCurrent.id}/${address.objectId}`" variety="white" size="small") Оплата по показаниям
        Button(variety="add-list") Загрузить данные по узлам учета газа
    LayoutSidebar
        router-link(to="#") Все обращения
        SidebarSupport
</template>

<script>
import {Back, Button, LayoutSidebar, SidebarSupport, Loading } from '@/components'

export default {
    name: 'AgreementsAddresses',
    components: {
        SidebarSupport,
        LayoutSidebar,
        Back,
        Button,
        Loading

    },
    mounted() {
        this.$store.dispatch('getObjects', this.$route.params.id);
        // this.$store.dispatch('getAgreements')
        
    },
    computed: {
        addresses () {
            return this.$store.getters.getCurrentAgreement.objects;
        },
        getCurrent () {
            return this.$store.getters.getCurrentAgreement;
        },
        getAgreements () {
            return this.$store.getters.getAgreements;
        },
        is_loading() {
            return this.$store.getters.is_loading
        }
    },
}
</script>

<style lang="sass">
@import @/assets/styles/vars

.agreements-addresses
    &__header
        display: flex
        justify-content: space-between

        @media screen and (max-width: $mobile-width)
            flex-direction: column
    
    &__title
        font-size: 18px

        @media screen and (max-width: $mobile-width)
            font-size: 15px

    &__actions
        font:
            size: 12px
            weight: 500
        a
            color: #E01414
            text-decoration: underline

    &__list
        margin-top: 16px

    &__item
        display: flex
        justify-content: space-between
        align-items: center
        background: $color-secondary
        border-radius: 4px
        margin-bottom: 8px
        padding: 16px 16px 16px 24px

        @media screen and (max-width: $mobile-width)
            flex-direction: column
            padding: 16px

        &-title
            color: $color-primary
            font:
                size: 18px
                weight: 500
            line-height: 24px

        &-actions
            display: flex

            @media screen and (max-width: $mobile-width)
                flex-direction: column
                margin-top: 8px
                width: 100%

            .button
                margin-left: 8px

                @media screen and (max-width: $mobile-width)
                    width: 100%
                    margin-left: 0
                    margin-top: 8px

    .button_variety_add-list
        @media screen and (max-width: $mobile-width)
            margin-bottom: 16px
</style>
