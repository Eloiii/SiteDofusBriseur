const express = require("express");
const { MongoClient } = require("mongodb");

const router = express.Router();

// Get Posts
router.get("/", async (req, res) => {
  let items = getAllItems();
  items.then(function (result) {
    res.send(result);
  });
});

router.post("/", async (req, res) => {
  let item = req.body;
  addItem(item);
  res.status(201).send();
});
/* -------------------------------- */

let collectionItems;

const uri =
  "mongodb+srv://me:c8qqvgK3md@cluster0.cwwme.mongodb.net/dofusBriseur?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useUnifiedTopology: true });
client.connect((err) => {
  const db = client.db("dofusBriseur");
  collectionItems = db.collection("items");
});

/* -------------------------------- */

function getAllItems() {
  return collectionItems.find({}, { projection: { _id: 0 } }).toArray();
}

function addItem(item) {
  collectionItems.insertOne(item);
}

module.exports = router;
