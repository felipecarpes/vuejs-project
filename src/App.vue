<template>
    <v-app>
        <v-main>
            <v-container>
                <router-view></router-view>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
    export default {
        name: 'App',

        data: () => ({
            //
        }),
        mounted() {
            //this.$auth.authLogin()
            //localStorage.setItem("token", "")
        }
    }
</script>
<style>
    #app, main {
        background-color: dimgray;
        font-weight: 300;
        align-items: center;
    }
</style>