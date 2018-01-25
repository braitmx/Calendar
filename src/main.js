import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import Firebase from 'firebase';
import Routes from './helpers/routes';
import { config } from './helpers/firebaseConfig';
import { store } from './store/store';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: Routes,
  mode: 'history'
})

new Vue({

  created() {
      Firebase.initializeApp(config);
  },

  el: '#app',
  render: h => h(App),
  store: store,
  router: router
})
