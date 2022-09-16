<script>
import moment from "moment";

export default {
  name: "support-list",

  props: ["items", "limit"],

  methods: {
    get_class_object: (color) => {
      const colors = {
        red: "status_red",
        green_s: "status_green",
        green: "status_green",
        yellow: "status_yellow",
      };
      return colors[color];
    },

    format_date: (date) => moment(date).format("DD.MM.YYYY HH:mm"),

    click(e, id) {
      if (this.$route.params.id != id) {
        this.$router.push({
          name: "support-ticket",
          params: {
            id: id,
          },
        });
      }
      this.$emit("selectTicket", id);
    },
  },
};
</script>

<template lang="pug">
.support-list
  .item(
    v-for="(item, item_index) in items"
    :key="item.id"
    @click="e => click(e, item.id)"
    :class="{'item_active': item.id === $route.params.id}"
    v-if="items && !limit || (limit && item_index < limit)")
    .title
      .number №{{ item.id }}
      .status(:class="get_class_object(item.color)")
    .date {{ item.date }}
</template>

<style lang="sass" scoped>
@import @/assets/styles/vars

.support-list
  border-right: 1px solid $color-border
  
  .router-link-active
    border-bottom: 1px #3F64A9
    color: #3F64A9 !important

  .item
    padding: 1rem 1.5rem
    border-bottom: 1px solid $color-border
    cursor: pointer
    display: block
    text-decoration: none



    &_active
      background: $color-secondary

    .title
      display: flex
      align-items: center
      line-height: 1.5rem

      .number
        color: $color-primary
        font-size: .8rem

      .status
        width: 6px
        height: 6px
        flex-shrink: 0
        border-radius: 50%
        margin-left: 8px

        &_red
          background: $color-red

        &_green
          background: $color-green
        
        &_yellow
          background: $color-yellow

    .date
      line-height: 1.5rem
      font-size: .8rem
      color: $color-font-mute
</style>
