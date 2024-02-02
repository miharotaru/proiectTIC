<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div  class="boxApp">
    <nav id="navbar">
      <div>
        <div id="navContainer">
          <RouterLink v-if="!isAuthenticated" to="/login" class="navButton"
            >Login</RouterLink
          >
          <RouterLink v-if="!isAuthenticated" to="/register" class="navButton"
            >Register</RouterLink
          >
          <RouterLink to="/" class="navButton">Libraries</RouterLink>
          <RouterLink to="/addLibrary" v-if="isAuthenticated" class="navButton"
            >Add Library</RouterLink
          >
          <button v-if="isAuthenticated" @click="logout()" id="logoutBtn">
            Logout
          </button>
        </div>
      </div>
    </nav>

    <RouterView />
  </div>
</template>

<script>
export default {
  computed: {
    isAuthenticated() {
      return this.$store.state.isAuthenticated;
    },
  },
  methods: {
    logout() {
      this.$store.commit("SET_AUTH", false);
      window.localStorage.removeItem("JWTtoken");
      this.$router.push("/");
    },
  },
};
</script>

<style>

.boxApp{
  height: 100vh;
  width: 80vw;
}

#navbar {
  position: fixed;
  top: 5px;
  width: 80vw;
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 40px;
  background-color: rgb(124, 147, 195);
  border-radius: 5px;
}

body,
html {
  margin: 0;
  padding: 0;
  background-color: rgb(201, 215, 221);
}

.navButton {
  width: max-content;
  text-decoration: none;
  color: whitesmoke;
  margin: 2px;
  padding: 5px;
  border: 2px solid rgb(115, 37, 65);
  border-radius: 5px;
  text-align: center;
  background-color: rgb(162, 87, 114);
}
#logoutBtn {
  background-color: rgb(21, 156, 174);
  color: whitesmoke;
  border-radius: 5px;
  border: 2px solid rgb(115, 37, 65);
  margin: 2px;
  padding: 5px;
}

#navContainer {
  display: flex;
  flex-direction: row;
  justify-items: center;
}
</style>