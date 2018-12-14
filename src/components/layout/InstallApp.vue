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
          this.$swal({
            toast: true,
            position: "top-end",
            type: "success",
            title: "Install Success",
            showConfirmButton: false,
            timer: 3000
          });
        } else {
          this.$swal({
            toast: true,
            position: "top-end",
            type: "warning",
            title: "Install Denied",
            showConfirmButton: false,
            timer: 3000
          });
        }
      });
    };
  }
};
</script>
