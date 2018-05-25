import Vue from "vue"
import Vuex from "vuex"
import axios from 'axios'
Vue.use(Vuex);


export const store = new Vuex.Store({

    //state
    state: {
        contacts: [],
        selectedContact: {}
    },

    //muttations
    mutations: {
        'SELECT_CONTACT': (state, payload) => {
            state.selectedContact = state.contacts[payload]
        },
        'SET_SINGLE_CONTACT': (state) => {
            state.selectedContact = state.contacts[0];
            if (state.contacts.length > 0){
                state.selectedContact = '';
            }else{
                state.selectedContact = state.contacts[0];
            }
        },
        'SAVE_NEW_CONTACT': (state) => {
            axios.post('https://contact-book-7d273.firebaseio.com/contacts.json', state.contacts)
                //.then(res => console.log(res))
                //.catch(err => console.log(err))
        },
        'GET_DB_DATA': (state) => {
            axios.get('https://contact-book-7d273.firebaseio.com/contacts.json')
                .then(res => {
                    for (var key in res.data) {
                        if (res.data.hasOwnProperty(key)) {
                            if (res.data[key].length > 0) {
                                state.selectedContact = res.data[key][0]
                            }
                            state.contacts = res.data[key];
                        }
                    }
                })
                //.catch(err => console.log(err))
        }
    },

    //actions
    actions: {
        selectContact({commit}, payload) {
            commit('SELECT_CONTACT', payload);
        },
        setSingleContact({commit}){
            commit('SET_SINGLE_CONTACT');
        },
        // saveData({commit}) {
        //     commit('SAVE_DATA');
        // },
        getDbData({commit}) {
            commit('GET_DB_DATA');
        }
    },

    //getters
    getters: {
        getContact: state => {
            return state.contacts;
        },
        getSelectedContact: state => {
            return state.selectedContact;
        }
    }

});