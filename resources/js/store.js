const user = JSON.parse(localStorage.getItem('currentUser'));

export default {
  state: {
    currentUser: user,
    message: ''
  },

  getters: {
    currentUser(state) {
      return state.currentUser;
    },
    message(state) {
      return state.message;
    }
  },

  mutations: {
    login(state, payload) {
      state.currentUser = payload;
      localStorage.setItem('currentUser', JSON.stringify(payload));
      state.message = 'Welcome back.'
    },
    logout(state) {
      state.currentUser = {};
      localStorage.removeItem('currentUser');
    },
    resetMessage(state) {
      state.message = '';
    }
  },

  actions: {

  }

}
