<template>
  <v-card
    class="pl-10 pr-10 pb-5 pt-5"
    elevation="2"
    width="25%"
  >
    <v-card-title>Authentification</v-card-title>
    <v-form
      @submit.prevent="submit"
    >
      <v-card-item>
        <v-text-field
          v-model="email"
          :rules="[rules.required, rules.email]"
          clearable
          hide-details="auto"
          label="E-mail"
          placeholder="shrek@lemarais.com"
          type="email"
        />
      </v-card-item>
      <v-card-item>
        <v-text-field
          v-model="password"
          :append-inner-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required]"
          :type="showPass ? 'text' : 'password'"
          hide-details="auto"
          label="Mot de passe"
          @keydown="keyPress"
          @click:append-inner="showPass = !showPass"
        />
      </v-card-item>

      <v-card-actions>
        <v-btn
          @click="$emit('register')"
        >
          Créer un compte
        </v-btn>
        <v-btn
          :loading="loginLoading"
          color="primary"
          type="submit"
        >
          Connexion
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>
<script setup>

import {ref} from "vue";
import {browserLocalPersistence, setPersistence, signInWithEmailAndPassword} from "firebase/auth";
import {useFirebaseAuth} from "vuefire";
import {useRouter} from "vue-router";

const router = useRouter()
const emit = defineEmits(['snackBar'])

const auth = useFirebaseAuth()

const showPass = ref(false)
const rules = ref({
  required: value => {
    if (value) return true

    return 'Requis.'
  },
  email: value => {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return pattern.test(value) || 'Invalid e-mail.'
  }
})
const loginLoading = ref(false)

const email = ref("")
const password = ref("")

async function submit() {
  loginLoading.value = true
  setPersistence(auth, browserLocalPersistence)
    .then(() => {
      signInWithEmailAndPassword(auth, email.value, password.value)
        .then(async () => {
          emit("snackBar", 'loginSuccessful');
          await router.push('/')
        })
        .catch((error) => {
          emit('snackBar', error.code + "-" + error.message);
        });
    });
  loginLoading.value = false
}
</script>
