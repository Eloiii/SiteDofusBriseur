<template>
  <v-card
    class="pl-10 pr-10 pb-5 pt-5"
    elevation="2"
  >
    <v-card-title>Authentification</v-card-title>
    <v-text-field
      ref="login"
      v-model="login"
      :rules="[rules.required]"
      label="Nom"
      @keydown="keyPress"
    />
    <v-text-field
      v-model="password"
      :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="[rules.required]"
      :type="showPass ? 'text' : 'password'"
      label="Mot de passe"
      @keydown="keyPress"
      @click:append="showPass = !showPass"
    />
    <v-card-actions>
      <v-btn
        color="error"
        text
        @click="$emit('register')"
      >
        Créer un compte
      </v-btn>
      <v-btn
        :loading="loginLoading"
        color="deep-purple accent-4"
        text
        @click="loginMethod()"
      >
        Connexion
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import PostService from "../PostService";

const bcrypt = require('bcryptjs');
export default {
  name: 'LoginCard',
  data() {
    return {
      showPass: false,
      rules: {
        required: value => !!value || 'Required.',
      },
      loginLoading: false,
      login: null,
      password: null
    }
  },
  mounted() {
    this.$refs.login.focus()
  },
  methods: {
    async loginMethod() {
      this.loginLoading = true
      const self = this
      const user = await PostService.getUser(this.login)
      await bcrypt.compare(this.password, user.password, function (err, res) {
        if (res) {
          self.$emit('loginSuccessful')
          localStorage.setItem('logged', self.login)
        } else {
          self.$emit('snackBar', 'wrongLogin')
        }
        self.loginLoading = false
      });
    },
    keyPress(event) {
      if (event.key === 'Enter') {
        this.loginMethod()
      }
    }
  }
}
</script>
