<template>
  <v-menu v-show="isLoggedIn" bottom left>
    <v-avatar slot="activator" v-if="userProfile.profileImgUrl">
      <img :src="userProfile.profileImgUrl" alt="avatar">
    </v-avatar>
    <fa-icon v-else slot="activator" size="2x" icon="user"/>
    <v-list>
      <v-list-tile to="Profile">
        <v-list-tile-title>Profile</v-list-tile-title>
      </v-list-tile>

      <v-divider></v-divider>

      <v-list-tile @click="logout()">
        <v-list-tile-title>Logout</v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "ProfileMenu",
  computed: {
    ...mapGetters(["isLoggedIn", "userProfile"])
  },
  methods: {
    ...mapActions(["logout"])
  }
};
</script>

