<template>
  <div>
    <nav class="navbar">
      <router-link
        v-for="route in links"
        :key="route.id"
        :to="route.page"
        class="links"
        @click.native="changeActiveRoute()"
        :class="{'links-selected': route.page === activeRoute }"
      >
        <div v-if="!route.requiresAuth && !isLoggedIn">{{route.text}}</div>
      </router-link>
      <a v-if="isLoggedIn" @click="logout" class="logout-btn">logout</a>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      links: [
        { id: 0, text: "signup", page: "/", requiresAuth: false },
        { id: 1, text: "login", page: "/login", requiresAuth: false },
        { id: 2, text: "tasks", page: "/tasklist", requiresAuth: true }
      ],
      activeRoute: this.$router.currentRoute.path
    };
  },
  methods: {
    changeActiveRoute() {
      return (this.activeRoute = this.$router.currentRoute.path);
    },
    logout() {
      this.$store
        .dispatch("login/logout")
        .then(() => {
          this.$router.push("/login");
        })
        .catch(e => console.log(e));
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters["login/isLoggedIn"];
    }
  },
  watch: {
    $route() {
      this.changeActiveRoute();
    }
  }
};
</script>

<style>
.navbar {
  margin-top: 40px;
  margin-bottom: 20px;
  margin-left: auto;
  margin-right: auto;
  text-align: left;
  width: 300px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.links {
  margin-right: 20px;
  color: #aaaaaa;
  text-decoration: none;
  font-size: 18px;
}

.links-selected {
  color: #333333;
  font-weight: bold;
}

.logout-btn {
  padding: 8px;
  cursor: pointer;
  background-color: #333333;
  border-radius: 2px;
  color: white;
}
</style>