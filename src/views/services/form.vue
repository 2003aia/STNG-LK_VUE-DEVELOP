<template lang="pug">
.services-form.form
    .layout__main
        .layout__title Подключение газа для физических лиц

        .form__wizard(
            style="margin-top: 1rem"
            :style="wizardStyle"
            )
            .form__wizard-steps
                .form__wizard-step(
                    :class="{'form__wizard-step_active': step === 1, 'form__wizard-step_completed': step > 1}"
                    )
                    .form__wizard-step-number 1
                    .form__wizard-step-title Сведения о заявителе
                .form__wizard-step(
                    :class="{'form__wizard-step_active': step === 2, 'form__wizard-step_completed': step > 2}"
                    )
                    .form__wizard-step-number 2
                    .form__wizard-step-title Определение расхода
                .form__wizard-step(
                    :class="{'form__wizard-step_active': step === 3, 'form__wizard-step_completed': step > 3}"
                    )
                    .form__wizard-step-number 3
                    .form__wizard-step-title Загруза документов
                .form__wizard-step(
                    :class="{'form__wizard-step_active': step === 4, 'form__wizard-step_completed': step > 4}"
                    )
                    .form__wizard-step-number 4
                    .form__wizard-step-title Готово!

        div(v-if="step === 1")
            .form__section
                .form__section-title Данные заявителя
                .form__section-content
                    Row(gutter="1.5" unit="rem")
                        Col
                            Input(label="Фамилия" v-model="form.user.lastName")
                        Col
                            Input(label="Имя" v-model="form.user.firstName")
                        Col
                            Input(label="Отчество" v-model="form.user.middleName")
                    Row(gutter="1.5" unit="rem" :style="{marginTop:isMobile?'0':'20px'}")
                        Col(:shrink="2")
                            Input(label="Дата рождения" v-model="form.user.birthDay" type="date" format="DD.MM.YYYY")
                        Col(:shrink="1")
                            Input(label="Место рождения" v-model="form.user.birthPlace")
                    Row(gutter="1.5" unit="rem" :style="{marginTop:isMobile?'0':'20px'}")
                        Col
                            Input(label="Место жительства" v-model="form.user.residence")
                        Col
                            Input(label="ИНН" v-model="form.user.inn")
                    Row(gutter="1.5" unit="rem" :style="{marginTop:isMobile?'0':'20px'}")
                        Col
                            Input(label="Эл. почта" v-model="form.user.email" type="email")
                        Col
                            Input(label="Контактный телефон" v-model="form.user.phone" type="phone")
                        Col
                            Input(label="Дополниттельный номер телефона" v-model="form.user.additionalPhone" type="phone")
            .form__section
                .form__section-title Данные паспорта
                .form__section-content
                    Row(gutter="1.5" unit="rem")
                        Col(:shrink="2")
                            Input(label="Серия" v-model="form.passport.series")
                        Col(:shrink="1")
                            Input(label="Номер" v-model="form.passport.number")
                    Row(gutter="1.5" unit="rem" :style="{marginTop:isMobile?'0':'20px'}")
                        Col(:shrink="1")
                            Input(label="Кем выдан" v-model="form.passport.organization")
                        Col(:shrink="2")
                            Input(label="Дата выдачи" v-model="form.passport.issueDate" type="date" format="DD.MM.YYYY")
                    Row(gutter="1.5" unit="rem" :style="{marginTop:isMobile?'0':'20px'}")
                        Col(:shrink="1")
                            Input(label="Место регистрации" v-model="form.passport.registerPlace")
                        Col(:shrink="2")
            .form__section
                .form__section-title Данные об объекте газафикации
                .form__section-content
                    Checklist(
                        label="Наименование объекта капитального строительства"
                        :items="realtyTypeItems",
                        type="radio"
                        v-model="form.realty.type"
                        :cols="2"
                    )

                    Row(gutter="1.5" unit="rem" :style="{marginTop:isMobile?'0':'20px'}")
                        Col(:shrink="1")
                            Input(label="Адрес объекта" v-model="form.realty.address")
                        Col(:shrink="2")
                    Row(gutter="1.5" unit="rem" :style="{marginTop:isMobile?'0':'20px'}")
                        Col
                            Input(
                                label="Подключение в случаях"
                                v-model="form.realty.connect"
                                style="z-index: 1"
                                type="select"
                                :options="realtyConnectItems"
                                optionLabel="label"
                            )
                        Col
                            Input(
                                label="Характер потребления газа"
                                v-model="form.realty.consumption"
                                style="z-index: 1"
                                type="select"
                                :options="realtyConsumptionItems"
                                optionLabel="label"
                            )
                    Row(gutter="1.5" unit="rem" style="margin-top:.25rem;align-items:flex-end")
                        Col(style="flex-direction:column")
                            p(style="margin-bottom:.5rem") Номер и дата выдачи полученных ранее технических условий, срок действия которых на момент подачи заявки о подключении (технологическом присоединении) не истек:
                            Group
                                Input(label="Номер" v-model="form.realty.conditionNumber")
                                Input(label="Дата" type="date" v-model="form.realty.conditionDate")
                        Col(style="flex-direction:column")
                            p(style="margin-bottom:.5rem") Сроки проектирования, строительства и ввода в эксплуатацию объекта капитального строительства (в том числе по этапам и очередям)*:
                            Input(label="Месяц, год" v-model="form.realty.date")
        
        div(v-if="step === 2")
            GasCalculator(:items="gasCalculatorItems")

            .form__hr
                .form__hr-text или

            Button(variety="add-list") Ввести расчет МЧРГ

        div(v-if="step === 3")
            p(style="margin: 0 0 1.5rem") Для загрузки возможны следующие типы файлов: *.jpg, *.zip, *.pdf
                br
                | Размер одного файла не должен превышать 5 Мб
                

            .form__upload-docs
                .form__upload-docs-item(v-for="(item, index) in uploadDocs")
                    .form__upload-docs-name {{ item }}
                    .form__upload-docs-button
                        Button(variety="secondary") Прикрепить файл

        div(v-if="step === 4")
            p(style="margin:0")
                strong Спасибо!&nbsp;
                | Ваша заявка принята в обработку, ожидайте ответа.

        .form__footer
            Button(v-if="step === 4" to="/services/requests") Перейти в мои заявки
            Button(@click.native="step++" v-if="step === 1") Далее

            .form__footer-buttons(v-if="step === 2 || step === 3")
                Button(@click.native="step--" v-if="step > 1 && step !== 4" variety="white-bordered") Назад
                Button(@click.native="step++" v-if="step < 4") Далее

            Checklist(
                :items="['Подписать Договор электронно, требуется наличие электронно-цифровой подписи(ЭЦП)']",
                type="checkbox"
                v-model="form.eSign"
                itemsColor="font"
                v-if="step === 3"
            )
