<template>
  <v-toolbar app :clipped-left="clipped">
    <v-toolbar-side-icon v-if="isLoggedIn" @click.stop="showNavigation()"></v-toolbar-side-icon>
    <v-btn icon v-if="isLoggedIn" @click.stop="toggleMiniVariant()">
      <fa-icon v-if="miniVariant" icon="chevron-right"/>
      <fa-icon v-else icon="chevron-left"/>
    </v-btn>
    <img src="@/assets/bd-logo.png" height="40px" alt>
    <v-toolbar-title>Monkey Tracker</v-toolbar-title>
    <v-spacer></v-spacer>
    <ProfileMenu/>
  </v-toolbar>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ProfileMenu from "@/components/layout/ProfileMenu.vue";

export default {
  name: "AppHeader",
  components: {
    ProfileMenu
  },
  computed: {
    ...mapGetters(["clipped", "navigation", "isLoggedIn", "miniVariant"])
  },
  methods: {
    ...mapActions(["showNavigation", "toggleMiniVariant"])
  }
};
</script>
