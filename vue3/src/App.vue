<template>
  <v-app>
    <v-navigation-drawer
      permanent
      v-if="currentUser !== null && Object.keys(currentUser).length > 0"
    >
      <v-list
        density="compact"
        nav
      >
        <v-list-item prepend-icon="mdi-view-dashboard" title="Home" to="/"></v-list-item>
        <v-list-item prepend-icon="mdi-calendar" title="Historique" to="/historique"></v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn
            @click="logout"
            block
            variant="text"
            color="error"
          >
            Se déconnecter
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script setup>
import {useRouter} from "vue-router";
import {getCurrentUser, useFirebaseAuth} from "vuefire";
import {ref} from "vue"
import {signOut} from 'firebase/auth'

const router = useRouter()
const auth = useFirebaseAuth()

let currentUser = ref({})

router.beforeEach(async (to) => {
  // routes with `meta: { requiresAuth: true }` will check for the users, others won't
  if (to.meta.requiresAuth) {
    currentUser.value = await getCurrentUser()
    console.log(currentUser.value)
    // if the user is not logged in, redirect to the login page
    if (!currentUser.value) {
      return {
        path: '/login',
      }
    }
  }
})

async function logout() {
  await signOut(auth)
  currentUser.value = getCurrentUser()
  await router.push('/login')
}
</script>
