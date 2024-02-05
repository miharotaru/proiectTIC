const router = require("express").Router();
const { Router } = require("express");
const jwt = require("jsonwebtoken");
const db = require("../db");
const secret = "pixelfericit";


// MIDDLEWARE
// checks if the request token exists and has a proper structure
checkAuthorization = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    // invokes the 'verifyToken' middleware
    jwt.verify(req.token, secret, (err, decoded) => {
      if (err) {
        if (err.expiredAt) {
          res.json("Your token has expired. Please re-authenticate");
        } else {
          res.json("You are NOT authorized to access this resource");
        }
      } else {
        next();
      }
    });
  } else {
    res.sendStatus(401);
  }
};

//POST book to a library
router.post("/libraries/books/:id",
  checkAuthorization, 
  async (req, res) => {
  let book = {
    title: req.body.title,
    author: req.body.author,
    category: req.body.category,
    year:req.body.year
  };

  let response = await db
    .collection("libraries")
    .doc(req.params.id)
    .collection("books")
    .add(book);

  res.json(response);
});

//GET all books of a library
router.get("/libraries/books/:id", async (req, res) => {
  const response = await db
    .collection("libraries")
    .doc(req.params.id)
    .collection("books")
    .get();
  let books = [];
  response.forEach((doc) => {
    let book = {
      id: doc.id,
      title: doc.data().title,
      author: doc.data().author,
      category: doc.data().category,
      year: doc.data().year,
    };
    books.push(book);
  });

  res.json(books);
});

//PUT book
router.put(
  "/libraries/books/:id/:bookId",
  checkAuthorization,
  async (req, res) => {
    let book = {
      title: req.body.title,
      author: req.body.author,
      category: req.body.category,
      year: req.body.year,
    };

    let response = await db
      .collection("libraries")
      .doc(req.params.id)
      .collection("books")
      .doc(req.params.bookId)
      .update(book);

    res.json(response);
  }
);

//DELETE book
router.delete(
  "/libraries/books/:id/:bookId",
  checkAuthorization,
  async (req, res) => {
    let response = await db
      .collection("libraries")
      .doc(req.params.id)
      .collection("books")
      .doc(req.params.bookId)
      .delete();

    res.json("Delete succesfull");
  }
);

module.exports = router;