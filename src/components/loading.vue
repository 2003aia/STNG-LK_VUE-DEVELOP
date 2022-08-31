<script>
import Loading from 'vue-loading-overlay'

export default {
    name: 'c-loading',

    props: ['getter'],

    computed: {
        is_loading () {
            if (this.getter !== undefined) {
                return this.$store.getters[this.getter]
            } else {
                return this.$store.getters.is_loading
            }
        }
    },
    components: {
        Loading
    }
}
</script>

<template lang="pug">
.loading(v-if="is_loading")
    Loading(:active.sync="is_loading" :can-cancel="true" :is-full-page="false" color="#3F64A9" :width="100" :height="80")
</template>

<style lang="sass" scoped>
.loading
    display: flex
    justify-content: center
    align-items: center
    margin-bottom: 30px
</style>
