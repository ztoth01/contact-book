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
    getGlobaMatrixDbFromFirebase({ commit, rootState }) {
      firebase.database().ref("skillsMatrix/").on('value', (data) => {
        let skillsCategories = data.val(),
          matrixData = {};
        for (let key in skillsCategories) {
          if (skillsCategories.hasOwnProperty(key)) {
            let skillKey = {};
            for (let i in skillsCategories[key]) {
              let devs = {},
                index = 0;
              rootState.contacts.map((elem) => {
                if (elem['skillsMatrix'] !== 0) {
                  for (let key in elem['skillsMatrix']) {
                    if (elem['skillsMatrix'].hasOwnProperty(key)) {
                      if (elem['skillsMatrix'][key][i] !== undefined && elem['skillsMatrix'][key][i] > 0) {
                        index++;
                        devs['dev' + index] = elem.id;
                      }
                    }
                  }
                }
              });
              Object.keys(devs).length === 0 && devs.constructor === Object ? skillKey[i] = { devs: 0 } : skillKey[i] = devs;
            }
            matrixData[key] = skillKey;
          }
        }
        commit('setGlobalMatrix', matrixData);
      });
    },
  },

  getters: {
    getGlobalMatrix: state => {
      return state.globalMatrix;
    }
  }
}