<template lang="pug">
.agreements-address.layout
    loading(getter="is_loading" v-if="is_loading" class="layout__main")
    .layout__main(v-else)
        Back(:goto="`/agreements/${$route.params.id}`" v-if="!isMobile")

        //- Back(:goto="`/agreements/${$route.params.id}`" v-if="!isMobile")
        .layout__title Оплата [{{getCurrent.number ? `Договор №${getCurrent.number}` : getCurrent.name}} | {{object.object + ' ' + $route.params.address | capitalize }}]
        //- .layout__title Оплата {{getCurrent.number ? `Договор №${getCurrent.number}` : getCurrent.name}} 
        
        div(:style="{margin:isMobile?'0 -16px':'0 -24px'}")
            .agreements-address__actions
                .layout__tabs
                    router-link.layout__tabs-item(:to="`/agreements/${$route.params.id}/${$route.params.address}/counters`" :class="{'layout__tabs-item_active': $route.name === 'agreements-address-counters'}") Показания счетчиков
                    //router-link.layout__tabs-item(:to="`/agreements/${$route.params.id}/${$route.params.address}`" :class="{'layout__tabs-item_active': $route.name === 'agreements-address-pay'}") Оплата
                    router-link.layout__tabs-item(:to="`/agreements/${$route.params.id}/${$route.params.address}/bills`" :class="{'layout__tabs-item_active': $route.name === 'agreements-address-bills'}") Счета
                .layout__actions
                    a(href="#") Загрузить показания в Excel
            router-view
            //- (v-if="load")
</template>

<script>
import {
    Back, Loading
} from '@/components'

export default {
    name: 'AgreementsAddress',
    components: {
        Back, Loading
    },
    async created() {
        this.load = false;
        // ?await this.$store.dispatch('getObjects', this.$route.params.id);
        this.load = true;
    },
    computed: {
        isMobile () {
            return screen.width < 760
        },
        getCurrent () {
            return this.$store.getters.getCurrentAgreement;
        },
        // object () {
        //     return this.$store.getters.getCurrentObject;
        // },
        object () {
            return this.$store.getters.getCurrentAgreement.objects.find((el)=>el.objectId===this.$route.params.address)
        },
        is_loading() {
            return this.$store.getters.is_loading
        }
    },
    data() {
        return {
            load: false,
        }
    },
}
</script>

<style lang="sass">
@import @/assets/styles/vars

.agreements-address
    &__actions
        display: flex
        justify-content: space-between

        .layout__actions
            padding-right: 24px

        @media screen and (max-width: $mobile-width)
            flex-direction: column-reverse

            a
                display: block
                margin-top: 16px

            .layout__tabs
                margin-left: 8px

            .layout__actions
                width: 100%
                font-size: 12px
                margin-top: 16px
                text-align: left
                justify-content: flex-start
                padding-left: 24px
</style>
