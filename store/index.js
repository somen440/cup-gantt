import moment from 'moment'
import qs from 'qs'

const Unit = class {
  constructor(id, name, label) {
    this.id = id
    this.name = name
    this.label = label
  }
}
const Team = class extends Unit {
  constructor(id, name) {
    super(id, name, 'team')
  }
}
const Space = class extends Unit {
  constructor(id, name) {
    super(id, name, 'space')
  }
}
const Project = class extends Unit {
  constructor(id, name, lists) {
    super(id, name, 'project')
    this.lists = lists
  }
}
const List = class extends Unit {
  constructor(id, name) {
    super(id, name, 'list')
  }
}
const Assigne = class extends Unit {}
const Task = class extends Unit {
  constructor(id, name, detail, assigne, startedAt, endedAt) {
    super(id, name, 'task')
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
  teamId: null,
  spaceId: null,
  projectId: null,
  listId: null,
})

export const getters = {
  lists: state => {
    return state.projectId !== null
      ? state.projects.find(e => e.id === state.projectId).lists
      : null
  },
  isValidTeamId: state => {
    return state.teamId !== null
  },
  isValidSpaceId: state => {
    return state.spaceId !== null
  },
  isValidProjectId: state => {
    return state.projectId !== null
  },
  isValidTasks: state => {
    return state.tasks.length > 0
  },
  isValidSettings: (_, getters) => {
    return (
      getters.isValidTeamId &&
      getters.isValidSpaceId &&
      getters.isValidProjectId &&
      getters.isValidTasks
    )
  },
  settings: (state, getters) => {
    return getters.isValidSettings
      ? [
          state.teams.find(e => e.id === state.teamId),
          state.spaces.find(e => e.id === state.spaceId),
          state.projects.find(e => e.id === state.projectId),
          getters.isValidListId
            ? state.projects.find(e => e.id === state.listId)
            : new List(-1, '指定なし'),
        ]
      : []
  },
}

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
  setTeamId(state, teamId) {
    state.teamId = teamId
  },
  setSpaceId(state, spaceId) {
    state.spaceId = spaceId
  },
  setProjectId(state, projectId) {
    state.projectId = projectId
  },
  setListId(state, listId) {
    state.listId = listId
  },
}

export const actions = {
  async fetchTeams({ commit }) {
    const { teams } = await this.$axios.$get('/api/v1/team')
    commit('setTeams', teams.map(e => new Team(e.id, e.name)))
  },
  async fetchSpaces({ commit, state }) {
    const { teamId } = state
    const { spaces } = await this.$axios.$get(`/api/v1/team/${teamId}/space`)
    commit('setSpaces', spaces.map(e => new Space(e.id, e.name)))
  },
  async fetchProjects({ commit, state }) {
    const { spaceId } = state
    const { projects } = await this.$axios.$get(
      `/api/v1/space/${spaceId}/project`,
    )
    commit(
      'setProjects',
      projects.map(e => {
        return new Project(
          e.id,
          e.name,
          e.lists.map(e => new List(e.id, e.name)),
        )
      }),
    )
  },
  async fetchTasks({ commit, state }) {
    const { teamId, listId, projectId } = state
    const params = {
      subtasks: true,
      project_ids: [projectId],
    }

    if (listId !== null) {
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
          e.assignees.map(e => new Assigne(e.id, e.username)),
          e.start_date !== null ? moment(e.start_date) : moment(e.date_created),
          e.due_date !== null ? moment(e.due_date) : null,
        )
      }),
    )
  },
}
