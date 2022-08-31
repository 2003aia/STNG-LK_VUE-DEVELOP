<template lang="pug">
div(style="height:100%")
    router-view(v-if="!isEmpty")
    
    
    .layout(v-if="isEmpty")
        .layout__main
            .bills-list
                Card(
                    title="У вас есть лицевой счет?"
                    type="connect-bill"
                    )
                    div
                        | Абоненты с лицевыми счетами старого образца (менее 9 цифр) должны обратиться в 
                        span филиалы 
                        | для получения нового номера лицевого счета.

                    template(#footer)
                        Button(
                            variety="white"
                            :style="{width: isMobile ? '100%' : 'auto'}"
                        ) Добавить лицевой счет
                Card(title="Хотите подключить газ?" variety="secondary" type="connect-gas")
                    div Проектирование и строительство газопровода от газораспределительной сети до границы земельного участка, на котором располагается объект капитального строительства (жилой дом).
                    .card__meta(v-if="isMobile")
                        | Срок:
                        span от 90 дней
                    .card__meta(v-if="isMobile")
                        | Стоимость:
                        span от 65 000 руб.
                    template(#footer)
                        Button(:style="{width: isMobile ? '100%' : 'auto'}") Подать заявку
                        .card__meta(v-if="!isMobile")
                            | Срок:
                            span от 90 дней
                        .card__meta(v-if="!isMobile")
                            | Стоимость:
                            span от 65 000 руб.
</template>

<script>
import {
    Card,
    Button
} from '@/components'

export default {
    name: 'Bills',
    data () {
        return {
            isEmpty: false
        }
    },
    computed: {
        isMobile () {
            return screen.width < 760
        }
    },
    components: {
        Card, Button
    },
}
</script>

<style lang="sass">
@import ~@/assets/styles/vars

.layout
    &__main
        .card
            margin-bottom: 1rem

            @media screen and (max-width: $mobile-width)
                margin-bottom: 8px

            &__meta
                @media screen and (max-width: $mobile-width)
                    margin-left: 0
                    margin-top: 4px
</style>
