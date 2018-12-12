<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout row align-space-around justify-center>
        <CreateMonkeyCard/>
        <MonkeyListCard/>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import CreateMonkeyCard from "@/components/monkey/CreateMonkeyCard.vue";
import MonkeyListCard from "@/components/monkey/MonkeyListCard.vue";

export default {
  name: "Home",
  components: {
    CreateMonkeyCard,
    MonkeyListCard
  }
};
</script>

