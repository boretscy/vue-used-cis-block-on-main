import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCookies from 'vue-cookies'
import App from '@/App.vue'

Vue.config.productionTip = false

Vue.use(VueAxios, axios)
Vue.use(VueCookies, { expires: '7d'})

new Vue({
    render: h => h(App),
    data() {
        return {
            token: '34b5ac8b71018c0bc7e5c050ed90b243',
            apiUrl: 'https://apps.yug-avto.ru/API/get/cis/',

            bodies: null,

            brands: [],
            models: [],
            price: {
                value: [0,99999999],
                range: [0,99999999]
            },
            
            city: this.$cookies.get('SELECTED_CITY') || null,
            inCity: null,

            activeButton: true,

            settings: JSON.parse(document.getElementById('CISMAinBlock').getAttribute('data')) || null,
            itemIndx: 0
        }
    }
}).$mount('#CISMAinBlock')
