<template>
    <v-container id="container" :class="`rounded-lg`">
        <div class="form-corpse">
            <label>Usuário <span class="required">*</span></label>
            <v-text-field solo v-model="dados.user" v-on:input="handleChange('user', `${dados.user}`)"></v-text-field>
        </div>
        <div class="form-corpse" style="margin-bottom: 40px">
            <label>Senha <span class="required">*</span></label>
            <v-text-field type="password" solo v-model="dados.senha"
                v-on:change="handleChange('nome', `${dados.senha}`)" :rules="[rules.required]"
                style="margin-bottom: -15px"></v-text-field>
            <span><a style="color: #26A69A">Esqueci minha senha</a></span>
        </div>
        <div class="form-corpse">
            <v-btn color="teal lighten-1" style="color: white" large block v-on:click="login">Entrar <v-icon dark right>
                    mdi-login</v-icon>
            </v-btn>
        </div>
        <div class="form-corpse" style="text-align: center; margin-top: 20px;">
            <p>Não tem uma conta? <a style="color: #26A69A; text-decoration: none;" v-bind:href="'/register'">Registre-se</a></p>
        </div>
    </v-container>
</template>
<script>
    import { mask } from 'vue-the-mask';
    import axios from 'axios';
    export default {
        name: 'SignIn',
        directives: {
            mask
        },
        data() {
            return {
                dados: {
                    user: '',
                    senha: '',
                },
                rules: {
                    required: value => !!value || 'Obrigatório!',
                    counter: value => value.length <= 20 || 'Max 20 characters',
                    email: value => {
                        const pattern =
                            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        return pattern.test(value) || 'E-mail inválido!'
                    }
                }
            }
        },
        methods: {
            async login() {
                if(this.dados.user === '' || this.dados.senha === '') return this.$vToastify.error("Usuario e senha devem ser preenchidos", "Atencao!")
                //localStorage.setItem('token', "teste")
                //return setInterval(() => window.location.href = "/home", 2000)
            },
            handleChange(name, value) {
                this.dados = {
                    ...this.dados,
                    [name]: value
                }
            }
        },
        mounted() {
            //this.$auth.authLogin()
        }
    }
</script>
<style scoped>
    #container {
        background-color: white;
        width: 440px;
        height: 450px;
        padding: 50px;
    }

    .required {
        color: #26A69A;
    }
</style>