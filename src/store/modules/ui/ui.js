export default {

  state: {
    modalIsVisible: false,
    overlayIsVisible: false,
    devsForModal: null
  },

  mutations: {
    openModal(state) {
      state.modalIsVisible = true;
    },
    closeModal(state) {
      state.overlayIsVisible = false;
    },
    openOverlay(state) {
      state.overlayIsVisible = true;
    },
    closeOverlay(state) {
      state.overlayIsVisible = false;
    },
    setDevsForModal(state, payload) {
      state.devsForModal = payload
    }
  },

  actions: {

  },

  getters: {
    getModalState: state => {
      return state.modalIsVisible;
    },
    getOverlayState: state => {
      return state.overlayIsVisible;
    },
    getDevsForModal: state => {
      return state.devsForModal;
    },

  }
}