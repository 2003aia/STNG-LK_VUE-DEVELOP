<template lang="pug">
.agreements(style="height:100%")
    router-view
</template>

<script>
import Loading from "@/components/loading";
export default {
    name: 'Agreements',
    data () {
        return {
            isEmpty: false
        }
    },
    mounted() {
        try {
            this.$store.dispatch('getAgreements').then((res)=>{
            })
            this.$store.dispatch('getBills')
        } catch {
            console.error('Error: dispatch `getAgreements` not send')
        }
    },
}
</script>

<style lang="sass">
@import @/assets/styles/vars

.agreements
</style>
