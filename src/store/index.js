import { createStore } from 'vuex';

export default createStore({
  state() {
    return {
      users: JSON.parse(localStorage.getItem('users')) || [],
      currentUser: JSON.parse(localStorage.getItem('currentUser')) || null,
    };
  },
  getters: {
    isAuthenticated(state) {
      return !!state.currentUser;
    },
    currentUser(state) {
      return state.currentUser;
    },
  },
  mutations: {
    SET_USER(state, user) {
      state.currentUser = user;
    },
    LOGOUT(state) {
      state.currentUser = null;
    },
    ADD_USER(state, user) {
      state.users.push(user);
      localStorage.setItem('users', JSON.stringify(state.users));
    },
    SET_USERS(state, users) {
      state.users = users;
    },
  },
  actions: {
    async login({ commit, state }, { username, password }) {
      const user = state.users.find(
        (user) => user.username === username && user.password === password
      );
      if (user) {
        if (user.status === 'active') {
          commit('SET_USER', user);
          localStorage.setItem('currentUser', JSON.stringify(user));
          return user.role === 'admin' ? '/dashboard' : '/home';
        } else {
          return 'Your account is inactive. Please contact support.';
        }
      }
      return 'Invalid username or password';
    },
    logout({ commit }) {
      commit('LOGOUT');
      localStorage.removeItem('currentUser');
    },
    register({ commit, state }, user) {
      const existingUser = state.users.find(u => u.username === user.username || u.email === user.email);
      if (existingUser) {
        return false;
      }
      user.status = 'active';
      user.role = 'user';
      commit('ADD_USER', user);
      return true;
    },
    initializeStore({ commit }) {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      if (users.length === 0) {
        const initialUsers = [
          { firstName: 'Admin', lastName: 'Admin', email: 'admin@example.com', username: 'Admin1!', password: 'Admin1!', role: 'admin', status: 'active' },
          { firstName: 'User', lastName: 'User', email: 'user@example.com', username: 'User1!', password: 'User1!', role: 'user', status: 'active' },
        ];
        localStorage.setItem('users', JSON.stringify(initialUsers));
        commit('SET_USERS', initialUsers);
      } else {
        commit('SET_USERS', users);
      }

      const user = localStorage.getItem('currentUser');
      if (user) {
        commit('SET_USER', JSON.parse(user));
      }
    },
  },
});
