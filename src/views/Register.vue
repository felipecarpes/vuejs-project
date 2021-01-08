<template>
    <div id="register-body" :class="`rounded-lg`">
        <div>
            <h3 class="header">Cadastro de usuário</h3>
            <p class="header-text">Utilize este cadastro para fazer parte do maior site de trade de Bitcoin do
                mundo.</p>
        </div>
        <div class="form-corpse">
            <label>Nome Completo <span class="required">*</span></label>
            <v-text-field solo v-model="dados.nome" v-on:change="handleChange('nome', `${dados.nome}`)"
                :rules="[rules.required]"></v-text-field>
        </div>
        <div class="form-corpse">
            <label>E-mail <span class="required">*</span></label>
            <v-text-field solo v-model="dados.email" v-on:input="handleChange('email', `${dados.email}`)"
                :rules="[rules.required, rules.email]"></v-text-field>
        </div>
        <div class="form-corpse">
            <v-row>
                <v-col cols="12" sm="6" md="6">
                    <label>Telefone <span class="required">*</span></label>
                    <v-text-field solo v-mask="['(##) #.####-####']" v-model="dados.telefone"
                        v-on:change="handleChange('telefone', `${dados.telefone}`)" :rules="[rules.required]">
                    </v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                    <label>CPF <span class="required">*</span></label>
                    <v-text-field solo v-mask="['###.###.###-##', '##.###.###/####-##']" v-model="dados.cpf"
                        v-on:change="handleChange('cpf', `${dados.cpf}`)" :rules="[rules.required]"></v-text-field>
                </v-col>
            </v-row>
        </div>
        <div class="form-corpse">
            <v-row>
                <v-col cols="12" sm="6" md="6">
                    <label>CEP <span class="required">*</span></label>
                    <v-text-field solo v-mask="['#####-###']" v-model="dados.cep"
                        v-on:change="handleChange('cep', `${dados.cep}`)" :rules="[rules.required]"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                    <label>Cidade</label>
                    <v-text-field solo v-model="dados.cidade" v-on:change="handleChange('cidade', `${dados.cidade}`)">
                    </v-text-field>
                </v-col>
            </v-row>
        </div>
        <div class="form-corpse">
            <label>Bairro</label>
            <v-text-field solo v-model="dados.bairro" v-on:change="handleChange('bairro', `${dados.bairro}`)">
            </v-text-field>
        </div>
        <div class="form-corpse">
            <v-row>
                <v-col cols="12" sm="6" md="6">
                    <label>Logradouro</label>
                    <v-text-field solo v-model="dados.logradouro"
                        v-on:change="handleChange('logradouro', `${dados.logradouro}`)"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                    <label>Número</label>
                    <v-text-field solo v-model="dados.numero" v-on:change="handleChange('numero', `${dados.numero}`)">
                    </v-text-field>
                </v-col>
            </v-row>
        </div>
        <div class="form-corpse">
            <v-btn class="register-button" color="teal lighten-1" large block @click="saveData">Cadastrar</v-btn>
        </div>
        <div class="login-option">
            <p>Já possuí conta? <a class="login-link" v-bind:href="'/'">Entrar</a></p>
        </div>
    </div>
</template>
<script>
    import {
        mask
    } from 'vue-the-mask';
    import axios from 'axios';
    export default {
        name: 'Register',
        directives: {
            mask
        },
        data() {
            return {
                dados: {
                    nome: '',
                    email: '',
                    telefone: '',
                    cpf: '',
                    cep: '',
                    cidade: '',
                    bairro: '',
                    logradouro: '',
                    numero: '',
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
            getAddress() {
                axios.get('https://viacep.com.br/ws/' + this.dados.cep + '/json/')
                    .then(resolve => {
                        this.dados.cidade = resolve.data.localidade,
                            this.dados.bairro = resolve.data.bairro,
                            this.dados.logradouro = resolve.data.logradouro + ", " + resolve.data.uf
                    })
            },
            handleChange(name, value) {
                if (name === 'cep') {
                    this.dados = {
                        ...this.dados,
                        [name]: value
                    }
                    this.getAddress()
                }
                console.log(value)
                this.dados = {
                    ...this.dados,
                    [name]: value
                }
            },
            saveData() {
                localStorage.setItem("userData", this.dados.cep)
                this.dados.nome === '' || this.dados.email === '' || this.dados.telefone === '' || this.dados.cpf ===
                    '' || this.dados.cep === '' ?
                    this.$vToastify.error("Todos os campos obrigatorios devem ser preenchidos!", "Atencao!") : window
                    .location.href = '/'
            }
        }
    }
</script>
<style scoped>
    #register-body {
        background-color: white;
        width: 440px;
        height: 820px;
        padding: 30px;
        margin: 0px auto;
    }

    @media only screen and (max-width: 414px) {
        #container {
            flex-direction: row;
            justify-content: center;
            align-items: center
        }

        #register-body {
            background-color: white;
            width: 340px;
            height: 1200px;
            padding: 30px;
        }
    }

    @media only screen and (max-width: 375px) {
        #container {
            flex-direction: row;
            justify-content: center;
            align-items: center
        }

        #register-body {
            background-color: white;
            width: 320px;
            height: 1200px;
            padding: 30px;
        }
    }

    @media only screen and (max-width: 320px) {
        #container {
            flex-direction: row;
            justify-content: center;
            align-items: center
        }

        #register-body {
            background-color: white;
            width: 275px;
            height: 1200px;
            padding: 30px;
        }
    }

    .header {
        color: #26A69A;
    }

    .header-text {
        font-size: 12px
    }

    .required {
        color: #26A69A;
    }

    .form-corpse {
        margin-bottom: -10px;
    }

    .register-button {
        color: white !important;
    }

    .login-option {
        text-align: center;
        margin-top: 20px;
        margin-bottom: 20px;
    }

    .login-link {
        color: #26A69A;
        text-decoration: none;
    }
</style>