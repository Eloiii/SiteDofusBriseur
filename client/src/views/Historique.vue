<template>
  <v-app>
    <v-container class="mt-10">
      <v-row
        justify="center"
      >
        <v-card width="90%">
          <v-card-title>
            Historique des brisages

            <v-spacer />
            <v-switch
              v-model="switchName"
              inset
              label="Ne voir que mes brisages"
            />
            <v-spacer />

            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              hide-details
              label="Recherche item"
              single-line
            />
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="itemTable"
            :items-per-page="12"
            :loading="loading"
            :options.sync="options"
            :search="search"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
          >
            <template v-slot:header.type>
              <v-select
                v-model="itemType"
                :items="itemsType"
                :value="'Tout'"
                label="Type de l'item"
              />
            </template>
            <template v-slot:header.level>
              <v-text-field
                v-model="itemLevel"
                clearable
                label="Level minimum"
                max-width="25px"
                type="number"
                @click:clear="resetItemLevel"
              />
            </template>
            <template v-slot:item.rentable="{ item }">
              <v-simple-checkbox
                v-model="item.rentable"
                disabled
              />
            </template>
            <template v-slot:item.prix="{ item }">
              {{ new Intl.NumberFormat('fr-FR').format(item.prix) }}
            </template>
            <template v-slot:item.item="{ item }">
              <div class="nameIcon">
                <span>
                  {{ item.item }}
                </span>
                <v-img
                  v-if="item.img"
                  :src="require(`../assets/items/${item.img}`)"
                  contain
                  height="50px"
                  width="50px"
                />
              </div>
            </template>
          </v-data-table>
        </v-card>
      </v-row>
    </v-container>
  </v-app>
</template>
<script>
import PostService from "../PostService";

export default {
  data: () => ({
    sortBy: "date",
    sortDesc: true,
    options: {},
    items: [],
    itemLevel: 0,
    itemType: "Tout",
    search: "",
    switchName: false,
    itemsType: [
      "Tout",
      "Amulette",
      "Anneau",
      "Bottes",
      "Ceinture",
      "Cape",
      "Chapeau",
      "Bouclier",
      "Arc",
      "Bâton",
      "Épée",
      "Pelle",
      "Baguette",
      "Hache",
      "Marteau",
      "Outil",
      "Dague",
    ],
    loading: false,
  }),
  computed: {
    headers() {
      return [
        {text: "Nom", value: "item"},
        {
          text: "Type",
          value: "type",
          filter: (value) => {
            if (this.itemType === "Tout") return true;
            return value === this.itemType;
          },
          sortable: false
        },
        {
          text: "Level",
          value: "level",
          filter: (value) => {
            return value >= parseInt(this.itemLevel);
          },
          sortable: false
        },
        {
          text: "Date", value: "date", sortable: true, sort: (a, b) => {
            const datePartsA = a.split("/");
            const yearA = datePartsA[2].split(' ')[0]
            const timeA = datePartsA[2].split(' ')[1].split(':')
            const dateObjectA = new Date(+yearA, datePartsA[1] - 1, +datePartsA[0], timeA[0], timeA[1]);
            const datePartsB = b.split("/");
            const yearB = datePartsB[2].split(' ')[0]
            const timeB = datePartsB[2].split(' ')[1].split(':')
            const dateObjectB = new Date(+yearB, datePartsB[1] - 1, +datePartsB[0], timeB[0], timeB[1])

            return dateObjectA - dateObjectB
          }
        },
        {text: "Coef.", value: "coef"},
        {text: "Focus ?", value: "focus"},
        {text: "Prix", value: "prix"},
        {text: "Rentable ?", value: "rentable"},
        {text: 'Who', value: 'who', align: ' d-none'}
      ];
    },
    itemTable() {
      return this.switchName ? this.items.filter(item => item.who === localStorage.getItem('logged')) : this.items
    }
  },
  watch: {
    options: {
      handler() {
        this.getHistorique();
      },
      deep: true,
    },
  },
  created() {
    if (Object.keys(this.$route.params).length > 0) {
      this.search = this.$route.params.item
    }
  },
  methods: {
    getHistorique() {
      this.loading = true;
      PostService.getHistorique().then((result) => {
        this.items = result;
        this.loading = false;
      });
    },
    resetItemLevel(event) {
      event.preventDefault()
      setTimeout(() => this.itemLevel = 0, 10)
    }
  }
};
</script>
<style>
.nameIcon {
  display: flex;
  text-align: center;
  justify-content: space-between;
  align-items: center;
}
</style>