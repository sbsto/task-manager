<template>
  <div id="app">
    <Nav />
    <div class="main-content">
      <router-view></router-view>
    </div>
    <Footer />
  </div>
</template>

<script>
import Nav from "./components/Nav";
import Footer from "./components/Footer";

export default {
  name: "App",
  components: {
    Nav,
    Footer
  },
  created() {
    this.$http.interceptors.response.use(undefined, function(e) {
      return new Promise(function() {
        if (e.status === 401 && e.config && !e.config.__isRetryRequest) {
          this.$store.dispatch("login/logout");
        }
        throw e;
      });
    });
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333333;
  display: flex;
  flex-direction: column;
  text-align: center;
}
.main-content {
  min-height: calc(100vh - 175px);
  margin: auto;
}
</style>
