<template lang="pug">
.agreements-list.layout
    .layout__main
        loading(getter="is_loading")
        .bills-list(v-if="error === ''")
            Card(
                v-for="(agreement, agreementIndex) in getBills"
                angle
                :title="agreement.number ? `Договор №${agreement.number}` : agreement.name"
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

                    Button(variety="primary-light" :to="`/agreements/${agreement.id}/`") Внести показания
                    Button(variety="primary-light" :to="`/agreements/${agreement.id}/`" v-if="!isMobile") История
                    Button(variety="primary-light-outline" v-if="!isMobile") Удалить
            //- Button(variety="add-list") Добавить договор
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
            error: ''
        }
    },
    components: { Card, LayoutSidebar, SidebarSupport, Button, Loading },
    computed: {
        isMobile () {
            return screen.width < 760
        },
        getBills () {
            try {
                // console.log('test', this.$store.getters.getAgreements)
                return this.$store.getters.getAgreements;
            } catch {
                this.error = 'Ошибка получения данных с сервера'
            }
        },
        is_loading() {
            return this.$store.getters.is_loading
        }
    }
}
</script>

<style lang="sass">
@import @/assets/styles/vars

.agreements-list
</style>
