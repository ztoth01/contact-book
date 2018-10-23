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
    currentUser: {}
  },

  //muttations
  mutations: {
    setContacts(state, payload) {
      state.contacts = payload;
    },
    setSelectedContact(state, payload) {
      state.selectedContact = payload;
    },
    selectContact(state, payload) {
      state.selectedContact = state.contacts.find(elem => elem.id === payload);
    },
    logOutUser(state) {
      state.currentUser = {};
    },
    setUserId(state, payload) {
      state.currentUser.id = payload;
    },
    setUserRefreshToken(state, payload) {
      state.currentUser.refreshToken = payload;
    },
    setCurrentUser(state, payload) {
      state.currentUser = payload;
    }
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
              sessionStorage.setItem("userId", res.user.uid);
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
              dispatch('getUserProfile');
              router.replace('/profile');
            })
            .catch(error => {
              alert(error.message);
            })
        })
    },

    logIn({ commit, dispatch }, payload) {
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then(() => {
          return firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
            .then((res) => {
              sessionStorage.setItem("userId", res.user.uid);
              commit('setUserId', res.user.uid);
              dispatch('getUserProfile');
              router.replace('/profile');
            })
            .catch((error) => {
              alert(error.message);
            });
        })
        .catch((error) => {
          // Handle Errors here.
          //const errorCode = error.code;
          //const errorMessage = error.message;
        });

    },

    autoLogIn({ dispatch }) {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          dispatch('getUserProfile');
          router.replace('/profile');
        } else {
          dispatch('logOut');
        }
      });
    },

    // Get current user profile
    getUserProfile({ commit, state }) {
      let id;
      if (state.currentUser.id) {
        id = state.currentUser.id;
      } else {
        id = sessionStorage.getItem('userId');
      }
      firebase.database().ref('contacts/' + id).on('value', (data) => {
        const userData = data.val();
        const updatedData = { id, ...userData };
        commit('setCurrentUser', updatedData);
      });
    },
    // Get all contact data
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
    },

    logOut({ commit }) {
      firebase.auth().signOut()
        .then(() => {
          sessionStorage.removeItem("userId");
        })
        .catch(() => { });
      commit('logOutUser');
      router.replace('/');
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
      return state.currentUser.id;
    },
    getProfile: state => {
      return state.currentUser;
    }
  }
});