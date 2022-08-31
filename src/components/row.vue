<template lang="pug">
.row
    slot
</template>

<script>
export default {
    name: 'Row',
    props: {
        gutter: String,
        unit: String
    }
}
</script>

<style lang="sass">
@import @/assets/styles/vars

.row
    display: flex

    @media screen and (max-width: $mobile-width)
        flex-direction: column
</style>