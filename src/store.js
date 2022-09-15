import Vue from "vue";
import Vuex from "vuex";
// import dataProfile from "@/data/profile.json";
import dataHistory from "@/data/history.json";
import dataServices from "@/data/services.json";
import dataServicesRequests from "@/data/services-requests.json";
// import dataSupport from "@/data/support.json";
import router from "@/router";
import axios from "axios";
import support from './support_module'

const API_URL = "https://1c.aostng.ru/VESTA/hs/API_STNG_JUR";
const API_METHOD = "connect.getjur"; // getjur - VESTA; getjur2 - vesta_development

Vue.use(Vuex);

export default new Vuex.Store({
  modules:{
    supportModule: support,
  },
  state: {
    user: {
      id: null,
      login: null,
      token: null,
      isLoggedIn: false,
      registr: ''
    },
    bills: {},
    agreements: [],
    profile: null,
    history: [],
    services: [],
    servicesRequests: [],
    supportCurator: null,
    overlay: false,
    objects: {},
    currentAgreement: {},
    pdfFile: null,
    currentObject: {},
    is_loading: true,
    passwordRecoverySent: null,
    profileSaved: null,
    passwordSaved: null,
  },
  mutations: {
    setBills(state, updateBills) {
      state.bills = updateBills;
    },
    setAgreements(state, updateAgreements) {
      state.agreements = updateAgreements;
    },
    // getProfile(state) {
    //   state.profile = dataProfile;
    // },
    getHistory: (state) => {
      state.history = dataHistory;
    },
    getServices: (state) => {
      state.services = dataServices;
    },
    getServicesRequests: (state, data) => {
      state.servicesRequests = data;
    },
    showOverlay: (state) => {
        state.overlay = true;
    },
    hideOverlay: (state) => {
        state.overlay = false;
    },
    setSupportCurator: (state, curator) => {
      state.support = curator;
    },
    setUser: (state, token) => {
      state.user.isLoggedIn = true;
      state.user.token = token;
    },
    setRegistr: (state, value) => {
      state.user.registr = value;
      state.user.isLoggedIn = false
    },
    setObjects: (state, obj) => {
      state.objects = obj;
    },
    logoutUser: (state) => {
      state.user.isLoggedIn = false;
      state.user.token = null;
    },
    setCurrentAgreement: (state, object = {}) => {
      state.currentAgreement = object;
    },
    setPDFFile: (state, object) => {
      state.pdfFile = object;
    },
    setCurrentObject: (state, object = {}) => {
      state.currentObject = object;
    },
    setLoading: (state, status = true) => {
      state.is_loading = status;
    },
    forgotUser: (state, message) => {
      state.passwordRecoverySent = message;
    },
    profileSaved: (state, message) => {
      state.profileSaved = message;
    },
    passwordSaved: (state, message) => {
      state.passwordSaved = message;
    },
  },
  actions: {
    getBills: async ({ commit, dispatch, state }, data) => {
      if (state.user.isLoggedIn) {
        console.log("Получаем счета с сервера...");

        const formData = new FormData();

        formData.append("method", API_METHOD);
        formData.append("method_connect", "bills");
        formData.append("get", `token=${state.user.token}`);

        // const fetchBills = await fetch(API_URL, {
        //     mode: "cors",
        //     method: "post",
        //     body: formData
        // });
        let fetchBills;
        if (data) {
          let beginPeriod = data[0]
            .toLocaleDateString("en-ZA")
            .replace("/", "")
            .replace("/", "");
          let endPeriod = data[1]
            .toLocaleDateString("en-ZA")
            .replace("/", "")
            .replace("/", "");
          fetchBills = await fetch(
            `${API_URL}/V1/jur_invoices?token=${state.user.token}&beginPeriod=${beginPeriod}&endPeriod=${endPeriod}`,
            {
              mode: "cors",
              method: "get",
            }
          );
        } else {
          fetchBills = await fetch(
            `${API_URL}/V1/jur_invoices?token=${state.user.token}`,
            {
              mode: "cors",
              method: "get",
            }
          );
        }

        try {
          if (fetchBills.ok) {
            const jsonBills = await fetchBills.json();
            console.log("Получили счета:", jsonBills.data);
            // const data = jsonBills.data.find(
            //   (el) => el.agreement.id === agreementId
            // );
            // console.log(data, "testt");
            commit("setBills", jsonBills.data);
          } else {
            console.error("Error:", fetchBills.json().error);
          }
        } catch {
          console.error("Error: fetch api-url not send");
        }
      }
    },
    getAgreements: async ({ commit, dispatch, state }) => {
      commit("setLoading", true);
      if (state.user.isLoggedIn) {
        console.log("Получаем договора с сервера...");

        const formData = new FormData();

        formData.append("method", API_METHOD);
        formData.append("method_connect", "info");
        formData.append("get", `token=${state.user.token}`);

        // const fetchAgreements = await fetch(API_URL, {
        //     mode: "cors",
        //     method: "post",
        //     body: formData
        // });

        console.log("Getting agreements", state.user);
        const fetchAgreements = await fetch(
          `${API_URL}/info?token=${state.user.token}`,
          {
            mode: "cors",
            method: "get",
            // body: JSON.stringify({
            //     token: state.user.token,
            // })
          }
        );

        try {
          if (fetchAgreements.ok) {
            const jsonAgreements = await fetchAgreements.json();

            console.log("Получили договора:", jsonAgreements.data);
            commit(
              "setAgreements",
              jsonAgreements.data
              // jsonAgreements.response.msg.data
            );

            // set current agreement
            if (router.currentRoute.params.id) {
              // const test = jsonAgreements.data.find((el)=>el.id === router.currentRoute.params.id)
              // console.log('rrrrrrrrrrrr getagreements', router.currentRoute.params.id,test )
              const currentAgreement = jsonAgreements.data.find(
                (item) => item.id === router.currentRoute.params.id
              );
              console.log(
                "Найден ID-договора, текущий договор:",
                currentAgreement
              );

              commit("setCurrentAgreement", currentAgreement);
            }
          } else {
            console.error("Error:", fetchAgreements.json());
          }
        } catch {
          console.error("Error: fetch api-url not send");
        }
      }
      commit("setLoading", false);
    },
    getProfile(ctx) {
      ctx.commit("getProfile");
    },
    getHistory: (ctx) => {
      ctx.commit("getHistory");
    },
    getServices: (ctx) => {
      ctx.commit("getServices");
    },
    getServicesRequests: async ({ commit, state }, data) => {
      console.log("Получаем токен из сервера...", data);
      let res;
      if (data) {
        let beginPeriod = data[0]
          .toLocaleDateString("en-ZA")
          .replace("/", "")
          .replace("/", "");
        let endPeriod = data[1]
          .toLocaleDateString("en-ZA")
          .replace("/", "")
          .replace("/", "");
        res = await fetch(
          `${API_URL}/V1/jur_history?token=${state.user.token}&beginPeriod=${beginPeriod}&endPeriod=${endPeriod}`,
          {
            mode: "cors",
            method: "get",
          }
        );
      } else {
        res = await fetch(
          `${API_URL}/V1/jur_history?token=${state.user.token}`,
          {
            mode: "cors",
            method: "get",
          }
        );
      }

      if (res.ok) {
        const json = await res.json();
        if (json.error === false) {
          console.log(json.data, "testtest");
          commit("getServicesRequests", json.data);
        } else {
          return json;
        }
      }
      // ctx.commit("getServicesRequests");
    },
    getSupportCurator: async (ctx) => {
      if (ctx.state.user.isLoggedIn) {
        console.log("Получаем куратора с сервера...");

        const fetchSupportCurator = await fetch(
          `${API_URL}/V1/jur_curator?token=${ctx.state.user.token}`,
          {
            mode: "cors",
            method: "get",
            /* body: JSON.stringify({
                token: ctx.state.user.token,
            }) */
          }
        );
        const jsonSupportCurator = await fetchSupportCurator.json();
        
        try {
          if (fetchAgreements.data?.error === false) {
              ctx.commit("setSupportCurator", jsonSupportCurator.data);
                
              console.log("Получили куратора:", jsonSupportCurator.data);
              return jsonSupportCurator.data;
          } else {
              console.error("Error:", fetchAgreements.json());
              return jsonSupportCurator.data;
          }
        } catch {
          console.error("Error: fetch api-url not send");
        }
      }
    },
    showOverlay: (ctx) => {
      ctx.commit("showOverlay");
    },
    hideOverlay: (ctx) => {
      ctx.commit("hideOverlay");
    },
    authUser: async (ctx, userObject) => {
      if (Vue.cookie.get("token")) {
        console.log("Получаем токен из куки...");
        ctx.commit("setUser", Vue.cookie.get("token"));
      } else {
        console.log("Получаем токен из сервера...");

        const formData = new FormData();
        formData.append("method", API_METHOD); // getjur - VESTA; getjur2 - vesta_development
        formData.append("method_connect", "login");
        formData.append("post[login]", userObject.login); // 'test'
        formData.append("post[password]", userObject.password); // 'test123'

        // const res = await fetch(API_URL, {
        //     mode: "cors",
        //     method: "post",
        //     body: formData
        // });

        const res = await fetch(
          `${API_URL}/V1/login`,
          {
            mode: "cors",
            method: "post",
            body: JSON.stringify({
              login: userObject.login,
              password: userObject.password,
            }),
          }
        );

        if (res.ok) {
          const json = await res.json();
          if (/* json.response.msg.error */ json.error === false) {
            // Vue.cookie.set("token", json.response.msg.data.token, {
            //     expires: "2h"
            // });
            // ctx.commit("setUser", json.response.msg.data.token);
            // console.log(
            //     "set token: ",
            //     json.response.msg.data.token
            // );
            Vue.cookie.set("token", json.data.token, {
              expires: "2h",
            });
            Vue.cookie.set("contrName", json.data.name, {
              expires: "2h",
            });
            Vue.cookie.set("profileData", JSON.stringify({...json.data, login: userObject.login}), {
              expires: "2h",
            });
            ctx.commit("setUser", json.data.token);
            console.log("set token: ", json.data.token, JSON.stringify(json.data));
          } else {
            return json;
          }
        }
      }
    },
    forgotUser: async (ctx, userObject) => {
      console.log("pass recovery");
      const res = await fetch(
        `${API_URL}/V1/jur_restore`,
        {
          mode: "cors",
          method: "post",
          body: JSON.stringify({
            email: userObject.email,
          }),
        }
      );

      if (res.ok) {
        const json = await res.json();
        if (json.error === false) {
          ctx.commit("forgotUser", json.message);
        } else {
          return json;
        }
      }
    },
    saveProfile: async (ctx, userObject) => {
      console.log("profile saved", userObject);
      const res = await fetch(
        `${API_URL}/V1/jur_save`,
        {
          mode: "cors",
          method: "post",
          body: JSON.stringify({
            phone: userObject.phone,
            familia: userObject.familia,
            imya: userObject.imya,
            otchestvo: userObject.otchestvo,
            token: userObject.token,
          }),
        }
      );

      if (res.ok) {
        const json = await res.json();
        console.log(json, "profile saved store test");
        if (json.error === false) {
          ctx.commit("profileSaved", json.message);
        } else {
          return json;
        }
      }
    },
    savePassword: async (ctx, userObject) => {
      console.log("save password");
      const res = await fetch(
        `${API_URL}/V1/jur_save`,
        {
          mode: "cors",
          method: "post",
          body: JSON.stringify({
            password: userObject.password,
            token: userObject.token,
          }),
        }
      );

      if (res.ok) {
        const json = await res.json();
        console.log(json, "password saved store test");
        if (json.error === false) {
          ctx.commit("passwordSaved", json.message);
        } else {
          return json;
        }
      }
    },
    init: async (ctx) => {
      console.log("Инициализация...", router.currentRoute, window.location.href);
      if (Vue.cookie.get("token")) {
        console.log("Получаем токен из куки...");
        
        if (router.currentRoute.path !== '/registr' && router.currentRoute.path !== '/agreements/') {
          router.push('/agreements/')
        }
        ctx.commit("setUser", Vue.cookie.get("token"));
      } else {
        if (router.currentRoute.query.token) {
          const token = router.currentRoute.query.token;
          const profileData = router.currentRoute.query
         
          ctx.commit("setUser", token);
          Vue.cookie.set("token", token);
          Vue.cookie.set('profileData', JSON.stringify(profileData))
          Vue.cookie.set('contrName', profileData.name)
          router.push('/agreements/')
        }
     
        console.log("Токен отсутствует в куки, требуется авторизация...");
      } 
      if (router.currentRoute.path === '/registr') {
        ctx.commit("setRegistr", 'reg');
        console.log('registr')
        
      }
    },
    getObjects: async ({ commit, state }, agreementId) => {
      // commit("setLoading", true);
      if (agreementId /* router.currentRoute.params.id */) {
        const currentAgreement = state.agreements.find(
          (item) => item.id === agreementId /* router.currentRoute.params.id */
        );
        console.log("Найден ID-договора, текущий договор:", currentAgreement);

        commit("setCurrentAgreement", currentAgreement);
      }
      // commit("setLoading", false);
      // console.log(`Получаем адреса для ${agreementId} из сервера...`);

      // const formData = new FormData();

      // formData.append("method", API_METHOD);
      // formData.append("method_connect", "objects");
      // formData.append(
      //     "get",
      //     `token=${state.user.token}&agreementId=${agreementId}`
      // );

      // const res = await fetch(API_URL, {
      //     mode: "cors",
      //     method: "post",
      //     body: formData
      // });

      // if (res.ok) {
      //     const json = await res.json();

      //     if (json.response.msg.error === false) {
      //         console.log(
      //             "Получили адреса из сервера:",
      //             json.response.msg.data
      //         );

      //         // set current agreement
      //         if (router.currentRoute.params.id) {
      //             const currentAgreement = state.agreements[
      //                 "agreements"
      //             ].find(
      //                 item => item.id === router.currentRoute.params.id
      //             );
      //             console.log(
      //                 "Найден ID-договора, текущий договор:",
      //                 currentAgreement
      //             );
      //             commit("setCurrentAgreement", currentAgreement);
      //         }

      //         // set current object
      //         if (router.currentRoute.params.address) {
      //             const currentObject = json.response.msg.data.find(
      //                 item =>
      //                     item.objectid ===
      //                     router.currentRoute.params.address
      //             );
      //             console.log(
      //                 "Найден адрес, текущий объект:",
      //                 currentObject
      //             );
      //             commit("setCurrentObject", currentObject);
      //         }

      //         commit("setObjects", json.response.msg.data);
      //     }
      // }
      // commit("setLoading", false);
    },
    logoutUser: (ctx) => {
      console.log("Завершаем сеанс...");
      if (Vue.cookie.get("token")) {
        Vue.cookie.delete("token");
      }
      ctx.commit("logoutUser");
    },
    // currentAgreement: async (ctx, currentId) => {
    //     const currentAgreements = await ctx.state.bills['agreements']
    //     const res = JSON.parse(JSON.stringify(await currentAgreements)).find(item => item.id === currentId)
    //     ctx.commit('setCurrentAgreement', res)
    // },
    // currentObject: async (ctx, currentId) => {
    //     const currentObjects = ctx.state.objects
    //     const res = JSON.parse(JSON.stringify(currentObjects)).find(item => item.objectid === currentId)
    //     ctx.commit('setCurrentObject', res)
    // },
    getPDFFile: async (ctx, data) => {
      console.log("pdf file id/", data);
      const res = await fetch(
        `${API_URL}/V1/jur_invoice_image?token=${ctx.state.user.token}&id=${data}`,
        {
          mode: "cors",
          method: "get",
        }
      );

      if (res.ok) {
        const json = await res.json();

        if (json.error === false) {
          ctx.commit("setPDFFile", json.data);

          console.log("Получен pdf file");
        }
        return json;
      }
      console.log("Ошибка отправки запроса: -> getPDFFile");
    },
    sendIndication: async (ctx, data) => {
      ctx.commit("setLoading", true);

      const obj = {
        counters: [],
      };

      const objects = JSON.parse(JSON.stringify(data));

      //   for (let i = 0; i < objects.length; i++) {
      //     let counter = objects[i];
      //     if (counter["value"]) {
      //       obj.counters.push({
      //         counterId: counter["counterId"],
      //         value: +counter["value"],
      //       });
      //     }
      //   }
      const json_string = JSON.stringify(obj.counters);

      console.log("Отправляем показания:", json_string);

      const formData = new FormData();
      //   console.log(objects, 'objects ////////')
      formData.append("method", API_METHOD);
      formData.append("method_connect", "objects");
      formData.append("get", `token=${ctx.state.user.token}`);
      formData.append("json", json_string);

      const indicationsData = {
        token: ctx.state.user.token,
        agreements: [
          {
            id: router.currentRoute.params.id,
            objects: [
              {
                id: router.currentRoute.params.address,
                counters: [
                  {
                    id: objects[0].counterNumber,
                    value: objects[0].value,
                  },
                ],
              },
            ],
          },
        ],
      };
      console.log(indicationsData, "indications data");

      const res = await fetch(
        `${API_URL}/V1/jur_indications`,
        {
          mode: "cors",
          method: "post",
          body: JSON.stringify({
            token: ctx.state.user.token,
            agreements: [
              {
                id: router.currentRoute.params.id,
                objects: [
                  {
                    id: router.currentRoute.params.address,
                    counters: [
                      {
                        id: objects[0].counterNumber,
                        value: objects[0].value,
                      },
                    ],
                  },
                ],
              },
            ],
          }),
        }
      );

      if (res.ok) {
        const json = await res.json();

        if (json.error === false) {
          console.log("Показания отправлены на сервер.");
          ctx.commit("setLoading", false);
          await ctx.dispatch("getAgreements");

          //   await ctx.dispatch("getObjects", router.currentRoute.params.id);
          return "Показания отправлены на сервер.";
        }

        ctx.commit("setLoading", false);
        return json;
      }
      console.log("Ошибка отправки запроса: -> sendIndication");
    },
    
    getRegData: async (ctx) => {
      const res = await fetch(`${API_URL}/V1/reg_details`);
      const json = await res.json();
      
      return json;
    },
  },
  getters: {
    cuser: (state) => state.user,
    getBills: (state, filter = null) => {
      return state.bills;
    },
    getAgreements: (state) => state.agreements,
    getObjects: (state) => state.objects,
    getCurrentAgreement: (state) => state.currentAgreement,
    getPDFFile: (state) => state.pdfFile,
    getCurrentObject: (state) => state.currentObject,
    is_loading: (state) => state.is_loading,
  },
});
