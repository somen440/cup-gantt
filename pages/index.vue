<template>
  <v-container fluid v-show="loaded">
    <Setting v-if="!isFinishedSetting"/>
    <ClickUpGantt v-if="isFinishedSetting"/>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import ClickUpGantt from '@/components/ClickUpGantt.vue'
import Setting from '@/components/Setting.vue'

export default {
  components: {
    ClickUpGantt,
    Setting,
  },
  computed: {
    ...mapState('localStorage', ['isFinishedSetting']),
    loaded() {
      return this.$store.state.localStorage.status
    },
  },
}
</script>
