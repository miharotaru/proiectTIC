<template>
  <div>
    <h1 id="Name">Avaible books for {{ this.$route.query.name }}</h1>
    <button @click="addBook()" v-if="isAuthenticated" class="allButtons">
      Add Book
    </button>
    <div id="libraryContainer">
      <div v-for="book in this.books"   :key="book.id"  class="libraryCard">
        <h3>Title: {{ book.title }}</h3>
        <h3>Author: {{ book.author }}</h3>
        <h3>Category: {{ book.category }}</h3>
        <h3>Year: {{ book.year }}</h3>
        <div>
          <button
            v-if="isAuthenticated"
            @click="editBook(book)"
            class="allButtons"
          >
            Edit
          </button>
          <button
            v-if="isAuthenticated"
            @click="deleteBook(book)"
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
    name: "Books",
    components: {},
    data() {
      return { books: [] };
    },
    created() {
      if (!this.books.length) {
        fetch(
          base_url + "libraries/books/" + this.$route.query.id,
          requestOptions
        ).then((res) =>
          res.json().then((res) => {
            this.books = [...res];
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
      deleteBook(book) {
        this.books.splice(this.books.indexOf(book), 1);
        let requestParams = { ...requestOptions };
        requestParams.headers.Authorization =
          "Bearer " + window.localStorage.getItem("JWTtoken");
        requestParams.method = "DELETE";
        fetch(
          base_url + "libraries/books/" + this.$route.query.id + "/" + book.id,
          requestParams
        );
      },
      editBook(book) {
        let info = { ...this.$route.query };
        info.bookId = book.id;
        info.bookTitle = book.title;
        info.bookAuthor = book.author;
        info.bookCategory = book.category;
        info.bookYear = book.year;
  
        this.$router.push({ path: "/editBook", query: info });
      },
      addBook() {
        this.$router.push({
          path: "/addBook",
          query: { ...this.$route.query },
        });
      },
    },
  };
  </script>
  
  <style>
   #Name {
    display: flex;
    justify-content: center;
    height: 100px;
  }
  </style>