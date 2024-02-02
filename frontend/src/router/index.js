import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import AddLibrary from "../views/AddLibrary.vue";
import AddBook from "../views/AddBook.vue";
import EditLibrary from "../views/EditLibrary.vue";
import EditBook from "../views/EditBook.vue";
import Book from "../views/Books.vue";
import store from "../store";
const router = createRouter({
 history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/register",
      name: "Register",
      component: Register,
    },
    {
      path: "/addBook",
      name: "AddBook",
      component: AddBook,
    },
    {
      path: "/addLibrary",
      name: "AddLibrary",
      component: AddLibrary,
    },
    {
      path: "/editBook",
      name: "EditBook",
      component: EditBook,
    },
    {
      path: "/editLibrary",
      name: "EditLibrary",
      component: EditLibrary,
    },
    {
      path: "/books",
      name: "Books",
      component: Book,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (
    to.name === "Home" ||
    to.name === "Books" ||
    to.name === "Login" ||
    to.name === "Register"
  ) {
    next();
  } else if (to.name !== "Login" && !store.state.isAuthenticated) {
    next({ name: "Login" });
  } else {
    next();
  }
});
export default router;