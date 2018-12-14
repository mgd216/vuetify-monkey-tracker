<template>
  <v-dialog v-model="show" max-width="400px">
    <v-card>
      <v-card-title>
        <span class="title">Monkey: {{monkey.monkeyName}}</span>
      </v-card-title>
      <v-card-text>
        <div>Latitude: {{monkey.lat}}</div>
        <div>Longitude: {{monkey.lng}}</div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="show=false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "MonkeyViewDialog",
  data() {
    return {
      show: false,
      monkey: {}
    };
  },
  methods: {
    showDialog(monkey) {
      this.monkey = monkey;
      this.show = true;
    }
  }
};
</script>
