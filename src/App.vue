<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <!-- <HelloWorld msg="Timesheet Application"/> -->

    <!-- <router-link to="/">Home</router-link>
    <router-link to="/app">App</router-link> -->
    <router-view></router-view>
  </div>
</template>

<script>
import Timesheet from './components/Timesheet.vue'

export default {
  name: 'app',
  components: {
    Timesheet
  },

  methods: {
    logOut: function() {
      localStorage.clear();
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}

html {
  scroll-behavior: smooth;
}
</style>
