const router = require("express").Router();
const { Router } = require("express");
const jwt = require("jsonwebtoken");
const db = require("../db");
const secret = "pixelfericit";

checkAuthorization = (req, res, next) => {
  const bearerHeader = req.headers["authorization"]; //treaba cu jwt 

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    jwt.verify(req.token, secret, (err, decoded) => {
      if (err) {
        if (err.expiredAt) {
          res.json("Expired token");
        } else {
          res.json("Decoding failed!");
        }
      } else {
        next();
      }
    });
  } else {
    res.json("No token found!");
  }
};

//POST library
router.post("/libraries", checkAuthorization, async (req, res) => {
  let library = {
    name: req.body.name,
    city: req.body.city,
    county: req.body.county,
  };
  let added = await db.collection("libraries").add(library);
  res.json({ id: added.id }); 
});

//GET all libraries
router.get("/libraries", async (req, res) => {
  let libraries = [];
  const result = await db.collection("libraries").get();

  result.forEach((doc) => {
    let library = {
      id: doc.id,
      name: doc.data().name,
      city: doc.data().city,
      county: doc.data().county,
    };
    libraries.push(library);
  });
  res.json(libraries);
});

//GET library by id
router.get("/libraries/:id", async (req, res) => {
  let doc = await db.collection("libraries").doc(req.params.id).get();
  let library = {
    id: doc.id,
    name: doc.data().name,
    city: doc.data().city,
    county: doc.data().county,
  };
  res.json(library);
});

//PUT library
router.put("/libraries/:id", checkAuthorization, async (req, res) => {
  const response = await db
    .collection("libraries")
    .doc(req.params.id)
    .update(req.body);

  res.json("Edit successfull");
});

//DELETE library and asociated books
router.delete("/libraries/:id", checkAuthorization, async (req, res) => {
  const libraries = await db
    .collection("libraries")
    .doc(req.params.id)
    .collection("books")
    .listDocuments()
    .then((x) => {
      x.map((x) => {
        x.delete();
      });
    });
  let response = await db.collection("libraries").doc(req.params.id).delete();
  res.json("Library deleted");
});
module.exports = router;