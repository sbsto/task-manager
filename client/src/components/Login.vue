<template>
  <div class="container">
    <h2 id="title">Log in</h2>
    <form @submit.prevent="login">
      <input class="text-input" placeholder="email" :value="email" @input="updateEmail" />
      <br />
      <input
        class="text-input"
        type="password"
        placeholder="password"
        :value="password"
        @input="updatePassword"
      />
      <br />
      <input
        class="btn"
        :class="buttonStyleLogin"
        type="submit"
        value="login"
        :disabled="buttonStyleLogin === 'btn-inactive'"
      />
    </form>
  </div>
</template>

<script>
export default {
  name: "Login",
  methods: {
    login() {
      this.$store
        .dispatch("login/login")
        .then(() => this.$router.push("/tasklist"))
        .catch(e => console.log(e));
    },
    updateEmail(e) {
      this.$store.commit("login/updateEmail", e.target.value);
    },
    updatePassword(e) {
      this.$store.commit("login/updatePassword", e.target.value);
    }
  },
  computed: {
    buttonStyleLogin() {
      return this.$store.getters["login/buttonStyleLogin"];
    },
    email() {
      return this.$store.state.login.email;
    },
    password() {
      return this.$store.state.login.password;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  width: 300px;
}

.text-input {
  /*
  border: none;
  padding-top: 20px;
  padding-bottom: 20px;
  display: flex;
  width: 100%;*/
  padding: 15px;
  border-bottom: 0.5px solid #bebebe;
}

.text-input:focus {
  outline: none;
}

.btn {
  font-size: 16px;
  margin: 15px;
  padding: 8px;
  border: 0px;
  border-radius: 2px;
  color: white;
  text-align: center;
  cursor: default;
}
.btn-active {
  background-color: #333333;
  cursor: pointer;
}
.btn-inactive {
  background-color: #c4c4c4;
}
#title {
  text-align: left;
}
</style>
