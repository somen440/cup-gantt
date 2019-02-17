<template>
  <v-container fluid v-show="loaded">
    <Setting v-if="!isFinishedSetting"/>
    <ClickUpGantt v-if="isFinishedSetting"/>
    <v-layout>
      <v-flex>
        <v-btn @click="initialize">initialize</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
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
  methods: {
    ...mapMutations(['initialize']),
  },
}
</script>
