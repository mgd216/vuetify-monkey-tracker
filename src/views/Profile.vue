<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <v-card width="100%" max-width="600px">
          <v-card-title>Update User Profile</v-card-title>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs12 md6>
                <PictureInput
                  ref="profile_picture"
                  width="600"
                  height="600"
                  margin="16"
                  accept="image/jpeg, image/png"
                  size="1"
                  radius="50"
                  :prefill="userProfileImg"
                  button-class="btn"
                  @change="onChange"
                ></PictureInput>
              </v-flex>
              <v-flex xs12 md6>
                <v-form class="pa-2">
                  <v-text-field disabled v-model="email" label="Email"></v-text-field>
                  <v-text-field
                    name="firstName"
                    label="First Name"
                    :counter="20"
                    v-model="form.firstName"
                    :error-messages="firstNameErrors"
                    @input="$v.form.firstName.$touch()"
                    @blur="$v.form.firstName.$touch()"
                  ></v-text-field>
                  <v-text-field
                    name="lastName"
                    label="Last Name"
                    :counter="20"
                    v-model="form.lastName"
                    :error-messages="lastNameErrors"
                    @input="$v.form.lastName.$touch()"
                    @blur="$v.form.lastName.$touch()"
                  ></v-text-field>
                  <v-card-actions>
                    <v-btn
                      :disabled="$v.form.$invalid"
                      primary
                      large
                      block
                      @click.prevent="update()"
                    >Update Profile</v-btn>
                  </v-card-actions>
                </v-form>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { maxLength, minLength } from "vuelidate/lib/validators";
import PictureInput from "vue-picture-input";

export default {
  name: "Profile",
  components: {
    PictureInput
  },
  data() {
    return {
      form: {
        firstName: "",
        lastName: ""
      }
    };
  },
  validations: {
    form: {
      firstName: {
        minLength: minLength(3),
        maxLength: maxLength(20)
      },
      lastName: {
        minLength: minLength(3),
        maxLength: maxLength(20)
      }
    }
  },
  computed: {
    ...mapGetters(["currentUser", "userProfile", "userProfileImg"]),
    email: function() {
      return this.currentUser.email;
    },
    firstNameErrors: function() {
      const errors = [];
      if (!this.$v.form.firstName.$dirty) return errors;
      !this.$v.form.firstName.minLength &&
        errors.push("First Name must be more than 3 characters.");
      !this.$v.form.firstName.maxLength &&
        errors.push("First Name is a max of 20 characters.");
      return errors;
    },
    lastNameErrors: function() {
      const errors = [];
      if (!this.$v.form.lastName.$dirty) return errors;
      !this.$v.form.lastName.minLength &&
        errors.push("First Name must be more than 3 characters.");
      !this.$v.form.lastName.maxLength &&
        errors.push("Last Name is a max of 20 characters.");
      return errors;
    }
  },
  methods: {
    ...mapActions(["updateProfile", "updateProfilePhoto"]),
    update: function() {
      this.updateProfile({
        firstName: this.form.firstName,
        lastName: this.form.lastName
      });
    },
    onChange: function() {
      this.updateProfilePhoto(this.$refs.profile_picture.file);
    }
  },
  mounted: function() {
    let userProfile = { ...this.userProfile };
    this.form.firstName = userProfile.firstName;
    this.form.lastName = userProfile.lastName;
  }
};
</script>
