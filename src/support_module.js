import Vue from "vue";
import router from "@/router";

const API_UL_URL = "https://api.aostng.ru/api/lkul/";
const ul_web_token = "69d2ed93-7286-4f2f-b690-c9cf47f05be4";

export default {
  namespaced: true,

  state: {
    tickets: [],
    categories: [],
    archive: null,
    messages: [],
    ticket: null,
    is_loading: false,
  },
  getters: {
    is_loading: (state) => state.is_loading,

    categories: (state) => state.categories,

    tickets: (state) => state.tickets,

    ticket: (state) => state.ticket,

    messages: (state) => state.messages,
  },
  mutations: {
    set_loading: (state, value) => (state.is_loading = value),

    set_tickets: (state, value) => (state.tickets = value),

    set_categories: (state, value) => (state.categories = value),

    set_messages: (state, value) => (state.messages = value),

    set_ticket: (state, value) => (state.ticket = value),
  },

  actions: {
    init: async (ctx) => {
      ctx.commit("set_loading", true);
      const profileData = JSON.parse(Vue.cookie.get("profileData"));

      let form_data = new FormData();
      form_data.append("method", "services.getticketlist");
      form_data.append("ul_web_token", ul_web_token);
      form_data.append("login", profileData.login);
      form_data.append("user_id", profileData.id);
      form_data.append("email", profileData.email);

      console.log("init support", profileData.login, profileData.id);

      const res = await fetch(API_UL_URL, {
        mode: "cors",
        method: "post",
        body: form_data,
      });

      const json = await res.json();

      ctx.commit("set_loading", false);
      console.log(json);

      if (json.response && json.response.msg) {
        let categories = json.response.category_array;
        let tickets = [];

        [...json.response.msg].forEach((ticket, ticket_i) => {
          let category_index = categories.findIndex(
            (item) => item.id === ticket.category_id
          );

          if (category_index !== -1) {
            tickets.push({
              id: ticket.id,
              date: ticket.date_create,
              color: ticket.lamp,
              category_name: categories[category_index].name,
              category_id: ticket.category_id,
              name: ticket.title,
              messages_count: ticket.messages,
            });
          }
        });

        console.log(tickets);
        ctx.commit("set_tickets", tickets);
      }

      if (json.response?.category_array) {
        let categories = [];
        console.log("category array");

        for (const item of json.response.category_array)
          if (item) {
            categories.push({
              label: item.name,
              value: item.id,
            });  
          }

        ctx.commit("set_categories", categories);
      }
    },

    send_message: async (ctx, data) => {
      ctx.commit("set_loading", true);
      const profileData = JSON.parse(Vue.cookie.get("profileData"));

      let form_data = new FormData();
      form_data.append("method", "services.sendmessage");
      form_data.append("message", data.message);
      form_data.append("ul_web_token", ul_web_token);
      form_data.append("login", profileData.login);
      form_data.append("user_id", profileData.id);
      form_data.append("email", profileData.email);

      for (const file of data.files) {
        form_data.append("files[]", file);
      }

      if (data.category_id) {
        form_data.append("category", data.category_id);
      }

      if (data.ticket_id) {
        form_data.append("ticketid", data.ticket_id);
      }

      const res = await fetch(API_UL_URL, {
        mode: "cors",
        method: "post",
        body: form_data,
      });

      const json = await res.json();

      ctx.commit("set_loading", false);

      if (json.response.msg) {
        if (!ctx.state.ticket) {
          ctx.dispatch("get_messages", json.response.msg);
          router.push({
            name: "support-ticket",
            params: {
              id: json.response.msg,
            },
          });
        } else {
          ctx.dispatch("get_messages", json.response.msg);
        }
      }
    },

    get_messages: async (ctx, ticket_id) => {
      const profileData = JSON.parse(Vue.cookie.get("profileData"));
      let form_data = new FormData();
      form_data.append("method", "services.getticketmessages");
      form_data.append("ticketid", ticket_id);
      form_data.append("ul_web_token", ul_web_token);
      form_data.append("login", profileData.login);
      form_data.append("user_id", profileData.id);
      form_data.append("email", profileData.email);

      let tickets = ctx.state.tickets;

      let ticket_index = tickets.findIndex((item) => item.id === ticket_id);

      if (ticket_index != -1) {
        ctx.commit("set_ticket", tickets[ticket_index]);
      }

      ctx.commit("set_loading", true);

      const res = await fetch(API_UL_URL, {
        mode: "cors",
        method: "post",
        body: form_data,
      });

      const json = await res.json();

      ctx.commit("set_loading", false);

      console.log("messages ", json.response.msg);
      if (json.response.msg) {
        ctx.commit("set_messages", json.response.msg.slice().reverse());
      }
    },
  },
};
