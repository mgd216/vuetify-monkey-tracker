<template>
  <v-container style="position: relative;top: 13%;" class="text-xs-center">
    <v-card flat max-width="400">
      <v-card-title primary-title>
        <img src="@/assets/bd-logo.png" height="40px" alt>
        <span class="title">Monkey Tracker</span>
      </v-card-title>
      <v-form>
        <v-text-field prepend-icon="email" name="Email" label="Email" v-model="email"></v-text-field>
        <v-text-field
          prepend-icon="lock"
          name="Password"
          label="Password"
          type="password"
          v-model="password"
        ></v-text-field>
        <v-card-actions>
          <v-btn primary large block>Login</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import fb from "@/firebaseConfig.js";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    login() {
      fb.auth
        .signInWithEmailAndPassword(this.email, this.password)
        .then(user => {
          this.$store.commit("setCurrentUser", user);
          this.$store.dispatch("fetchUserProfile");
          this.$router.push("/dashboard");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
