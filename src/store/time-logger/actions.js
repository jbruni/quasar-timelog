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
