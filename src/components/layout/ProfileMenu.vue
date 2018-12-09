<template>
    <v-btn v-if="isLoggedIn" primary @click="logout()">logout</v-btn>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
    name: 'ProfileMenu',
    computed: {
        ...mapGetters(["isLoggedIn"])
    },
    methods: {
        ...mapActions(["logout"])
    }
}
</script>

