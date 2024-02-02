<template>
    <form @submit.prevent="addBook()">
      <label> Title </label>
      <input v-model="title" type="text" required />
      <label> Author </label>
      <input v-model="author" type="text" required />
      <label> Year </label>
      <select v-model="year">
        <option
        v-for="(n, i) in Array.from(
          { length: 201 },
          (v, i) => i + (new Date().getFullYear() - 200)
        )"
        :key="i"
        :value="n"
      >
        {{ n }}
      </option>
    </select>
      <label> Category </label>
      <select v-model="category">
  <option v-for="(category, i) in this.categoryList" :key="i" :value="category">
    {{ category }}
  </option>
</select>
      <button type="submit" class="activeButtons">Add Book</button>
    </form>
  </template>
  
  <script>
import { requestOptions, base_url } from "../../requestOptions";
  export default {
    data() {
      return {
        title: "",
        author: "",
        year: "",
        category:"",
        categoryList: [
          "History",
          "Fantasy",
          "Manga",
          "Love story ",
          "Biology",
          "IT",
          "Children",
        ],
      };
    },
    methods: {
      addBook() {
        let requestParams = { ...requestOptions };
        requestParams.headers.Authorization =
          "Bearer " + window.localStorage.getItem("JWTtoken");
        requestParams.method = "POST";
        let book = {
          title: this.title,
          author: this.author,
          category: this.category,
          year: this.year,
        };
  
        requestParams.body = JSON.stringify(book);
        fetch(base_url + "libraries/books/" + this.$route.query.id, requestParams)
          .then((res) => res.json())
          .then((res) => {
            if (res === "Decoding failed!" || res === "Expired token") {
              console.log("Authentification Error");
            } else {
              this.$router.push({
                path: "/books",
                query: { ...this.$route.query },
              });
            }
          });
      },
    },
  };
  </script>
  
  <style></style>