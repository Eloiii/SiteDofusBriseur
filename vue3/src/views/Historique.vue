<template>
  <v-container class="mt-10">
    <v-row
      justify="center"
    >
      <v-card width="90%">
        <v-card-title>
          Historique des brisages

          <v-spacer/>
          <v-switch
            v-model="switchName"
            inset
            label="Ne voir que mes brisages"
          />
          <v-spacer/>

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
          v-model:options="options"
          :search="search"
          :sort-by="[{key: 'date', order: 'asc'}]"
          hide-default-footer
          disable-pagination
        >
          <template v-slot:column.type="{ column }">
            <v-select
              v-model="itemType"
              :items="itemsType"
              :value="'Tout'"
              label="Type de l'item"
            />
          </template>
          <template v-slot:column.level="{ column }">
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
              v-model="item.raw.rentable"
              disabled
            />
          </template>
          <template v-slot:item.prix="{ item }">
            {{ new Intl.NumberFormat('fr-FR').format(item.raw.prix) }}
          </template>
          <template v-slot:item.item="{ item }">
            <div class="nameIcon">
                <span>
                  {{ item.raw.item }}
                </span>
              <v-img
                v-if="item.img"
                :src="require(`../assets/items/${item.raw.img}`)"
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
</template>
<script setup>

import {computed, onMounted, ref, watch} from "vue";
import {useCollection, useFirestore} from "vuefire";
import {collection} from "firebase/firestore";
import {useRoute} from "vue-router";

const db = useFirestore()
const items = useCollection(collection(db, 'historiqueBrisage'));
const route = useRoute()

const options = ref({})
const itemLevel = ref(0)
const itemType = ref("Tout")
const search = ref("")
const switchName = ref(false)
const itemsType = ref([
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
])
const loading = ref(false)
const headers = computed(() => {
  return [
    {title: "Nom", key: "item"},
    {
      title: "Type",
      key: "type",
      filter: (value) => {
        if (this.itemType === "Tout") return true;
        return value === this.itemType;
      },
      sortable: false
    },
    {
      title: "Level",
      key: "level",
      filter: (value) => {
        return value >= parseInt(this.itemLevel);
      },
      sortable: false
    },
    {
      title: "Date", key: "date", sortable: true, sort: (a, b) => {
        return a - b
      }
    },
    {title: "Coef.", key: "coef"},
    {title: "Focus ?", key: "focus"},
    {title: "Prix", key: "prix"},
    {title: "Rentable ?", key: "rentable"},
    {title: 'Who', key: 'who', align: ' d-none'}
  ];
})
const itemTable = computed(() => {
  return switchName.value ? items.value.filter(item => item.who === localStorage.getItem('logged')) : items.value
})

watch(options, (newVal, oldVal) => {
  console.log(newVal)
  // getHistorique();
})

onMounted(() => {
  for (const item of items.value) {
    item.date = item.date.toDate()
  }
  if (Object.keys(route.params).length > 0) {
    search.value = route.params.item
  }
})

function getHistorique() {
  loading.value = true;

  PostService.getHistorique().then((result) => {
    this.items = result;
    this.loading = false;
  });
}

function resetItemLevel(event) {
  event.preventDefault()
  setTimeout(() => itemLevel.value = 0, 10)
}

</script>
<style>
.nameIcon {
  display: flex;
  text-align: center;
  justify-content: space-between;
  align-items: center;
}
</style>
