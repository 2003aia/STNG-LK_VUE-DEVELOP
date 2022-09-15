import Vue from "vue";
import VueRouter,{createWebHashHistory} from "vue-router";

import {
    Home,
    Bills,
    BillsList,
    BillsCreate,
    BillsPay,
    BillsCounter,
    BillsHistory,
    BillsHistoryPayments,
    BillsHistoryCounters,
    Profile,
    History,
    PreEntry,
    Services,
    ServicesRequests,
    ServicesRequest,
    ServicesForm,
    ServicesMy,
    Support,
    SupportArchive,
    SupportCreate,
    Agreements,
    AgreementsList,
    AgreementsAddresses,
    AgreementsAddress,
    AgreementsAddressPay,
    AgreementsAddressCounters,
    AgreementsAddressBills,
    Auth
} from "@/views";

Vue.use(VueRouter);

const router = new VueRouter({
    // mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            component: Agreements,
        },
        {
            path: "/auth/:token",
            component: Auth
        },
        {
            path: "/registr",
            component: Auth,
            
        },
        {
            path: "/bills",
            component: Bills,
            children: [
                {
                    name: "bills-list",
                    path: "/",
                    component: BillsList
                },
                {
                    path: "create",
                    component: BillsCreate
                },
                {
                    name: "bills-pay",
                    path: "pay",
                    component: BillsPay
                },
                {
                    name: "bills-counter",
                    path: "counter",
                    component: BillsCounter
                },
                {
                    component: BillsHistory,
                    path: "history",
                    children: [
                        {
                            path: "/",
                            name: "bills-history-payments",
                            component: BillsHistoryPayments
                        },
                        {
                            path: "counters",
                            name: "bills-history-counters",
                            component: BillsHistoryCounters
                        }
                    ]
                }
            ]
        },
        {
            path: "/agreements",
            component: Agreements,
            children: [
                {
                    name: "agreements-list",
                    path: "/",
                    component: AgreementsList
                },
                {
                    name: "agreements-addresses",
                    path: ":id",
                    // path: "/test",
                    component: AgreementsAddresses
                },
                {
                    name: "agreements-address",
                    path: ":id",
                    // path: '/test',

                    component: AgreementsAddress,
                    children: [
                        // {
                        //     name: 'agreements-address-pay',
                        //     path: ':address',
                        //     component: AgreementsAddressPay
                        // },
                        {
                            name: "agreements-address-counters",
                            path: ":address",
                            alias: ":address/counters",
                            component: AgreementsAddressCounters
                        },
                        {
                            name: "agreements-address-bills",
                            // path: ":address/bills",
                            path: ":id/bills",
                            component: AgreementsAddressBills
                        }
                    ]
                }
            ]
        },
        {
            path: "/profile",
            component: Profile
        },
        {
            path: "/history",
            component: History
        },
        {
            path: "/pre-entry",
            component: PreEntry
        },
        {
            // name: "services-my",
            path: '/servicesMy',
            component: ServicesMy,
        },
        {
            name: "services",
            path: "/services",
            component: Services,
            children: [
                {
                    name: "services-requests",
                    path: "requests",
                    component: ServicesRequests
                },
                {
                    name: "services-request",
                    path: "request",
                    component: ServicesRequest
                },
                {
                    name: "services-form",
                    path: "form",
                    component: ServicesForm
                }
            ]
        },
        {
            path: "/support",
            name: "support",
            component: Support,
            children: [
                {
                    name: "support-archive",
                    path: "archive",
                    component: SupportArchive
                },
                {
                    name: "support-create",
                    path: "create",
                    component: SupportCreate
                }
            ]
        }
    ]
});

export default router;
