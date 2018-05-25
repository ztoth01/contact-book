import Vue from "vue"
import Vuex from "vuex"
import axios from 'axios'
Vue.use(Vuex);


export const store = new Vuex.Store({

    state: {
        contacts: [],
        selectedContact: {
            "id": 1,
            "name": "Peter Kiss",
            "phone": "023567982",
            "email": "example1@example.com",
            "address": "Flat1 251a Mare Street, E8 3NS",
            "img": "people-1.png",
        }
    },

    mutations: {
        'SELECT_CONTACT': (state, payload) => {
            state.selectedContact = state.contacts[payload]
        },
        'SET_SINGLE_CONTACT': (state) => {
            if (state.contacts.length > 0){
                state.selectedContact = '';
            }else{
                state.selectedContact = state.contacts[0];
            }
        },
        'SAVE_DATA': (state) => {
            axios.post('https://contact-book-7d273.firebaseio.com/contact.json', state.contacts)
                .then(res => console.log(res))
                .catch(err => console.log(err))
        },
        'GET_DB_DATA': (state) => {
            axios.get('https://contact-book-7d273.firebaseio.com/contact.json')
                .then(res => {
                    for (var key in res.data) {
                        //state.dbId = obj;
                        if (res.data.hasOwnProperty(key)) {
                            state.contacts = res.data[key];
                        }
                    }
                })
                .catch(err => console.log(err))
        }
    },

    actions: {
        selectContact({commit}, payload) {
            commit('SELECT_CONTACT', payload);
        },
        setSingleContact({commit}){
            commit('SET_SINGLE_CONTACT');
        },
        saveData({commit}) {
            commit('SAVE_DATA');
        },
        getDbData({commit}) {
            commit('GET_DB_DATA');
        }
    },

    getters: {
        getContact: state => {
            return state.contacts;
        },
        getSelectedContact: state => {
            return state.selectedContact;
        }
    }

});