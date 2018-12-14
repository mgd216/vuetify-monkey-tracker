<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <v-card>
          <v-card-title>
            <img src="@/assets/monkey.png" height="40" alt="Monkey" class="mr-5">
            <span class="title">Create a Monkey</span>
          </v-card-title>
          <v-card-text>
            <v-form class="pa-2">
              <v-text-field
                name="monkeyName"
                label="Monkey Name"
                :counter="50"
                required
                v-model="form.monkeyName"
                :error-messages="monkeyNameErrors"
                @input="$v.form.monkeyName.$touch()"
                @blur="$v.form.monkeyName.$touch()"
              ></v-text-field>
            </v-form>
            <GmapMap :center="center" :zoom="12" style="width:400px; height: 300px;">
              <GmapMarker
                ref="monkey_marker"
                :position="center"
                :clickable="true"
                :draggable="true"
              />
            </GmapMap>
          </v-card-text>
          <v-card-actions>
            <v-btn
              :disabled="$v.form.$invalid"
              primary
              large
              block
              @click.prevent="create()"
            >Create Monkey</v-btn>
          </v-card-actions>
        </v-card>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import { maxLength, minLength, required } from "vuelidate/lib/validators";

export default {
  name: "CreateMonkey",
  data() {
    return {
      form: {
        monkeyName: ""
      },
      position: { lat: 0, lng: 0 },
      center: { lat: 0, lng: 0 }
    };
  },
  validations: {
    form: {
      monkeyName: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(20)
      }
    }
  },
  computed: {
    monkeyNameErrors: function() {
      const errors = [];
      if (!this.$v.form.monkeyName.$dirty) return errors;
      !this.$v.form.monkeyName.required &&
        errors.push("Monkey Name is required.");
      !this.$v.form.monkeyName.minLength &&
        errors.push("Monkey Name must be more than 3 characters.");
      !this.$v.form.monkeyName.maxLength &&
        errors.push("Monkey Name is a max of 50 characters.");
      return errors;
    }
  },
  methods: {
    ...mapActions(["createMonkey"]),
    clearForm: function() {
      this.form = {
        monkeyName: ""
      };
      this.center = { lat: 0, long: 0 };
      this.position = { lat: 0, long: 0 };
    },
    create: function() {
      this.createMonkey({
        monkeyName: this.form.monkeyName,
        lat: this.$refs.monkey_marker.$markerObject.getPosition().lat(),
        lng: this.$refs.monkey_marker.$markerObject.getPosition().lng()
      }).then(() => {
        this.clearForm();
        this.$router.push({ name: "Home" });
      });
    },
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        this.position = {
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

