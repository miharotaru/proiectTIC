const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 12;
const jwt = require("jsonwebtoken");
const logger = require("morgan"); //importing a HTTP logger ->morgan un logger => mi le arata in terminalul server-ului
const db = require("./db");
const secret = "pixelfericit";

const libraryRouter = require("../backend/routes/library");
const bookRouter = require("../backend/routes/book");

const { generateBooks, generateLibraries } = require("../backend/generator");

app.use(express.urlencoded({ extended: false }));  //conversia datelor din formular în JSON
app.use(express.json());    //use middleware si transforma body-ul in json
app.use(cors());
app.use(logger("dev")); //using the HTTP logger library

app.use("/", libraryRouter);
app.use("/", bookRouter);


app.use((error, req, res, next) => { 
  console.error(`[ERROR]: ${error}`);
  res.status(500).json(error);
});

//register user
app.post("/register", async (req, res) => {
  let data = req.body;
  let reqEmail = false;
  const userRef = db.collection("users");
  const snapshot = await userRef.where("email", "==", data.email).get();
  if (!snapshot.empty) {
    reqEmail = true;
  }

  if (reqEmail) {
    res.send("User already exists");
  } else {
    bcrypt.hash(data.password, saltRounds).then(async function (hash) {
      data.password = hash;
      const user = await db.collection("users").add(data);
      res.send("You are now registered");
    });
  }
});

//login user
app.post("/login", async (req, res) => {
  let data = req.body;
  const usersRef = db.collection("users");
  const snapshot = await usersRef.where("email", "==", data.email).get();
  if (snapshot.empty) {
    let response = {};
    response.message = "No matching documents.Email not found";
    res.json(response);
  } else {
    snapshot.forEach((doc) => {
      bcrypt
        .compare(data.password, doc.data().password)
        .then(async function (result) {
          if (result) {
            let token = jwt.sign(
              {
                email: doc.data().email,
              },
              secret,
              { expiresIn: "7 days" }
            );
            let response = {};
            response.token = token;
            response.message = "You are now logged in";
            res.json(response);
          } else {
            let response = {};
            response.message = "Invalid password :(";
            res.json(response);
          }
        });
    });
  }
});

//populate db libraries
app.get("/populateLibraries", async (req, res) => {
  let libraryMockList = generateLibraries();
  console.log(libraryMockList)
  libraryMockList.forEach(async (library) => {
    await db.collection("libraries").add(library);
  });

  res.send("S-au populat librariile");
});

//populate db books
app.get("/populateBooks", async (req, res) => {
  let libraries = await db.collection("libraries").get();

  libraries.forEach((library) => {
    let bookList = generateBooks();
    console.log(bookList)
    bookList.forEach(async (book) => {
      await db
        .collection("libraries")
        .doc(library.id)
        .collection("books")
        .add(book);
    });
  });
  res.send("S-au adaugat carti in librarii");
});


//pornim aplicatia
app.listen(port, () => {
  console.log(`Backend listening on port ${port}!`);
});