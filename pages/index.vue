<template>
  <v-content>
    <v-container fluid>
      <Setting v-if="!isFinishedSetting"/>
      <ClickUpGantt v-if="isFinishedSetting"/>
    </v-container>
  </v-content>
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
    ...mapState(['isFinishedSetting']),
  },
}
</script>
