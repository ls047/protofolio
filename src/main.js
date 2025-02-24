import { createPinia } from 'pinia';
import { createApp } from 'vue';
import './assets/css/index.css';

import axiosPlugin from '@/plugins/axios';
import App from './App.vue';
import router from './router/index';
import BootstrapVue3 from 'bootstrap-vue-3';

// Import Bootstrap and BootstrapVue3 CSS files
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';

const pinia = createPinia();

const app = createApp(App);
app.use(router);
app.use(pinia);
app.use(axiosPlugin);
app.use(BootstrapVue3);

app.mount('#app');
