<template lang="pug">
.layout.services.layout_column(
  :class="{ services_form: $route.name === 'services-form' || $route.name === 'services-request' }"
)
  .layout__top(
    v-if="$route.name !== 'services-request' && $route.name !== 'services-form'"
  )
    .layout__tabs
      //- router-link.layout__tabs-item(to="/services" :class="{'layout__tabs-item_active': $route.name === 'services'}") Услуги
      router-link.layout__tabs-item(
        to="/services/requests",
        :class="{ 'layout__tabs-item_active': $route.name === 'services-requests' }"
      ) Мои заявки
      .bills-history__date-filter
        .bills-history__date-filter-input
          date-picker(
            v-model="periodHandler",
            :editable="false",
            :clearable="true",
            :format="isMobile ? 'DD.MM' : 'DD.MM.YYYY'",
            :range="true",
            placeholder="Выбрать период",
            :class="{ datepicker_filled: filter.date }"
          )
        .bills-history__date-filter-icon
          img(src="@/assets/images/calendar.svg")
    .layout__actions(v-if="$route.name === 'services'")
      .services__search
        .services__search-input
          input(v-model="search", placeholder="Найти услугу")
        .services__search-icon
          Icon(icon="search", color="font-mute-variant")
  .layout__content
    div(v-if="$route.name === 'services'")
      .services__categories
        .services__category(
          v-for="(category, categoryIndex) in categories",
          :key="categoryIndex",
          @click="selectedCategory = categoryIndex",
          :class="{ services__category_active: selectedCategory === categoryIndex }"
        ) {{ category }}
      .services__list(v-if="selectedCategory === 0")
        .services__item(v-for="(item, itemIndex) in list", :key="itemIndex")
          .services__item-title {{ item.name }}
          .services__item-description {{ item.description }}
          .services__item-footer
            Button(to="services/request") Подать заявку
            div(style="display: flex; align-items: center")
              .services__item-meta Срок:
                span {{ item.time }}
              .services__item-meta Цена:
                span {{ formatCurrency(item.price) }}
    router-view(v-if="$route.name !== 'services'")
</template>

<script>
import { Icon, Button } from "@/components";
import DatePicker from "vue2-datepicker";
import axios from "axios";
import Vue from "vue";

export default {
  name: "Services",
  data() {
    return {
      search: "",
      list: [],
      categories: ["Разовые услуги", "Технологическое присоединение (ТП)"],
      selectedCategory: 0,
      filter: {
        date: "",
      },
      periodHandler: "",
    };
  },
  methods: {
    formatCurrency: (value) => {
      return (
        value.toLocaleString("ru-RU", { minimumFractionDigits: 2 }) + " руб."
      );
    },
  },
  computed: {
    isMobile() {
      return this.$screen.width < 760;
    },
  },
  watch: {
    search(value) {
      if (value) {
        let list = this.$store.state.services;
        this.list = list.filter((item) => {
          return (
            item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
            item.description.toLowerCase().indexOf(value.toLowerCase()) !== -1
          );
        });
      } else {
        this.list = this.$store.state.services;
      }
    },
    periodHandler(value) {
        this.$store.dispatch("getServicesRequests", value)
    //   axios
    //     .get(
    //       `https://1c.aostng.ru/VESTA/hs/API_STNG_JUR/V1/jur_history?token=${Vue.cookie.get(
    //         "token"
    //       )}&beginPeriod=${beginPeriod}&endPeriod=${endPeriod}`
    //     )
    //     .then((res) => {
    //       if (res.status === 200) {
    //         console.log(res.data.data, "begin test");
    //       }
    //     });
    },
  },
  mounted() {
    //this.$store.dispatch("getServices");
    this.list = this.$store.state.services;
  },
  components: {
    Icon,
    Button,
    DatePicker,
  },
};
</script>

<style lang="sass">
@import @/assets/styles/vars

.services
    display: flex
    flex:
        direction: column
    border-right: 1px solid $color-border

    &_form
        border-right: none

        .layout__main
            padding-right: 0

    &__search
        display: flex
        align-items: center
        margin-right: 1.75rem

        @media screen and (max-width: $mobile-width)
            width: 100%

        &-input
            height: 100%
            margin-right: .75rem

            input
                text-align: right
                height: 100%
                font:
                    size: .9375rem
                border: none
                color: $color-font-mute

                &::placeholder
                    color: $color-font-mute-variant

                &:focus
                    outline: none

                @media screen and (max-width: $mobile-width)
                    width: 90px
                    font:
                        size: 13px

            @media screen and (max-width: $mobile-width)
                width: 100%
                margin-right: 8px

    &__categories
        background: $color-primary
        padding: 0 .5rem
        display: flex

        @media screen and (max-width: $mobile-width)
            padding: 0 8px
            overflow-x: auto

    &__category
        color: $color-font-mute-light
        line-height: 1.5rem
        padding: 1.25rem 1rem
        cursor: pointer

        @media screen and (max-width: $mobile-width)
            white-space: nowrap
            font:
                weight: 500
                size: 13px
            padding: 20px 8px

        &_active
            color: #fff

    &__list
        display: flex
        flex-direction: column

    &__item
        display: flex
        flex-direction: column
        border-bottom: 1px solid $color-border
        margin: 1.5rem 1.5rem 0
        padding-bottom: 1.5rem

        @media screen and (max-width: $mobile-width)
            margin: 16px 16px 0

        &:last-child
            border-bottom: none

        &-title
            color: $color-primary
            line-height: 1.5rem
            font:
                size: .9375rem
                weight: 500

            @media screen and (max-width: $mobile-width)
                font-size: 13px

        &-description
            line-height: 1.5rem
            font-size: .8125rem
            color: $color-font
            margin-top: .5rem

            @media screen and (max-width: $mobile-width)
                font-size: 13px

        &-footer
            margin-top: 1rem
            display: flex
            align-items: center

            @media screen and (max-width: $mobile-width)
                flex-direction: column-reverse
                align-items: flex-start

            .button
                height: 40px
                font-size: .8125rem

                @media screen and (max-width: $mobile-width)
                    margin-top: 16px

        &-meta
            margin-left: 1.5rem
            font-size: .8125rem
            color: $color-font-mute

            @media screen and (max-width: $mobile-width)
                margin-left: 0
                margin-right: 24px

            span
                color: $color-primary
                margin-left: .25rem
</style>