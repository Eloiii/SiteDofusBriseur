<template>
  <v-card
    class="pl-10 pr-10 pb-5 pt-5"
    elevation="2"
    width="25%"
  >
    <v-card-title>Créer un compte</v-card-title>
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
          @click:append-inner="showPass = !showPass"
        />
      </v-card-item>

      <v-card-item>
        <v-text-field
          v-model="passwordValidation"
          :append-inner-icon="showPassVal ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required]"
          :type="showPassVal ? 'text' : 'password'"
          hide-details="auto"
          label="Valider le mot de passe"
          @click:append-inner="showPassVal = !showPassVal"
        />
      </v-card-item>


      <v-card-actions>
        <v-btn
          @click="$emit('back')"
        >
          Retour
        </v-btn>
        <v-btn
          color="primary"
          type="submit"
        >
          Créer mon compte
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script setup>

import {ref} from "vue";
import {useFirebaseAuth} from "vuefire";
import {createUserWithEmailAndPassword} from 'firebase/auth'

const emit = defineEmits(['snackBar', 'back'])

const auth = useFirebaseAuth()

const showPass = ref(false)
const showPassVal = ref(false)

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
const email = ref("")
const password = ref("")
const passwordValidation = ref("")


async function submit(event) {
  let res = await event
  if (!res.valid)
    return
  if (password.value !== passwordValidation.value) {
    emit('snackBar', 'passwordNoMatch')
    return
  }
  try {
    await createUserWithEmailAndPassword(auth, email.value, password.value);
    emit("snackBar", "successRegister");
    emit('back')
  } catch (error) {
    emit('snackBar', error.code + "-" + error.message);
  }

}
</script>

