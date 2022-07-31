<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
  html, body {
    background-color: rgb(32, 32, 32);
  }

  #app {
    font-family: 'Nunito Sans', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    background-color: rgb(32, 32, 32);
    color: white;
  }

  nav {
    padding: 30px;
  }

  nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  nav a.router-link-exact-active {
    color: #42b983;
  }
</style>
