import Vue from 'vue'
import { LocalStorage } from 'quasar'

export function saveState({ state }) {
  LocalStorage.set('timelog-state', JSON.stringify(state))
}

export function loadState({ commit }) {
  const state = JSON.parse(LocalStorage.getItem('timelog-state') || '{}')
  commit('LOAD_STATE', state)
  if (state.language) {
    Vue.nextTick(() => commit('SET_LANGUAGE', state.language))
  }
}

export function addTask ({ state, commit, dispatch }, newTask) {
  const currentTask = state.tasks[0]
  if (currentTask) {
    dispatch('endTask', currentTask)
  }
  const task = {
    description: newTask,
    start: Date.now(),
    end: null,
    selected: false
  }
  commit('ADD_TASK', task)
}

export function toggleTask ({ commit }, task) {
  commit('TOGGLE_TASK_SELECTED', task)
}

export function endTask ({ commit }, task) {
  const end = Date.now()
  commit('SET_TASK_END', { task, end })
}

export function removeSelectedTasks({ getters, commit }) {
  const tasks = getters.selectedTasks
  tasks.forEach(task => commit('REMOVE_TASK', task))
}

export function updateTaskDescription ({ commit }, { task, description }) {
  commit('SET_TASK_DESCRIPTION', { task, description })
}
