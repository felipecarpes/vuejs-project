<template>
	
		<v-container id="container" :class="`rounded-lg`">
			<div class="form-corpse">
				<label>E-mail <span class="required">*</span></label>
				<v-text-field solo v-model="dados.email" v-on:input="handleChange('email', `${dados.email}`)" :rules="[rules.required, rules.email]"></v-text-field>
			</div>
			<div class="form-corpse" style="margin-bottom: 40px">
				<label>Senha <span class="required">*</span></label>
				<v-text-field type="password" solo v-model="dados.nome" v-on:change="handleChange('nome', `${dados.nome}`)" :rules="[rules.required]" style="margin-bottom: -15px"></v-text-field>
				<span><a style="color: #26A69A">Esqueci minha senha</a></span>
			</div>
			<div class="form-corpse">
				<v-btn color="teal lighten-1" style="color: white" large block v-on:click="saveData">Entrar <v-icon dark right>mdi-login</v-icon></v-btn>
			</div>
			<div class="form-corpse" style="text-align: center; margin-top: 20px;">
				<p>Não tem uma conta? <a style="color: #26A69A">Registre-se</a></p>
			</div>
		</v-container>
	
</template>
<script>
	import { mask } from 'vue-the-mask';
	export default {
		name: 'SignIn',
		directives: { mask },
		data () {
			return {
				dados: {
				nome: '',
				email: '',
			},
			rules: {
				required: value => !!value || 'Obrigatório!',
				counter: value => value.length <= 20 || 'Max 20 characters',
				email: value => {
					const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
					return pattern.test(value) || 'E-mail inválido!'
				}
			}
		}
	},
	methods: {
		getAddress: function() {
			fetch('https://viacep.com.br/ws/'+this.dados.cep+'/json/', { method: 'GET' })
			.then(response => response.json()
			.then(result => {
				this.dados.cidade = result.localidade,
				this.dados.bairro = result.bairro,
				this.dados.logradouro = result.logradouro + ", " + result.uf
			}))
		},
		handleChange: function(name, value) {
			if(name === 'cep') {
				this.dados = {...this.dados, [name]: value}
				this.getAddress()
			}
			this.dados = {...this.dados, [name]: value}
		},
		saveData: function() {
			localStorage.setItem("userData", this.dados.cep)
			return window.location.href = "/about"
		}
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
