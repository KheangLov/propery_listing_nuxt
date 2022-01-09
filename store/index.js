export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn;
  },

  loggedInUser(state) {
    return state.auth.user;
  },

  apiUrl() {
    return process.env.API_URL ? process.env.API_URL : 'https://fastapi-kheanglov.cloud.okteto.net';
  }
}
