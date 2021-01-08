import Vue from 'vue';
import env from '@/env';

Vue.prototype.$auth = new Vue({
    data() {
        return {
            signed: false
        }
    },
    methods: {
        authLogin()  {
            var token = sessionStorage.getItem('token')
            //console.log(token)
            if(token === "undefined" || token === "null") {
                return window.location.href = "*"
            }

            if(token === "") {
                window.location.href = "*"
            }

            if(token === "null") {
                sessionStorage.removeItem("token")
            }
        }
    }
})