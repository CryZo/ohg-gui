import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

import mdiVue from 'mdi-vue/v3'
import * as mdijs from '@mdi/js'

import { setupI18n } from './i18n';
//import en from './locales/en.json';
const i18n = setupI18n({
    globalInjection: true,
    legacy: false,
    locale: navigator.language,
    fallbackLocale: 'en',
    messages: {
        //en
    }
})

import { MQTTConnection } from "ohg-connector/dist/connection";
import { RestParser } from "ohg-connector/dist/";

import '@/assets/styles/index.scss';

window.backendConnection = new MQTTConnection('ws://10.0.1.14:9001');
let rp = new RestParser(window.backendConnection);
setInterval(() => {
    window.rooms = rp.ParseModel(window.backendConnection.data);
}, 500);

createApp(App)
    .use(router)
    .use(i18n)
    .use(mdiVue, {icons: mdijs})
    .mount('#app');
