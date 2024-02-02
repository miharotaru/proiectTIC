<template>
    <form @submit.prevent="addLibrary()">
      <label> Name </label>
      <input v-model="name" type="text" required />
      <label> City </label>
      <input v-model="city" type="text" required />
      <label> County </label>
      <input v-model="county" type="text" required />
      <button type="submit" class="activeButtons">Add Library</button>
    </form>
  </template>
  
  <script>
  import { requestOptions, base_url } from "../../requestOptions";
  export default {
    data() {
      return {
        name: "",
        city: "",
        county: "",
      };
    },
    methods: {
      addLibrary() {
        let requestParams = { ...requestOptions };
        requestParams.headers.Authorization =
          "Bearer " + window.localStorage.getItem("JWTtoken");
        requestParams.method = "POST";
        let data = {
          name: this.name,
          city: this.city,
          county: this.county,
        };
  
        requestParams.body = JSON.stringify(data);
        fetch(base_url + "libraries", requestParams)
          .then((res) => res.json())
          .then((res) => {
            if (res === "Decoding failed!" || res === "Expired token") {
              console.log("Authentification Error");
            } else {
              data.id = res.id;
  
              this.$router.push("/");
            }
          });
      },
    },
  };
  </script>
  
  <style></style>