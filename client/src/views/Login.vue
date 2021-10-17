<template>
  <div id="page">
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
  </div>
</template>

<script>
import LoginCard from "./LoginCard";
import RegisterCard from "./RegisterCard"

export default {
  name: "Login",
  components: {LoginCard, RegisterCard},
  data() {
    return {
      loginView: true,
      snackBarColor: null,
      snackBarMessage: null,
      snackbar: false
    }
  },
  methods: {
    snackBar(arg) {
      switch (arg) {
        case 'passwordNoMatch':
          this.snackBarMessage = "Les mots de passe ne correspondent pas"
          this.snackBarColor = "red lighten-1"
          break
        case 'successRegister':
          this.snackBarMessage = "Nouveau compte enregistré avec succès"
          this.snackBarColor = "deep-purple accent-4"
          break
        case 'wrongLogin':
          this.snackBarMessage = "Nom ou mot de passe incorrect(s)"
          this.snackBarColor = "red lighten-1"
          break
        case 'loginSuccessful':
          this.snackBarMessage = "Connexion réussie"
          this.snackBarColor = "deep-purple accent-4"
          break
        case 'nameAlreadyExists':
          this.snackBarMessage = "Ce nom existe déjà, choisis-en un autre"
          this.snackBarColor = "red lighten-1"
          break
        case 'missingInfo':
          this.snackBarMessage = "Il manque des informations à compléter"
          this.snackBarColor = "red lighten-1"
          break
        case 'validationError':
          this.snackBarMessage = "Erreur lors de la validation"
          this.snackBarColor = "red lighten-1"
          break

      }
      this.snackbar = true
    },
    loginSuccessful() {
      this.snackBar('loginSuccessful')
      this.$router.push({name: 'Home'})
    }
  }
}
</script>

<style scoped>
#page {
  background-color: lightgray;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
}
</style>