<script>
import { mask } from 'vue-the-mask';
import Multiselect from 'vue-multiselect';
import DatePicker from 'vue2-datepicker';

import 'vue-multiselect/dist/vue-multiselect.min.css';
import 'vue2-datepicker/index.css';

import 'vue2-datepicker/locale/ru';

export default {
  name: 'Input',
  props: ['label', 'type', 'value', 'options', 'optionLabel', 'customLabel', 'format', 'required', 'allowEmpty'],
  data() {
    return {
      localValue: this.value,
  
      is_empty: false
    };
  },
  
  directives: {
    mask: mask
  },
  
  components: {
    'multiselect': Multiselect,
    'date-picker': DatePicker
  },

  computed: {
    is_mobile() { return screen.width < 760 },
  },

  watch: {
    localValue(value) {
      if (this.type === 'select'){
        this.$emit('onselect', value)
      }
    },

    value(value) {
      this.localValue = value
    },
  },

  methods: {
    check_empty() {
      this.is_empty = false;

      if (this.required !== undefined && this.localValue === '') {
        this.is_empty = true
      }
    }
  }
}
</script>

<template lang="pug">
.input
  .input__input(:class="{'input__input_filled': value !== '', 'input__input_select': type === 'select'}")
    input(@focusout="check_empty" :value="value" @input="$emit('input', $event.target.value)" type="text" v-if="!type || type === 'text'")
    
    input(@focusout="check_empty" :value="value" @input="$emit('input', $event.target.value)" type="email" v-if="type === 'email'")
    
    input(@focusout="check_empty" :value="value" @input="$emit('input', $event.target.value)" type="tel" v-if="type === 'phone'" v-mask="'+7 (###) ###-##-##'")
    
    multiselect(
      v-model="localValue"
      :label="optionLabel"
      :custom-label="customLabel"
      :options="options"
      placeholder=""
      v-if="type === 'select'"
      :class="{'multiselect_filled': localValue}"
      selectLabel=""
      selectedLabel=""
      deselectLabel=""
      :showNoResults="false"
      :allow-empty="allowEmpty"
      )
    
    date-picker(
      v-model="localValue"
      v-if="type === 'date'"
      :editable="false"
      :clearable="true"
      :format="format"
      :class="{'datepicker_filled': localValue}")
    
    date-picker(
      type="time"
      v-model="localValue"
      v-if="type === 'time'"
      :editable="false"
      :format="format"
      :class="{'datepicker_filled': localValue}"
      :minute-step="5"
    )
    .input__label(v-if="type !== 'select'") {{ label }}
    .input__label(v-if="type === 'select'" style="z-index: 0") {{ label }}

  .input__notice.notice.notice_error(
    v-if="required !== undefined"
    :class="{'input__notice_hidden': !is_empty}"
  ) Обязательное поле
</template>

<style lang="sass">
@import @/assets/styles/vars

.input
  width: 100%
  position: relative
  z-index: 0
  padding-top: .5rem

  &__notice
    margin-top: .5rem
    margin-left: 1rem
    transition: .2s
    visibility: visible
    opacity: 1

    &_hidden
      visibility: hidden
      opacity: 0
      margin-top: -1rem

  &__label
    position: absolute
    top: 1.6rem
    left: calc(1rem + 1px)
    font:
        size: .8125rem
    color: $color-label
    z-index: 3
    transition: .2s
    cursor: text

  &__input
    border: 1px solid $color-border
    border-radius: 4px
    z-index: -1

    input
      border: none
      width: 100%
      height: calc(3rem - 2px)
      padding: 0 1rem .1rem
      font:
        size: .8125rem
        family: 'HelveticaNeueCyr'
      color: $color-font
      z-index: 100
      position: relative
      background: none

      &:focus
        outline: none

        & + .input__label
          line-height: .75rem
          font-size: .75rem
          background: #fff
          padding: 0 .25rem
          top: calc(-.375rem + .5rem)
          left: calc(1rem - .25rem)
    
    &_filled
      .input__label
        line-height: .75rem
        font-size: .75rem
        background: #fff
        padding: 0 .25rem
        top: calc(-.375rem + .5rem)
        left: calc(1rem - .25rem)

.multiselect
  height: calc(3rem - 2px)
  position: relative
  z-index: 3
  cursor: text

  &__select
    height: calc(100% - 2px)
    background:
      image: url('../assets/images/input-arrow.svg')
      repeat: no-repeat
      position: center

    &::before
      display: none

  &__placeholder
    display: none

  &__tags
    border: none
    padding:
      right: 40px
      left: 0
      top: 0
      bottom: 0
    background: none

  &__input
    margin: 0
    padding: 0 1rem .1rem !important

  &__single
    margin: 0
    padding: 0
    line-height: calc(3rem - 4px)
    padding: 1px 1rem 0
    height: calc(3rem - .1rem)
    overflow: hidden
    font:
        size: .8125rem
    color: $color-font
    background: none

  &--active + .input__label,
  &_filled + .input__label
    line-height: .75rem
    font-size: .75rem
    background: #fff
    padding: 0 .25rem
    top: calc(-.375rem + .5rem)
    left: calc(1rem - .25rem)

  &__content-wrapper
    width: calc(100% + 2px)
    margin-left: -1px
    margin-top: -4px
    border:
      left: 1px solid $color-border
      right: 1px solid $color-border
      bottom: 1px solid $color-border
      radius: 0 0 4px 4px
    z-index: 6 !important

    // пришлось убрать скролл, иначе слетает на сафари
    &::-webkit-scrollbar
      -webkit-appearance: none
      width: 0
      height: 0

    &::-webkit-scrollbar-thumb
      background: none

    &::-webkit-scrollbar-track
      background: none

  &__content
    position: relative
    width: 100%

    @media screen and (max-width: $mobile-width)
      width: 100%

  &__element
    @media screen and (max-width: $mobile-width)
      width: 100%

  &__option
    font-size: .8125rem
    white-space: unset

    @media screen and (max-width: $mobile-width)
      width: 100%

      span
        white-space: normal

    &--selected
      background: $color-secondary
      font-weight: normal

    &--highlight
      background: $color-primary
        
      span
        color: #fff !important

  .multiselect__option--selected.multiselect__option--highlight
    background: $color-primary

    span
      color: $color-font-mute

.multiselect--active
  z-index: 1000

.datepicker_filled + .input__label
  line-height: .75rem
  font-size: .75rem
  background: #fff
  padding: 0 .25rem
  top: calc(-.375rem + .5rem)
  left: calc(1rem - .25rem)

.mx-datepicker
  width: 100%

.mx-input
  padding-bottom: 0
  box-shadow: none
  padding-top: 0

.mx-icon-calendar
  display: none

.mx-icon-clear
  z-index: 100
  right: .8rem

  svg
    path
      fill: #C8D0DF

  &:hover
    svg
      path
        fill: $color-font-mute

.mx-datepicker-popup
  box-shadow: none
  margin-top: -1px
  border: 1px solid $color-border

.mx-calendar-content
  .cell.active
    background-color: $color-primary

  .cell:hover
    background-color: $color-secondary
    color: $color-font-mute

.mx-table-date
  .today
    color: $color-primary

.mx-btn-text, .mx-date-row .cell, .mx-table, .mx-datepicker-main
  font-family: 'HelveticaNeueCyr'
  color: $color-font-mute

  &:hover
    color: $color-font-mute

.mx-time-column
  .mx-time-item
    &:hover
      background: $color-secondary

    &.active
      color: $color-primary
</style>
