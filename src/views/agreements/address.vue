<template lang="pug">
.agreements-address.layout
    loading(getter="is_loading" v-if="is_loading" class="layout__main")
    .layout__main(v-else)
        //- Back(:goto="`/agreements/${$route.params.id}`" v-if="!isMobile")
        Back(:goto="!$route.path.includes('/bills')? `/agreements/${$route.params.id}`: `/agreements/`" v-if="!isMobile")

        //- Back(:goto="`/agreements/${$route.params.id}`" v-if="!isMobile")
        .layout__title Оплата [{{getCurrent.number ? `Договор №${getCurrent.number}` : getCurrent.name}} {{'|' +object[0]?.object ? object[0]?.object : '' + ' ' + $route.params?.address ? $route.params?.address : '' | capitalize }}]
        //- .layout__title Оплата {{getCurrent.number ? `Договор №${getCurrent.number}` : getCurrent.name}} 
        
        div(:style="{margin:isMobile?'0 -16px':'0 -24px'}")
            .agreements-address__actions
                .layout__tabs
                    router-link.layout__tabs-item(v-if="!$route.params.id.includes('/bills')" :to="`/agreements/${$route.params.id}/${$route.params.address}/counters`" :class="{'layout__tabs-item_active': $route.name === 'agreements-address-counters'}") Показания счетчиков
                    //router-link.layout__tabs-item(:to="`/agreements/${$route.params.id}/${$route.params.address}`" :class="{'layout__tabs-item_active': $route.name === 'agreements-address-pay'}") Оплата
                    router-link.layout__tabs-item(:to="`/agreements/${$route.params.id}/${$route.params.id}/bills`" :class="{'layout__tabs-item_active': $route.name === 'agreements-address-bills'}") Счета
                    
                .layout__actions
                    a(href="#") Загрузить показания в Excel
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
            //- (v-if="load")
</template>

<script>
import {
    Back, Loading
} from '@/components'

import DatePicker from 'vue2-datepicker'


export default {
    name: 'AgreementsAddress',
    components: {
        Back, Loading, DatePicker,
    },
    async created() {
        this.load = false;
        await this.$store.dispatch('getObjects', this.$route.params?.id);
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
            return this.$store.getters.getCurrentAgreement.objects.filter((el)=>el.objectId===this.$route.params.address)
        },
        is_loading() {
            return this.$store.getters.is_loading
        }
    },
    data() {
        return {
            load: false,
            objectId: [],
            filter: {
                date: ''
            }
        }
    },
    mounted(){
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
        // background: red
        position: relative
        display: flex
        
        // position: absolute
        // right: 24px
        // top: 12px
        top: 0px
        right: 0px
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
