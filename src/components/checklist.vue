<template lang="pug">
.checklist(:class="{'checklist_cols_2': cols === 2}")
    .checklist__label {{ label }}
    .checklist__items
        label.checklist__item(v-for="(item, index) in items")
            input(:type="type" :name="type === 'radio' ? 'radio' : 'checkbox'" :value="value" @input="$emit('input', $event.target.value)")
            .checklist__item-checkbox(:class="{'checklist__item-checkbox_radio': type === 'radio'}")
            .checklist__item-label(:class="{'checklist__item-label_color_font': itemsColor === 'font'}") {{ item }}
</template>

<script>
export default {
    name: 'Checklist',
    props: {
        value: [Object, String, Boolean],
        label: String,
        type: String,
        items: Array,
        itemsColor: String,
        cols: Number
    }
}
</script>

<style lang="sass">
@import @/assets/styles/vars

.checklist
    display: flex
    flex:
        direction: column

    &_cols_2
        .checklist__item
            @media screen and (max-width: $mobile-width)
                width: 50%
    
    &__label
        margin-bottom: 1rem
        font-size: .8125rem
        color: $color-font
        line-height: 1.5rem

    &__items
        display: flex

        @media screen and (max-width: $mobile-width)
            flex-wrap: wrap
        
    &__item
        display: flex
        align-items: center
        margin-right: 3rem
        cursor: pointer

        @media screen and (max-width: $mobile-width)
            width: 100%
            margin: 0 0 16px

        input
            display: none

        input:checked + &-checkbox::before
            display: flex
        
        &-checkbox
            width: 1rem
            height: 1rem
            border: 1px solid $color-border
            border-radius: 2px
            margin-right: .75rem
            position: relative
            flex-shrink: 0

            &::before
                content: ''
                width: .5rem
                height: .5rem
                position: absolute
                background: $color-primary
                top: 50%
                left: 50%
                margin-left: -.25rem
                margin-top: -.25rem
                border-radius: 1px
                display: none

        &-label
            color: $color-primary
            line-height: 1rem
            font-size: .8125rem

            &_color
                &_font
                    color: $color-font
</style>