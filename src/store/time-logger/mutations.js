export function SET_LEFT_DRAWER_OPEN (state, payload) {
  state.leftDrawerOpen = Boolean(payload)
}

export function ADD_TASK ({ tasks }, task) {
  tasks.unshift(task)
}

export function TOGGLE_TASK_SELECTED ({ tasks }, task) {
  const item = tasks.find(item => item === task)
  item.selected = !item.selected
}

export function SET_TASK_END ({ tasks }, { task, end }) {
  const item = tasks.find(item => item === task)
  item.end = Number(end)
}

export function REMOVE_TASK ({ tasks }, task) {
  const itemIndex = tasks.findIndex(item => item === task)
  tasks.splice(itemIndex, 1)
}
