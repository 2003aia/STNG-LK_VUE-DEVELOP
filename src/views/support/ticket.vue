<script>
import Icon from "@/components/icon-create-ticket";
import SidebarSupport from "@/components/sidebar-support";
import Loading from "@/components/loading";

export default {
  name: "SupportTicket",

  data() {
    return {
      profile: {
        id: "",
        login: "",
      },
      message: "",
      files: [],
      filesError: false,
      selected_ticket: null,
    };
  },

  components: {
    "c-icon": Icon,
    "c-support-list": SidebarSupport,
    "c-loading": Loading,
  },

  async mounted() {
    if (this.ticket === null) {
      await this.$store.dispatch("supportModule/init");
    }

    await this.$store.dispatch(
      "supportModule/get_messages",
      this.$route.params.id
    );
    
    this.scroll_chat();
  },

  computed: {
    tickets() {
      return this.$store.getters["supportModule/tickets"];
    },

    ticket() {
      return this.$store.getters["supportModule/ticket"];
    },

    messages() {
      return this.$store.getters["supportModule/messages"];
    },

    is_loading() {
      return this.$store.getters["supportModule/is_loading"];
    },

    supportCurator() {
      return this.$store.getters["supportModule/supportCurator"];
    },

    ticket_route() {
      return this.$route.params.id;
    },
  },

  watch: {
    async ticket_route(value) {
      await this.$store.dispatch("supportModule/get_messages", value);

      this.scroll_chat();
    },
  },

  methods: {
    selectTicket(ticket_id) {
      this.selected_ticket = ticket_id;
    },

    drop_file(e, index) {
      this.filesError = false;
      this.files.splice(index, 1);
      this.$refs.hidden_input.value = null;
    },

    download_file: async (name, src) =>{ 
      const fileLoad = await fetch(src);
      const stream = await fileLoad.blob();

      let link = document.createElement('a');
      link.href = window.URL.createObjectURL(stream);
      link.download = name;
      link.click();
    },

    select_file(e) {
      const files = e.target.files;
      this.filesError = false;

      for (const file of files) {
        if (file.size > 2097152) this.filesError = true;
        else this.files.push(file);
      }
    },

    scroll_chat() {
      this.$refs.scrollTop = this.$refs.offsetHeight + 1000;
    },

    on_change_message(e) {
      this.message = e.target.innerText;
    },

    async send_message(e) {
      console.log("I'm here");
      if (this.message !== "" && this.ticket) {
        await this.$store.dispatch("supportModule/send_message", {
          message: this.message,
          category_id: this.ticket.category_id,
          ticket_id: this.ticket.id,
          files: this.files,
        });

        this.message = "";
        this.$refs.chatinput.innerText = "";
        this.files = [];
        this.$refs.hidden_input.value = null;
        this.filesError = false;

        this.scroll_chat();
      }
    },
  },
};
</script>

<template lang="pug">
.ticket
  .ticket__wrapper
    .ticket__list(
      :class="{ 'ticket__list_hidden': selected_ticket }"
    )
      c-support-list(:items="tickets" @selectTicket="selectTicket")
    
    .ticket__chat
      .ticket__chat-loading(v-if="is_loading")
        c-loading

      .chat(v-if="ticket && !is_loading" ref="chat")
        .backward(@click="selected_ticket = null")
          c-icon(icon="angle-left" color="font-mute")
          span Вернуться назад
        
        .title
          .name Обращение №{{ ticket.id }}
          .description Категория: {{ ticket.category_name }}
        .messages(:style="[files.length > 0 ? {'margin-bottom': '125px'} : '']")
          .message(v-if="messages" v-for="message in messages" :class="{ answer: message.support_message }")
            .message-text {{ message.message }}
            .message-files(v-if="message.files != null")
              .files-item(v-for="file in message.files" )
                .files-item-name {{ file.name }}

                .files-item-download(@click="download_file(file.name, file.src)")
                  img(src="@/assets/images/file-download.svg")

            .message-date {{ message.date_create }}
            .message-angle
              c-icon(icon="message-angle" color="secondary")
      .input
        .input-wrapper
          .input-placeholder(v-if="!message") Напишите что нибудь...

          label.input-file
            c-icon.input-icon(icon="attachment" color="primary")
            input(type="file" multiple @change="select_file" ref="hidden_input" accept="application/msword,application/vnd.ms-excel,application/x-msexcel,application/x-excel,application/excel,application/pdf,image/jpeg,image/png")

          .input-input(contenteditable @input="on_change_message" ref="chatinput")
          button.input-send(@click="send_message")
            c-icon(icon="send" color="primary")

        .files(v-if="files.length > 0")
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

