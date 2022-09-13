<template lang="pug">
.auth
    .auth__container(v-if="page === 'auth'")
        .auth__wrapper
            a.app__backward(href="/")
                span Вернуться на основной сайт
                Icon(color="font-mute" icon="backward")
            .auth__card
                p.auth__notaccount Еще нет аккаунта? <a href="#reg" @click="page = 'reg'">Зарегистрируйтесь</a>
            .auth__card
                .auth__card-inner
                    .app__header-logo
                        img(src="@/assets/images/logo.png")
                    .auth__form
                        h1.auth__title Авторизация
                        .auth__fieldset
                            .auth__fieldset-item
                                Input(label="Логин" v-model="login")
                            .auth__fieldset-item
                                Input(label="Пароль" v-model="password" :page="forgotPage" :forgot="true" type="password")
                        ul.auth__error(v-if="errors")
                            li(v-for="error in errors" class="error") {{ error }}
                        .auth__submit
                            button(class="button" @click="submit" v-if="!loading") Войти
                            button(class="button" v-else) Подождите...
    .auth__container(v-if="page === 'reg'")
        .auth__wrapper
            a.app__backward(href="/")
                span Вернуться на основной сайт
                Icon(color="font-mute" icon="backward")
            .auth__card
                p.auth__notaccount У вас уже есть аккаунт? <a href="#reg" @click="page = 'auth'">Авторизуйтесь</a>
            .auth__card
                .auth__card-inner
                    .app__header-logo
                        img(src="@/assets/images/logo.png")
                    .auth__form(v-if="regData.length > 0")
                        h1.auth__title Регистрация
                        .auth__selector
                            button.auth__selector-btn(v-for="(item, idx) in regData" :key="idx" :class="{'active': idx === activeClientTab}" @click="activeClientTab = idx") {{item.client}}
                        div(v-if="!successText")
                            .auth__fieldset(v-for="(section, idx) in currentData.sections" :key="idx")
                                .auth__fieldset-title {{section.title}}
                                .auth__fieldset-item(v-for="(elem, idx) in section.fields" :key="idx")
                                    ol.files(v-if="elem.type === 'file'")
                                        li(v-for="(file, fIdx) in elem.value" :key="fIdx") 
                                            span {{file.title}} 
                                            span(@click="elem.value.splice(fIdx, 1)" style="cursor: pointer;") (удалить)
                                    Input(:label="elem.title" v-model="elem.value" :type="elem.type" v-if="elem.type !== 'file' && elem.model !== 'PROP_INN'")
                                    .input(v-if="elem.model === 'PROP_INN'" style="z-index: 10")
                                        .input__input
                                            multiselect(
                                                v-model="elem.value" 
                                                :options="dadataValues" 
                                                @search-change="asyncFind" 
                                                label="value" 
                                                :show-labels="false"
                                                open-direction="bottom"
                                                :loading="isLoading"
                                                :limit="5"
                                                :options-limit="10"
                                                :class="{'multiselect_filled': elem.value}"
                                                :internal-search="false"
                                                @select="selectINN"
                                                )
                                                template(slot="singleLabel", slot-scope="props")
                                                    span.option__desc
                                                        span.option__title {{ props.option.data.inn }}
                                                    
                                                template(slot="option", slot-scope="props")
                                                    .option__desc
                                                        span.option__title {{ props.option.data.inn }}
                                                        span.option__small {{ props.option.value }}
                                            .input__label(style="z-index: 0") {{ elem.title }}
                                    label(v-if="elem.type === 'file'" class="auth__field-file")
                                        span Прикрепить "{{ elem.title }}"
                                        input(:type="elem.type" @change="loadFile" :data-prop="elem.id")
                            .auth__field-item
                                label.checklist__item
                                    input(v-model="privacy" type="checkbox")
                                    .checklist__item-checkbox
                                    .checklist__item-label
                                        span Согласен на обработку персональных данных
                            ul.auth__error(v-if="errors")
                                li(v-for="error in errors" class="error") {{ error }}
                            .auth__submit
                                button(class="button" @click="sendForm" v-if="!loading") Зарегистрироваться
                                button(class="button" v-else) Подождите...
                        div(v-else)
                            span {{ successText }}
    .auth__container(v-if="page === 'forgot'")
        .auth__wrapper
            a.app__backward(href="/")
                span Вернуться на основной сайт
                Icon(color="font-mute" icon="backward")
            .auth__card
                p.auth__notaccount Еще нет аккаунта? <a href="#reg" @click="page = 'reg'; errors = []" >Зарегистрируйтесь</a>
            .auth__card
                .auth__card-inner
                    .app__header-logo
                        img(src="@/assets/images/logo.png")
                    .auth__form
                        h1.auth__title Восстановление пароля
                        .auth__fieldset(v-if="(!forgotSent)")
                            .auth__fieldset-item
                                Input(label="e-mail" v-model="login")
                        .auth__fieldset(v-else)        
                            .auth__fieldset-item
                                Input(label="Пароль" v-model="password")    
                        ul.auth__error(v-if="errors")
                            li(v-for="error in errors" class="error") {{ error }}
                        .auth__submit(v-if="!forgotSent")
                            button(class="button" @click="submitForgot" v-if="!loading") Получить пароль
                            button(class="button" v-else) Подождите...
                        .auth__submit(v-if="forgotSent")
                            button(class="button" @click="submit" v-if="!loading") Войти
                            button(class="button" v-else) Подождите...                            

