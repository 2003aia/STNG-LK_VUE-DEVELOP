<script>
import Tabs from '@/components/tabs';
// import Button from '@/components/button';
import Icon from '@/components/icon-create-ticket';
// import SupportList from '@/components/support-list';
import {
  Button,
  SupportList,
} from "@/components";

export default{
    name: 'support',
    components: {
        'c-tabs': Tabs,
        'c-button': Button,
        'c-icon': Icon,
        'c-support-list': SupportList,
    },
    
    computed: {
        tickets() { return this.$store.getters['supportModule/tickets']; },

        route_name() {return this.$route.name; },
    },
  
    data(){
        return{
            tabs: [{
              label: 'Обращения',
              path: '/support'
            }]
        };
    },
  
    watch: {
        tickets(value) {
            if (value.length > 0 && this.$route.name == 'support')
              this.$router.push({
                  name: 'support-ticket',
                  params:{
                      id: value[0].id
                  },
              });
        },
    
        async route_name(value) {
            if (value == 'support'){
                await this.$store.dispatch('supportModule/init');
            }
        }
    },
  
    async mounted(){
        await this.$store.dispatch('supportModule/init')
    }

}
</script>

<template lang="pug">
.support
  .actions(v-if="$route.name !== 'support-create'")
    c-tabs(:items="tabs")

    .create
      c-button(bg="white" color="primary" border="white" size="big" to="/support/create")
        span Новое обращение
        c-icon(color="primary" icon="new-message")

  .body
    router-view
</template>

<style lang="sass" scoped>
@import @/assets/styles/vars

.support
  border-right: 1px solid $color-border
  display: flex
  flex-direction: column
  height: calc(100vh - 123px)

  &-list
    max-height: 0

  .actions
    display: flex
    border-bottom: 1px solid $color-border
    align-items: center
    justify-content: space-between
    flex-shrink: 0
    flex-grow: 0

  .body
    display: flex
    flex-grow: 0
    flex-shrink: 1
    height: calc(100% - 61px)

    .not
      padding: 1.5rem
      font-size: 13px
      color: $color-font-mute

    .tickets
      width: 18rem
      flex:
        shrink: 0
        grow: 0
      border:
        right: 1px solid $color-border
      overflow-y: auto
      // height: calc(100vh - 61px - 84px)

      &::-webkit-scrollbar
        width:  8px
        height: 100%

      &::-webkit-scrollbar-thumb
        background: $color-border

      &::-webkit-scrollbar-track
        background: none

    .chat
      flex-grow: 0
      flex-shrink: 1
      width: 100%

.create
  @media screen and (max-width:700px)
    .button
      span
        display: none
</style>
