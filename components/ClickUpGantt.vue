<template>
  <div>
    <GanttElastic :tasks="clickupTasks" :options="options">
      <GanttHeader slot="header"></GanttHeader>
    </GanttElastic>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import GanttHeader from '@/node_modules/gantt-elastic/dist/Header.common.js'
import GanttElastic from '@/node_modules/gantt-elastic/dist/GanttElastic.common.min.js'

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
        value: 'id',
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
    return { options }
  },
  computed: {
    ...mapGetters(['clickupTasks', 'projectName']),
  },
  created() {
    this.options.title.label = this.projectName
  },
}
</script>
