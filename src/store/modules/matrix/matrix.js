import * as firebase from 'firebase';


export default {
  state: {
    globalMatrix: null
  },
  mutations: {
    setGlobalMatrix(state, payload) {
      state.globalMatrix = payload;
    }

  },
  actions: {
    getGlobaMatricDbFromFirebase({ commit }) {
      firebase.database().ref("skillsCategories/").on('value', (data) => {
        let skillsCategories = data.val();
        commit('setGlobalMatrix', skillsCategories)
      });
    }
  },
  getters: {
    getGlobalMatrix: state => {
      return state.globalMatrix;
    },

  }
}