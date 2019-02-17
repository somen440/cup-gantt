import moment from 'moment'
import qs from 'qs'
import { Team, Space, Project, List, Task } from '@/models/unit.js'

export const state = () => ({
  teams: [], // Team[]
  spaces: [], // Spaces[],
  projects: [], // Projects[]
  tasks: [], // Task[]
  teamId: null,
  spaceId: null,
  projectId: null,
  listId: null,
  isFinishedSetting: false,
})

export const getters = {
  lists: state => {
    return state.projectId !== null
      ? state.projects.find(e => e.id === state.projectId).lists
      : []
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
  isValidListId: state => {
    return state.listId !== null
  },
  settings: (state, getters) => {
    return getters.isValidSettings
      ? [
          state.teams.find(e => e.id === state.teamId),
          state.spaces.find(e => e.id === state.spaceId),
          state.projects.find(e => e.id === state.projectId),
          getters.isValidListId
            ? getters.lists.find(e => e.id === state.listId)
            : new List(-1, '指定なし'),
        ]
      : []
  },
  clickupTasks: state => {
    return state.tasks.map(e => e.toClickupTask())
  },
  projectName: state => {
    return state.projects.find(e => e.id === state.projectId).name
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
    state.teamId = Number(teamId)
  },
  setSpaceId(state, spaceId) {
    state.spaceId = Number(spaceId)
  },
  setProjectId(state, projectId) {
    state.projectId = Number(projectId)
  },
  setListId(state, listId) {
    state.listId = Number(listId)
  },
  setIsFinishedSetting(state, isFinishedSetting) {
    state.isFinishedSetting = isFinishedSetting
  },
}

export const actions = {
  async fetchTeams({ commit }) {
    const { teams } = await this.$axios.$get('/api/v1/team')
    commit('setTeams', teams.map(e => new Team(Number(e.id), e.name)))
  },
  async fetchSpaces({ commit, state }) {
    const { teamId } = state
    const { spaces } = await this.$axios.$get(`/api/v1/team/${teamId}/space`)
    commit('setSpaces', spaces.map(e => new Space(Number(e.id), e.name)))
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
          Number(e.id),
          e.name,
          e.lists.map(e => new List(Number(e.id), e.name)),
        )
      }),
    )
  },
  async fetchTasks({ commit, state }) {
    const { teamId, listId, projectId } = state
    const params = {
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

    let id = 1
    commit(
      'setTasks',
      tasks.map(e => {
        const assigne =
          e.assignees.length > 0
            ? e.assignees.map(e => e.username).join(',')
            : 'undefinedd'
        const startedAt =
          e.start_date !== null
            ? moment.unix(e.start_date / 1000)
            : moment.unix(e.date_created / 1000)
        const endedAt =
          e.due_date !== null
            ? moment.unix(e.due_date / 1000)
            : startedAt.clone().add(7, 'days') // 終了日が設定されていないものは適当に 1 週間後にする
        return new Task(id++, e.name, assigne, startedAt, endedAt)
      }),
    )
  },
}
