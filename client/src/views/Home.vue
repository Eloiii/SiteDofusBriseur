<template>
  <v-app>
    <v-main>
      <v-row align="center" justify="center" style="padding-top: 20px">
        <h1 class="display-4">Met toi bien frerot</h1>
      </v-row>

      <v-row justify="center" style="padding-top: 100px">
        <v-col cols="12" sm="5">
          <v-card elevation="7">
            <v-card-title> Choisi un item </v-card-title>
            <v-card-actions>
              <v-autocomplete
                auto-select-first
                clearable
                :items="items"
                item-text="name"
                :search-input.sync="itemRecherche"
                label="Item"
                placeholder="Recherche un item"
                @click:clear="clearTable"
                ><div slot="prepend-item">
                  <v-dialog v-model="dialog" persitent>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        text
                        block
                        @click="dialog = true"
                        v-bind="attrs"
                        v-on="on"
                      >
                        Ajouter item
                      </v-btn>
                    </template>
                    <AddItem v-model="dialog" />
                  </v-dialog></div
              ></v-autocomplete>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-row justify="center" style="padding-top: 50px">
        <v-col cols="12" sm="5">
          <v-text-field
            v-model="coef"
            outlined
            label="Coefficient"
            :rules="[reglesCoef.required]"
            prepend-inner-icon="mdi-percent"
            append-icon="mdi-content-save"
            @click:append="updateCoef"
            v-if="this.isItemRecherche"
          ></v-text-field>
          <v-snackbar v-model="snackbar">
            Coefficient enregistré !

            <template v-slot:action="{ attrs }">
              <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
                Fermer
              </v-btn>
            </template>
          </v-snackbar>
          <div class="text-center">
            <v-chip
              class="ma-2"
              v-if="this.isItemRecherche"
              color="indigo darken-3"
              outlined
            >
              <v-icon left> mdi-anvil</v-icon>
              <strong>{{ dateItem }}</strong>
            </v-chip>
          </div>
        </v-col>
      </v-row>
      <v-row justify="center" style="padding-top: 50px">
        <v-col cols="12" sm="8">
          <v-data-table
            :headers="headers"
            :items="itemTable"
            class="elevation-2"
            disable-pagination
            :hide-default-footer="true"
          >
            <template v-slot:item.prixFocus="props">
              <v-chip :color="sortPrix(props.item.prixFocus)" dark>
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
                  <div class="mt-4 title">Changer le prix de la rune</div>
                  <v-text-field
                    hint="Nouveau prix"
                    single-line
                    autofocus
                    v-model="newPrix"
                  ></v-text-field>
                </template>
              </v-edit-dialog>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
      <v-row justify="space-around" style="padding-top: 50px">
        <v-btn
          color="blue-grey"
          class="white--text mx-auto"
          @click="addHistorique"
        >
          J'ai brisé l'item
          <v-icon right dark> mdi-database-plus</v-icon>
        </v-btn>
      </v-row>
      <v-row justify="center" style="padding-top: 50px">
        <v-col cols="12" sm="8">
          <v-card class="mx-auto" max-width="1500" tile>
            <v-list rounded>
              <v-subheader>Historique des brisages</v-subheader>
              <v-list-item-group color="primary">
                <v-list-item
                  v-for="(item, i) in historique.slice().reverse()"
                  :key="i"
                >
                  <v-list-item-content>
                    <v-list-item-title v-text="item.item"></v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-content>
                    <v-list-item-title v-text="item.date"></v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-content>
                    <v-list-item-title v-text="item.coef"></v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-content>
                    <v-list-item-title v-text="item.focus"></v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-content>
                    <v-list-item-title v-text="item.prix"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
import AddItem from "@/views/AddItem";
import PostService from "../PostService";

export default {
  components: {
    AddItem,
  },
  data: () => ({
    dialog: false,
    itemRecherche: "",
    headers: [
      { text: "Caractéristique", value: "caracName" },
      { text: "Valeur", value: "caracValue" },
      { text: "Prix unitaire", value: "prixUnit" },
      { text: "Quantité (Focus)", value: "qtFocus" },
      { text: "Prix (Focus)", value: "prixFocus" },
      { text: "Aucun Focus", value: "qtNoFocus" },
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
    imageLink: "",
    isItemRecherche: false,
    maxPrix: -5,
    historique: [],
    dateItem: "",
    reglesCoef: {
      required: (value) => !!value || "Nécessaire.",
    },
  }),
  methods: {
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
    },
    save({ caracName, prix }) {
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
        let res = {
          caracName: this.itemTable[index].caracName,
          caracValue: this.itemTable[index].caracValue,
          prixUnit: this.itemTable[index].prixUnit,
          qtFocus: this.quantityFocus(this.itemTable[index]),
          prixFocus: this.setPrix(this.itemTable[index]),
          qtNoFocus: this.quantityNoFocus(this.itemTable[index]),
        };
        this.itemTable[index] = res;
      }
    },

    fillNoFocus() {
      let totalSansFocus = 0;
      for (const stat of this.itemTable) {
        totalSansFocus += Math.round(
          this.getRunePrix(stat.caracName) * this.quantityNoFocus(stat)
        );
      }
      let res = {
        caracName: "TOTAL SANS FOCUS",
        caracValue: "-",
        prixUnit: "-",
        qtFocus: "-",
        prixFocus: totalSansFocus,
        qtNoFocus: "-",
      };
      this.itemTable.push(res);
    },

    displayHistorique() {},

    async addHistorique() {
      let current = new Date();
      let cDate =
        current.getDate() +
        "-" +
        (current.getMonth() + 1) +
        "-" +
        current.getFullYear();
      let cTime =
        current.getHours() +
        ":" +
        current.getMinutes() +
        ":" +
        current.getSeconds();
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
        date: dateTime,
        coef: this.coef,
        focus: focusName,
        prix: focusPrix,
      };

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
        this.dateItem = "Pas d'ancien craft";
      }
    },
  },
  watch: {
    // coef(val) {
    //   !val && val.length > 0 &&
    // },
    dialog(val) {
      !val && this.getItems();
      this.maxPrix = -5;
    },
    itemRecherche(val) {
      let item = this.getItem(val);
      if (item !== undefined) {
        this.isItemRecherche = true;
        this.setCoef(item.name);
        this.itemLevel = item.level;
        this.displayItemStats(item);
        this.setDateItem();
      }
    },
  },
  async created() {
    try {
      this.equipements = await PostService.getAllEquipments();
      this.weapons = await PostService.getAllWeapons();
      this.items = [...this.equipements, ...this.weapons];
      this.items.sort();
      this.getRunes();
      this.getCoefs();
      this.getHistorique();
    } catch (err) {
      console.log(err);
    }
  },
};
</script>
