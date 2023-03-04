<template>
  <v-container class="fill-height">
    <v-row
      align="center"
      justify="center"
    >
      <v-slide-x-transition hide-on-leave>
        <loginCard
          v-if="loginView"
          @loginSuccessful="loginSuccessful"
          @register="loginView = false"
          @snackBar="snackBar"
        />
      </v-slide-x-transition>
      <v-slide-x-reverse-transition hide-on-leave>
        <registerCard
          v-if="!loginView"
          @back="loginView = true"
          @snackBar="snackBar"
        />
      </v-slide-x-reverse-transition>
      <v-snackbar
        v-model="snackbar"
        :color="snackBarColor"
        :timeout="5000"
        absolute
        bottom
        elevation="2"
      >
        {{ snackBarMessage }}
      </v-snackbar>
    </v-row>
  </v-container>
</template>

<script setup>
import LoginCard from "./LoginCard";
import RegisterCard from "./RegisterCard"
import {ref} from "vue";

const loginView = ref(true)
const snackBarColor = ref(null)
const snackBarMessage = ref(null)
const snackbar = ref(false)

function snackBar(arg) {
  switch (arg) {
    case 'passwordNoMatch':
      snackBarMessage.value = "Les mots de passe ne correspondent pas"
      snackBarColor.value = "red lighten-1"
      break
    case 'successRegister':
      snackBarMessage.value = "Nouveau compte enregistré avec succès"
      snackBarColor.value = "deep-purple accent-4"
      break
    case 'wrongLogin':
      snackBarMessage.value = "Nom ou mot de passe incorrect(s)"
      snackBarColor.value = "red lighten-1"
      break
    case 'loginSuccessful':
      snackBarMessage.value = "Connexion réussie"
      snackBarColor.value = "deep-purple accent-4"
      break
    case 'nameAlreadyExists':
      snackBarMessage.value = "Ce nom existe déjà, choisis-en un autre"
      snackBarColor.value = "red lighten-1"
      break
    case 'missingInfo':
      snackBarMessage.value = "Il manque des informations à compléter"
      snackBarColor.value = "red lighten-1"
      break
    case 'validationError':
      snackBarMessage.value = "Erreur lors de la validation"
      snackBarColor.value = "red lighten-1"
      break

  }
  snackbar.value = true
}

function loginSuccessful() {
  snackBar('loginSuccessful')
  $router.push({name: 'Home'})
}
</script>

