<template>
  <v-app>
    <v-main>
      <v-row justify="center" style="padding-top: 50px">
        <v-col cols="12" sm="10">
          <v-card>
            <v-card-title>
              Historique des brisages
              <v-spacer></v-spacer>

              <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Recherche item"
                  single-line
                  hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
                :headers="headers"
                :items="itemTable"
                class="elevation-2"
                :items-per-page="20"
                :search="search"
                :options.sync="options"
                :loading="loading"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
            >
              <template v-slot:body.append>
                <tr>
                  <td></td>
                  <td>
                    <v-select
                        :items="itemsType"
                        v-model="itemType"
                        label="Type de l'item"
                        :value="'Tout'"
                    ></v-select>
                  </td>
                  <td>
                    <v-text-field
                        v-model="itemLevel"
                        label="Level minimum"
                        max-width="25px"
                    ></v-text-field>
                  </td>

                  <td colspan="5"></td>
                </tr>
              </template>
              <template v-slot:item.rentable="{ item }">
                <v-simple-checkbox
                    v-model="item.rentable"
                    disabled
                ></v-simple-checkbox>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>
<script>
import PostService from "../PostService";

export default {
  data: () => ({
    sortBy: "date",
    sortDesc: true,
    options: {},
    itemLevel: 0,
    itemType: "Tout",
    search: "",
    itemTable: [],
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
        },
        {
          text: "Level",
          value: "level",
          filter: (value) => {
            return value >= parseInt(this.itemLevel);
          },
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
      ];
    },
  },
  watch: {
    options: {
      handler() {
        this.getHistorique();
      },
      deep: true,
    },
  },
  methods: {
    getHistorique() {
      this.loading = true;
      PostService.getHistorique().then((result) => {
        this.itemTable = result;
        this.loading = false;
      });
    },
  },
};
</script>