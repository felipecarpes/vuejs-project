<template>
    <v-main>
        <div>
            <v-alert prominent type="error">
                <v-row align="center">
                    <v-col class="grow">
                        Ops, algo aconteceu ao tentar acessar esta página, por gentileza volte e tente novamente!
                    </v-col>
                    <v-col class="shrink">
                        <v-btn @click="back">Voltar</v-btn>
                    </v-col>
                </v-row>
            </v-alert>
        </div>
    </v-main>
</template>
<script>
    export default {
        name: "Error",
        data() {
            //
        },
        methods: {
            back() {
                sessionStorage.removeItem("token")
                window.location.href= "/"
            }
        }
    }
</script>