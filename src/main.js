import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router/index.js";
import axios from "axios";
import {createVuetify} from "vuetify";
import 'vuetify/styles'

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'

const vuetify = createVuetify({
    components,
    directives,
})

export default createVuetify({
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        },
    },
})

window.axios = axios

createApp(App)
    .use(vuetify)
    .use(router)
    .mount('#app')
