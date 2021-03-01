<template>
  <v-app>
    <v-main>
      <v-row justify="center" style="padding-top: 50px">
        <v-col cols="12" sm="8">
          <v-card class="mx-auto" max-width="1500" tile>
            <v-list rounded>
              <v-subheader>Historique des brisages</v-subheader>
              <template v-for="(item, index) in historique.slice().reverse()">
                <v-divider :key="index"></v-divider>
                <v-list-item :key="index">
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
              </template>
            </v-list>
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
    historique: [],
  }),
  async created() {
    try {
      this.historique = await PostService.getHistorique();
    } catch (err) {
      console.log(err);
    }
  },
};
</script>