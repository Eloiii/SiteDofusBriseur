const express = require("express");
const { MongoClient } = require("mongodb");

const router = express.Router();
const {apiKey} = require('../../../secret.json')
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

router.get("/coef", async (req, res) => {
  let items = getAllItems();
  items.then(function (result) {
    res.send(result);
  });
});

router.post("/coef", async (req, res) => {
  let itemEtCoeff = req.body;
  setCoef(itemEtCoeff);
  res.status(201).send();
});

router.get("/historique", async (req, res) => {
  let historique = getHistorique();
  historique.then(function (result) {
    res.send(result);
  });
});

router.post("/historique", async (req, res) => {
  let historique = req.body;
  addHistorique(historique);
  res.status(201).send();
});

router.post("/historique", async (req, res) => {
  // let itemEtCoeff = req.body;
  // setCoef(itemEtCoeff);
  // res.status(201).send();
});
/* -------------------------------- */

let collectionRunes;
let collectionItems;
let collectionHistorique;

const uri = apiKey
const client = new MongoClient(uri, { useUnifiedTopology: true });
client.connect((err) => {
  const db = client.db("dofusBriseur");
  collectionRunes = db.collection("runes");
  collectionItems = db.collection("items");
  collectionHistorique = db.collection("historiqueBrisage");
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

function getAllItems() {
  return collectionItems.find({}, { projection: { _id: 0 } }).toArray();
}

function setCoef(item) {
  item = item.itemEtCoef;
  collectionItems.updateOne({ nom: item.nom }, { $set: { coef: item.coef } });
}

function getHistorique() {
  return collectionHistorique.find({}, { projection: { _id: 0 } }).toArray();
}

function addHistorique(historique) {
  collectionHistorique.insertOne(historique.historique);
}

module.exports = router;
