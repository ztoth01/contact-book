import * as firebase from 'firebase';

export const actions = {
  getGlobaMatricDbFromFirebase({ commit }) {
    firebase.database().ref("skillsCategories/").on('value', (data) => {
      let skillsCategories = data.val();
      commit('setGlobalMatrix', skillsCategories)
    });
  }
}