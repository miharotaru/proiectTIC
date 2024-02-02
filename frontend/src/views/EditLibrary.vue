<template>
    <form @submit.prevent="editLibrary()">
      <br/>
      <div>
      <label class="textAddEditStyle"> Name </label>
      <div>
        <input v-model="name" type="text" required />
      </div>
    </div> 
    <div>
      <label class="textAddEditStyle"> City </label>
      <div>
        <input v-model="city" type="text" required />
      </div>
    </div>
    <div>
      <label class="textAddEditStyle"> County </label>
      <div>
        <input v-model="county" type="text" required />
      </div>
      <br/>
    </div>
      <button type="submit" class="allButtons" >Save Changes</button>
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
  
  <style>

input{
  padding:5px;
  border-radius:10px;
  width: 50%;
}

.textAddEditStyle{
  font-family: cursive ;
  font-size: 15px;
  color: black;

}
</style>