<template>
  <v-app>
    <v-navigation-drawer app permanent width="260px" expand-on-hover>
      <v-list nav rounded>
        <v-list-item>
          <v-switch
            v-model="$vuetify.theme.dark"
            inset
            label="Dark mode"
          ></v-switch>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item to="/">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Brisage</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/historique">
          <v-list-item-icon>
            <v-icon>mdi-clock</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Historique des brisages</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>