</template>

<script>
import {
    Icon,
    Input
} from '@/components'
import Vue from "vue";
import Multiselect from 'vue-multiselect'

export default {
    name: "auth",
    components: {
    Icon,
    Input,
    Multiselect
},
    data() {
        return {
            inn: '',
            login: '',
            password: '',
            errors: [],
            loading: false,
            page: 'auth',
            regData: [],
            activeClientTab: 0,
            successText: null,
            privacy: false,
            dadataValues: [],
            isLoading: false,
            forgot: false,
            forgotSent: false,
        }
    },
    computed: {
        isLoggedIn () {
            return this.$store.getters.cuser.isLoggedIn
        },
        currentData () {
            return this.regData[this.activeClientTab];
        },
        formatedForm: function () {
            let result = {};
            result['DATE'] = new Date();
            result['CLIENT_ID'] = this.activeClientTab;
            result['ATTACHMENTS'] = [];

            if (this.activeClientTab !== null) {
                let array = this.currentData.sections;
                for (let index = 0; index < array.length; index++) {
                    const element = array[index];
                    for (let i = 0; i < element.fields.length; i++) {
                        const field = element.fields[i];
                        if (field.type === 'file') {
                            for (let k = 0; k < field.value.length; k++) {
                            const file = field.value[k];

                            result['ATTACHMENTS'].push({
                                "MODEL": field.model,
                                "TITLE": file.title,
                                "FileID": file.FileID,
                            })
                            }
                        } else if (field.model === 'PROP_INN') {
                            if (field.value) 
                                result[field.model] = field.value.data.inn;
                        } else {
                            result[field.model] = field.value;
                        }
                    }
                }
            }
            return result;
        },
    },
    mounted() {
        console.log(this.page, 'page')
        if (this.isLoggedIn) {
            console.log('Вы авторизованы, покиньте страницу...')
        } else {
            fetch('https://1c.aostng.ru/VESTA/hs/API_STNG_JUR/V1/reg_details')
                .then(res => res.json())
                .then(data => {
                    console.log('Получены данные для формы регистрации', data)
                    this.regData = data;
                });
        }
    },
    methods: {
        selectINN: function (value) {
            for (let i = 0; i < this.currentData.sections.length; i++) {
                const section = this.currentData.sections[i];
                const item = section.fields.find(prop => prop.model === 'PROP_ORG_NAME');
                if (item !== undefined) {
                    item.value = value.value
                }
            }
        },
        asyncFind: function(val) {
            // if (val.length > 5) { // 143405 инн тест
                this.dadataValues = [];
                this.isLoading = true;

                const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party";
                const token = "f135ebe81ca212b9d61fedadba1e0111159f0d6b";
                let query = val;

                const options = {
                    method: "POST",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": "Token " + token
                    },
                    body: JSON.stringify({locations_boost: [{kladr_id: "14"}], query: query})
                }

                fetch(url, options)
                    .then(res => res.json())
                    .then(data => {
                        console.log('data.suggestions', data.suggestions)
                        this.dadataValues = data.suggestions;
                        this.isLoading = false;
                    })

            // }
        },
        sendForm: async function () {
            this.errors = [];
            this.loading = true;
            if (this.privacy === false) {
                this.errors.push('Требуется согласие на обработку персональных данных')
                return;
            }
            const form = this.formatedForm;
            
            const res = await fetch('https://1c.aostng.ru/VESTA/hs/API_STNG_JUR/V1/reg_apps', {
                method: 'post',
                mode: 'cors',
                body: JSON.stringify(form)
            });
            const json = await res.json();
            
            if (json.Error === true) {
                this.errors.push(json.Message);
                console.error('form error: ', json.Message);
            } else {
                // this.$router.push('/agreements/')
                this.successText = json.Message;
                // this.nextStep();
            }
            this.loading = false;
        },
        loadFile: async function (e) {
            const file = e.target.files[0];
            const reader = new FileReader();

            reader.onloadend = async () => {
            const base64String = reader.result
                .replace('data:', '')
                .replace(/^.+,/, '');

            const raw = {
                "title": file.name,
                "base64": base64String,
            };

            let res = await fetch(
                'https://1c.aostng.ru/VESTA/hs/API_STNG/jur_file',
                {
                method: 'post',
                body: JSON.stringify(raw),
                mode: 'cors',
                }
            );

            let json = await res.json();

            this.currentData.sections[1].fields[
                e.target.attributes['data-prop'].value
            ].value = [
                ...this.currentData.sections[1].fields[
                e.target.attributes['data-prop'].value
                ].value,
                json,
            ];
            };
            reader.readAsDataURL(file);
        },
        checkin () {
            this.errors = []
            if (this.login.length < 3) {
                this.errors.push('Введите корректный логин')
            }
            if (this.password.length < 3) {
                this.errors.push('Введите корректный пароль')
            }
        },
        async submit () {
            this.loading = true
            this.checkin()

            if (this.errors.length === 0) {
                const userObject = {
                    login: this.login,
                    password: this.password,
                }
                await this.$store.dispatch('authUser', userObject)
                    .then(res => {
                        this.$router.push('/agreements/')
                        this.errors.push(res)
                    })

            }
            this.loading = false
        },
        forgotPage () {
            this.page = 'forgot'
        },
        async submitForgot () {
            this.loading = true
            // this.checkin()

            // if (this.login > 3) {
                console.log('test')
                const userObject = {
                    email: this.login,
                }
                if (this.login.length > 3) {

                await this.$store.dispatch('forgotUser', userObject)
                    .then(res => {
                        if (res.error) {
                            
                            this.forgotSent = false                            
                        } else {
                           this.forgotSent = true 
                        }
                        this.errors = []
                        this.loading = false
                        this.errors.push(res.message)
                    })
                } else {
                    this.errors = []
                    this.errors.push('Введите корректный логин')
                    this.loading = false
                }

            // } else {
            //     this.errors = []
            //     this.errors.push('Введите корректный логин')
            // }
            
        }  
    },
    watch: {

    }
}
</script>

