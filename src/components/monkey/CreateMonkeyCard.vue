<template>
  <v-card width="100%" max-width="300px" class="ma-1">
    <v-card-text>
      <v-layout column>
        <img src="@/assets/monkey.png" height="200" alt="Vuetify.js" class="mb-5">
        <v-btn block :to="{name: 'CreateMonkey'}">Create a Monkey</v-btn>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "CreateMonkeyCard"
};
</script>

