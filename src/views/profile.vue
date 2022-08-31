<template lang="pug">
.layout.profile
    .layout__main
        .layout__title Мои данные

        div
            Row(:style="{marginTop:isMobile?'10px':'1.125rem'}" gutter="1.5" unit="rem")
                Col
                    Input(label="Фамилия" v-model="profile.lastName")
                Col
                    Input(label="Имя" v-model="profile.firstName")
            Row(:style="{marginTop:isMobile?'0':'1.125rem'}" gutter="1.5" unit="rem")
                Col
                    Input(label="Отчество" v-model="profile.middleName")
                Col
            Row(:style="{marginTop:isMobile?'0':'1.125rem'}" gutter="1.5" unit="rem")
                Col
                    Input(label="Телефон" v-model="profile.phone" type="phone")
                Col
                    Input(label="Эл. почта" v-model="profile.email" type="email")
            Row(:style="{marginTop:isMobile?'8px':'1.5rem'}" gutter="1.5" unit="rem")
                Col
                    Button(full) Сохранить изменения
                Col
                    Button(full variety="secondary") Изменить пароль
    LayoutSidebar
        router-link(to="#") Все обращения
        SidebarSupport
</template>

<script>
import {
    LayoutSidebar,
    Row,
    Col,
    Input,
    Button,
    SidebarSupport
} from '@/components'

export default {
    name: 'Profile',
    data () {
        return {
            profile: {
                lastName: '',
                firstName: '',
                middleName: '',
                phone: '',
                email: '',
            }
        }
    },
    computed: {
        isMobile () {
            return screen.width < 760
        }
    },
    mounted () {
        this.$store.dispatch('getProfile')
        this.profile = this.$store.state.profile
    },
    components: {
        LayoutSidebar,
        Row,
        Col,
        Input,
        Button,
        SidebarSupport
    }
}
</script>

<style lang="sass">
.profile
</style>