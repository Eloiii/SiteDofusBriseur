<template>
  <v-app>
    <v-main>
      <v-row>
        <v-col>
          <h1 class="display-4">WSH</h1>
        </v-col>
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
                item-text="text.name"
                label="Item"
                placeholder="Recherche un item"
                ><div slot="prepend-item">
                  <v-btn text block @click="dialog = true">
                    Ajouter item
                  </v-btn>
                </div></v-autocomplete
              >
              <AddItem v-model="dialog" />
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <v-row justify="center" style="padding-top: 100px">
        <v-col cols="12" sm="8">
          <v-data-table
            :headers="headers"
            :items="desserts"
            class="elevation-1"
          ></v-data-table>
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
    headers: [
      {
        text: "Dessert (100g serving)",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "Calories", value: "calories" },
      { text: "Fat (g)", value: "fat" },
      { text: "Carbs (g)", value: "carbs" },
      { text: "Protein (g)", value: "protein" },
      { text: "Iron (%)", value: "iron" },
    ],
    desserts: [
      {
        name: "Frozen Yogurt",
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
        iron: "1%",
      },
    ],
    items: [],
  }),
  async created() {
    try {
      this.items = await PostService.getPosts();
      console.log(this.items);
    } catch (err) {
      console.log(err);
    }
  },
};
</script>
