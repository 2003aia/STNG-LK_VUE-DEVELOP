<template lang="pug">
.agreements-address-counter
  .history__table(v-if="!isMobile")
    .history__table-row.history__table-row_heading
      .history__table-cell № счетчика
      .history__table-cell Показания счетчика
      .history__table-cell Дата поверки
      .history__table-cell Новые показания
    .history__table-row(v-for="item in records", :key="item.id")
      .history__table-cell {{ item.counterId }}
      .history__table-cell {{ item.old_indication }}
      .history__table-cell {{ item.date }}
        //div(:style="{color:getColor(item.date)}") {{ item.date }}
      .history__table-cell
        input(
          type="number",
          v-model="item.value",
          placeholder="Введите показания счетчика"
        )
  .mobile-table.mobile-table_variant(v-if="isMobile")
    .mobile-table__item(v-for="item in records", :key="item.id")
      .mobile-table__title {{ item.counterId }}
      .mobile-table__field
        .mobile-table__key Показания счетчика
        .mobile-table__value {{ item.old_indication }}
      .mobile-table__field
        .mobile-table__key Дата поверки
        .mobile-table__value {{ item.date }}
          //div(:style="{color:getColor(item.date)}") {{ item.date }}
      .mobile-table__field
        .mobile-table__key Новые показания
        .mobile-table__value
          input(
            type="number",
            v-model="item.value",
            placeholder="Введите показания"
          )
  .notice(v-if="notice")
    p {{ notice }}
  .bills-counter__footer.bills-counter__footer_variant
    .bills-counter__description В случае неправильного ввода показаний, следует обратиться в отдел по работе с предприятиями УГРС по телефонам: 46-00-62, 46-00-73, 46-00-20, 46-00-25
    .bills-counter__submit
      ButtonClick(size="small", @click="sendIndication") Подтвердить
</template>

<script>
import { Back, ButtonClick } from "@/components";
import DatePicker from "vue2-datepicker";
import moment from "moment";
import Vue from "vue";

export default {
  name: "AgreementsAddressesCounters",
  data() {
    return {
      records: [],
      notice: "",
      objectId: "",
    };
  },
  components: {
    Back,
    ButtonClick,
    DatePicker,
  },
  methods: {
    formatDate(date) {
      return moment(date).format("DD.MM.YYYY");
    },
    getColor(date) {
      let deadline = moment(date).subtract(7, "days");
      return deadline >= moment() ? "#7F8DA8" : "#C10909";
    },
    sendIndication() {
      let is_can = false;

      for (let record of this.records) {
        let old_indication_str = record.old_indication + "";

        if (record.value !== "") {
          if (+record.value < record.old_indication)
            return (this.notice = `Показания по счетчику ${record.counterId} меньше предыдущих показаний`);
          if (record.value.length - old_indication_str > 2)
            return (this.notice = `Показания по счетчику ${record.counterId} слишком большая разница между текущими и предыдущими показаниями`);

          this.notice = "";
          is_can = true;
        }
      }

      if (is_can) {
        this.$store.dispatch("sendIndication", this.records).then((res) => {
          this.notice = res;
        });
      }
    },
  },
  computed: {
    isMobile() {
      return screen.width < 760;
    },
    getCounters() {
      return this.$store.getters.getCurrentAgreement;
    },
    getBills() {
      return this.getCounters.objects.filter(
        (el) => el.objectId || this.$data.objectId === this.$data.objectId
      );
    },
  },
  mounted() {
    let counters = this.getCounters.objects.filter(
      (el) =>
        el.objectId ===
        this.$route.params
          .address 
    );
    if (counters.length == 0) {
      counters = this.getCounters.objects.filter(
        (el) => el.objectId === Vue.cookie.get("objectId")
      );
    }
    console.log(counters, "test");
    this.$data.objectId = Vue.cookie.get("objectId");
    let test = false;

    if (counters.length !== 0) {
      test = true;
      if (test === true) {
        Vue.cookie.set("objectId", this.$route.params.address, {
          expires: "2h",
        });
      }

      for (let counter of counters[0].counters) {
        this.records.push({
          counterId: counter.counter,
          counterNumber: counter.Id,
          value: "",
          old_indication: counter.Indication,
          date: counter.dateEnd,
          name: counter["counter"],
          agreementId: this.$route.params.address,
          objectId: counter.objectId,
        });
      }
    }
  },
};
</script>

<style lang="sass">
@import ~@/assets/styles/vars

.agreements-address-counter
.notice
  padding: 24px 24px 0
  color: #3F64A9
  p
    margin: 0
    font-size: 14px
</style>
