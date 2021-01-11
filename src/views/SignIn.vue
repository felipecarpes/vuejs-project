<template>
    <div id="sign-content">
        <div id="container" :class="`rounded-lg`">
            <div class="form-corpse">
                <label>Usuário <span class="required">*</span></label>
                <v-text-field solo v-model="dados.user" v-on:input="handleChange('user', `${dados.user}`)">
                </v-text-field>
            </div>
            <div class="form-corpse" style="margin-bottom: 40px">
                <label>Senha <span class="required">*</span></label>
                <v-text-field type="password" solo v-model="dados.senha"
                    v-on:change="handleChange('nome', `${dados.senha}`)" :rules="[rules.required]"
                    style="margin-bottom: -15px"></v-text-field>
                <span><a style="color: #26A69A">Esqueci minha senha</a></span>
            </div>
            <div class="form-corpse">
                <v-btn :loading="loading5" color="teal lighten-1" class="login-button" large block @click="login">
                    Entrar
                </v-btn>
            </div>
            <div class="register-text">
                <p>Não tem uma conta? <a class="register-link" v-bind:href="'/register'">Registre-se</a></p>
            </div>
        </div>
    </div>
</template>
<script>
    import {
        mask
    } from 'vue-the-mask';
    import axios from 'axios';
    import { loginUser } from "../plugins/services/auth"
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
                loader: null,
                loading5: false,
                rules: {
                    required: value => !!value || 'Obrigatório!',
                    counter: value => value.length <= 20 || 'Max 20 characters',
                    email: value => {
                        const pattern =
                            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        return pattern.test(value) || 'E-mail inválido!'
                    }
                },
            }
        },
        methods: {
            async login() {
                try {
                    if (this.dados.user === '' || this.dados.senha === '') {
                        return this.$vToastify.error("Usuario e senha devem ser preenchidos!", "Atencao!")
                    } else {
                        this.loader = 'loading5'
                        await loginUser(this.dados.user, this.dados.senha)
                        this.$router.push('/home')
                    }
                }
                catch (err) {
                    alert(`Error: ${err}`)
                }
            },
            handleChange(name, value) {
                this.dados = {
                    ...this.dados,
                    [name]: value
                }
            }
        },
        watch: {
            loader() {
                const l = this.loader
                this[l] = !this[l]

                setTimeout(() => (this[l] = false), 5000)

                this.loader = null
            },
        },
        mounted() {
            //this.$auth.authLogin()
        }
    }
</script>
<style scoped>
    #sign-content {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0px auto;
    }

    #container {
        background-color: white;
        width: 440px;
        height: 450px;
        padding: 50px;

    }

    @media only screen and (max-width: 414px) {
        #container {
            background-color: white;
            width: 290px;
            height: 400px;
            padding: 30px;
        }
    }


    .required {
        color: #26A69A;
    }

    .login-button {
        color: white !important;
    }

    .register-text {
        text-align: center;
        margin-top: 20px;
    }

    .register-link {
        color: #26A69A;
        text-decoration: none;
    }

    @keyframes loader {
        from {
            transform: rotate(0);
        }

        to {
            transform: rotate(360deg);
        }
    }
</style>
