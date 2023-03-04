<template>
  <v-app>
    <v-navigation-drawer
      permanent
      v-if="currentUser"
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
import {useRouter} from "vue-router";
import {getCurrentUser} from "vuefire";
import {ref} from "vue"

const router = useRouter()
let currentUser = ref({})

router.beforeEach(async (to) => {
  // routes with `meta: { requiresAuth: true }` will check for the users, others won't
  if (to.meta.requiresAuth) {
    currentUser.value = await getCurrentUser()
    // if the user is not logged in, redirect to the login page
    if (!currentUser.value) {
      return {
        path: '/login',
        query: {
          redirect: to.fullPath,
        },
      }
    }
  }
})
</script>
