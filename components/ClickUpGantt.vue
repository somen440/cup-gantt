<template>
  <div>
    <GanttElastic :tasks="tasks" :options="options">
      <GanttHeader slot="header"></GanttHeader>
    </GanttElastic>
  </div>
</template>

<script>
import moment from 'moment'
import GanttHeader from '@/node_modules/gantt-elastic/dist/Header.common.js'
import GanttElastic from '@/node_modules/gantt-elastic/dist/GanttElastic.common.min.js'

const tasks = [
  {
    id: 1,
    label: 'Y1234 ほげほげをほげげにしたいタスク',
    start: moment(),
    duration: 5 * 24 * 60 * 60,
    progress: 85,
    type: 'task',
    assigne: 'ya-sato',
    style: {
      base: {
        fill: '#0287D0',
        stroke: '#0077C0',
      },
    },
  },
  {
    id: 2,
    label: 'Y2345 ほげほげをほげげにしたいタスク',
    start: moment('20180210 11:11:11'),
    duration: 5 * 24 * 60 * 60,
    progress: 85,
    type: 'task',
    assigne: 'ya-sato',
    style: {
      base: {
        fill: '#0287D0',
        stroke: '#0077C0',
      },
    },
  },
  {
    id: 3,
    label: 'Y3456 ほげほげをほげげにしたいタスク',
    start: moment('20180209 11:11:11'),
    duration: 1 * 24 * 60 * 60,
    progress: 100,
    type: 'task',
    assigne: 'ya-sato',
  },
]

const options = {
  title: {
    label: 'ほげぐるずタスク',
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
    return { tasks, options }
  },
}
</script>
