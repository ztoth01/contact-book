export default {

  state: {
    registryFormIsVisible: false,
  },

  mutations: {
    openRegistryForm(state) {
      state.registryFormIsVisible = true;
    },
    closeRegistryForm(state) {
      state.registryFormIsVisible = false;
    },
  },

  actions: {

  },

  getters: {
    getRegistryFormState: state => {
      return state.registryFormIsVisible;
    }
  }
}
