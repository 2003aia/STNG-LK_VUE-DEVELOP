<template lang="pug">
.layout.profile
    .layout__main(v-if="passChange===false")
        .layout__title Мои данные
        <br>    
        .text Имя котрагента  
            span {{profile.name}}
        <br>    
        .text email 
            span {{profile.email}}
        div
            Row(:style="{marginTop:isMobile?'10px':'1.125rem'}" gutter="1.5" unit="rem")
                Col
                    Input(label="Фамилия" v-model="profile.familia")
                Col
                    Input(label="Имя" v-model="profile.imya")
            Row(:style="{marginTop:isMobile?'0':'1.125rem'}" gutter="1.5" unit="rem")
                Col
                    Input(label="Отчество" v-model="profile.otchestvo")
                Col
            Row(:style="{marginTop:isMobile?'0':'1.125rem'}" gutter="1.5" unit="rem")
                Col
                    Input(label="Телефон" v-model="profile.phone")

            Row(:style="{marginTop:isMobile?'8px':'1.5rem'}" gutter="1.5" unit="rem")
                Col
                    a.click-button(@click.prevent="saveProfile")
                        Button(full) Сохранить изменения 
                Col
                    a.click-button(@click.prevent="passChange = !passChange")
                        Button(full, variety="secondary") Изменить пароль
    .layout__main(v-if="passChange===true")
        .layout__title Мои данные
        div
            Row(:style="{marginTop:isMobile?'10px':'1.125rem'}" gutter="1.5" unit="rem")
                Col
                    Input(label="Новый пароль" v-model="password")
                Col
                    Input(label="Повторите новый пароль" v-model="passwordConfirm")
            Row(:style="{marginTop:isMobile?'10px':'1.125rem'}" gutter="1.5" unit="rem" v-if="error")
                .error-text {{ error }}
            Row(:style="{marginTop:isMobile?'8px':'1.5rem'}" gutter="1.5" unit="rem")
                Col
                    a.click-button(@click.prevent="savePassword")
                        Button(full) Сохранить изменения
                Col
                    a.click-button(@click.prevent="passChange = !passChange")
                        Button(full, variety="secondary") Изменить данные
                              
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
  SidebarSupport,
} from "@/components";
import Vue, { ref } from "vue";

export default {
  name: "Profile",
  data() {
    return {
        profile: {
        token: "",
        id: "",
        login: "",
        familia: "",
        imya: "",
        otchestvo: "",
        phone: "",
        email: "",
      },
      passChange: false,
      password: "",
      passwordConfirm: "",
      error: "",
    };
  },
  computed: {
    isMobile() {
      return this.$screen.width < 760;
    },
  },
  mounted() {
    // this.$store.dispatch("getProfile");

    this.profile = JSON.parse(Vue.cookie.get("profileData"));
  },
  methods: {
    async saveProfile() {
      const token = Vue.cookie.get("token");
      const userObject = {
        token: token,
        id: this.profile.id,
        login: this.profile.login,
        phone: this.profile.phone,
        familia: this.profile.familia,
        imya: this.profile.imya,
        otchestvo: this.profile.otchestvo,
      };
      const cachedData = JSON.parse(Vue.cookie.get("profileData"));

      this.$store.dispatch("saveProfile", userObject).then((res) => {
        if(res.error === false){
          this.$store.commit("setModal", {type: 'info', info: 'Данные успешно сохранены'});
          Vue.cookie.set(
            "profileData",
            JSON.stringify({ ...cachedData, ...userObject }),
            {
              expires: "2h",
            }
          );
        }
      });
    },
    async savePassword() {
      const token = Vue.cookie.get("token");
      const userObject = {
        token: token,
        password: this.password,
      };
      if(this.password.trim().length < 6){
        this.error = "Пароль не может быть меньше 6 символов";
        return;
      }

      if (this.password === this.passwordConfirm) {
        this.$store.dispatch("savePassword", userObject).then((res) => {
          console.log(res, "save password test");
          if(res.error === false){
            this.$store.commit("setModal", {type: 'info', info: 'Пароль успешно изменен'});
          }
        });
      } else {
        this.error = "Пароли не совпадают";
      }
    },
  },
  components: {
    LayoutSidebar,
    Row,
    Col,
    Input,
    Button,
    SidebarSupport,
  },
};
</script>

<style lang="sass">
@import @/assets/styles/vars

// .profile
.text
    color: $color-primary
    // margin-bottom: 0px
    margin-bottom: .5rem
    font:
        size: .8125rem
    // weight: 500
    // line-height: 1.5rem
    span
        color: #000
.click-button
    width: 100%

.error-text
    font-size: 14px
    color: #e10000
</style>
