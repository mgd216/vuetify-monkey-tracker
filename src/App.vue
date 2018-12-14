<template>
  <v-app dark>
    <AppNav/>
    <AppHeader/>
    <v-content>
      <router-view/>
    </v-content>
    <AppFooter/>
  </v-app>
</template>

<script>
import AppFooter from "@/components/layout/AppFooter.vue";
import AppHeader from "@/components/layout/AppHeader.vue";
import AppNav from "@/components/layout/AppNav.vue";

export default {
  name: "App",
  components: {
    AppFooter,
    AppHeader,
    AppNav
  }
};
</script>
