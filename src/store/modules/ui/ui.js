export default {

  state: {
    modalIsVisible: false,
    overlayIsVisible: false,
    devsForModal: null
  },

  mutations: {
    setModalState(state) {
      state.modalIsVisible = !state.modalIsVisible;
    },
    setOverlayState(state) {
      state.overlayIsVisible = !state.overlayIsVisible;
    },
    closeModal(state) {
      state.modalIsVisible = false;
    },
    openModal(state) {
      state.modalIsVisible = true;
    },
    closeOverlay(state) {
      state.modalIsVisible = false;
    },
    openOverlay(state) {
      state.modalIsVisible = true;
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