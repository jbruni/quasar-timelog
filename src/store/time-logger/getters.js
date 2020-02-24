import { date } from 'quasar'
import prettyMilliseconds from 'pretty-ms'

export function user ({ user }) {
  return user
}

export function tasks ({ tasks }) {
  return tasks
}

export function selectedTasks ({ tasks }) {
  return tasks.filter(({ selected }) => selected)
}

export function timeSpentOnSelectedTasks (state, { selectedTasks }) {
  const milliseconds = selectedTasks.reduce((totalTimeSpent, task) => {
    const timeSpent = Math.max(0, task.end - task.start)
    return totalTimeSpent + timeSpent
  }, 0)
  return prettyMilliseconds(milliseconds)
}

export function formatDate({ dateFormat }) {
  return dateValue => date.formatDate(dateValue, dateFormat)
}
