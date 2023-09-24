import axios from "axios";
import router from "@/router/router";

export const usersModule = {
    state: () => ({
        currentUser: null,
        buttonSettings: 'update',
    }),

    getters: {},

    mutations: {
        setButtonSettings(state, buttonSettings) {
            state.buttonSettings = buttonSettings;
        },

        setCurrentUser(state, currentUser) {
            state.currentUser = currentUser
        },
    },

    actions: {
        async signUpUser({ state, commit, dispatch }, user) {
            console.log(user);
            try {
                const responce = await axios.post('http://localhost:3000/register', user, {
                    headers: {
                        'Content-type': 'application/json'
                    }
                });
                console.log('RESPOBCE: ', responce);
            } catch (err) {
                console.log('ERROR: ', err)
            }
        },

        async signInUser({ state, commit, dispatch, rootState }, user) {
            console.log('user: ', user);

            if (user) {
                try {
                    const responce = await axios.post('http://localhost:3000/login', user, {
                        headers: {
                            'Content-type': 'application/json'
                        }
                    });
                    const data = responce.data;
                    console.log(responce)
                    localStorage.setItem('token', data.accessToken);
                    localStorage.setItem('userId', data.user.id);
                    commit('setCurrentUser', data.user);
                    dispatch('pets/getUserPets', null, { root: true });
                    router.push("/pets");
                } catch (err) {
                    console.log('ERROR: ', err);
                    alert('Невірний логін або пароль!')
                }
            } else {
                try {
                    const responce = await axios.get(`http://localhost:3000/users/${localStorage.getItem('userId')}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                    const data = responce.data;
                    commit('setCurrentUser', data);
                    dispatch('pets/getUserPets', null, { root: true });
                } catch (err) {
                    console.log('ERROR: ', err);
                }
            }
        },
    },
    namespaced: true
}