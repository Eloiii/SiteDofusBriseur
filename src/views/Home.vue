<template>
  <v-container class="mt-10">
    <v-row
      align="center"
      justify="center"
    >
      <h1>
        Calculateur brisage Dofus
      </h1>
    </v-row>
    <v-row
      class="mt-16"
      justify="center"
    >
      <v-card
        elevation="3"
        class="pa-8"
        width="40%"
        variant="outlined"
      >
        <v-card-title>Sélectionner un item</v-card-title>
        <v-card-actions>
          <v-autocomplete
            :items="items"
            :loading="loading"
            v-model="itemRecherche"
            variant="outlined"
            clearable
            hide-no-data
            item-title="name"
            label="Item"
            no-data-text="En attente des données..."
            placeholder="Recherche un item"
            @click:clear="clearTable"
          />
        </v-card-actions>
        <v-card-item>
          <v-text-field
            class="mt-2"
            v-if="isItemRecherche"
            v-model="coef"
            :rules="[reglesCoef.required]"
            append-inner-icon="mdi-content-save"
            label="Coefficient"
            variant="outlined"
            prepend-inner-icon="mdi-percent"
            type="number"
            @click:append-inner="updateCoef"
          />
          <v-snackbar v-model="snackbar">
            Coefficient enregistré !

            <template v-slot:action="{ attrs }">
              <v-btn
                variant="text"
                v-bind="attrs"
                @click="snackbar = false"
              >
                Fermer
              </v-btn>
            </template>
          </v-snackbar>
        </v-card-item>
        <v-card-text>
          <v-row align="center" no-gutters>
            <v-col>
              <v-img
                v-if="imgURL.length >= 3"
                :src="getImageUrl(imgURL)"
                class="mx-auto"
                height="125px"
                width="125px"
              />
              <div class="text-center">
                <v-chip
                  v-if="isItemRecherche"
                  label
                >
                  Niveau {{ itemLevel }}
                </v-chip>
              </div>
            </v-col>
            <v-col>
              <div class="text-center">
                <v-chip
                  v-if="isItemRecherche"
                  class="ma-2"
                  variant="outlined"
                  @click="goToLastBrisage"
                >
                  <v-icon left>
                    mdi-anvil
                  </v-icon>
                  <strong>{{ dateItem }}</strong>
                </v-chip>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-row>
    <v-row justify="center" class="mt-3">
      <v-col
        cols="12"
        sm="8"
      >
        <v-data-table
          :headers="headers"
          :items="itemTable"
          :items-per-page="25"
          class="elevation-3"
          disable-pagination
          no-data-text="Sélectionne un item pour voir ses caractéristiques"
          hide-default-footer
        >
          <template v-slot:top>
            <v-alert
              closable
              type="info"
              variant="tonal"
            >
              Clique sur une bulle grise ou verte dans la colonne des revenus pour enregistrer un nouveau brisage
            </v-alert>
          </template>
          <template v-slot:item.prixFocus="{item}">
            <v-chip
              :color="sortPrix(item?.raw?.prixFocus)"
              :disabled="!isANumber(item?.raw?.prixFocus)"
              @click="addHistory(item?.raw?.caracName, item?.raw?.prixFocus)"
            >
              {{ item?.raw?.prixFocus }}
            </v-chip>
          </template>
          <template v-slot:item.prixUnit="{item}">
            <v-dialog
              width="auto"
              v-if="item?.raw.caracName !== 'TOTAL SANS FOCUS'"
            >
              <template v-slot:activator="{ props }">
                <v-btn
                  variant="text"
                  v-bind="props"
                  @click="newPrix = item.raw.prixUnit"
                >
                  {{ item?.raw?.prixUnit }}
                </v-btn>
              </template>

              <v-card>
                <v-card-title>
                  Changer le prix de la rune
                </v-card-title>
                <v-card-text>
                  <v-text-field
                    v-model="newPrix"
                    :rules="[numberRule]"
                    autofocus
                    hint="Nouveau prix"
                    single-line
                    type="number"
                  />
                </v-card-text>
                <v-card-actions>
                  <v-btn color="primary" @click="save({
                    prix: newPrix,
                    caracName: item.raw.caracName,
                  })">
                    Valider
                  </v-btn>
                </v-card-actions>


              </v-card>
            </v-dialog>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <v-row
      class="mt-16"
      justify="space-around"
    >
      <v-dialog
        v-model="dialogValidation"
        max-width="600px"
        persistent
      >
        <v-card>
          <v-card-title>
            <span class="headline">Le brisage a-t-il été rentable ?</span>
          </v-card-title>
          <v-card-actions>
            <v-btn
              variant="text"
              @click="dialogValidation = false"
            >
              Annuler
            </v-btn>
            <v-spacer/>
            <v-btn
              color="error"
              variant="text"
              @click="addHistorique(false)"
            >
              Non
            </v-btn>
            <v-btn
              color="success"
              variant="text"
              @click="addHistorique(true)"
            >
              Oui
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script setup>
import {onMounted, ref, watch} from "vue";
import {useCollection, useFirestore} from 'vuefire'
import {addDoc, collection, getDocs, query, updateDoc, where} from 'firebase/firestore'

