import Vue from 'vue';
import Vuex from 'vuex';
import * as firebase from 'firebase';
import router from '../router/index';

Vue.use(Vuex);

export const store = new Vuex.Store({

  //state
  state: {
    contacts: [],
    selectedContact: null,
    userLoggedIn: true,
    userId: null
  },

  //muttations
  mutations: {
    setContacts(state, contacts) {
      state.contacts = contacts;
    },
    setSelectedContact(state, contact) {
      state.selectedContact = contact;
    },
    selectContact(state, payload) {
      state.selectedContact = state.contacts.find(elem => elem.id === payload);
    },
    logOutUser(state) {
      state.userLoggedIn = false
    },
    setUserId(state, payload) {
      state.userId = payload;
    },

    'SET_SINGLE_CONTACT': (state) => {
      state.selectedContact = state.contacts[0];
      if (state.contacts.length > 0) {
        state.selectedContact = '';
      } else {
        state.selectedContact = state.contacts[0];
      }
    },
  },


  //actions
  actions: {
    selectContact({ commit }, payload) {
      commit('selectContact', payload);
    },

    singUp({ commit, dispatch }, payload) {
      let key;
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then((res) => {
          firebase.database().ref('contacts/' + res.user.uid).set(payload)
            .then(() => {
              commit('setUserId', res.user.uid);
              key = res.user.uid;
              return key;
            })
            .then(key => {
              const filenName = payload.profilePicture.name
              const ext = filenName.slice(filenName.lastIndexOf('.'));
              return firebase.storage().ref("contacts/" + key + ext).put(payload.profilePicture);
            })
            .then(fileData => {
              fileData.ref.getDownloadURL().then((filePath) => {
                return firebase.database().ref('/contacts').child(key).update({ profileImage: filePath })
              });
              router.replace('/dashboard');
            })
            .catch(error => {
              alert(error.message);
            })
        })
    },

    logOut({ commit }) {
      firebase.auth().signOut()
        .then(res => {
          //success
        })
        .catch(err => {
          //error
        });
      commit('logOutUser');
      router.replace('/');
    },
    logIn({ commit }, payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then((res) => {
          commit('setUserId', res.user.uid);
          router.replace('/profile');
        })
        .catch((error) => {
          alert(error.message);
          console.log(error)
        });
    },
    getUserProfile({ commit, state }) {
      firebase.database().ref('contacts/' + state.userId).on('value', (data) => {
        console.log(data.val());
        sessionStorage.setItem("user", JSON.stringify(data.val()));
      });
    },
    getDbData({ commit, state }) {
      firebase.database().ref("contacts/").on('value', (data) => {
        let dataTransformed = data.val(),
          contacts = [];
        for (var key in dataTransformed) {
          let singleContact = {};
          if (dataTransformed.hasOwnProperty(key)) {
            singleContact = dataTransformed[key];
            singleContact.id = key;
            contacts.push(singleContact);
          }
        }
        commit('setContacts', contacts);
        if (state.contacts.length > 0) {
          commit('setSelectedContact', state.contacts[0])
        }
      });
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
      return state.userLoggedIn !== false
    },
    getProfile: state => {
      //return state.
    }
  }
});