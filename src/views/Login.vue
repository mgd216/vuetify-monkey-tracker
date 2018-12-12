<template>
  <v-container style="position: relative;top: 13%;" class="text-xs-center">
    <v-card flat max-width="400">
      <v-card-title primary-title>
        <img src="@/assets/bd-logo.png" height="40px" alt>
        <span class="title">Monkey Tracker</span>
      </v-card-title>
      <v-form class="pa-2">
        <v-text-field
          name="Email"
          label="Email"
          v-model="form.email"
          required
          :error-messages="emailErrors"
          @input="$v.form.email.$touch()"
          @blur="$v.form.email.$touch()"
        >
          <fa-icon slot="prepend" icon="envelope"/>
        </v-text-field>
        <v-text-field
          name="Password"
          label="Password"
          type="password"
          v-model="form.password"
          required
          :error-messages="passwordErrors"
          @input="$v.form.password.$touch()"
          @blur="$v.form.password.$touch()"
        >
          <fa-icon slot="prepend" icon="lock"/>
        </v-text-field>
        <v-card-actions>
          <v-btn
            :disabled="$v.form.$invalid"
            primary
            large
            block
            @click.prevent="submitLogin()"
          >Login</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import { email, required } from "vuelidate/lib/validators";
import { mapActions } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      form: {
        email: "",
        password: ""
      }
    };
  },
  validations: {
    form: {
      email: {
        email,
        required
      },
      password: {
        required
      }
    }
  },
  computed: {
    emailErrors: function() {
      const errors = [];
      if (!this.$v.form.email.$dirty) return errors;
      !this.$v.form.email.required && errors.push("Email is required.");
      !this.$v.form.email.email &&
        errors.push("Email form incorrect, must be myname@gmail.com.");
      return errors;
    },
    passwordErrors: function() {
      const errors = [];
      if (!this.$v.form.password.$dirty) return errors;
      !this.$v.form.password.required && errors.push("Password is required.");
      return errors;
    }
  },
  methods: {
    ...mapActions(["login"]),
    submitLogin() {
      this.$v.form.$touch();
      if (this.$v.form.$pending || this.$v.form.$error) return;
      this.login({ email: this.form.email, password: this.form.password });
    }
  }
};
</script>
