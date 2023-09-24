import axios from "axios";

export const catalogModule = {
    state: () => ({
        firstVisit: true,
        catalogThings: [],
        showItemModal: false,
        currentItem: {},
    }),

    getters: {
        getAdditionalReccom: (state, getters, rootState) => (item) => {
            if (rootState.pets.currentPet) {
                let prepair = [...state.catalogThings].filter(elem => elem.petType.includes(rootState.pets.currentPet.petType) && elem.type != item.type && (elem.weight == rootState.pets.currentPet.setInfo || elem.weight == 'normal')).sort((a, b) => b.buyVisited - a.buyVisited);
                let reccomElem = [];
                let types = prepair.reduce((acc, item) => {
                    if (acc.includes(item.type)) {
                        return acc
                    } else {
                        acc.push(item.type);
                        reccomElem.push(item);
                        return acc
                    }
                }, [])
                console.log('reccomElem', types);
                console.log('FreccomElem', reccomElem);
                return reccomElem;
            } else {
                let prepair = [];
                if (item.weight == 'normal') {
                    prepair = [...state.catalogThings].filter(elem => elem.petType.includes(item.petType) && elem.type != item.type).sort((a, b) => b.buyVisited - a.buyVisited);
                } else {
                    prepair = [...state.catalogThings].filter(elem => elem.petType.includes(item.petType) && elem.type != item.type && (elem.weight == item.weight || elem.weight == 'normal')).sort((a, b) => b.buyVisited - a.buyVisited);
                }
                let reccomElem = [];
                console.log('prep', prepair);
                let types = prepair.reduce((acc, item) => {
                    if (acc.includes(item.type)) {
                        return acc
                    } else {
                        acc.push(item.type);
                        reccomElem.push(item);
                        return acc
                    }
                }, [])
                console.log('item', item);
                console.log('reccomElem', types);
                console.log('FreccomElem', reccomElem);
                return reccomElem;
            }
        },

        catalogFilterDefault: (state, getters, rootState) => (type) => {
            if (rootState.pets.currentPet) {
                let prepair = [...state.catalogThings].filter(elem => elem.petType.includes(rootState.pets.currentPet.petType) && elem.type.toString().includes(type) && (elem.weight == rootState.pets.currentPet.setInfo || elem.weight == 'normal'));
                let items = prepair.sort((a, b) => b.buyVisited - a.buyVisited);
                console.log('finalList', items);
                return items;
            } else {
                let prepair = [...state.catalogThings].filter(elem => elem.type.toString().includes(type));
                let items = prepair.sort((a, b) => b.buyVisited - a.buyVisited);
                console.log('finalList', items);
                return items;
            }
        },

        catalogFilterSearch: (state, getters, rootState) => (search) => {
            if (rootState.pets.currentPet) {
                let prepair = [...state.catalogThings].filter(elem => elem.petType.includes(rootState.pets.currentPet.petType) && (elem.title.toLowerCase().includes(search.toLowerCase()) || elem.body.toLowerCase().includes(search.toLowerCase())) && (elem.weight == rootState.pets.currentPet.setInfo || elem.weight == 'normal'));
                let items = prepair.sort((a, b) => b.buyVisited - a.buyVisited);
                // console.log('finalList', items);
                return items;
            } else {
                let prepair = [...state.catalogThings].filter(elem => elem.title.toLowerCase().includes(search.toLowerCase()) || elem.body.toLowerCase().includes(search.toLowerCase()));
                let items = prepair.sort((a, b) => b.buyVisited - a.buyVisited);
                console.log('finalList', items);
                return items;
            }
        }
    },

    mutations: {
        setCatalogThings(state, items) {
            state.catalogThings = items
        },

        setShowItemModal(state, items) {
            state.showItemModal = items
        },

        setCurrentItem(state, items) {
            state.currentItem = items
        },
    },

    actions: {
        async fetchCatalog({ state, commit }) {
            try {
                const responce = await axios.get('http://localhost:3000/items', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const data = await responce.data;
                commit('setCatalogThings', data);
            } catch (err) {
                console.log('ERROR: ', err)
            }
        },
    },
    namespaced: true
}