export default {

  state: {
    modalIsVisible: false,
    overlayIsVisible: false,
    devsForModal: null,
    skillToLookFor: null,
    messageCompIsVisible: false,
    messageContent: {
      text: '',
      className: ''
    }
  },

  mutations: {
    openModal(state) {
      state.modalIsVisible = true;
    },
    closeModal(state) {
      state.modalIsVisible = false;
    },
    openOverlay(state) {
      state.overlayIsVisible = true;
    },
    closeOverlay(state) {
      state.overlayIsVisible = false;
    },
    setDevsForModal(state, payload) {
      state.devsForModal = payload;
    },
    setSkillToLookFor(state, payload) {
      state.skillToLookFor = payload;
    },
    openMessageComp(state) {
      state.messageCompIsVisible = true;
      setTimeout(() => {
        state.messageCompIsVisible = false;
      }, 2000);
    },
    setMessageContent(state, payload) {
      state.messageContent = { ...payload }
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
    getMessageCompState: state => {
      return state.messageCompIsVisible;
    },
    getMessageCompContent: state => {
      return state.messageContent;
    },
  }
}







