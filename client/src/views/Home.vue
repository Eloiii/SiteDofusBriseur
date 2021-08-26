<template>
  <v-app>
    <v-container class="mt-10">
      <v-row
        align="center"
        justify="center"
      >
        <h1 class="display-3">
          Calculateur brisage Dofus
        </h1>
      </v-row>
      <v-row
        justify="center"
        style="padding-top: 100px"
      >
        <v-col
          cols="12"
          sm="5"
        >
          <v-card elevation="7">
            <v-card-title> Sélectionner un item</v-card-title>
            <v-card-actions>
              <v-autocomplete
                :items="items"
                :loading="loading"
                :search-input.sync="itemRecherche"
                auto-select-first
                cache-items
                clearable
                item-text="name"
                label="Item"
                no-data-text="En attente des données..."
                placeholder="Recherche un item"
                @click:clear="clearTable"
              />
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-row
        no-gutters
        style="padding-top: 50px"
      >
        <v-col
          md="1"
          offset-md="2"
        >
          <v-img
            v-if="imgURL.length >= 3"
            :src="require(`@/assets/items/${imgURL}`)"
            class="mx-auto"
            height="125px"
            width="125px"
          />
        </v-col>
        <v-col
          md="4"
          offset-md="1"
        >
          <v-text-field
            v-if="isItemRecherche"
            v-model="coef"
            :rules="[reglesCoef.required]"
            append-icon="mdi-content-save"
            label="Coefficient"
            outlined
            prepend-inner-icon="mdi-percent"
            type="number"
            @click:append="updateCoef"
          />
          <v-snackbar v-model="snackbar">
            Coefficient enregistré !

            <template v-slot:action="{ attrs }">
              <v-btn
                color="deep-purple accent-4"
                text
                v-bind="attrs"
                @click="snackbar = false"
              >
                Fermer
              </v-btn>
            </template>
          </v-snackbar>
          <div class="text-center">
            <v-chip
              v-if="isItemRecherche"
              class="ma-2"
              color="deep-purple accent-4"
              outlined
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
      <v-row no-gutters>
        <v-col
          md="1"
          offset-md="2"
        >
          <div class="text-center">
            <v-chip
              v-if="isItemRecherche"
              label
            >
              Niveau {{ itemLevel }}
            </v-chip>
          </div>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col
          cols="12"
          sm="8"
        >
          <v-data-table
            :headers="headers"
            :hide-default-footer="true"
            :items="itemTable"
            class="elevation-2"
            disable-pagination
            no-data-text="Sélectionne un item pour voir ses caractéristiques"
          >
            <template v-slot:item.prixFocus="props">
              <v-chip
                :color="sortPrix(props.item.prixFocus)"
                dark
              >
                {{ props.item.prixFocus }}
              </v-chip>
            </template>
            <template v-slot:item.prixUnit="props">
              <v-edit-dialog
                large
                persistent
                @save="
                  save({
                    prix: newPrix,
                    caracName: props.item.caracName,
                  })
                "
              >
                <div>{{ props.item.prixUnit }}</div>
                <template v-slot:input>
                  <div class="mt-4 title">
                    Changer le prix de la rune
                  </div>
                  <v-text-field
                    v-model="newPrix"
                    :rules="[numberRule.number]"
                    autofocus
                    hint="Nouveau prix"
                    single-line
                    type="number"
                  />
                </template>
              </v-edit-dialog>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
      <v-row
        justify="space-around"
        style="padding-top: 50px"
      >
        <v-dialog
          v-model="dialogValidation"
          max-width="600px"
          persistent
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="mx-auto"
              color="deep-purple accent-4"
              dark
              v-bind="attrs"
              v-on="on"
            >
              J'ai brisé l'item
              <v-icon
                dark
                right
              >
                mdi-database-plus
              </v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">Le brisage a-t-il été rentable ?</span>
            </v-card-title>
            <v-card-actions>
              <v-btn
                color="grey"
                text
                @click="dialogValidation = false"
              >
                Annuler
              </v-btn>
              <v-spacer />
              <v-btn
                color="red"
                text
                @click="addHistorique(false)"
              >
                Non
              </v-btn>
              <v-btn
                color="deep-purple accent-4"
                text
                @click="addHistorique(true)"
              >
                Oui
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import PostService from "../PostService";

