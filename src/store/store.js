import Vue from "vue"
import Vuex from "vuex"
import axios from 'axios'
import * as firebase from 'firebase'

Vue.use(Vuex);

export const store = new Vuex.Store({

    //state
    state: {
        contacts: [],
        selectedContact: null
    },

    //muttations
    mutations: {
        'SELECT_CONTACT': (state, payload) => {
            state.selectedContact = state.contacts.find(elem => elem.id === payload);
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
                .then(res => console.log(res))
                .catch(err => console.log(err))
        },
        'GET_DB_DATA': (state) => {
            axios.get('https://contact-book-7d273.firebaseio.com/contacts.json')
                .then(res => {
                    for (var key in res.data) {
                        let singleContact = {}
                        if (res.data.hasOwnProperty(key)) {
                            singleContact = res.data[key]
                            singleContact.id = key
                            state.contacts.push(singleContact);
                        }
                    }
                    if (state.contacts.length > 0 ) {
                        state.selectedContact = state.contacts[0]
                    }
                })
                .catch(err => console.log(err))
        },
        'SINGUP': (state, payload) => {
            let imageUrl;
            let key;
            axios.post('https://contact-book-7d273.firebaseio.com/contacts.json', payload)
                .then(res => {
                    key = res.data.name
                    return key
                })
                .then( key => {
                    const filenName = payload.profilePicture.name
                    const ext = filenName.slice(filenName.lastIndexOf('.'));
                    console.log(payload.profilePicture);
                    return firebase.storage().ref("contacts/" + key + ext).put(payload.profilePicture);
                })
                .then(fileData =>{
                    fileData.ref.getDownloadURL().then((filePath) => {
                        return firebase.database().ref('/contacts').child(key).update({profileImage: filePath})
                    });
                })
                .catch(err => console.log(err))  
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
        getDbData({commit}) {
            commit('GET_DB_DATA');
        },
        singUp({commit}, payload) {
            commit('SINGUP', payload);
        }
    },

    //getters
    getters: {
        getContacts: state => {
            return state.contacts;
        },
        getSelectedContact: state => {
            return state.selectedContact;
        }
    }

});