<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <p>図</p>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'

export default {
  created() {
    if (!this.isFinishedSetting) {
      this.$router.push('/setting')
    }
  },
  computed: {
    ...mapState(['isFinishedSetting']),
  },
}
</script>
