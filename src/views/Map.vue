<template>
  <v-container fluid fill-height>
    <GmapMap :center="center" :zoom="12" style="width:100%; height: 100%;">
      <GmapMarker
        :position="{lat: m.lat, lng: m.lng}"
        v-for="m in monkeys"
        :key="m.id"
        @click="showMonkey(m)"
      />
    </GmapMap>
    <MonkeyViewDialog ref="monkey_dialog"/>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import MonkeyViewDialog from "@/components/monkey/MonkeyViewDialog.vue";

export default {
  name: "Map",
  components: {
    MonkeyViewDialog
  },
  data() {
    return {
      center: { lat: 0, lng: 0 }
    };
  },
  computed: {
    ...mapGetters(["monkeys"])
  },
  methods: {
    ...mapActions(["fetchMonkeys"]),
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    },
    showMonkey: function(monkey) {
      this.$refs.monkey_dialog.showDialog(monkey);
    }
  },
  created: function() {
    if (this.monkeys.length === 0) {
      this.fetchMonkeys();
    }
  },
  mounted: function() {
    this.geolocate();
  }
};
</script>

