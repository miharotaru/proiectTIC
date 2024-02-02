<template>
    <form @submit.prevent="editLibrary()">
      <label> Name </label>
      <input v-model="name" type="text" required />
      <label> City </label>
      <input v-model="city" type="text" required />
      <label> County </label>
      <input v-model="county" type="text" required />

      <button type="submit">Save Changes</button>
    </form>
  </template>
  
  <script>
 import { requestOptions, base_url } from "../../requestOptions";

  export default {
    data() {
      return {
        name: this.$route.query.name,
        city: this.$route.query.city,
        county: this.$route.query.county,
      };
    },
  
    methods: {
        editLibrary() {
        let requestParams = { ...requestOptions };
        requestParams.headers.Authorization =
          "Bearer " + window.localStorage.getItem("JWTtoken");
        requestParams.method = "PUT";
        let library = {
          name: this.name,
          city: this.city,
          county: this.county,
        };
        requestParams.body = JSON.stringify(library);
        fetch(base_url + "libraries/" + this.$route.query.id, requestParams)
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
            if (res === "Decoding failed!" || res === "Expired token") {
              console.log("Authentification Error");
            } else {
              let libraries = fetch(base_url + "libraries", requestOptions);
              this.$router.push("/");
            }
          });
      },
    },
  };
  </script>
  
  <style></style>