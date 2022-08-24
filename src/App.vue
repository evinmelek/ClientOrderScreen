<template>
  <div>
    <client-order-screen></client-order-screen>
  </div>
</template>
<script>
import ClientOrderScreen from './components/ClientOrderScreen.vue'
export default {
  components: {
    ClientOrderScreen
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
} 
</style>