.ticket
  flex-grow: 0
  flex-shrink: 1
  height: calc(100% - 65px)

  .router-link-active
    border-bottom: 1px #3F64A9
    color: #3F64A9 !important

  &__wrapper
    display: flex
    height: 100%

  &__list
    width: 300px
    height: 100%
    overflow-y: auto
    flex-shrink: 0

    @media screen and (max-width: $mobile-width)
      width: 100vw

      &::-webkit-scrollbar
        display: none

      &_hidden
        display: none

    &::-webkit-scrollbar
      width: 4px
      height: 100%

    &::-webkit-scrollbar-thumb
      background: $color-border
      border-radius: 4px

    &::-webkit-scrollbar-track
      background: $color-background

  &__chat
    flex-grow: 1
    // position: relative
    border-left: 1px solid $color-border
    // height: calc(100% - 147px)
    display: flex
    flex-direction: column

    @media screen and (max-width: $mobile-width)
      width: 100vw

    &-loading
      margin-top: 3rem

  .chat
    flex-grow: 1
    display: flex
    flex-direction: column
    height: calc(100vh - 123px - 26px)
    overflow-y: auto
    width: 100%

    .backward
      cursor: pointer
      margin: 1.5rem 1.5rem 0
      display: none

      @media screen and (max-width: $mobile-width)
        display: flex
        gap: 1.5rem

    &::-webkit-scrollbar
      width: 4px
      height: 100%

    &::-webkit-scrollbar-thumb
      background: $color-border
      border-radius: 4px

    &::-webkit-scrollbar-track
      background: $color-background

    .title
      padding: 1.5rem
      text-align: center
      color: $color-label
      font-size: 13px
      line-height: 1.5rem
      flex-shrink: 0

    .messages
      flex-grow: 1
      display: flex
      flex-direction: column
      justify-content: flex-end
      padding: 0 1.5rem
      // margin-bottom: 80px

      .message
        margin-bottom: 2rem
        width: 28rem
        padding: 1rem
        background: $color-secondary
        position: relative
        border-radius: 8px 8px 0 8px
        font-size: 13px
        line-height: 1.5rem
        align-self: flex-end

        @media screen and (max-width: $mobile-width)
          width: calc(100% - 40px)

        &-text
          color: $color-font

        &-files
          display: flex
          width: 100%
          flex-wrap: wrap

          .files-item
            background: $color-border

        &-date
          color: $color-font-mute

        &-angle
          position: absolute
          right: 0
          bottom: -14px

        &.answer
          align-self: flex-start
          border-radius: 8px 8px 8px 0px

          .message-angle
            left: 0
            right: auto
            transform: scale(-1, 1)

  .input
    min-height: 60px
    flex-shrink: 0
    // position: absolute
    border-top: 1px solid $color-border
    bottom: 0
    width: 100%
    max-width: 100%
    background: white
    padding-top: 0

    // @media screen and (max-width:700px)
      // width: calc(100vw - (100vw - 100%))

    &-wrapper
      display: flex
      align-items: flex-start
      padding: 0 0 0 1.25rem
      box-sizing: border-box

    &-file
      input
        display: none

    &-placeholder
      position: absolute
      font-size: 13px
      line-height: 1.5rem
      left: 55px
      z-index: -1
      color: $color-label
      top: 17px

    &-icon
      margin-top: 1.2rem
      cursor: pointer

    &-input
      flex-grow: 1
      padding: 1rem
      border: none
      font-size: 13px
      line-height: 1.5rem
      width: calc(100% - 100px)

      &:focus
        outline: none

    &-send
      border: none
      background: none
      margin-top: 1rem
      width: 50px
      cursor: pointer

      &:focus
        outline: none
.files
  display: flex
  margin-left: 20px
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

    &-download
      width: 20px
      height: 20px
      display: flex
      align-items: center
      justify-content: center
      cursor: pointer

      img
        width: 12px
        height: 12px

  &-types
    padding: 0.25rem 1.25rem 0.75rem
    font-size: 14px
    color: #9292ad

  &-error
    padding: 0.25rem 1.25rem 0.75rem
    font-size: 14px
    color: $color-red
</style>
