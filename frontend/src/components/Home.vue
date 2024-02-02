<script setup></script>

<template>
  <div>
    <h1 id="title">Available libraries</h1>
    <div id="libraryContainer">
      <div v-for="(library, i) in libraries" :key="i" class="libraryCard">
        <h3>Name: {{ library.name }}</h3>
        <h3>City: {{ library.city }}</h3>
        <h3>County: {{ library.county }}</h3>
        <div>
          <button @click="showLibrary(library)" class="allButtons">
            Show Books
          </button>
          <button
            v-if="isAuthenticated"
            @click="editLibrary(library)"
            class="allButtons"
          >
            Edit
          </button>
          <button
            v-if="isAuthenticated"
            @click="deleteLibrary(library)"
            class="allButtons"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { requestOptions, base_url } from "../../requestOptions";
export default {
  data() {
    return { libraries: [] };
  },
  created() {
    if (!this.libraries.length) {
      fetch(base_url + "libraries", requestOptions).then((res) =>
        res.json().then((res) => {
          this.libraries = [...res];
        })
      );
    }
  },
  computed: {
    isAuthenticated() {
      return this.$store.state.isAuthenticated;
    },
  },
  methods: {
    deleteLibrary(library) {
      let requestParams = { ...requestOptions };
      requestParams.headers.Authorization =
        "Bearer " + window.localStorage.getItem("JWTtoken");
      requestParams.method = "DELETE";
      fetch(base_url + "libraries/" + library.id, requestParams);
      this.libraries.splice(this.libraries.indexOf(library), 1);
    },
    editLibrary(library) {
      this.$router.push({ path: "/editLibrary", query: library });
    },
    showLibrary(library) {
      this.$router.push({ path: "/books", query: library });
    },
  },
};
</script>

<style>
 /* #title {
  display: flex;
  justify-content: center;
  height: 20px;
} */
#libraryContainer {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: 100vh;
}
.libraryCard {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 3px solid black;
  border-radius: 5px;
  flex: 1;
  min-width: 200px; 
  margin: 3px;
  color: black;
  height: max-content;
  padding: 3px;
  background-color: rgb(232, 200, 114);
}

.allButtons {
  background-color: rgb(21, 156, 174);
  color: whitesmoke;
  border-radius: 5px;
  border: 2px solid rgb(115, 37, 65);
  height: 30px;
  margin: 3px;
  margin-top: 10px;
} 

</style>