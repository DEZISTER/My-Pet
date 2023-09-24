import { createStore } from "vuex";
import { catalogModule } from "@/store/modules/catalogModule";
import { usersModule } from "@/store/modules/usersModule";
import { petsModule } from "@/store/modules/petsModule";


export default createStore({
    state: {
        firstVisit: true,
    },

    getters: {
    },

    mutations: {
        setFirstVisit(state, firstVisit) {
            state.firstVisit = firstVisit
        },
    },

    actions: {

    },
    modules: {
        catalog: catalogModule,
        users: usersModule,
        pets: petsModule
    }
})