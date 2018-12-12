<template>
  <v-container fluid fill-height>
    <gmap-map :center="center" :zoom="12" style="width:100%; height: 100%;"></gmap-map>
  </v-container>
</template>

<script>
export default {
  name: "Map",
  data() {
    return {
      center: { lat: 45.508, lng: -73.587 }
    };
  },
  methods: {
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    }
  },
  mounted: function() {
    this.geolocate();
  }
};
</script>

