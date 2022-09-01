<template lang="pug">

.agreements-address-pay
    //- span test
    
    .history__table(v-if="!isMobile")
        .history__table-row.history__table-row_heading
            .history__table-cell(style="width: 60%") № счета
            .history__table-cell(style="width: 60%") Дата
            .history__table-cell(style="width: 60%") Задолженность
            .history__table-cell(style="width: 60%") Введите сумму
            .history__table-cell Действия
        .history__table-row(v-for="bill in bills" :key="bill.id")
            .history__table-cell(style="width: 60%") {{ bill.number }}
            .history__table-cell(style="width: 60%") {{ formatDate(bill.date) }}
            .history__table-cell(style="width: 60%") {{ formatPrice(bill['summ']) }}
            .history__table-cell(style="width: 60%")
                input(v-if="bill['summ'] !== 0" type="number" v-model="bill['toPay']" placeholder="Введите сумму")
                span(v-if="bill['summ'] === 0") {{ formatPrice(0) }}
            .history__table-cell
                div(style="display:flex;align-items:center;height: 100%;")
                    .bills-pay__pay
                        Button(size="small") Оплатить
                    .bills-pay__print
                        a(:href="getPDFFile" @click="getPDFId(bill.id)" :download="bill.id")
                            Button(size="small" variety="secondary") Распечатать счет

    .mobile-table.mobile-table_variant(v-if="isMobile")
        .mobile-table__item
            .mobile-table__title Сетевой газ
            .mobile-table__field
                .mobile-table__key Задолженность
                .mobile-table__value
                    span {{ formatPrice(gas.debt) }}
            .mobile-table__field
                .mobile-table__key Пени
                .mobile-table__value {{ formatPrice(gas.penalties) }}
            .mobile-table__field
                .mobile-table__key Итого
                .mobile-table__value
                    input(v-if="gas.debt !== 0 || gas.penalties !== 0" type="number" v-model="gas.toPay" placeholder="Введите сумму")
                    span(v-if="gas.debt === 0 && gas.penalties === 0") {{ formatPrice(0) }}

    //- .bills-pay__footer.bills-pay__footer_variant
        .bills-pay__total Итого к оплате
            span {{ formatPrice(calculateTotal()) }}
        div(style="display:flex;align-items:center")
            .bills-pay__pay
                Button(size="small") Оплатить
            .bills-pay__print
                Button(size="small" variety="secondary") Распечатать счет

    
</template>
//pre {{ getBills }}
<script>
import {Button} from '@/components'
import moment from "moment";

export default {
    name: 'Agreements',
    components: {
        Button
    },
    data () {
        return {
            pdf: [],
            bills: [],
            billId: '',
            gas: {
                label: 'Сетевой газ',
                debt: 760,
                penalties: 0,
                toPay: ''
            },
            maintenance: {
                label: 'Техобслуживание',
                debt: 7296,
                penalties: 0,
                toPay: ''
            },
            stadeDuty: {
                label: 'Техобслуживание',
                debt: 0,
                penalties: 0,
                toPay: ''
            },
            fines: {
                label: 'Госпошлина',
                debt: 0,
                penalties: 0,
                toPay: ''
            },
            connect: {
                label: 'Штрафы',
                debt: 0,
                penalties: 0,
                toPay: ''
            }
        }
    },
    methods: {
        formatPrice (value) {
            return value.toLocaleString('ru-RU') + ' руб.'
        },
        formatDate (date) {
            return moment(date).format('DD.MM.YYYY')
        },
        calculateTotal () {
            return (this.gas.toPay === '' ? 0 : +this.gas.toPay) + 
                (this.maintenance.toPay === '' ? 0 : +this.maintenance.toPay) + 
                (this.stadeDuty.toPay === '' ? 0 : +this.stadeDuty.toPay) + 
                (this.fines.toPay === '' ? 0 : +this.fines.toPay) + 
                (this.connect.toPay === '' ? 0 : +this.connect.toPay)
        },
        getPDFId (id) {
            // console.log(id, 'input pdf')
            this.$store.dispatch('getPDFFile', id).then(()=>{
            })
        }
       
    },
    computed: {
        isMobile () {
            return screen.width < 760;
        },
        getBills () {
            return this.$store.getters.getBills/* .find(bill => bill.id === this.$route.params.id); */
        },
        getPDFFile () {
            return this.$store.getters.getPDFFile
        }
    },
    mounted(){
        
        this.$data.bills = this.getBills.filter((el)=>el.agreement.id === this.$route.params.id)
        
       /*  this.$data.bills.forEach((el)=>{
            this.$store.dispatch('getPDFFile', el.id).then(()=>{
                this.$data.pdf.push(this.$store.getters.getPDFFile)
                console.log(this.$data.pdf,'getpdfFilemounteddd')
            })
        }) */
        

    }
}
</script>

<style lang="sass">
@import @/assets/styles/vars

.agreements-address-pay

.history__table-cell
    .bills-pay__pay
        span
            color: #fff
</style>
