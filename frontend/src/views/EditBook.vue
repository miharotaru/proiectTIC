<template>
  <form @submit.prevent="editBook()">
    <label> Title </label>
    <input v-model="title" type="text" required />
    <label> Author </label>
    <input v-model="author" type="text" required />
    <label> Category </label>
    <select v-model="category">
      <!-- Aici aveam eroare si am folosit robotelul -->
      <option
        v-for="(category, i) in this.categoryList"
        :key="i"
        :value="category"
      >
        {{ category }}
      </option>
    </select>
    <label> Year </label>
    <select v-model="year">
      <!-- Aici aveam eroare si am folosit robotelul -->
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
    <button type="submit">Save Changes</button>
  </form>
</template>
  
  <script>
import { requestOptions, base_url } from "../../requestOptions";
export default {
  data() {
    return {
      title: this.$route.query.bookTitle,
      author: this.$route.query.bookAuthor,
      category: this.$route.query.bookCategory,
      year: this.$route.query.bookYear,
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
    editBook() {
      let requestParams = { ...requestOptions };
      requestParams.headers.Authorization =
        "Bearer " + window.localStorage.getItem("JWTtoken");
      requestParams.method = "PUT";
      let book = {
        title: this.title,
        author: this.author,
        category: this.category,
        year: this.year,
      };
      requestParams.body = JSON.stringify(book);
      fetch(
        base_url +
          "libraries/books/" +
          this.$route.query.id +
          "/" +
          this.$route.query.bookId,
        requestParams
      )
        .then((res) => res.json())
        .then((res) => {
          if (res === "Decoding failed!" || res === "Expired token") {
            console.log("Authentification Error");
          } else {
            this.$router.push({
              path: "/books",
              query: {
                id: this.$route.query.id,
                name: this.$route.query.name,
                city: this.$route.query.city,
                county: this.$route.query.county,
              },
            });
          }
        });
    },
  },
};
</script>
  
  <style></style>