<template>
  <v-app>
    <v-navigation-drawer
      permanent
    >
      <v-list
        density="compact"
        nav
      >
        <v-list-item prepend-icon="mdi-view-dashboard" title="Home" to="/"></v-list-item>
        <v-list-item prepend-icon="mdi-calendar" title="Historique" to="/historique"></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script setup>
  //
</script>
