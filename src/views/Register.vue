<template>
    <v-main>
        <v-container id="container" :class="`rounded-lg`">
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
                        <v-text-field solo v-model="dados.cidade"
                            v-on:change="handleChange('cidade', `${dados.cidade}`)"></v-text-field>
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
                        <v-text-field solo v-model="dados.numero"
                            v-on:change="handleChange('numero', `${dados.numero}`)"></v-text-field>
                    </v-col>
                </v-row>
            </div>
            <div class="form-corpse">
                <v-btn color="teal lighten-1" style="color: white" large block v-on:click="saveData">Cadastrar</v-btn>
            </div>
            <div class="form-corpse" style="text-align: center; margin-top: 20px; margin-bottom: 20px;">
                <p>Já possuí conta? <a style="color: #26A69A; text-decoration: none;" v-bind:href="'/'">Entrar</a></p>
            </div>
        </v-container>
        <v-container id="text">
            <p>
                Os Cookies são utilizados para facilitar a navegação e torná-la mais simples e não danificam o seu
                dispositivo.
                Permitem uma navegação mais rápida e eficiente, eliminando a necessidade de introduzir repetimante as
                mesmas informações.
            </p>
        </v-container>
    </v-main>
</template>
<script>
    import { mask } from 'vue-the-mask';
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
                this.dados.nome === '' || this.dados.email === '' || this.dados.telefone === '' || this.dados.cpf === '' || this.dados.cep === '' ?
                this.$vToastify.error("Todos os campos obrigatorios devem ser preenchidos", "Atencao!") : window.location.href = '/'
            }
        }
    }
</script>
<style scoped>
    #container {
        background-color: white;
        width: 440px;
        height: 820px;
        padding: 30px
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

    #text {
        width: 440px;
        color: white;
        font-size: 12px;
        margin-bottom: -20px;
        padding: 5px
    }
</style>