const db = useFirestore()


const runesData = useCollection(collection(db, 'runes'))
const coefs = useCollection(collection(db, 'items'));
const historique = useCollection(collection(db, 'historiqueBrisage'));


// const dialog = ref(false)
const dialogValidation = ref(false)
const itemRecherche = ref("")
const headers = ref([
  {title: "Caractéristique", key: "caracName"},
  {title: "Valeur moyenne", key: "caracValue"},
  {title: "Prix unitaire (modifiable)", key: "prixUnit"},
  {title: "Quantité de rune estimée (Focus)", key: "qtFocus"},
  {title: "Revenus en kamas (Focus)", key: "prixFocus"},
  {title: "Quantité sans focus", key: "qtNoFocus"}
])
const itemTable = ref([])
const items = ref([])
const newPrix = ref("")
const coef = ref(100)
const snackbar = ref(false)
const itemLevel = ref(0)
const imgURL = ref("")
const isItemRecherche = ref(false)
const maxPrix = ref(-5)
const dateItem = ref("")
const itemType = ref("")
const selectedCarac = ref("")
const selectedPrice = ref("")
const reglesCoef = ref({
  required: (value) => !!value || "Nécessaire et numérique"
})
const loading = ref(true)
const numberRule = ref(value => Number.isInteger(Number(value)) && Number(value) > 0 || 'Valeur numérique uniquement')

watch(coef, async (newVal, oldVal) => {
  if (newVal.length > 0) {
    coef.value = Number(newVal);
    displayItemStats(getItem(itemRecherche.value));
  }
})

watch(itemRecherche, (newVal, oldVal) => {
  let item = getItem(newVal);
  if (item !== undefined) {
    isItemRecherche.value = true;
    setCoef(item.name);
    itemLevel.value = item.level;
    itemType.value = item.type;
    displayItemStats(item);
    setDateItem();
    setImageURL(item);
  } else {
    clearTable();
  }
})

onMounted(async () => {
  if (sessionStorage.getItem('items')?.length > 0) {
    items.value = JSON.parse(sessionStorage.getItem('items'))
  } else {
    const equipments = await getAllEquipments()
    const weapons = await getAllWeapons()

    items.value = [...filterItems(equipments), ...filterItems(weapons)].slice(300, 350);
    sessionStorage.setItem('items', JSON.stringify(items.value))
  }
  items.value.sort();
  loading.value = false
})

async function getAllEquipments() {
  const response = await fetch("https://fr.dofus.dofapi.fr/equipments")
  const data = await response.json()
  return data
}

async function getAllWeapons() {
  const response = await fetch("https://fr.dofus.dofapi.fr/weapons")
  const data = await response.json()
  return data
}

function filterItems(items) {
  return items.map(o => ['imgUrl', 'level', 'name', 'statistics', 'type'].reduce((acc, curr) => {
    acc[curr] = o[curr];
    return acc;
  }, {}))
}

function isANumber(number) {
  return !isNaN(number)
}

function sortPrix(prix) {
  if (prix >= maxPrix.value) {
    maxPrix.value = prix;
    return "green";
  }
}

function clearTable() {
  itemTable.value = [];
  isItemRecherche.value = false;
  maxPrix.value = -5;
  dateItem.value = "";
  imgURL.value = "";
}

async function save({caracName, prix}) {
  if (isANumber(prix)) {
    const q = query(collection(db, "runes"), where("carac", "==", caracName));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      updateDoc(doc.ref, {
        prix: Number(prix)
      }).then(() => {
        maxPrix.value = -5;
        displayItemStats(getItem(itemRecherche.value));
        newPrix.value = "";
      })
    });
  }
}

function getItem(val) {
  return items.value.find(e => e.name === val)
}

function getRunePrix(nomStat) {
  for (const runeGroup of runesData.value) {
    if (runeGroup.carac === nomStat) {
      return runeGroup.prix;
    }
  }
}

function displayItemStats(item) {
  itemTable.value = [];
  maxPrix.value = -5;
  for (const stat of item.statistics) {
    let readableStat = Object.keys(stat);
    let nomStat = readableStat[0];
    let test = /^[0-99]+%/;
    let caracValue = Math.round((stat[nomStat].min + stat[nomStat].max) / 2);
    if (caracValue >= 0 && !nomStat.startsWith("(")) {
      if (test.test(nomStat)) {
        nomStat = nomStat.substr(1, nomStat.length);
      }
      let prix = getRunePrix(nomStat);
      let realStat = {
        caracName: nomStat,
        caracValue: caracValue,
        prixUnit: prix,
      };
      itemTable.value.push(realStat);
    }
  }
  fillTableWithCalculations();
  fillNoFocus();
}

function getImageUrl(url) {
  return new URL(`../assets/items/${url}`, import.meta.url).href
}


