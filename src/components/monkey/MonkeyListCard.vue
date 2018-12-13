<template>
  <v-card class="ma-1">
    <v-card-title>
      <span class="title">Monkey List</span>
    </v-card-title>
    <v-card-text>
      <ul>
        <li v-for="m in monkeys" :key="m.id">{{m.monkeyName}}</li>
      </ul>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "MonkeyListCard",
  computed: {
    ...mapGetters(["monkeys"])
  },
  methods: {
    ...mapActions(["fetchMonkeys"])
  },
  created: function() {
    if (this.monkeys.length === 0) {
      this.fetchMonkeys();
    }
  }
};
</script>
