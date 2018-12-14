<template>
  <v-alert :value="show" dismissible @click="installer()" type="info">Click to install Application</v-alert>
</template>

<script>
export default {
  name: "InstallApp",
  data() {
    return {
      installBtn: "none",
      installer: undefined,
      show: false
    };
  },
  created() {
    let installPrompt;

    window.addEventListener("beforeinstallprompt", e => {
      e.preventDefault();
      installPrompt = e;
      this.show = true;
    });

    this.installer = () => {
      this.show = false;
      installPrompt.prompt();
      installPrompt.userChoice.then(result => {
        if (result.outcome === "accepted") {
          console.log("Install accepted!");
        } else {
          console.log("Install denied!");
        }
      });
    };
  }
};
</script>
