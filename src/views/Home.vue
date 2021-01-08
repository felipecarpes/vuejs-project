<template>
    <div>
        <v-container fluid>
            <v-row>
                <v-spacer></v-spacer>
                <v-col cols="1">
                    <v-card-text style="height: 100px; position: relative">
                        <v-fab-transition>
                            <v-btn class="out-button" @click="logout" v-show="!hidden" color="white"  absolute top right>
                                Sair
                                <v-icon style="margin-left: 5px">mdi-logout</v-icon>
                            </v-btn>
                        </v-fab-transition>
                    </v-card-text>
                </v-col>
            </v-row>
        </v-container>
        <div id="home-body" :class="`rounded-lg`">
            <v-img class="home-img"
                src="https://blog.bitcointrade.com.br/wp-content/uploads/2018/06/surpreendase-com-a-origem-do-bitcoin-a-moeda-virtual.jpeg">
            </v-img>
            <div class="content-body">
                <div class=first-text>
                    <p>A origem do Bitcoin é tão interessante quanto a sua evolução no mercado. Criada há quase uma
                        década, a moeda virtual alcançou patamares históricos de cotações, atraindo ainda mais
                        visibilidade para a economia digital e transformando a criptomoeda em <b>um dos investimentos
                            mais atrativos do momento.</b></p>
                </div>
                <div class="price-card">
                    <h3>Bitcoin Price Index</h3>
                    <p>
                        United States Dollar: ${{ dados.dollar }}<br />
                        British Pound Sterling: £{{ dados.britishEuro }} <br />
                        Euro: €{{ dados.euro }}
                    </p>
                </div>
                <div class="last-text">
                    <p>O grande mistério do Bitcoin ainda não foi revelado. Afinal, quem inventou a criptomoeda? Existem
                        várias versões, mas nenhuma conclusiva até o momento. O que se sabe é que o fundador usa o
                        pseudônimo Satoshi Nakamoto</p>
                </div>
            </div>
        </div>
        <v-container fluid>
            <v-row>
                <v-spacer></v-spacer>
                <v-col cols="1">
                    <v-card-text style="height: 100px; position: relative">
                        <v-fab-transition>
                            <v-btn color="white" dark absolute top right fab x-large style="text-align: center; color: black; justify-content: center">
                                <v-img src="https://assets.izap.com.br/clarearacessorios.com.br/uploads/img5b9aaaebbf94f.png" style="width: 35px; height: 65px;"></v-img>
                            </v-btn>
                        </v-fab-transition>
                    </v-card-text>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: 'Home',
        data() {
            return {
                dados: {
                    dollar: '',
                    britishEuro: '',
                    euro: ''
                },
            }
        },
        methods: {
            loading() {
                axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')
                    .then(resolve => {
                        this.dados.dollar = parseFloat(resolve.data.bpi.USD.rate_float).toFixed(2)
                        this.dados.euro = parseFloat(resolve.data.bpi.EUR.rate_float).toFixed(2)
                        this.dados.britishEuro = parseFloat(resolve.data.bpi.GBP.rate_float).toFixed(2)
                    })
                    .catch(error => console.log(error))
            },
            logout() {
                sessionStorage.removeItem("token");
                window.location.href = "/"
            }
        },
        mounted() {
            this.$auth.authLogin()
            this.loading()
        }
    }
</script>
<style scoped>
    .out-button {
        align-self: flex-end;
    }

    #home-body {
        background-color: white !important;
        width: 440px;
        height: 720px;
        padding: 30px;
        margin: 0px auto;
    }

    @media only screen and (max-width: 414px) {
        #container {
            flex-direction: row;
            justify-content: center;
            align-items: center
        }

        .out-button {
            margin-bottom: 30px
        }

        #home-body {
            background-color: white;
            width: 340px;
            height: 700px;
            padding: 5px;
        }

        .text-justify {
            color: white;
            font-size: 12px;
            padding: 10px 20px 20px 20px;
        }
    }

    @media only screen and (max-width: 375px) {
        #container {
            flex-direction: row;
            justify-content: center;
            align-items: center
        }

        .out-button {
            margin-bottom: 30px
        }

        #home-body {
            background-color: white;
            width: 320px;
            height: 750px;
            padding: 5px;
        }

        .text-justify {
            color: white;
            font-size: 12px;
            padding: 10px 20px 20px 20px;
        }
    }

    @media only screen and (max-width: 320px) {
        #container {
            flex-direction: row;
            justify-content: center;
            align-items: center
        }

        .out-button {
            margin-bottom: 30px
        }

        #home-body {
            background-color: white !important;
            width: 275px;
            height: 800px;
            padding: 5px;
        }

        .price-card {
            height: 170px;
            background-color: #26A69A;
            color: white;
            border-radius: 5px;
            padding: 25px;
        }
    }

    .home-img {
        width: 440px;
        height: 150px;
        margin: 0px auto;
        padding: 0px auto;
    }

    .content-body {
        padding: 20px
    }

    .first-text {
        margin-top: 20px;
    }

    .price-card {
        height: 170px;
        background-color: #26A69A;
        color: white;
        border-radius: 5px;
        padding: 25px;
    }

    .price-card h3 {
        margin-bottom: 10px;
    }

    .price-card p {
        font-size: 13px;
    }

    p {
        font-size: 14px;
    }

    .last-text {
        margin-top: 20px;
    }
</style>