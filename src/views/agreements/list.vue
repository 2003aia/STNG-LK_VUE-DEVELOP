<template lang="pug">
.agreements-list.layout
    .layout__main
        .layout__tabs
            div(@click="activeHandler")
                router-link.layout__tabs-item(to="/agreements/" :class="{'layout__tabs-item_active': active}") Активные
            div(@click="activeHandler")
                router-link.layout__tabs-item(to="/agreements/" :class="{'layout__tabs-item_active': !active}" ) Неактивные
        loading(getter="is_loading")
        .bills-list(v-if="error === '' && active")
            
            Card(
                v-for="(agreement, agreementIndex) in getBills"
                angle
                :title="agreement.number ? `Договор №${agreement.number}` : agreement.name"
                :contrName="name"
                :inn="inn.inn"
                :index="agreementIndex"
                menu
                :key="agreementIndex"
                )
                template(v-slot:card)
                    .bills-list__card-menu(v-if="openedMenu.includes(agreementIndex)")
                        router-link(to="#").bills-list__card-menu-item История
                        router-link(to="#").bills-list__card-menu-item Удалить
                template(v-slot:client) {{ getBills.name }}
                template(v-slot:bill) Вид договора: 
                    span {{ agreement.type }}
                //- template(v-slot:bill2)
                //-     span Имя контрагента: 
                //-     span {{ name }}   
                template(v-slot:footer)
                    Button(variety="white" :to="`/agreements/${agreement.id}`") Адреса
                    //- Button(variety="white" :to="`/bills/history/`") Адреса

                    Button(v-if="agreement.objects.length !== 0" variety="primary-light" :to="`/agreements/${agreement.id}/`") Внести показания
                    //- Button(variety="primary-light" :to="`/agreements/${agreement.id}/${agreement.id}/bills`" v-if="!isMobile") История
                    Button(variety="primary-light" :to="`/agreements/${agreement.id}/${agreement.id}/bills`" v-if="!isMobile") Счета
                    
                    Button(variety="primary-light-outline" v-if="!isMobile") Удалить
            //- Button(variety="add-list") Добавить договор

        //- .error(v-else)
        //-     h1 {{ error }}
        .bills-list(v-if="error === '' && !active")
            Card(
                v-for="(agreement, agreementIndex) in getUnactiveBills"
                angle
                :title="agreement.number ? `Договор №${agreement.number}` : agreement.name"
                :contrName="name"
                :inn="inn.inn"
                :index="agreementIndex"
                menu
                :key="agreementIndex"
                )
                template(v-slot:card)
                    .bills-list__card-menu(v-if="openedMenu.includes(agreementIndex)")
                        router-link(to="#").bills-list__card-menu-item История
                        router-link(to="#").bills-list__card-menu-item Удалить
                template(v-slot:client) {{ getBills.name }}
                template(v-slot:bill) Вид договора: 
                    span {{ agreement.type }}
                template(v-slot:footer)
                    Button(variety="white" :to="`/agreements/${agreement.id}`") Адреса
                    //- Button(variety="white" :to="`/bills/history/`") Адреса

                    Button(v-if="agreement.objects.length !== 0" variety="primary-light" :to="`/agreements/${agreement.id}/`") Внести показания
                    //- Button(variety="primary-light" :to="`/agreements/${agreement.id}/${agreement.id}/bills`" v-if="!isMobile") История
                    Button(variety="primary-light" :to="`/agreements/${agreement.id}/${agreement.id}/bills`" v-if="!isMobile") Счета
                    
                    Button(variety="primary-light-outline" v-if="!isMobile") Удалить    
        .error(v-else)
            h1 {{ error }}            
    LayoutSidebar
        router-link(to="#") Все обращения
        SidebarSupport
</template>

<script>
import {
    Card,
    LayoutSidebar,
    SidebarSupport,
    Button,
    Loading
} from '@/components'
import Vue from 'vue'

export default {
    name: 'AgreementsList',
    data () {
        return {
            data: [
                {
                    name: 'Договор №101016437',
                    client: 'ИП Дьячковский А.М.',
                    type: '5Я-1234'
                },
            ],
            
            openedMenu: [],
            error: '',
            active: true,
        }
    },
    methods: {
        activeHandler() {
            this.$data.active = !this.$data.active
        }
    },
    components: { Card, LayoutSidebar, SidebarSupport, Button, Loading },
    computed: {
        isMobile () {
            return screen.width < 760
        },
        inn() {
            return JSON.parse(Vue.cookie.get('profileData'))
        },
        name() {
            return Vue.cookie.get('contrName')
        },
        getBills () {
            try {
                // console.log('test', this.$store.getters.getAgreements)
                return this.$store.getters.getAgreements.filter((el)=>el.active ===true)
            } catch {
                this.error = 'Ошибка получения данных с сервера'
            }
        },
        getUnactiveBills () {
             try {
                return this.$store.getters.getAgreements.filter((el)=>el.active === false);
            } catch {
                this.error = 'Ошибка получения данных с сервера'
            }
        },
        is_loading() {
            return this.$store.getters.is_loading
        }
    },
    mounted(){
        
        this.$data.data = this.getBills.filter((el)=>el.active ===true)
    }
}
</script>

<style lang="sass">
@import @/assets/styles/vars

.agreements-list
</style>
