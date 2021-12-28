const express = require("express");
const {MongoClient} = require("mongodb");

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

/**
 * Add a user
 */
router.post('/users', async function (req, res) {
    let newAccount = req.body.user
    await addAcount(newAccount)
    res.status(201).send()
})

/**
 * Retrieve one of all users
 */
router.get("/users", function (req, res) {
    const userName = req.query.userName;
    let result
    if (userName === 'all') {
        result = getAllUsers()
    } else {
        result = getUser(userName)
    }
    result.then(function (result) {
        res.send(result);
    });
});
/* -------------------------------- */

let collectionRunes;
let collectionItems;
let collectionHistorique;
let collectionAccounts;

const client = new MongoClient(apiKey, {useUnifiedTopology: true});
client.connect((err) => {
    const db = client.db("dofusBriseur");
    collectionRunes = db.collection("runes");
    collectionItems = db.collection("items");
    collectionHistorique = db.collection("historiqueBrisage");
    collectionAccounts = db.collection("accounts");
});

/* -------------------------------- */

function getAllRunes() {
    return collectionRunes.find({}, {projection: {_id: 0}}).toArray();
}

function updateRune(runeData) {
    runeData = runeData.text;
    const caracName = runeData.carac;
    const newPrix = runeData.prix;
    collectionRunes.updateOne({carac: caracName}, {$set: {prix: newPrix}});
}

function getAllItems() {
    return collectionItems.find({}, {projection: {_id: 0}}).toArray();
}

function setCoef(item) {
    item = item.itemEtCoef;
    collectionItems.updateOne({nom: item.nom}, {$set: {coef: item.coef}});
}

function getHistorique() {
    return collectionHistorique.find({}, {projection: {_id: 0}}).toArray();
}

function addHistorique(historique) {
    collectionHistorique.insertOne(historique.historique);
}

/**
 * Add a user
 * @param newAccount the user
 * @returns {Promise<void>} inserting user
 */
async function addAcount(newAccount) {
    const user = await collectionAccounts.findOne({nom: newAccount.nom})
    if(user !== null) {
        await collectionAccounts.findOneAndUpdate(
            {nom: newAccount.nom},
            {$set: {password: newAccount.password}},
        );
    }
    else {
        await collectionAccounts.insertOne(newAccount)
    }

}

/**
 * Get a user
 * @param userName the username
 * @returns {Promise<*>} the user object
 */
async function getUser(userName) {
    return collectionAccounts.findOne({nom: userName})
}

/**
 * Retrieves all users
 * @returns {Promise<*>} all users
 */
async function getAllUsers() {
    return collectionAccounts.find({}).toArray()
}

module.exports = router;
