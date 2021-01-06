import Vue from 'vue';

Vue.prototype.$auth = new Vue({
    data() {
        return {
            signed: false
        }
    },
    methods: {
        authLogin()  {
            var token = localStorage.getItem('token')
            if(token !== "teste") return window.location.href= "/"
        }
    }
})