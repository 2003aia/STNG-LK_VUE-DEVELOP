<template lang="pug">
.layout
    .layout__main
        .bills-create
            .layout__title
                Icon(icon="bills" color="primary")
                span Новый лицевой счет
            
            .bills-create__form(style="margin-top: 1.5rem")
                Row(v-if="!isMobile")
                    Col
                        Input(label="Введите номер лицевого счета" v-model="form.bill")
                
                //- p Абоненты с лицевыми счетами старого образца (менее 9 цифр) должны обратиться в 
                //-     a(href="#") филиалы 
                //-     | для получения нового номера лицевого счета.
                .bills-create__mobile-field
                    .bills-create__mobile-title Введите номер лицевого счета (№ЛС совпадает с № договора поставки газа )
                    Input(v-model="form.bill")
                
                .form__section(style="margin-top:2rem")
                    .form__section-title Введите данные владельца лицевого счета
                    Row(gutter="1.5" unit="rem")
                        Col
                            Input(label="Фамилия" v-model="form.lastName")
                        Col
                            Input(label="Имя" v-model="form.firstName")
                    Row(:style="{marginTop: isMobile ? '' : '1.25rem'}" gutter="1.5" unit="rem")
                        Col
                            Input(label="Отчество" v-model="form.middleName")
                        Col
                            Button(full to="/bills" :style="{marginTop: isMobile ? '8px' : '0'}") Подключить
    LayoutSidebar
        router-link(to="#") Все обращения
</template>

<script>
import {
    Icon,
    Input,
    Row,
    Col,
    Button,
    LayoutSidebar
} from '@/components'

export default {
    name: 'BillsCreate',
    data () {
        return {
            form: {
                bill: '',
                lastName: '',
                firstName: '',
                middleName: '',
            }
        }
    },
    computed: {
        isMobile () {
            return screen.width < 760
        }
    },
    components: {
        Icon,
        Input,
        Row,
        Col,
        Button,
        LayoutSidebar
    },
}
</script>

<style lang="sass">
@import @/assets/styles/vars

.bills-create
    @media screen and (max-width: $mobile-width)
        padding-bottom: 16px
    &__mobile-field
        display: none

        @media screen and (max-width: $mobile-width)
            display: block

    &__mobile-title
        color: $color-primary
        font:
            size: 13px
            weight: 500
        line-height: 24px
</style>