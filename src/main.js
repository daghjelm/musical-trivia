import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
// Import Bootstrap an BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import store from "./store";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { firebaseConfig } from "./firebaseConfig.js";
import { onUpdate, updateUserData, getScoreboardFromDb } from "./firebaseModel";

Vue.config.productionTip = false;
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);
const auth = getAuth(firebaseApp);
let unsubscribe = () => null;

//Check if user authenticates, and in that case, Subscribe to the store.
onAuthStateChanged(auth, (user) => {
  if (user) {
    store.dispatch("fetchUser", user);
    updateUserData(database, user.uid, store);
    unsubscribe = store.subscribe((mutation, state) => {
      onUpdate(mutation, database, state);
    });
  }
  //if a user then logs out, we unsubscribe to the store, and make neccesary calls to make it playale while not signed in.
  else {
    unsubscribe();
    getScoreboardFromDb(database, store);
    store.dispatch("getCurrentSong");
    store.dispatch("getInitSong");
  }
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
