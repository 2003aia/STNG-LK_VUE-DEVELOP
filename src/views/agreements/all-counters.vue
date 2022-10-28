<template lang="pug">
.agreements-address-counter
  .history__table(v-if="!isMobile")
    .history__table-row.history__table-row_heading
      .history__table-cell № счетчика
      .history__table-cell Показания счетчика
      .history__table-cell Дата поверки
      .history__table-cell Новые показания
    .history__table-row(v-for="item in records", :key="item.id")
      .history__table-cell {{ item.name }}
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
      .mobile-table__title {{ item.name }}
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
  .notice(v-if="getSendNotices.length > 0" )
    p(v-for="notice in getSendNotices" :class="{notice__error: notice.error}") {{ notice.message }}
  .bills-counter__footer.bills-counter__footer_variant
    .bills-counter__description Показания с приборов учета принимаются в период с 25 по 2 число каждого месяца<br> В случае неправильного ввода показаний, следует обратиться в отдел по работе с предприятиями УГРС по телефонам: 46-00-62, 46-00-73, 46-00-20, 46-00-25
    .bills-counter__submit
      ButtonClick(size="small", @click="sendIndication") Подтвердить 
</template>

<script>
import { Back, ButtonClick } from "@/components";
import DatePicker from "vue2-datepicker";
import moment from "moment";
import Vue from "vue";

export default {
  name: "AgreementsAllCounters",
  data() {
    return {
      records: [],
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
      let sendRecord = [];
      let notices = [];
      for (const record of this.records) {

        if (record.value !== "") {
          if (+record.value < +record.old_indication){
            notices.push({ error: true, message: `${record.name}: Показания по счетчику меньше предыдущих показаний` });
          }
          
          const newLength = parseInt(record.value).toString().length;
          const oldLength = parseInt(record.old_indication).toString().length;
          if (newLength - oldLength >= 2){
            notices.push({ error: true, message: `${record.name}: Cлишком большая разница между текущими и предыдущими показаниями` });
          }

          sendRecord.push(record);
        }
      }

      if (notices.length > 0){
        this.$store.commit("addAgreementNotice", {agrId: this.$route.params.id, notices: notices});
        return;
      }

      //this.notices.push({ error: false, message: "Показания отправлены, подождите ответа" });
      this.$store.commit("setModal", {type: 'info', info: 'Показания отправлены, подождите ответа'});
      this.$store.commit("addAgreementNotice", {agrId: this.$route.params.id, notices: null});

      this.$store.dispatch("sendIndication", sendRecord).then((res) => {
        if(!res || res.length === 0){
          return;
        }
        if(res[0].message == "Прием показаний производится с 25 числа текущего месяца по 1 число следующего за отчетным. Передача показаний приборов учета в другие дни производится непосредственно куратору."){
          notices = [{error: true, message: "Прием показаний производится с 25 числа текущего месяца по 1 число следующего за отчетным. Передача показаний приборов учета в другие дни производится непосредственно куратору."}];
          this.records.forEach((o, i) => this.records[i].value = "")
          this.$store.commit("addAgreementNotice", {agrId: this.$route.params.id, notices: notices});
          return;
        }

        notices = [];
        notices = res.map(({ error, message }, index) => {
          const newMessage = sendRecord[index].name + ": " + message;

          if (error === false) {
            const newVal = sendRecord[index].value
            this.records.find((o, i) => {
              if (o.counterId === sendRecord[index].counterId) {
                this.records[i] = { ...this.records[i], value: "", old_indication: newVal};
                return true; // stop searching
              }
            });
          }

          return { error: error, message: newMessage };
        });

        console.log('setting notices', notices);
        this.$store.commit("addAgreementNotice", {agrId: this.$route.params.id, notices: notices});
        this.$store.commit('setModalType', null); 
      });
    },
  },
  computed: {
    isMobile() {
      return this.$screen.width < 760;
    },
    getCounters() {
      return this.$store.getters.getCurrentAgreement;
    },
    getSendNotices() {
      return this.$store.getters.agreementNotices[this.$route.params.id] ?? [];
    },
    getBills() {
      return this.getCounters.objects;
    },

    filteredRecords() {
      let filRecords = []
      for (const record of this.records) {
        let old_indication_str = record.old_indication + "";

        if (record.value !== "") {
          if (+record.value < +record.old_indication)
            continue;
          if (record.value.length - old_indication_str > 2)
            continue;

          filRecords.push(record);
        }
      }
      return filRecords;
    }
  },
  mounted() {
    const objects = this.getCounters.objects;
    console.log("Counters ", objects)

    if (objects.length !== 0) {
      [...objects].forEach((object) => {
        for (const counter of object.counters) {
          this.records.push({
            counterId: counter.Id,
            value: "",
            old_indication: counter.Indication,
            date: counter.dateEnd,
            name: counter["counter"],
            agreementId: this.$route.params.id,
            objectId: object.objectId,
          });
        }
      });
    }

    console.log('get info from store',this.getSendNotices)
  },
};
</script>

<style lang="sass">
@import ~@/assets/styles/vars

// .agreements-address-counter
.notice
  padding: 24px 24px 0
  color: #3F64A9
  p
    margin: 0
    font-size: 14px

  &__error
    color: #e10000

  @media screen and (max-width: $mobile-width) 
    padding: 16px 
</style>
