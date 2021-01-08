<template>
    <v-app id="app">
        <v-container bg fill-height grid-list-md text-xs-center fluid>
            <v-layout row wrap align-center>
                <v-flex>
                    <router-view></router-view>
                </v-flex>
            </v-layout>
        </v-container>
    </v-app>
</template>

<script>
    export default {
        name: 'app',
        data: () => ({
            //
        }),
    }
</script>
<style>
    #app {
        background-color: dimgray;
        font-weight: 300;
        width: 100%;
        margin: 0px auto;
    }
</style>