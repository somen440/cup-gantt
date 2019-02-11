import moment from 'moment'
import qs from 'qs'

const Unit = class {
  constructor(id, name) {
    this.id = id
    this.name = name
  }
}
const Team = class extends Unit {}
const Space = class extends Unit {}
const Project = class extends Unit {
  constructor(id, name, lists) {
    super(id, name)
    this.lists = lists
  }
}
const List = class extends Unit {}
const Assigne = class extends Unit {}
const Task = class extends Unit {
  constructor(id, name, detail, assigne, startedAt, endedAt) {
    super(id, name)
    this.detail = detail
    this.assigne = assigne
    this.startedAt = startedAt
    this.endedAt = endedAt
  }
}

export const state = () => ({
  teams: [], // Team[]
  spaces: [], // Spaces[],
  projects: [], // Projects[]
  tasks: [], // Task[]
})

export const getters = {}

export const mutations = {
  setTeams(state, teams) {
    state.teams = teams
  },
  setSpaces(state, spaces) {
    state.spaces = spaces
  },
  setProjects(state, projects) {
    state.projects = projects
  },
  setTasks(state, tasks) {
    state.tasks = tasks
  },
}

export const actions = {
  async fetchTeams({ commit }) {
    const { teams } = await this.$axios.$get('/api/v1/team')
    commit(
      'setTeams',
      teams.map(e => {
        return new Team(e.id, e.name)
      }),
    )
  },
  async fetchSpaces({ commit }, teamId) {
    const { spaces } = await this.$axios.$get(`/api/v1/team/${teamId}/space`)
    commit(
      'setSpaces',
      spaces.map(e => {
        return new Space(e.id, e.name)
      }),
    )
  },
  async fetchProjects({ commit }, spaceId) {
    const { projects } = await this.$axios.$get(
      `/api/v1/space/${spaceId}/project`,
    )
    commit(
      'setProjects',
      projects.map(e => {
        return new Project(
          e.id,
          e.name,
          e.lists.map(e => {
            return new List(e.id, e.name)
          }),
        )
      }),
    )
  },
  async fetchTasks({ commit }, { teamId, projectId, listId }) {
    const params = { subtasks: true }
    if (isFinite(projectId)) {
      params.project_ids = [projectId]
    }
    if (isFinite(listId)) {
      params.list_ids = [listId]
    }

    const { tasks } = await this.$axios.$get(`/api/v1/team/${teamId}/task`, {
      params: params,
      paramsSerializer: params => {
        // memo: 配列を GET メソッドに載せるときは qs を使う
        return qs.stringify(params)
      },
    })
    commit(
      'setTasks',
      tasks.map(e => {
        return new Task(
          e.id,
          e.name,
          e.text_content,
          e.assignees.map(e => {
            return new Assigne(e.id, e.username)
          }),
          e.start_date !== null ? moment(e.start_date) : moment(e.date_created),
          e.due_date !== null ? moment(e.due_date) : null,
        )
      }),
    )
  },
}