function setCoef(itemName) {
  for (const item of coefs.value) {
    if (item.nom === itemName) {
      coef.value = item.coef;
      displayItemStats(getItem(itemRecherche.value));
    }
  }
}

async function updateCoef() {
  if (isANumber(coef.value)) {
    const q = query(collection(db, "items"), where("nom", "==", itemRecherche.value));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      updateDoc(doc.ref, {
        coef: Number(coef.value)
      }).then(() => {
        snackbar.value = true;
        displayItemStats(getItem(itemRecherche.value));
        calculateNoFocusPrice();
      })
    });
  }
}

function calculateNoFocusPrice() {
  let total = 0;
  for (const stat of itemTable.value) {
    total =
      total +
      Math.floor(quantityNoFocus(stat)) *
      getRunePrix(stat.caracName);
  }
}

function calculateMaxFocusValue() {
  let max = 0;
  for (const stat of itemTable.value) {
    max = Math.max(
      max,
      Math.floor(quantityFocus(stat)) *
      getRunePrix(stat.caracName)
    );
  }
}

function getUnitWeight(statName) {
  for (const runeGroup of runesData.value) {
    if (runeGroup.carac === statName) {
      return runeGroup.poidsUnité;
    }
  }
}

function getRuneWeight(statName) {
  for (const runeGroup of runesData.value) {
    if (runeGroup.carac === statName) {
      return runeGroup.poidsRune;
    }
  }
}

function quantityNoFocus(stat) {
  return (
    Math.round(
      ((((stat.caracValue * getUnitWeight(stat.caracName)) /
            getRuneWeight(stat.caracName)) *
          itemLevel.value *
          0.025 *
          coef.value) /
        100) *
      0.55 *
      100
    ) / 100
  );
}

function getTotalWeight() {
  let total = 0;
  for (const stat of itemTable.value) {
    total += stat.caracValue * getUnitWeight(stat.caracName);
  }
  return total;
}

function quantityFocus(stat) {
  let res =
    Math.round(
      ((getTotalWeight() +
          stat.caracValue * getUnitWeight(stat.caracName)) /
        2 /
        getRuneWeight(stat.caracName)) *
      itemLevel.value *
      0.025 *
      (coef.value / 100) *
      0.55 *
      100
    ) / 100;
  if (res - Math.floor(res) < 0.5) {
    return Math.floor(res);
  } else if (((Math.round(res) - res) / res) * 100 >= 2) {
    return Math.round(res);
  } else {
    return res;
  }
}

function setPrix(stat) {
  return Math.round(
    quantityFocus(stat) * getRunePrix(stat.caracName)
  );
}

function fillTableWithCalculations() {
  for (let index = 0; index < itemTable.value.length; index++) {
    itemTable.value[index] = {
      caracName: itemTable.value[index].caracName,
      caracValue: itemTable.value[index].caracValue,
      prixUnit: itemTable.value[index].prixUnit,
      qtFocus: quantityFocus(itemTable.value[index]),
      prixFocus: setPrix(itemTable.value[index]),
      qtNoFocus: quantityNoFocus(itemTable.value[index]),
    };
  }
}

function fillNoFocus() {
  let totalSansFocus = 0;
  for (const stat of itemTable.value) {
    totalSansFocus += Math.round(
      getRunePrix(stat.caracName) * quantityNoFocus(stat)
    );
  }
  itemTable.value[getItem(itemRecherche.value).statistics.length] = {
    caracName: "TOTAL SANS FOCUS",
    caracValue: "",
    prixUnit: "",
    qtFocus: "",
    prixFocus: totalSansFocus,
    qtNoFocus: "",
  };
}

function minutes_with_leading_zeros(min) {
  return (min < 10 ? "0" : "") + min;
}

async function addHistorique(isRentable) {
  dialogValidation.value = false;
  let res = {
    item: itemRecherche.value,
    type: itemType.value,
    level: itemLevel.value,
    date: new Date(),
    coef: coef.value,
    focus: selectedCarac.value === "TOTAL SANS FOCUS" ? "Pas de Focus" : selectedCarac.value,
    prix: selectedPrice.value,
    rentable: isRentable,
    img: imgURL.value,
    who: "TODO"
  };
  await updateCoef()
  console.log(res)
  await addDoc(collection(db, "historiqueBrisage"), res)
}


function addHistory(carac, price) {
  selectedCarac.value = carac;
  selectedPrice.value = price;
  dialogValidation.value = true;
}

function setDateItem() {
  for (const item of historique.value) {
    if (item.item === itemRecherche.value) {
      dateItem.value = item.date.toDate().toLocaleString('fr-FR');
    }
  }
  if (dateItem.value === "") {
    dateItem.value = "Pas d'ancien brisage";
  }
}

function setImageURL(item) {
  let url = item.imgUrl;
  imgURL.value = url.substr(68);
}

function goToLastBrisage() {
  if (dateItem.value !== 'Pas d\'ancien brisage') {
    $router.push({name: 'Historique', params: {item: itemRecherche.value}})
  }
}
</script>

