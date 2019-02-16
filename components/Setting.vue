<template>
  <v-stepper v-model="e1" v-if="!isFinishedSetting">
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1">チーム選択</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 2" step="2">スペース選択</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 3" step="3">プロジェクト / リスト選択</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="4">確認</v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-select
          @input="setTeamId"
          v-validate="'required'"
          :items="teams"
          label="teams"
          data-vv-name="select"
          required
          item-text="name"
          item-value="id"
        ></v-select>

        <v-btn color="primary" @click="toConfirmTeam" :disabled="!isValidTeamId">Continue</v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-select
          @input="setSpaceId"
          v-validate="'required'"
          :items="spaces"
          label="spaces"
          data-vv-name="select"
          required
          item-text="name"
          item-value="id"
        ></v-select>

        <v-btn color="primary" @click="toConfirmSpace" :disabled="!isValidSpaceId">Continue</v-btn>

        <v-btn flat @click="e1 = 1">Cancel</v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-select
          @input="setProjectId"
          v-validate="'required'"
          :items="projects"
          label="projects"
          data-vv-name="select"
          required
          item-text="name"
          item-value="id"
        ></v-select>

        <v-checkbox v-model="isEnabledList" label="リストを選択する"></v-checkbox>

        <v-select
          v-if="isEnabledList"
          @input="setListId"
          v-validate="'required'"
          :items="lists"
          label="lists"
          data-vv-name="select"
          required
          item-text="name"
          item-value="id"
        ></v-select>

        <v-btn
          color="primary"
          @click="toConfirmSetting"
          :disabled="!(isValidProjectId || (isEnabledList && isValidListId))"
        >Continue</v-btn>

        <v-btn flat @click="e1 = 1">Cancel</v-btn>
      </v-stepper-content>

      <v-stepper-content step="4">
        <v-card v-if="isEnabledSetting">
          <v-container>
            <v-flex>
              <v-list two-line subheader>
                <v-subheader inset>Settings</v-subheader>
                <v-list-tile avatar v-for="setting in settings" :key="setting.id">
                  <v-list-tile-avatar>
                    <v-icon>build</v-icon>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>{{ setting.name }}</v-list-tile-title>
                    <v-list-tile-sub-title>{{ setting.label }}</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>

                <v-divider inset></v-divider>

                <v-subheader inset>Tasks</v-subheader>
                <v-list-tile avatar v-for="task in tasks" :key="task.id">
                  <v-list-tile-avatar>
                    <v-icon>label</v-icon>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>{{ task.name }}</v-list-tile-title>
                    <v-list-tile-sub-title>{{ task.label }}</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-flex>
          </v-container>
        </v-card>

        <v-btn color="primary" @click="finishSetting">Finish</v-btn>

        <v-btn flat @click="e1 = 1">Cancel</v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'

export default {
  data() {
    return {
      e1: 0,
      isEnabledList: false,
      isEnabledSetting: false,
    }
  },
  computed: {
    ...mapState(['teams', 'spaces', 'projects', 'tasks', 'isFinishedSetting']),
    ...mapGetters([
      'lists',
      'isValidTeamId',
      'isValidSpaceId',
      'isValidProjectId',
      'isValidListId',
      'settings',
    ]),
  },
  created() {
    this.fetchTeams()
  },
  methods: {
    ...mapActions(['fetchTeams', 'fetchSpaces', 'fetchProjects', 'fetchTasks']),
    ...mapMutations([
      'setTeamId',
      'setSpaceId',
      'setProjectId',
      'setListId',
      'setIsFinishedSetting',
    ]),
    toConfirmTeam() {
      this.e1 = 2
      this.fetchSpaces()
    },
    toConfirmSpace() {
      this.e1 = 3
      this.fetchProjects()
    },
    toConfirmSetting() {
      this.e1 = 4
      this.fetchTasks().then(() => (this.isEnabledSetting = true))
    },
    finishSetting() {
      if (!confirm('Complete the setup?')) {
        return
      }
      this.setIsFinishedSetting(true)
    },
  },
}
</script>
