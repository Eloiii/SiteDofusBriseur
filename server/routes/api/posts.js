const express = require("express");
const { MongoClient } = require("mongodb");

const router = express.Router();

// Get Posts
router.get("/", async (req, res) => {
  let runes = getAllRunes();
  runes.then(function (result) {
    res.send(result);
  });
});

router.post("/", async (req, res) => {
  let rune = req.body;
  updateRune(rune);
  res.status(201).send();
});
/* -------------------------------- */

let collectionRunes;

const uri =
  "mongodb+srv://me:c8qqvgK3md@cluster0.cwwme.mongodb.net/dofusBriseur?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useUnifiedTopology: true });
client.connect((err) => {
  const db = client.db("dofusBriseur");
  collectionRunes = db.collection("runes");
});

/* -------------------------------- */

function getAllRunes() {
  return collectionRunes.find({}, { projection: { _id: 0 } }).toArray();
}

function addRune(item) {
  collectionRunes.insertOne(item);
}

function updateRune(runeData) {
  runeData = runeData.text;
  const caracName = runeData.carac;
  const newPrix = runeData.prix;
  collectionRunes.updateOne({ carac: caracName }, { $set: { prix: newPrix } });
}

module.exports = router;
