import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './plugins/router/index';
import vuetify from './plugins/vuetify/index';
import "@/plugins/services/index";
import VueToastify from "vue-toastify";

Vue.config.productionTip = false
Vue.use(VueToastify, {
    position: "top-right",
    theme: "light",
    iconEnabled: false,
});

new Vue({
    router,
    vuetify,
    render: h => h(App)
}).$mount('#app')