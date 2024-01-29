const {
    initializeApp,
    applicationDefault,
    cert,
  } = require("firebase-admin/app");
  const {
    getFirestore,
    Timestamp,
    FieldValue,
  } = require("firebase-admin/firestore");
  //de aici fac un fel de import din key fire
  const serviceAccount = require("../backend/key.json");
  
  initializeApp({
    credential: cert(serviceAccount),
  });
  
  const db = getFirestore();
 // db.settings({ ignoreUndefinedProperties: true })
  module.exports = db;
  

  //imi da firestore