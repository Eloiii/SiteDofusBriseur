<template>
  <v-card
    class="pl-10 pr-10 pb-5 pt-5"
    elevation="2"
  >
    <v-card-title>Créer un compte</v-card-title>
    <v-form
      ref="form"
      v-model="valid"
    >
      <v-text-field
        ref="login"
        v-model="login"
        :rules="[rules.required]"
        label="Nom"
        required
      />
      <v-text-field
        v-model="password"
        :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[rules.required]"
        :type="showPass ? 'text' : 'password'"
        label="Mot de passe"
        required
        @click:append="showPass = !showPass"
      />
      <v-text-field
        v-model="passwordValidation"
        :append-icon="showPassVal ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[rules.required]"
        :type="showPassVal ? 'text' : 'password'"
        label="Valider le mot de passe"
        required
        @click:append="showPassVal = !showPassVal"
      />
      <v-text-field
        v-model="imageLink"
        label="Lien d'une image de profil"
      />
      <p class="title">
        Couleur :
      </p>
      <v-color-picker
        v-model="color"
        :rules="[rules.required]"
        class="ma-2"
        hide-inputs
        hide-mode-switch
        required
        swatches-max-height="300px"
      />
    </v-form>
    <p
      v-if="imageLink || login"
      class="title"
    >
      Prévisualisation :
    </p>
    <div
      v-if="imageLink || login"
      style="display: flex; justify-content: center; align-items: center"
    >
      <v-avatar
        v-if="imageLink"
        size="64"
      >
        <v-img
          :src="imageLink"
          alt="Icône"
        />
      </v-avatar>
      <v-avatar
        v-else
        :color="`rgba(${color.rgba.r},${color.rgba.g},${color.rgba.b},${color.rgba.a})`"
      >
        <span
          class="white--text text-h5"
        >{{ login.substring(0, 2) }}</span>
      </v-avatar>
      <div
        class="title ml-3 login_preview"
      >
        {{ login }}
      </div>
    </div>
    <v-card-actions>
      <v-btn
        color="grey"
        text
        @click="$emit('back')"
      >
        Retour
      </v-btn>
      <v-btn
        color="deep-purple accent-4"
        text
        @click="register()"
      >
        Créer mon compte
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>

import {onMounted, ref} from "vue";

const valid = ref(false)
const color = ref(null)
const showPass = ref(false)
const showPassVal = ref(false)
const imageLink = ref(null)
const rules = ref({
  required: value => !!value || 'Requis.',
})
const login = ref(null)
const password = ref(null)
const passwordValidation = ref(null)

onMounted(() => {
  this.$refs.login.focus()
})

async function register() {
  if (!this.$refs.form.validate()) {
    this.$emit('snackBar', 'validationError')
  } else {
    if (this.password !== this.passwordValidation) {
      this.$emit('snackBar', 'passwordNoMatch')
    } else {
      const testUserName = await PostService.getUser(this.login)
      if (testUserName !== '') {
        this.$emit('snackBar', 'nameAlreadyExists')
      } else {
        // await bcrypt.genSalt(10, function (err, salt) {
        //   bcrypt.hash(self.password, salt, function (err, hash) {
        //     const data = {
        //       nom: self.login,
        //       password: hash,
        //       color: `rgba(${self.color.rgba.r},${self.color.rgba.g},${self.color.rgba.b},${self.color.rgba.a})`,
        //       avatar: self.imageLink,
        //     }
        //     self.$emit('snackBar', 'successRegister')
        //     PostService.registerNewAccount(data).then(() => {
        //       self.$emit('back')
        //     })
        //   });
        // });
      }
    }
  }
}
</script>

<style scoped>
.login_preview {
  max-width: 10vw;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>
