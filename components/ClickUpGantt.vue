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
import { Task } from '@/models/unit.js'

const tasks = [
  new Task(1, 'ホゲホゲタスク', 'ya-sato', moment(), moment().add(3, 'days')),
  new Task(2, 'ホゲホゲタスク', 'ya-sato', moment(), moment().add(3, 'days')),
  new Task(3, 'ホゲホゲタスク', 'ya-sato', moment(), moment().add(3, 'days')),
  new Task(4, 'ホゲホゲタスク', 'ya-sato', moment(), moment().add(3, 'days')),
  new Task(5, 'ホゲホゲタスク', 'ya-sato', moment(), moment().add(3, 'days')),
  new Task(6, 'ホゲホゲタスク', 'ya-sato', moment(), moment().add(3, 'days')),
  new Task(7, 'ホゲホゲタスク', 'ya-sato', moment(), moment().add(3, 'days')),
  new Task(8, 'ホゲホゲタスク', 'ya-sato', moment(), moment().add(3, 'days')),
  new Task(9, 'ホゲホゲタスク', 'ya-sato', moment(), moment().add(3, 'days')),
  new Task(10, 'ホゲホゲタスク', 'ya-sato', moment(), moment().add(3, 'days')),
  new Task(11, 'ホゲホゲタスク', 'ya-sato', moment(), moment().add(3, 'days')),
  new Task(12, 'ホゲホゲタスク', 'ya-sato', moment(), moment().add(3, 'days')),
  new Task(13, 'ホゲホゲタスク', 'ya-sato', moment(), moment().add(3, 'days')),
  new Task(14, 'ホゲホゲタスク', 'ya-sato', moment(), moment().add(3, 'days')),
  new Task(15, 'ホゲホゲタスク', 'ya-sato', moment(), moment().add(3, 'days')),
].map(e => e.toClickupTask())
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
