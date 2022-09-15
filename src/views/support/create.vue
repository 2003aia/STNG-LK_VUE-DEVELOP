<script>
import Icon from "@/components/icon";
import Input from "@/components/input";
import Loading from "@/components/loading";

export default {
  name: "SupportCreate",

  components: {
    "c-icon": Icon,
    "c-input": Input,
    "c-loading": Loading,
  },

  data() { return {
    selected_category: "",
    message: "",
    files: [],
    filesError: false,
  }},

  mounted: () => {
    this.$store.commit("supportModule/set_ticket", null);
  },

  computed: {
    categories: () => this.$store.getters["supportModule/categories"],

    is_loading: () => this.$store.getters["supportModule/is_loading"],
  },

  methods: {
    on_change_message: (e) => (this.message = e.target.innerText),

    send_message: (e) => {
      if (this.message !== "" && this.selected_category !== "") {
        this.$store.dispatch("supportModule/send_message", {
          message: this.message,
          category_id: this.selected_category.value,
          files: this.files,
        });

        this.message = "";
        this.filesError = false;
      }
    },

    select_file: (e) => {
      const files = e.target.files;

      for (file in files) {
        if (file.size > 2097152) this.filesError = true;
        else this.files.push(file);
      }
    },

    drop_file: (e, index) => {
      this.files.splice(index, 1);
      this.filesError = false;
    },

    select_category: (value) => (this.selected_category = value),
  },
};
</script>

<template lang="pug">
.support-create
  router-link.backward(to="/support")
    c-icon(icon="angle-left" color="font-mute")
    span Вернуться назад
    
  .route-title
    c-icon(icon="new-message" color="primary")
    span Новое обращение

  .loading(v-if="is_loading")
    c-loading

  div(v-if="!is_loading")
    .category(v-if="categories.length > 0")
      c-input(
        type="select"
        :options="categories"
        label="Выберите категорию обращения"
        optionLabel="label"
        :value="selected_category"
        @onselect="select_category"
        style="z-index:1")

    .message
      .message-placeholder(v-if="!message") Напишите что нибудь...
      
      label.message-file
        c-icon.message-icon(icon="attachment" color="primary")
        input(type="file" multiple @change="select_file")
      
      .message-input(contenteditable @input="on_change_message" ref="chatinput")
      
      button.message-send(@click="send_message" :disabled="message === '' || selected_category === ''")
        c-icon(icon="send" color="primary")

    .files
      .files-item(v-for="(file, file_index) in files")
        .files-item-name {{ file.name }}
        
        .files-item-close(@click="e => drop_file(e, file_index)")
          img(src="@/assets/images/file-close.svg")
    .files-error(v-if="filesError")
      small Размер файла превышает допустимое!
    .files-types
      small Вы можете загружать файлы не больше 2 Мб. Поддерживаемые типы файлов: .doc, .xls, .pdf, .jpg, .png

</template>

<style lang="sass" scoped>
@import @/assets/styles/vars

.loading
  margin-top: 2rem

.support-create
  width: 100%

  .backward
    margin: 1.5rem

  .route-title
    margin: 1.5rem
    
    span
      margin-left: 1rem

  .category
    width: calc(100% - 1.5rem)
    padding: 0 1.5rem
    box-sizing: border-box

    @media screen and (max-width: $mobile-width)
      flex-grow: 1
      padding: 16px

.message
  flex-shrink: 0
  border-top: 1px solid $color-border
  width: 100%
  display: flex
  align-items: flex-start
  padding: 1rem 1.5rem
  box-sizing: border-box
  margin-top: 1.5rem
  position: relative
  justify-content: space-between

  &-placeholder
    position: absolute
    font-size: 13px
    line-height: 1.5rem
    left: 4.35rem
    z-index: -1
    color: $color-label

  &-file
    input
      display: none

  &-icon
    margin-top: .2rem
    cursor: pointer

  &-input
    width: 100%
    margin: 0 1.5rem 0 1.75rem
    font-size: 13px
    line-height: 1.5rem

    &:focus
      outline: none

  &-send
    border: none
    background: none
    margin-top: .2rem
    cursor: pointer

    &:focus
      outline: none

.files
  display: flex
  margin-left: 70px
  width: 100%
  flex-wrap: wrap
  
  &-item
    display: flex
    align-items: center
    height: 40px
    border-radius: 4px
    background: $color-secondary
    padding: 0 .5rem 0 1rem
    margin-right: .5rem
    margin-bottom: .5rem

    &-name
      font:
        size: 13px
      color: $color-font-mute
      margin-right: 10px

    &-close
      width: 20px
      height: 20px
      display: flex
      align-items: center
      justify-content: center
      cursor: pointer
  &-types
    padding: 0.25rem 1.25rem 0.75rem
    font-size: 14px
    color: #9292ad

  &-error
    padding: 0.25rem 1.25rem 0.75rem
    font-size: 14px
    color: $color-red

</style>
