<template id="app">
  <Routes/>
</template>

<script>
import Routes from "@/components/Routes";

export default {
  name: 'App',
  components: {
    Routes: Routes
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
