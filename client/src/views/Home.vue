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
  },
  watch: {
    dialog(val) {
      !val && this.getItems();
    },
    itemRecherche(val) {
      let item = this.getItem(val);
      if (item !== undefined) {
        this.displayItemStats(item);
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
    } catch (err) {
      console.log(err);
    }
  },
};
</script>
