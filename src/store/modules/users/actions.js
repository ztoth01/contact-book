import * as firebase from 'firebase';
// Get all contact data
export const getDbData = ({ commit, state }) => {
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
    if (contacts.length > 0) {
      commit('setSelectedContact', state.contacts[0])
    }
  });
}