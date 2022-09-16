<template lang="pug">
.layout.pre-entry
    .layout__main
        .layout__title Предварительная запись

        .layout__content
            p С помощью данного сервиса физическим и юридическим лицам можно предварительно записаться на прием в Службу «Единого окна» по адресу г. Якутск, ул. Петра Алексеева, 64
            p На ваш номер телефона будет отправлена СМС с указанием номера брони, а также даты и времени записи.

            Row
                Col
                    Input(
                        style="z-index: 1"
                        type="select"
                        label="Вид услуги"
                        v-model="form.serviceType"
                        :options="serviceTypeOptions"
                        optionLabel="label")
            Row(:style="{marginTop:isMobile?'0':'20px'}" gutter="1.5" unit="rem")
                Col
                    Input(label="Телефон" v-model="form.phone" type="phone")
                Col
                    Input(label="Выберите дату" v-model="form.date" type="date" format="DD.MM.YYYY")
            Row(:style="{marginTop:isMobile?'0':'20px'}" gutter="1.5" unit="rem")
                Col
                    Input(label="Время приема" v-model="form.time" type="time" format="HH:mm")
                Col
                    Button(full :style="{marginTop:isMobile?'16px':''}") Оставить заявку

            p(:style="{marginTop:isMobile?'16px':'2rem'}") Режим работы Службы «Единого окна» в будни с 08.00 до 17.00
                br
                | Выходной: суббота и воскресенье
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
    name: 'PreEntry',
    data () {
        return {
            form: {
                serviceType: '',
                phone: '',
                date: '',
                time: '',
            },
            serviceTypeOptions: [
                { label: 'Прием и выдача документов, согласование проектов газификации', value: 1 },
                { label: 'Еще одна услуга', value: 2 },
                { label: 'Третья услуга', value: 3 },
            ]
        }
    },
    computed: {
        isMobile () {
            return screen.width < 760
        }
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
// .pre-entry
</style>