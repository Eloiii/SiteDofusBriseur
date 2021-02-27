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
          <v-img :src="getImageLink"></v-img>
        </v-col>
        <v-col cols="12" sm="5">
          <v-text-field
            v-model="coef"
            outlined
            label="Coefficient"
            :rules="[reglesCoef.required, reglesCoef.counter]"
            prepend-inner-icon="mdi-percent"
            append-icon="mdi-content-save"
            @click:append="updateCoef"
            v-if="this.itemRecherche"
          ></v-text-field>
          <v-snackbar v-model="snackbar">
            Coefficient enregistré !

            <template v-slot:action="{ attrs }">
              <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
                Fermer
              </v-btn>
            </template>
          </v-snackbar>
        </v-col>
      </v-row>
      <v-row justify="center" style="padding-top: 100px">
        <v-col cols="12" sm="8">
          <v-data-table
            :headers="headers"
            :items="itemTable"
            class="elevation-2"
            disable-pagination
            :hide-default-footer="true"
          >
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
      { text: "Quantité (Focus)", value: "qt" },
      { text: "Prix (Focus)", value: "prix" },
      { text: "Aucun Focus", value: "" },
    ],
    itemTable: [],
    items: [],
    equipements: [],
    weapons: [],
    runesData: [],
    newPrix: 0,
    coef: 100,
    coefs: [],
    snackbar: false,
    itemLevel: 0,
    imageLink: "",
    reglesCoef: {
      required: (value) => !!value || "Nécessaire.",
      counter: (value) => value.length <= 4 || "Max 3 caractères",
    },
  }),
  methods: {
    clearTable() {
      this.itemTable = [];
    },
    save({ caracName, prix }) {
      PostService.insertRune({
        carac: caracName,
        prix: parseInt(prix),
      });
      this.getRunes().then(() => {
        this.displayItemStats(this.getItem(this.itemRecherche));
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
      for (const stat of item.statistics) {
        let readableStat = Object.keys(stat);
        let nomStat = readableStat[0];

        let prix = this.getRunePrix(nomStat);
        let realStat = {
          caracName: nomStat,
          caracValue: stat[nomStat].min,
          prixUnit: prix,
        };
        this.itemTable.push(realStat);
      }
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
        }
      }
    },

    updateCoef() {
      PostService.updateCoef({
        nom: this.itemRecherche,
        coef: parseInt(this.coef),
      });
      this.getCoefs();
      this.snackbar = true;
    },
  },
  watch: {
    coef(val) {
      !val && val.length > 0 && this.getCoefs();
    },
    dialog(val) {
      !val && this.getItems();
    },
    itemRecherche(val) {
      let item = this.getItem(val);
      if (item !== undefined) {
        this.displayItemStats(item);
        this.imageLink = item.imgUrl;
        this.setCoef(item.name);
        this.itemLevel = item.level;
      }
    },
  },
  computed: {
    getImageLink() {
      return this.imageLink;
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
      let yo = [];
      for (const item of this.items) {
        yo.push(item.name);
      }
    } catch (err) {
      console.log(err);
    }
  },
};
</script>
