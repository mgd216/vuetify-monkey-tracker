<template>
  <v-navigation-drawer
    v-if="isLoggedIn"
    persistent
    :mini-variant="miniVariant"
    :clipped="clipped"
    v-model="show"
    enable-resize-watcher
    fixed
    app
  >
    <v-list>
      <v-list-tile to="Home">
        <v-list-tile-action>
          <fa-icon icon="home"/>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Home</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile to="Map">
        <v-list-tile-action>
          <fa-icon icon="globe"/>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Map</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "AppNav",
  data() {
    return {
      show: false
    };
  },
  computed: {
    ...mapGetters(["clipped", "navigation", "isLoggedIn", "miniVariant"])
  },
  watch: {
    navigation() {
      this.show = true;
    }
  }
};
</script>
