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
/* -------------------------------- */

let collectionRunes;
let collectionItems;

const uri =
  "mongodb+srv://me:c8qqvgK3md@cluster0.cwwme.mongodb.net/dofusBriseur?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useUnifiedTopology: true });
client.connect((err) => {
  const db = client.db("dofusBriseur");
  collectionRunes = db.collection("runes");
  collectionItems = db.collection("items");
});

/* -------------------------------- */

// function oui() {
//   let runes = getAllRunes();
//   runes.then(function (result) {
//     for (const rune of result) {
//       if (rune.carac === "Vitalité") {
//         oiuoi(rune.carac, 0.2, 1);
//       } else if (rune.carac === "Initiative") {
//         oiuoi(rune.carac, 0.1, 1);
//       } else if (rune.carac === "PA") {
//         oiuoi(rune.carac, 100, 100);
//       } else if (rune.carac === "Force") {
//         oiuoi(rune.carac, 1, 1);
//       } else if (rune.carac === "Sagesse") {
//         oiuoi(rune.carac, 3, 3);
//       } else if (rune.carac === "Chance") {
//         oiuoi(rune.carac, 1, 1);
//       } else if (rune.carac === "Agilité") {
//         oiuoi(rune.carac, 1, 1);
//       } else if (rune.carac === "Intelligence") {
//         oiuoi(rune.carac, 1, 1);
//       } else if (rune.carac === "Dommages") {
//         oiuoi(rune.carac, 20, 20);
//       } else if (rune.carac === "Dommages Critiques") {
//         oiuoi(rune.carac, 5, 5);
//       } else if (rune.carac === "Portée") {
//         oiuoi(rune.carac, 51, 51);
//       } else if (rune.carac === "PM") {
//         oiuoi(rune.carac, 90, 90);
//       } else if (rune.carac === "Puissance") {
//         oiuoi(rune.carac, 2, 2);
//       } else if (rune.carac === "Invocations") {
//         oiuoi(rune.carac, 30, 30);
//       } else if (rune.carac === "Esquive PA") {
//         oiuoi(rune.carac, 7, 7);
//       } else if (rune.carac === "Esquive PM") {
//         oiuoi(rune.carac, 7, 7);
//       } else if (rune.carac === "Resistance % Terre") {
//         oiuoi(rune.carac, 6, 6);
//       } else if (rune.carac === "Resistance % Feu") {
//         oiuoi(rune.carac, 6, 6);
//       } else if (rune.carac === "Resistance % Eau") {
//         oiuoi(rune.carac, 6, 6);
//       } else if (rune.carac === "Resistance % Neutre") {
//         oiuoi(rune.carac, 6, 6);
//       } else if (rune.carac === "Pods") {
//         oiuoi(rune.carac, 0.25, 2.5);
//       } else if (rune.carac === "Prospection") {
//         oiuoi(rune.carac, 3, 3);
//       } else if (rune.carac === "Soins") {
//         oiuoi(rune.carac, 10, 10);
//       } else if (rune.carac === "Renvoi") {
//         oiuoi(rune.carac, 10, 10);
//       } else if (rune.carac === "Résistance Terre") {
//         oiuoi(rune.carac, 2, 2);
//       } else if (rune.carac === "Résistance Feu") {
//         oiuoi(rune.carac, 2, 2);
//       } else if (rune.carac === "Résistance Eau") {
//         oiuoi(rune.carac, 2, 2);
//       } else if (rune.carac === "Résistance Air") {
//         oiuoi(rune.carac, 2, 2);
//       } else if (rune.carac === "Résistance Neuutre") {
//         oiuoi(rune.carac, 2, 2);
//       } else if (rune.carac === "Dommages pièges") {
//         oiuoi(rune.carac, 5, 5);
//       } else if (rune.carac === "Fuite") {
//         oiuoi(rune.carac, 4, 4);
//       } else if (rune.carac === "Tacle") {
//         oiuoi(rune.carac, 4, 4);
//       } else if (rune.carac === "Retrait PA") {
//         oiuoi(rune.carac, 7, 7);
//       } else if (rune.carac === "Retrait PM") {
//         oiuoi(rune.carac, 7, 7);
//       } else if (rune.carac === "Dommages poussée") {
//         oiuoi(rune.carac, 5, 5);
//       } else if (rune.carac === "Resistance Poussée") {
//         oiuoi(rune.carac, 2, 2);
//       } else if (rune.carac === "Dommages Terre") {
//         oiuoi(rune.carac, 5, 5);
//       } else if (rune.carac === "Dommages Eau") {
//         oiuoi(rune.carac, 5, 5);
//       } else if (rune.carac === "Dommages Air") {
//         oiuoi(rune.carac, 5, 5);
//       } else if (rune.carac === "Dommages Neutre") {
//         oiuoi(rune.carac, 5, 5);
//       } else if (rune.carac === "Dommages Feu") {
//         oiuoi(rune.carac, 5, 5);
//       } else if (rune.carac === "Dommages mêlée") {
//         oiuoi(rune.carac, 15, 15);
//       } else if (rune.carac === "Dommages distance") {
//         oiuoi(rune.carac, 15, 15);
//       } else if (rune.carac === "Dommages sort") {
//         oiuoi(rune.carac, 15, 15);
//       } else if (rune.carac === "% Critique") {
//         oiuoi(rune.carac, 10, 10);
//       }
//     }
//   });
// }

// function oiuoi(name, poidsUnite, poidsRune) {
//   collectionRunes.updateOne(
//     { carac: name },
//     { $set: { poidsUnité: poidsUnite, poidsRune: poidsRune } }
//   );
// }
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

module.exports = router;
