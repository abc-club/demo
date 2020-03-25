<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Animation</router-link> | <router-link to="/about">About</router-link> | <router-link to="/home">Home</router-link> |
      <router-link to="/Directive">Directive</router-link> | <router-link to="/post2/1">Post2</router-link> |
      <router-link to="/vuex">vuex</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
