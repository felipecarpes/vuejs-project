<template>
    <v-container id="container" :class="`rounded-lg`" style="background-color: white">
        {{ children }}
    </v-container>
</template>

<script>
export default {
    name: 'appBody',
    props: ['children']
}

</script>
<style scoped>
    #container {
        background-color: white;
        width: 440px;
        height: 800px;
        padding: 30px
    }
</style>
