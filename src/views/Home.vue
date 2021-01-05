<template>
  <v-main>
    <v-container id="container" :class="`rounded-lg`">
      <v-img class="home-img" src="https://blog.bitcointrade.com.br/wp-content/uploads/2018/06/surpreendase-com-a-origem-do-bitcoin-a-moeda-virtual.jpeg"></v-img>
      <div class="content-body">
        <div class=first-text>
          <p>A origem do Bitcoin é tão interessante quanto a sua evolução no mercado. Criada há quase uma década, a moeda virtual alcançou patamares históricos de cotações, atraindo ainda mais visibilidade para a economia digital e transformando a criptomoeda em <b>um dos investimentos mais atrativos do momento.</b></p>
        </div>
        <div class="price-card">
          <h3>Bitcoin Price Index</h3>
          <p>
            United States Dollar: ${{ dados.dollar }}<br/>
            British Pound Sterling: £{{ dados.britishEuro }} <br/>
            Euro: €{{ dados.euro }}
          </p>
        </div>
        <div class="last-text">
          <p>O grande mistério do Bitcoin ainda não foi revelado. Afinal, quem inventou a criptomoeda? Existem várias versões, mas nenhuma conclusiva até o momento. O que se sabe é que o fundador usa o pseudônimo Satoshi Nakamoto</p>
        </div>
      </div>
    </v-container>
    </v-main>
</template>

<script>
  export default {
    name: 'Home',
    data () {
      return {
        dados: {
          dollar: '',
          britishEuro: '',
          euro: ''
        },
      }
    },
    methods: {
      loading: function() {
        fetch("https://api.coindesk.com/v1/bpi/currentprice.json", { method: 'GET' })
        .then(response => response.json().then(result => {
          this.dados.dollar = result.bpi.USD.rate_float,
          this.dados.euro = result.bpi.EUR.rate_float,
          this.dados.britishEuro = result.bpi.GBP.rate_float
        }))
      }
    },
    mounted() {
      this.loading()
    }
  }

</script>
<style scoped>
  #container {
    background-color: white;
    width: 440px;
    height: 700px;
    padding: 0px auto;
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