export default {
  data: () => ({
    dialog: false,
    dialogValidation: false,
    itemRecherche: "",
    headers: [
      {text: "Caractéristique", value: "caracName"},
      {text: "Valeur", value: "caracValue"},
      {text: "Prix unitaire", value: "prixUnit"},
      {text: "Quantité (Focus)", value: "qtFocus"},
      {text: "Prix (Focus)", value: "prixFocus"},
      {text: "Aucun Focus", value: "qtNoFocus"},
    ],
    itemTable: [],
    items: [],
    equipements: [],
    weapons: [],
    runesData: [],
    newPrix: "",
    coef: 100,
    coefs: [],
    snackbar: false,
    itemLevel: 0,
    imgURL: "",
    isItemRecherche: false,
    maxPrix: -5,
    historique: [],
    dateItem: "",
    itemType: "",
    reglesCoef: {
      required: (value) => !!value || "Nécessaire et numérique",
    },
    loading: true,
    numberRule: {
      number: value => this.isANumber(value) || 'Valeur numérique uniquement'
    }
  }),
  watch: {
    coef(val) {
      if (val.length > 0) {
        this.coef = parseInt(val);
        this.displayItemStats(this.getItem(this.itemRecherche));
      }
    },
    itemRecherche(val) {
      let item = this.getItem(val);
      if (item !== undefined) {
        this.isItemRecherche = true;
        this.setCoef(item.name);
        this.itemLevel = item.level;
        this.itemType = item.type;
        this.displayItemStats(item);
        this.setDateItem();
        this.setImageURL(item);
      } else {
        this.clearTable();
      }
    },
  },
  async created() {
    try {
      this.equipements = await PostService.getAllEquipments();
      this.weapons = await PostService.getAllWeapons();
      this.items = [...this.equipements, ...this.weapons];
      this.items.sort();
      this.loading = false
      await this.getRunes();
      await this.getCoefs();
      await this.getHistorique();
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    isANumber(number) {
      return Number.isInteger(Number(number)) && Number(number) > 0
    },
    sortPrix(prix) {
      if (prix >= this.maxPrix) {
        this.maxPrix = prix;
        return "green";
      }
    },

    clearTable() {
      this.itemTable = [];
      this.isItemRecherche = false;
      this.maxPrix = -5;
      this.dateItem = "";
      this.imgURL = "";
    },
    save({caracName, prix}) {
      if (this.isANumber(prix)) {
        PostService.insertRune({
          carac: caracName,
          prix: parseInt(prix),
        }).then(() => {
          this.getRunes().then(() => {
            this.maxPrix = -5;
            this.displayItemStats(this.getItem(this.itemRecherche));
            this.newPrix = "";
          });
        });
      }
    },
    async getRunes() {
      try {
        this.runesData = await PostService.getRunes();
      } catch (err) {
        console.log(err);
      }
    },
    getItem(val) {
      for (const item of this.items) {
        if (item.name === val) {
          return item;
        }
      }
    },
    getRunePrix(nomStat) {
      for (const runeGroup of this.runesData) {
        if (runeGroup.carac === nomStat) {
          return runeGroup.prix;
        }
      }
    },
    displayItemStats(item) {
      this.itemTable = [];
      this.maxPrix = -5;
      for (const stat of item.statistics) {
        let readableStat = Object.keys(stat);
        let nomStat = readableStat[0];
        let test = /^[0-99]+%/;
        let caracValue = stat[nomStat].min;
        if (caracValue >= 0 && !nomStat.startsWith("(")) {
          if (test.test(nomStat)) {
            nomStat = nomStat.substr(1, nomStat.length);
          }

          let prix = this.getRunePrix(nomStat);
          let realStat = {
            caracName: nomStat,
            caracValue: caracValue,
            prixUnit: prix,
          };
          this.itemTable.push(realStat);
        }
      }
      this.fillTableWithCalculations();
      this.fillNoFocus();
    },
    async getCoefs() {
      try {
        this.coefs = await PostService.getCoefs();
      } catch (err) {
        console.log(err);
      }
    },

    setCoef(itemName) {
      for (const item of this.coefs) {
        if (item.nom === itemName) {
          this.coef = item.coef;
          this.displayItemStats(this.getItem(this.itemRecherche));
        }
      }
    },

    updateCoef() {
      if (this.isANumber(this.coef)) {
        PostService.updateCoef({
          nom: this.itemRecherche,
          coef: parseInt(this.coef),
        }).then(() => {
          this.getCoefs().then(() => {
            this.snackbar = true;
            this.displayItemStats(this.getItem(this.itemRecherche));
            this.calculateNoFocusPrice();
          });
        });
      }
    },

    calculateNoFocusPrice() {
      let total = 0;
      for (const stat of this.itemTable) {
        total =
            total +
            Math.floor(this.quantityNoFocus(stat)) *
            this.getRunePrix(stat.caracName);
      }
    },

    calculateMaxFocusValue() {
      let max = 0;
      for (const stat of this.itemTable) {
        max = Math.max(
            max,
            Math.floor(this.quantityFocus(stat)) *
            this.getRunePrix(stat.caracName)
        );
      }
    },

    getUnitWeight(statName) {
      for (const runeGroup of this.runesData) {
        if (runeGroup.carac === statName) {
          return runeGroup.poidsUnité;
        }
      }
    },

    getRuneWeight(statName) {
      for (const runeGroup of this.runesData) {
        if (runeGroup.carac === statName) {
          return runeGroup.poidsRune;
        }
      }
    },

    quantityNoFocus(stat) {
      return (
          Math.round(
              ((((stat.caracValue * this.getUnitWeight(stat.caracName)) /
                          this.getRuneWeight(stat.caracName)) *
                      this.itemLevel *
                      0.025 *
                      this.coef) /
                  100) *
              0.55 *
              100
          ) / 100
      );
    },

    getTotalWeight() {
      let total = 0;
      for (const stat of this.itemTable) {
        total += stat.caracValue * this.getUnitWeight(stat.caracName);
      }
      return total;
    },

    quantityFocus(stat) {
      let res =
          Math.round(
              ((this.getTotalWeight() +
                      stat.caracValue * this.getUnitWeight(stat.caracName)) /
                  2 /
                  this.getRuneWeight(stat.caracName)) *
              this.itemLevel *
              0.025 *
              (this.coef / 100) *
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
    },

    setPrix(stat) {
      return Math.round(
          this.quantityFocus(stat) * this.getRunePrix(stat.caracName)
      );
    },

    fillTableWithCalculations() {
      for (let index = 0; index < this.itemTable.length; index++) {
        this.itemTable[index] = {
          caracName: this.itemTable[index].caracName,
          caracValue: this.itemTable[index].caracValue,
          prixUnit: this.itemTable[index].prixUnit,
          qtFocus: this.quantityFocus(this.itemTable[index]),
          prixFocus: this.setPrix(this.itemTable[index]),
          qtNoFocus: this.quantityNoFocus(this.itemTable[index]),
        };
      }
    },

    fillNoFocus() {
      let totalSansFocus = 0;
      for (const stat of this.itemTable) {
        totalSansFocus += Math.round(
            this.getRunePrix(stat.caracName) * this.quantityNoFocus(stat)
        );
      }
      this.itemTable[this.getItem(this.itemRecherche).statistics.length] = {
        caracName: "TOTAL SANS FOCUS",
        caracValue: "-",
        prixUnit: "-",
        qtFocus: "-",
        prixFocus: totalSansFocus,
        qtNoFocus: "-",
      };
    },

    minutes_with_leading_zeros(min) {
      return (min < 10 ? "0" : "") + min;
    },

    async addHistorique(isRentable) {
      this.dialogValidation = false;
      let current = new Date();
      let cDate =
          ("0" + current.getDate()).slice(-2) +
          "/" +
          ("0" + (current.getMonth() + 1)).slice(-2) +
          "/" +
          current.getFullYear();
      let cTime =
          this.minutes_with_leading_zeros(current.getHours()) +
          ":" +
          this.minutes_with_leading_zeros(current.getMinutes());
      let dateTime = cDate + " " + cTime;
      let focusName;
      let focusPrix;
      for (const stat of this.itemTable) {
        if (stat.prixFocus === this.maxPrix) {
          focusName = stat.caracName;
          focusPrix = stat.prixFocus;
        }
      }
      if (focusName === "TOTAL SANS FOCUS") {
        focusName = "Pas de Focus";
      }
      let res = {
        item: this.itemRecherche,
        type: this.itemType,
        level: this.itemLevel,
        date: dateTime,
        coef: this.coef,
        focus: focusName,
        prix: focusPrix,
        rentable: isRentable,
        img: this.imgUrl,
        who: localStorage.getItem('logged')
      };
      this.updateCoef()
      PostService.addHistorique(res).then(() => {
        this.getHistorique();
      });

    },
    async getHistorique() {
      try {
        this.historique = await PostService.getHistorique();
      } catch (err) {
        console.log(err);
      }
    },
    setDateItem() {
      for (const item of this.historique) {
        if (item.item === this.itemRecherche) {
          this.dateItem = item.date;
        }
      }
      if (this.dateItem === "") {
        this.dateItem = "Pas d'ancien brisage";
      }
    },
    setImageURL(item) {
      let url = item.imgUrl;
      this.imgURL = url.substr(68);
    },
    goToLastBrisage() {
      if (this.dateItem !== 'Pas d\'ancien brisage') {
        this.$router.push({name: 'Historique', params: {item: this.itemRecherche}})
      }
    }
  },
};
</script>

