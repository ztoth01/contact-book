import Vue from "vue"
import Vuex from "vuex"
import globalAxios from 'axios'
import axios from '../axios-auth'
import * as firebase from 'firebase'
import router from '../router'

Vue.use(Vuex);

export const store = new Vuex.Store({

    //state
    state: {
        contacts: [],
        selectedContact: null,
        idToken: null,
        userId: null,
        user: null,
        userEmail: null
    },


    //muttations
    mutations: {
        'SELECT_CONTACT': (state, payload) => {
            state.selectedContact = payload
        },
        'SET_SINGLE_CONTACT': (state) => {
            if (state.contacts.length > 0) {
                state.selectedContact = '';
            } else {
                state.selectedContact = state.contacts[0];
            }
        },
        'LOG_OUT_USER': (state) => {
            state.idToken = null,
                state.userId = null,
                state.userEmail = null
        },
        'SINGUP': (state, payload) => {
        },
        'SELECT_CONTACT': (state, payload) => {
            state.selectedContact = payload
        },
        'GET_DB_DATA': (state, payload) => {
            state.contacts = payload
        },
        'AUTH_USER': (state, userData) => {
            state.idToken = userData.token,
                state.userId = userData.userId,
                state.userEmail = userData.userEmail
        },
        'SET_USER': (state, userData) => {
            state.user = userData
        },
        'LOG_OUT_USER': (state) => {
            state.idToken = null,
            state.userId = null,
            state.userEmail = null
        }
    },


    //actions
    actions: {

        getDbData({ commit, state }) {
            firebase.database().ref("contacts").on("value", (data) => {
                //sessionStorage.setItem("user", JSON.stringify(data.val()));
                console.log(data.val())
                const contactDataFromDb = data.val()
                let contacts = []
                for(let key in contactDataFromDb){
                    let contact = {}
                    if (contactDataFromDb.hasOwnProperty(key)) {
                        contact = contactDataFromDb[key]
                        contact.id = key
                        contacts.push(contact);
                    }
                }
                if (contacts.length > 0) {
                    commit('GET_DB_DATA', contacts)
                }
                if (state.contacts.length > 0) {
                    commit('SELECT_CONTACT', contacts[0])
                }
                console.log(contacts)
            });
            // globalAxios.get('/contacts.json?auth=' + state.idToken)
            //     .then(res => {
            //         let contacts = []
            //         for (let key in res.data) {
            //             let singleContact = {}
            //             if (res.data.hasOwnProperty(key)) {
            //                 singleContact = res.data[key]
            //                 singleContact.id = key
            //                 contacts.push(singleContact);
            //             }
            //         }
                    // if (contacts.length > 0) {
                    //     commit('GET_DB_DATA', contacts)
                    // }
                    // if (state.contacts.length > 0) {
                    //     commit('SELECT_CONTACT', contacts[0])
                    // }
            //     })
            //     .catch(err => console.log(err))
        },

 
        singUp({commit, dispatch }, payload) {
            let key;
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(function (res) {
                    key = res.user.uid
                    firebase.database().ref('contacts/' + res.user.uid).set(payload)
                        .then(() => {
                            if(payload.profilePicture === null) return;
                            const filenName = payload.profilePicture.name
                            const ext = filenName.slice(filenName.lastIndexOf('.'));
                            return firebase.storage().ref("contacts/" + key + ext).put(payload.profilePicture);
                        })
                        .then(fileData => {
                            if(payload.profilePicture === null) return;
                            fileData.ref.getDownloadURL().then((filePath) => {
                                return firebase.database().ref('contacts/').child(key).update({ profileImageUrl: filePath })
                            });
                        }).then(
                            router.replace('/dashboard')
                        )
                        .catch(err => console.log(err))
                })
                .catch(err => console.log(err)) 
        },

        // singUpkkk({ commit, dispatch }, payload) {
        //     console.log(payload)
        //     let imageUrl;
        //     let key;

        //     axios.post('/signupNewUser?key=AIzaSyArpYytMFJrtIgmbcRyN77seuDreamUfCM', {
        //         email: payload.email,
        //         password: payload.password,
        //         returnSecureToken: true,
        //     })
        //         .then(res => {
        //             commit('AUTH_USER', {
        //                 token: res.data.idToken,
        //                 userId: res.data.localId,
        //                 userEmail: res.data.email
        //             })
        //             const now = new Date
        //             const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000)
        //             localStorage.setItem('token', res.data.idToken)
        //             localStorage.setItem('expirationDate', expirationDate)
        //             localStorage.setItem('userId', res.data.localId)
        //             dispatch('storeContact', payload)
        //             //dispatch('setLogoutTimer', res.data.expiresIn)
        //             router.replace('/dashboard')
        //         })
        //         .catch(err => console.log(err))
        // },

        // storeContact({ commit, state }, payload) {
        //     if (!state.idToken) {
        //         return
        //     }
        //     const key = '';
        //     globalAxios.post('/contacts.json?auth=' + state.idToken, payload)
        //         .then(res => {
        //             console.log(res, 'ssssssss')
        //             key = res.data.name
        //             return key
        //         })
        //         .then(key => {
        //             const filenName = payload.profilePicture.name
        //             const ext = filenName.slice(filenName.lastIndexOf('.'));
        //             return firebase.storage().ref("contacts/" + key + ext).put(payload.profilePicture);
        //         })
        //         .then(fileData => {
        //             console.log(fileData)
        //             console.log(key, 'step one')
        //             fileData.ref.getDownloadURL().then((filePath) => {
        //                 return firebase.database().ref('contacts/').child(key).update({ profileImage: filePath })
        //             });
        //         })
        //         .catch(err => console.log(err))
        // },


        logIn({ commit, dispatch }, payload) {

            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then( (res) => {
                    console.log(res)
                    // commit('AUTH_USER', {
                    //     token: res.data.idToken,
                    //     userId: res.data.localId,
                    //     userEmail: res.data.email
                    // })
                })
                .catch( (error) => {
                    console.log(error)
                });



            // axios.post('/verifyPassword?key=AIzaSyArpYytMFJrtIgmbcRyN77seuDreamUfCM', {
            //     email: payload.email,
            //     password: payload.password,
            //     returnSecureToken: true
            // })
            //     .then(res => {
            //         const now = new Date
            //         const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000)
            //         localStorage.setItem('token', res.data.idToken)
            //         localStorage.setItem('expirationDate', expirationDate)
            //         localStorage.setItem('userId', res.data.localId)
            //         commit('AUTH_USER', {
            //             token: res.data.idToken,
            //             userId: res.data.localId,
            //             userEmail: res.data.email
            //         })
            //         //dispatch('setLogoutTimer', res.data.expiresIn)
            //         router.replace('/dashboard')
            //     })
            //     .catch(error => console.log(error))
        },

        selectContact({ commit, state }, payload) {
            const selectedContact = state.contacts.find(elem => elem.id === payload);
            commit('SELECT_CONTACT', selectedContact)
        },

        setSingleContact({ commit }) {
            commit('SET_SINGLE_CONTACT')
        },

        logOut({ commit }) {
            commit('LOG_OUT_USER');
            firebase.auth().signOut()
                .then( res => console.log(err))
                .catch( err => console.log(err))
            // localStorage.clear();
            // localStorage.removeItem('token')
            // localStorage.removeItem('expirationDate')
            // localStorage.removeItem('userEmail')
            router.replace('/')
        }
    },


    //getters
    getters: {
        getContacts: state => {
            return state.contacts;
        },
        getSelectedContact: state => {
            return state.selectedContact;
        },
        isAuthenticated(state) {
            return state.idToken !== null
        }
    }

});

