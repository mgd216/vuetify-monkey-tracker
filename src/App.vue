<template>
  <v-app dark>
    <v-navigation-drawer
     v-if="isLoggedIn"
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    >
      <v-list>
        <v-list-tile>
          <v-list-tile-action>
            <fa-icon icon="home" />
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app :clipped-left="clipped">
      <v-toolbar-side-icon v-if="isLoggedIn" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <!-- <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>-->
      <!-- <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>web</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>remove</v-icon>
      </v-btn>-->
      <img src="@/assets/bd-logo.png" height="40px" alt>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <ProfileMenu />
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2018</span>
      <v-spacer></v-spacer>
      <span>MFA (Matt's Fast Apps)</span>
    </v-footer>
  </v-app>
</template>

<script>
import {mapGetters} from 'vuex'
import ProfileMenu from '@/components/layout/ProfileMenu.vue'

export default {
  name: 'App',
  components: {
    ProfileMenu
  },
  data () {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Monkey Tracker'
    }
  },
  computed: {
    ...mapGetters(["isLoggedIn"])
  }
}
</script>
