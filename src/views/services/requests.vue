<template lang="pug">
.services-requests
  table(v-if="!isMobile")
    thead
      tr
        th № заявки
        th Услуга
        th Адрес
        th Статус заявки
        th Дата приема
        th Дата исполнения
        th № и дата дела
        th Комменарий
        th Договор
    tbody
      tr(v-for="(item, itemIndex) in list")
        td
          .services-requests__request
            div {{ '№' + item.number }}
              br
              | {{ item.date }}
            img.services-requests__print(src="@/assets/images/print.svg")
        td
          span {{ item.type }}
        td {{ item.email }}
        td {{ item.statys }}
        td {{ item.receiptDate }}
        td {{ item.dueDate }}
        td {{`№${ item.number }  ${item.date}`}}
        td {{ item.comment }}
        td
          .services-requests__agreement(v-if="item.agreement", @click="sign")
            img(src="@/assets/images/contract.svg")
            span Подписать
  .mobile-table.mobile-table_variant(v-else)
    .mobile-table__item(v-for="(item, itemIndex) in list")
      .mobile-table__field
        .mobile-table__key № заявки
        .mobile-table__value
          span {{ item.number + ' ' + item.date }}
      .mobile-table__field
        .mobile-table__key Услуга
        .mobile-table__value {{ item.type }}
      .mobile-table__field
        .mobile-table__key Адрес
        .mobile-table__value
          span {{ item.email }}
      .mobile-table__field
        .mobile-table__key Статус заявки
        .mobile-table__value
          span {{ item.statys }}
      .mobile-table__field
        .mobile-table__key Дата приема
        .mobile-table__value
          span {{ item.receiptDate }}
      .mobile-table__field
        .mobile-table__key Дата исполнения
        .mobile-table__value
          span {{ item.dueDate }}
      .mobile-table__field
        .mobile-table__key № и дата дела
        .mobile-table__value
          span {{`№${ item.number }  ${item.date}`}}
      .mobile-table__field.mobile-table__field_column
        .mobile-table__key Комментарий
        .mobile-table__value
          span {{ item.comment }}
      .mobile-table__item-footer
        Button(size="small", variety="secondary", style="font-weight: normal") Распечатать
        Button(
          size="small",
          style="font-weight: normal",
          v-if="item.agreement",
          @click.native="sign"
        ) Подписать
</template>

<script>
import moment from "moment";
import { Button } from "@/components";


export default {
  name: "ServicesRequests",
  components: {
    Button, 
  },
  data() {
    return {
      // list: [],
    };
  },
  mounted() {
    this.$store.dispatch("getServicesRequests",).then(() => {
      // this.list = this.$store.state.servicesRequests;
      // console.log(this.$store.state.servicesRequests, "test services requests");
    });
  },
  methods: {
    formatDate(date) {
      return moment(date).format("DD.MM.YYYY");
    },
    sign() {
      this.$store.dispatch("showOverlay");
    },
  },
  computed: {
    isMobile() {
      return this.$screen.width < 760;
    },
    list() {
      return this.$store.state.servicesRequests;
    }
  },
};
</script>

<style lang="sass">
@import @/assets/styles/vars




  
.bills-history
    border-right: 1px solid $color-border
    .layout__title
        font-size: 17px
        margin-bottom: 24px

        @media screen and (max-width: $mobile-width)
            margin-bottom: 0
            font-size: 15px

    .layout__tabs
        position: relative

    &__footer
        display: flex
        justify-content: flex-end
        align-items: center
        margin-top: 15px
        padding-right: 80px

    &__total
        font:
            size: 13px
        color: $color-font
        margin-right: 24px

        span
            color: $color-primary
            margin-left: 8px

    &__date-filter
        // background: red
        position: relative
        display: flex
        
        // position: absolute
        // right: 24px
        // top: 12px
        top: 0px
        right: 0px
        align-items: center
        cursor: pointer

        @media screen and (max-width: $mobile-width)
            right: 16px

        &-icon
            margin-left: 10px

        .mx-icon-clear
            z-index: 100
            right: auto
            left: -18px

        input
            font-size: 12px
            border: none
            cursor: pointer
            padding: 0
            text-align: right

            @media screen and (max-width: $mobile-width)
                width: 100px






.services-requests
    table
        width: 100%
        font:
            size: .8125rem
        border-spacing: 0

        thead
            background: $color-primary
            color: #fff

        th
            line-height: 15px
            padding: 10px 24px
            font-weight: 500
            border-right: 1px solid $color-primary-border
            text-align: left

            &:last-child
                border-right: none

        td
            line-height: 18px
            border-bottom: 1px solid $color-border
            border-right: 1px solid $color-border
            padding: 1.25rem 1.5rem
            color: $color-font
            vertical-align: top

            span
                color: $color-primary

            &:last-child
                border-right: none

        tbody
            tr:nth-child(2n)
                background: rgba(63, 100, 169, 0.05)

    &__print
        cursor: pointer

    &__request
        display: flex
        align-items: center
        font:
            weight: 500

        img
            margin-left: 16px

    &__agreement
        display: flex
        flex-direction: column
        align-items: center
        cursor: pointer

        span
            margin-top: 8px
</style>