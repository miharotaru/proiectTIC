<template>
  <div  class="register">
    <br />
    <h1  class="text">Sign in</h1>
    <br />
    <form class="center" @submit.prevent="login()">
      <div>
        <label class="textInput">Email</label>
        <div>
          <input v-model="email" type="email" class="inputStile"  required/>
        </div>
      </div>
      <div>
        <label class="textInput">Password</label>
        <div>
          <input v-model="password" type="password" class="inputStile"  required/>
        </div>
      </div>
      <button type="submit" class="allButtons">Sign in</button>
    </form>
  </div>
</template>
  
  <script>
import { requestOptions, base_url } from "../../requestOptions";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      let data = {
        email: this.email,
        password: this.password,
      };
      let requestParams = { ...requestOptions };
      requestParams.method = "POST";
      requestParams.body = JSON.stringify(data);
      fetch(base_url + "login", requestParams).then((res) => {
        res.json().then((res) => {
          if (res.token) {
            localStorage.setItem("JWTtoken", res.token);
            this.$store.dispatch("login", true);
          }
          this.$router.push("/");
        });
      });
    },
  },
};
</script>
  
  <style>
  .text{
    color: black;
  }
</style>