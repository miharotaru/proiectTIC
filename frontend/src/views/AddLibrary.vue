<template>
  <form @submit.prevent="addLibrary()">
    <br/>
    <div>
      <label class="textAddEditStyle"> Name </label>
      <div>
        <input v-model="name" type="text"  required />
      </div>
    </div>
    
    <div>
      <label class="textAddEditStyle"> City </label>
      <div>
        <input v-model="city" type="text"  required />
      </div>
    </div>

    <div>
      <label class="textAddEditStyle"> County </label>
      <div>
        <input v-model="county" type="text"  required />
      </div>
    </div>
    <br/>

    <button type="submit" class="allButtons">Add Library</button>
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