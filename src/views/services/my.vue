<script>
import moment from "moment";

import Button from "@/components/button";
import Tabs from "@/components/tabs";
export default {
  name: "services-my",
  components: {
    "c-button": Button,
    "c-tabs": Tabs,
  },
  data() {
    return {
      tabs: [
        {
          label: "Мои заявки",
          path: "/services",
        },
      ],
    };
  },
  computed: {
    is_mobile() {
      return screen.width < 760;
    },
    is_loading() {
      return this.$store.getters.is_loading;
    },
    services() {
      return this.$store.getters.services_my;
    },
  },
  mounted() {
    this.$store.dispatch("get_services");
  },
  methods: {
    format_date(date) {
      if (date) moment(date).format("DD.MM.YYYY");
    },
    sign() {
      console.log("sign");
    },
  },
};
</script>

<template lang="pug">
div
  .loading(v-if="is_loading && !$route.params.id")
    c-loading
  c-tabs(:items="tabs")
  .my-services
    table(v-if="!is_mobile")
      thead
        tr
          th № заявки
          th Услуга
          th Адрес
          th Статус заявки
          th Дата приема
          th Дата исполнения
          th № и дата дела
          th Комментарий
          th Договор
      tbody
        tr(v-for="(item, item_index) in services")
          td
            .service-name
              div {{ `№${item.id}` }}
                br
                | {{ item.date }}
              //img.service-print(src="@/assets/images/print.svg")
          td
            span(v-html="item.service")
          td {{ item.address }}
          td
            span(v-html="item.status")
          td {{ item.date_start }}
          td {{ item.service === 'Социальная газификация' ? '-' : item.date_finish === false ? '-' : item.date_finish }}
          td -
          td {{ item.comment }}
          td -
            //- .service-agreement(@click="sign")
              img(src="@/assets/images/contract.svg")
              span Подписать

    .mobile-table(v-if="is_mobile")
      .mobile-table-item(v-for="(item, item_index) in services")
        .mobile-table-field
          .mobile-table-key № заявки
          .mobile-table-value
            span {{ `${item.id} ${item.date}` }}
        .mobile-table-field
          .mobile-table-key Услуга
          .mobile-table-value
            span(v-html="item.service")
        .mobile-table-field
          .mobile-table-key Адрес
          .mobile-table-value
            span {{ item.address }}
        .mobile-table-field
          .mobile-table-key Статус заявки
          .mobile-table-value
            span(v-html="item.status")

        .mobile-table-field
          .mobile-table-key Дата приема
          .mobile-table-value
            span {{ item.date_start }}

        .mobile-table-field
          .mobile-table-key Дата исполнения
          .mobile-table-value
            span {{ item.service === 'Социальная газификация' ? '-' : item.date_finish === false ? '-' : item.date_finish }}

        .mobile-table-field
          .mobile-table-key № и дата дела
          .mobile-table-value
            span -

        .mobile-table-field
          .mobile-table-key Комментарий
          .mobile-table-value
            span {{ item.comment }}

        //.mobile-table-footer
          c-button.print-button(bg="bg" color="primary" border="bg" full) Распечатать
          c-button(full) Подписать
</template>

<style lang="sass" scoped>
@import @/assets/styles/vars

.my-services
  // border-right: 1px solid $color-border

  table
    width: 100%
    font:
      size: .8125rem
    border-spacing: 0
    box-sizing: border-box

    thead
      background: $color-primary
      color: white

    th
      line-height: 15px
      padding: 10px 24px
      font-weight: 500
      border-right: 1px solid $color-primary-border
      text-align: left
      box-sizing: border-box

      &:last-child
        border-right: none

    td
      line-height: 18px
      border-bottom: 1px solid $color-border
      border-right: 1px solid $color-border
      padding: 1.25rem 1.5rem
      color: $color-font
      vertical-align: top
      box-sizing: border-box

      span
        color: $color-primary

        a
          color: #3F64A9
          text-decoration: none

      &:last-child
        border-right: none

    tbody
      tr:nth-child(2n)
        background: rgba(63, 100, 169, 0.05)

.service-print
  cursor: pointer

.service-name
  display: flex
  align-items: center
  font:
    weight: 500

  img
    margin-left: 16px

.service-agreement
  display: flex
  flex-direction: column
  align-items: center
  cursor: pointer

  span
    margin-top: 8px

.mobile-table
  border: 1px solid $color-border
  border-radius: 4px
  padding: 16px
  border: none
  border-top: 1px solid $color-border

  &-item
    border: none
    border-bottom: 1px solid $color-border
    padding: 16px 0

    &:last-child
      border-bottom: 0

    &:first-child
      padding-top: 0

  &-field
    display: flex
    justify-content: space-between
    font-size: 13px
    line-height: 24px
    color: $color-font-mute
    margin-top: 8px

  &-key
    color: $color-font-mute

  &-value
    color: $color-primary
    margin-left: 8px
    text-align: right

    span
      color: $color-font

  &-footer
    display: flex
    margin-top: 10px

.print-button
  margin-right: 1rem
</style>

<style>
.my-services table td span a {
  color: #3f64a9;
  text-decoration: none;
}
.my-services .mobile-table-value span a {
  color: #3f64a9;
  text-decoration: none;
}
</style>
