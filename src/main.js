import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store'; // Import Vuex store

const app = createApp(App);

app.use(router);
app.use(store); // Dodajte Vuex store

// Inicijalizujte Vuex store sa podacima iz localStorage
store.dispatch('initializeStore');

app.mount('#app');
