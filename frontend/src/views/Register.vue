<template>
  
    <div class="register">
      <br />
      <h1 class="text">Register</h1>
      <br />
      <form class="center"  @submit.prevent="register()">
        <div>
          <label class="textInput">Email</label>
          <div>
            <input v-model="email" type="email" class="inputStile" required/>
          </div>
        </div>
        <div>
          <label class="textInput">Password</label>
          <div>
            <input v-model="password" type="password" class="inputStile" required/>
          </div>
        </div>
        <button type="submit" class="allButtons">Register</button>
      </form>
      <h3  class="text" >{{ registerResponse }}</h3>
    </div>
  </template>
  
  <script>
  import { requestOptions, base_url } from "../../requestOptions";
  export default {
    name: "Register",
    data() {
      return {
        email: "",
        password: "",
        registerResponse: "",
      };
    },
    methods: {
      register() {
        let data = {
          email: this.email,
          password: this.password,
        };
        let requestParams = { ...requestOptions };
        requestParams.method = "POST";
        requestParams.body = JSON.stringify(data);
        fetch(base_url + "register", requestParams).then((res) => {
          res.text().then((res) => (this.registerResponse = res));
          this.email = "";
          this.password = "";
        });
      },
    },
  };
  </script>
  
  <style>
.register{
  margin: auto;
  width: 50%;
  padding: 10px;
  text-align: center;
}
.center{
  margin: auto;
  width: 50%;
  padding: 10px;
}

.inputStile{
  padding:5px;
  border-radius:10px;
  width: 100%;
}

.inputStile:hover{
  box-shadow:0 0 4px rgba(0,0,0,0.5);
}

.textInput{
  text-align: right;
  text-size-adjust: 10px ;
  color: black;
  margin: 10px;
  font-family: cursive ;
  font-size: 20px;
}
</style>