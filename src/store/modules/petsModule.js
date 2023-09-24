import axios from "axios";

export const petsModule = {
    state: () => ({
        pets: [],
        currentPet: null,
    }),

    getters: {},

    mutations: {
        setPets(state, pets) {
            state.pets = pets;
            console.log('setPets: ', state.pets);
        },

        setCurrentPet(state, currentPet) {
            state.currentPet = currentPet;
            if (state.currentPet.petType === 'cat') {
                state.currentPet.setInfo = Number(state.currentPet.weight) >= 4.5 ? 'big' : 'small'
            } else if (state.currentPet.petType === 'dog') {
                state.currentPet.setInfo = Number(state.currentPet.weight) >= 30 ? 'big' : 'small'
            } else if (state.currentPet.petType === 'fish') {
                state.currentPet.setInfo = Number(state.currentPet.weight) >= 1 ? 'big' : 'small'
            }
            console.log('currentPet: ', state.currentPet);
        },
    },

    actions: {

        async getUserPets({ state, commit, dispatch }, currentPetId) {
            try {
                const responce = await axios.get(`http://localhost:3000/pets/?userId=${localStorage.getItem('userId')}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const data = responce.data;
                if (currentPetId && typeof (currentPetId) === 'number') {
                    commit('setCurrentPet', data.find(item => currentPetId === item.id));
                } else {
                    commit('setCurrentPet', data[0]);
                }
                commit('setPets', data);
            } catch (err) {
                console.log('ERROR: ', err);
            }
        },

        async addPet({ state, commit, dispatch }, pet) {
            try {
                console.log("POST_PET: ", pet)
                const responce = await axios.post(`http://localhost:3000/pets`, pet, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-type': 'application/json'
                    }
                });
                console.log('POST-RESP: ', responce);
                const data = responce.data;
                dispatch('getUserPets', data.id);
            } catch (err) {
                console.log('ERROR: ', err);
            }
        },

        async editPet({ state, commit, dispatch }, pet) {
            try {
                console.log("PUT_PET: ", pet)
                const responce = await axios.put(`http://localhost:3000/pets/${pet.id}`, pet, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-type': 'application/json'
                    }
                });
                console.log('PUT-RESP: ', responce);
                const data = responce.data;
                dispatch('getUserPets', data.id);
            } catch (err) {
                console.log('ERROR: ', err);
            }
        },

        async deletePet({ state, commit, dispatch }, pet) {
            try {
                console.log("DELETE_PET: ", pet)
                const responce = await axios.delete(`http://localhost:3000/pets/${pet.id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-type': 'application/json'
                    }
                });
                console.log('DELETE-RESP: ', responce);
                dispatch('getUserPets');
            } catch (err) {
                console.log('ERROR: ', err);
            }
        },
    },
    namespaced: true
}