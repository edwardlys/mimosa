<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto+Mono');

html, body {
  font-family: 'Roboto Mono', sans-serif;
}

#app {
  font-family: 'Roboto Mono', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

input {
  border: 0;
  outline: 0;
  background: transparent;
  font-family: 'Roboto Mono', sans-serif;
  font-size: 1rem;
  border-bottom: 1px solid black;
}
</style>
