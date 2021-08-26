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
          </v-list-item>
          <div class="mx-auto text-center">
            <v-btn
              color="error"
              plain
              @click="logout"
            >
              Deconnexion
            </v-btn>
          </div>
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
      <v-fade-transition mode="out-in">
        <router-view />
      </v-fade-transition>
    </v-main>
  </v-app>
</template>

<script>
import PostService from "./PostService";

export default {
  name: "App",

  data: () => ({
    drawer: null,
    avatarLoaded: false,
    avatar: null,
    name: "",
    color: ""
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
      localStorage.clear()
      this.$router.push({name: 'Login'})
    },
  },
};
</script>
