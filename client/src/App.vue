<template>
  <v-app>
    <v-app-bar
      v-if="this.$route.name !== 'Login' && $vuetify.breakpoint.smAndDown"
      app
      color="transparent"
      flat
    >
      <v-app-bar-nav-icon
        @click="drawer = true"
      />
    </v-app-bar>
    <v-fade-transition
      hide-on-leave
      mode="out-in"
    >
      <v-navigation-drawer
        v-if="this.$route.name !== 'Login'"
        v-model="drawer"
        :permanent="$vuetify.breakpoint.mdAndUp"
        app
      >
        <v-list>
          <v-list-item>
            <v-avatar
              v-if="!avatarLoaded || avatar === '' || avatar === null"
              :color="color"
            >
              <span
                class="white--text text-h5"
              >{{ name.substring(0, 2) }}</span>
            </v-avatar>
            <v-avatar v-if="avatarLoaded && avatar !== '' && avatar !== null">
              <v-img
                :src="avatar"
              />
            </v-avatar>
            <v-list-item-content class="ml-3">
              <v-list-item-title class="headline">
                {{ name }}
              </v-list-item-title>
              <v-list-item-subtitle>
                Connecté(e)
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn
                icon
                @click="accountSettings = true"
              >
                <v-icon>
                  mdi-cog
                </v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
        <v-divider style="margin: 0 !important;" />
        <v-list>
          <v-list-item to="/">
            <v-list-item-icon>
              <v-icon>mdi-pickaxe</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Brisage</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item to="/historique">
            <v-list-item-icon>
              <v-icon>mdi-history</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Historique</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <template v-slot:append>
          <v-switch
            v-model="$vuetify.theme.dark"
            class="ml-5"
            inset
            label="Dark mode"
          />
        </template>
      </v-navigation-drawer>
    </v-fade-transition>
    <v-main>
      <v-dialog
        v-model="accountSettings"
        max-width="600px"
        persistent
      >
        <v-toolbar elevation="0">
          <v-btn
            icon
            @click="accountSettings = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Mon compte</v-toolbar-title>
        </v-toolbar>
        <v-list
          tile
          elevation="0"
        >
          <v-list-item>
            <v-avatar
              v-if="!avatarLoaded || avatar === '' || avatar === null"
              :color="color"
            >
              <span
                class="white--text text-h5"
              >{{ name.substring(0, 2) }}</span>
            </v-avatar>
            <v-avatar v-if="avatarLoaded && avatar !== '' && avatar !== null">
              <v-img
                :src="avatar"
              />
            </v-avatar>
            <v-list-item-content class="ml-3">
              <v-list-item-title class="headline">
                {{ name }}
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn
                color="error"
                text
                @click="logout"
              >
                Deconnexion
              </v-btn>
              <v-btn
                color="error"
                text
                @click="changePass = true"
              >
                Changer mon mot de passe
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-dialog>
      <v-dialog
        v-model="changePass"
        max-width="600px"
        persistent
      >
        <v-toolbar elevation="0">
          <v-btn
            icon
            @click="changePass = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Changer mon mot de passe</v-toolbar-title>
        </v-toolbar>
        <v-card
          class="pl-10 pr-10 pb-5 pt-5"
          tile
          elevation="0"
        >
          <v-text-field
            v-model="oldPass"
            :append-icon="showPassOld ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required]"
            :type="showPassOld ? 'text' : 'password'"
            label="Mot de passe actuel"
            @click:append="showPassOld = !showPassOld"
          />
          <v-text-field
            v-model="newPass1"
            :append-icon="showPass1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required]"
            :type="showPass1 ? 'text' : 'password'"
            label="Nouveau mot de passe"
            @click:append="showPass1 = !showPass1"
          />
          <v-text-field
            v-model="newPass2"
            :append-icon="showPass2 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required]"
            :type="showPass2 ? 'text' : 'password'"
            label="Confirmation nouveau mot de passe"
            @click:append="showPass2 = !showPass2"
          />
          <v-card-actions>
            <div class="mx-auto">
              <v-btn
                color="deep-purple accent-4"
                text
                @click="changePassword"
              >
                Changer mon mot de passe
              </v-btn>
            </div>
          </v-card-actions>
        </v-card>
        <v-snackbar
          v-model="snackbar"
          :color="snackBarColor"
          :timeout="3000"
          absolute
          bottom
          elevation="2"
        >
          {{ snackBarMessage }}
        </v-snackbar>
      </v-dialog>
      <v-fade-transition mode="out-in">
        <router-view />
      </v-fade-transition>
    </v-main>
  </v-app>
</template>

<script>
import PostService from "./PostService";
import bcrypt from "bcryptjs";

export default {
  name: "App",

  data: () => ({
    drawer: null,
    avatarLoaded: false,
    avatar: null,
    name: "",
    accountSettings: false,
    color: "",
    changePass: false,
    rules: {
      required: value => !!value || 'Required.',
    },
    oldPass: null,
    newPass1: null,
    newPass2: null,
    showPassOld: false,
    showPass1: false,
    showPass2: false,
    snackBarMessage: null,
    snackBarColor: null,
    snackbar: false
  }),
  watch: {
    $route() {
      this.checkUser()
    }
  },
  async mounted() {
    this.$vuetify.theme.dark = false
    await this.checkUser()
  },
  methods: {
    async checkUser() {
      const user = await PostService.getUser(localStorage.getItem('logged'))
      if (user === null || user === undefined || user === '') {
        if (this.$route.name !== 'Login') {
          await this.$router.push({name: 'Login'})
        }
      } else {
        this.name = localStorage.getItem('logged')
        this.avatar = user.avatar
        this.color = user.color
        this.avatarLoaded = true
      }
    },
    logout() {
      this.accountSettings = false
      localStorage.clear()
      this.$router.push({name: 'Login'})
    },
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    async changePassword() {
      const self = this
      const user = await PostService.getUser(localStorage.getItem('logged'))
      await bcrypt.compare(this.oldPass, user.password, async function (err, res) {
        if (res) {
          if(self.newPass1 === self.newPass2) {
            await bcrypt.genSalt(10, function (err, salt) {
              bcrypt.hash(self.newPass1, salt, async function (err, hash) {
                const data = {
                  nom: user.nom,
                  password: hash,
                }
                await PostService.registerNewAccount(data)
                self.oldPass = null
                self.newPass1 = null
                self.newPass2 = null
                self.snackBar("changeSuccess")
                await self.sleep(5000)
                self.logout()
                self.changePass = false
              });
            });
          } else {
            self.snackBar("passwordNoMatch")
          }
        } else {
          self.snackBar("wrongPassword")
        }
      });
    },
    snackBar(arg) {
      switch (arg) {
        case 'passwordNoMatch':
          this.snackBarMessage = "Les mots de passe ne correspondent pas"
          this.snackBarColor = "red lighten-1"
          break
        case 'wrongPassword':
          this.snackBarMessage = "Mot de passe actuel incorrect"
          this.snackBarColor = "red lighten-1"
          break
        case 'changeSuccess':
          this.snackBarMessage = "Mot de passe modifié avec succès ! Veuillez vous reconnecter avec le nouveau mot de passe"
          this.snackBarColor = "deep-purple accent-4"
          break
      }
      this.snackbar = true
    },
  },
};
</script>
