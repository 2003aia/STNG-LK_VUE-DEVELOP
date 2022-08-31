<template lang="pug">
.support__layout.sidebar-support
    .support__requests
        .support__request(v-for="(item, index) in support" @click="goto(index)")
            .support__request-title
                .support__request-number {{ '№' + item.number }}
                .support__request-status(:class="{'support__request-status_success': item.status === 'green', 'support__request-status_error': item.status === 'red'}")
            .support__request-date {{ formatDate(item.date) }}
</template>

<script>
import moment from 'moment'

export default {
    name: 'SidebarSupport',
    data () {
        return {
            support: []
        }
    },
    mounted () {
        this.$store.dispatch('getSupport')
        this.support = this.$store.state.support
    },
    methods: {
        formatDate (date) {
            return moment(date).calendar()
        },
        goto (index) {
            this.$router.push({name: 'support', query: { index }})
        }
    }
}
</script>

<style lang="sass">
@import @/assets/styles/vars

.sidebar-support
    .support__requests
        border-right: none
        width: 100%

    .support__request
        border-top: none
        border-bottom: 1px solid $color-border
        padding: 1rem 0
</style>