<style scoped lang="sass">
@import ~@/assets/styles/vars

.files
    margin: 0
    li
        margin-bottom: 1rem
.auth
    display: flex
    flex: 1
    align-items: center
    justify-content: center
    background: #F3F6FA

    &__container
        max-width: 360px
        width: 100%
    &__wrapper
        display: flex
        flex-direction: column
    &__card
        background: #FFFFFF
        box-shadow: 0 2px 4px #E7EDF6
        border-radius: 4px
        margin-bottom: 16px
        &-inner
            margin: 24px
            display: flex
            flex-direction: column
    &__notaccount
        font-weight: 500
        font-size: 15px
        line-height: 24px
        color: #7F8DA8
        margin: 16px
        text-align: center
    &__title
        font-style: normal
        font-weight: 500
        font-size: 15px
        line-height: 24px
        color: #7F8DA8
        margin: 8px 0 20px
        text-align: center
    &__form
        display: flex
        flex-direction: column
    &__selector
        display: flex
        border-radius: 4px
        overflow: hidden
        margin-bottom: 16px
        &-btn
            display: flex
            flex: 1
            justify-content: center
            align-items: center
            font-style: normal
            font-weight: normal
            font-size: 13px
            line-height: 24px
            color: #7F8DA8
            background: #F3F6FA
            border: 0
            cursor: pointer
            outline: none
            padding: 8px

            &.active
                background: #3F64A9
                color: #fff
    &__fieldset
        display: flex
        flex-direction: column
        margin-bottom: 16px
        &-title
            font-weight: 400
            font-size: 13px
            line-height: 24px
            color: #2F384A
            margin: 1rem 0
        &-item
            margin-bottom: 16px
            &:last-child
                margin-bottom: 0
    &__error
        margin: 0 0 8px
.error
    color: red
    margin: 0
    line-height: 16px
    font-size: 13px
    &:last-child
        margin-bottom: 0
.app__backward
    margin-bottom: 16px
    line-height: 48px
.app__header-logo
    width: 100%
    padding: 0

.button
    background: $color-primary
    height: 3rem
    cursor: pointer
    font:
        weight: 500
        size: .95rem
    color: #fff
    border-radius: 4px
    padding: 2px 1rem 0
    display: flex
    justify-content: center
    align-items: center
    border: 2px solid transparent
    width: 100%

.auth__field-file
    display: flex
    align-items: center
    justify-content: center
    text-align: center
    background: #FFFFFF
    border: 1px dashed #E6ECF5
    border-radius: 4px
    padding: 12px
    font-weight: 400
    font-size: 13px
    line-height: 24px
    color: #3F64A9
    cursor: pointer

    input[type='file']
        position: absolute
        left: -9999px
        opacity: 0

.checklist__item
    margin: 1rem 0

.option__desc
    display: flex
    flex-direction: column
</style>