</template>

<script>
import {
    Row, Col, Input, Checklist, Button, GasCalculator, Group
} from '@/components'

export default {
    name: 'ServicesForm',
    mounted () {
    },
    watch: {
        step (value) {
            document.querySelector('.app__main').scrollTop = 0
            if (this.isMobile) {
                let steps = document.querySelectorAll('.form__wizard-step')
                let wizard = document.querySelector('.form__wizard')
                wizard.scrollLeft = 0
                let offset = 0
                
                for (let i = 1; i <= steps.length; i++) {
                    
                    if (steps[i]) {
                        if (i < value) {
                            let width = steps[i - 1].offsetWidth
                            offset = offset + (width + (6 * i))
                        }
                    }
                }

                if (value !== 4) {
                    wizard.scrollLeft = offset
                } else {
                    wizard.scrollLeft = wizard.offsetWidth
                }
            }
            
        }
    },
    computed: {
        wizardStyle () {
            if (this.isMobile && this.step === 1) {
                return {
                    borderRadius: '4px 0 0 4px',
                    marginRight: '-17px'
                }
            } else if (this.isMobile && (this.step === 2 || this.step === 3)) {
                return {
                    borderRadius: '0',
                    marginRight: '-17px',
                    marginLeft: '-17px'
                }
            } else if (this.isMobile && this.step === 4) {
                return {
                    borderRadius: '0 4px 4px 0',
                    marginLeft: '-17px'
                }
            }
            return {}
        },
        isMobile () {
            return screen.width < 760
        }
    },
    data () {
        return {
            step: 1,
            form: {
                user: {
                    lastName: '',
                    firstName: '',
                    middleName: '',
                    birthDay: '',
                    birthPlace: '',
                    residence: '',
                    inn: '',
                    email: '',
                    phone: '',
                    additionalPhone: ''
                },
                passport: {
                    series: '',
                    number: '',
                    organization: '',
                    issueDate: '',
                    registerPlace: '',
                },
                realty: {
                    type: '',
                    address: '',
                    connect: '',
                    consumption: '',
                    conditionNumber: '',
                    conditionDate: '',
                    date: ''
                },
                eSign: false
            },
            realtyTypeItems: [
                'Жилой дом', 'Гараж', 'Баня', 'Другое'
            ],
            realtyConnectItems: [
                {
                    label: 'Вариант номер один',
                    value: 1,
                },
                {
                    label: 'Вариант номер два',
                    value: 2,
                },
                {
                    label: 'Вариант номер три',
                    value: 3,
                }
            ],
            realtyConsumptionItems: [
                {
                    label: 'Вариант номер один',
                    value: 1,
                },
                {
                    label: 'Вариант номер два',
                    value: 2,
                },
                {
                    label: 'Вариант номер три',
                    value: 3,
                }
            ],
            gasCalculatorItems: [
                {
                    name: 'Газовая плита',
                    params: [
                        { name: 'Конфорки', steps: 4 },
                        { name: 'Духовые шкафы', steps: 2 }
                    ]
                },
                {
                    name: 'Газовая колонка',
                    params: [
                        { name: 'Конфорки', steps: 4 },
                        { name: 'Духовые шкафы', steps: 2 }
                    ]
                },
                {
                    name: 'Газовая котел',
                    params: [
                        { name: 'Конфорки', steps: 4 },
                        { name: 'Духовые шкафы', steps: 2 }
                    ]
                },
                {
                    name: 'Теплый пол',
                    params: [
                        { name: 'Конфорки', steps: 4 },
                        { name: 'Духовые шкафы', steps: 2 }
                    ]
                }
            ],
            uploadDocs: [
                'Копии правоустанавливающих документов на земельный участок (свидетельство, выписка ЕГРН, договор аренды и т.п.)',
                'Топографическая карта участка в масштабе 1 к 500 (со всеми наземными и подземными коммуникациями и сооружений',
                'Копия документа, подтверждающего право собственности или иное предусмотренное законом право на объект капитального строительства (в случае если строительство завершено)',
                'Ситуационный план расположения земельного участка с привязкой к территории населенного пункта (формат А4)',
                'Доверенность или иные документы, подтверждающие полномочия представителя заявителя (в случае если запрос о предоставлении технических условий подается представителем заявителя)',
                'Согласие основного абонента на подключение к сетям газораспределения и газопотребления, строительство газопровода на земельном участке основного абонента',
                'Адресная справка (требуется в случае если внесены изменения в адрес объекта)',
                'Заверенная в установленном порядке копия договора о пользовании объектами инфраструктуры и другим имуществом общего пользования НКО',
                'Копия разработанной и утвержденной в соответствии с законодательством Российской Федерации документации по планировке территории'
            ]
        }
    },
    components: {
        Row, Col, Input, Checklist, Button, GasCalculator, Group
    }
}
</script>

<style lang="sass">
@import @/assets/styles/form

// .services-form
</style>