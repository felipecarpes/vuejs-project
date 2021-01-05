<template>
  <v-app>
    <v-main>
      <v-row>
        <v-col>
          <register></register>
          <sign-in></sign-in>
          <home></home>
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
import Register from './views/Register.vue';
import SignIn from './views/SignIn.vue';
import Home from './views/Home.vue';

export default {
  name: 'App',
  components: {
    //Register,
    //SignIn,
    Home
  },

  data: () => ({
    //
  }),
}
</script>
<style scoped>
  #app, main {
    background-color: dimgray;
    align-items: center;
    font-weight: 300;
  }
</style>
