<template>
  <div v-if="!isProgressed">
    <GanttElastic :tasks="ganttTasks" :options="options">
      <GanttHeader slot="header"></GanttHeader>
    </GanttElastic>
    <v-form>
      <v-btn color="success" @click="resetting">
        <v-icon>settings</v-icon>Resetting
      </v-btn>
      <v-btn color="warning" @click="reGetTask">
        <v-icon :loading="isProgressed">update</v-icon>Re get task
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import GanttHeader from '@/node_modules/gantt-elastic/dist/Header.common.js'
import GanttElastic from '@/node_modules/gantt-elastic/src/GanttElastic.vue'

let no = 1
const ganttTasks = []
const options = {
  title: {
    label: '',
    html: false,
  },
  taskList: {
    columns: [
      {
        id: 1,
        label: 'ID',
        value: _ => no++,
        width: 40,
      },
      {
        id: 2,
        label: 'Description',
        value: 'label',
        width: 200,
        expander: true,
      },
      {
        id: 3,
        label: 'Assigned to',
        value: 'assigne',
        width: 65,
        html: true,
      },
      {
        id: 5,
        label: '%',
        value: 'progress',
        width: 35,
        style: {
          'task-list-header-label': {
            'text-align': 'center',
            width: '100%',
          },
          'task-list-item-value-container': {
            'text-align': 'center',
          },
        },
      },
    ],
  },
  locale: {
    code: 'en',
    Now: 'Now',
    'X-Scale': 'Zoom-X',
    'Y-Scale': 'Zoom-Y',
    'Task list width': 'Task list',
    'Before/After': 'Expand',
    'Display task list': 'Task list',
  },
}

export default {
  components: {
    GanttHeader,
    GanttElastic,
  },
  data() {
    return { ganttTasks, options, isProgressed: false }
  },
  computed: {
    ...mapState('localStorage', ['tasks']),
    ...mapGetters('localStorage', ['projectName']),
  },
  created() {
    this.ganttTasks = JSON.parse(JSON.stringify(this.tasks))
    this.options.title.label = this.projectName
  },
  methods: {
    ...mapMutations('localStorage', ['setIsFinishedSetting']),
    ...mapActions('localStorage', ['fetchTasks']),
    resetting() {
      this.setIsFinishedSetting(false)
    },
    reGetTask() {
      this.isProgressed = true
      this.fetchTasks().then(_ => {
        this.ganttTasks = JSON.parse(JSON.stringify(this.tasks))
        this.isProgressed = false
      })
    },
  },
}
</script>
