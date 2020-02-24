<template>
  <q-page class="bg-grey-3 column">
    <div class="row q-pt-sm q-pl-sm q-pr-sm bg-primary">
      <q-input
        v-model="newTask"
        @keyup.enter="createTask"
        class="q-mr-sm q-mb-sm bg-white col-xs-12 col-sm-6"
        square
        filled
        dense
        :placeholder="$t('createTaskPlaceholder')">
        <template v-slot:append>
          <q-btn
            @click="createTask"
            dense
            flat
            round
            icon="add" />
        </template>
      </q-input>
      <q-input
        :label="$t('selectedTasks')"
        :value="selectedTasks.length"
        class="q-mr-sm q-mb-sm bg-white col-xs-6 col-sm-3"
        square
        filled
        dense
        readonly />
      <q-input
        :label="$t('timeSpent')"
        :value="timeSpentOnSelectedTasks"
        class="q-mr-sm q-mb-sm bg-white col-xs"
        square
        filled
        dense
        readonly />
      <q-btn
        @click="deleteSelectedTasks"
        class="bg-green-2 q-mb-sm"
        dense
        flat
        round
        color="primary"
        icon="delete" />
    </div>
    <q-list
      class="bg-white"
      separator
      bordered>
      <q-item
        v-for="task in tasks"
        :key="task.start"
        @click="toggleTask(task)"
        :class="{ 'bg-green-1': task.selected }"
        clickable
        v-ripple>
        <q-item-section avatar>
          <q-checkbox
            :value="task.selected"
            class="no-pointer-events"
            color="primary">
          </q-checkbox>
        </q-item-section>
        <q-item-section class="task-description">
          <q-item-label>{{ task.description }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label>{{ formatDate(task.start) }}</q-item-label>
        </q-item-section>
        <q-item-section side v-if="task.end">
          <q-icon name="arrow_right_alt"></q-icon>
        </q-item-section>
        <q-item-section side v-if="task.end">
          <q-item-label>{{ formatDate(task.end) }}</q-item-label>
        </q-item-section>
        <q-item-section side v-if="!task.end">
          <q-btn
            @click.stop="endTask(task)"
            dense
            flat
            round
            color="primary"
            icon="stop" />
        </q-item-section>
      </q-item>
    </q-list>
    <div
      v-if="!tasks.length"
      class="no-entries absolute-center">
      <q-icon
        name="check"
        size="100px"
        color="primary" />
      <div class="text-h5 text-primary text-center">
        {{ $t('noEntries') }}
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      newTask: ''
    }
  },
  computed: mapGetters([
    'tasks',
    'selectedTasks',
    'timeSpentOnSelectedTasks',
    'formatDate'
  ]),
  methods: {
    ...mapActions([
      'addTask',
      'toggleTask',
      'endTask',
      'removeSelectedTasks'
    ]),
    deleteSelectedTasks () {
      if (!this.selectedTasks.length) {
        return
      }
      this.$q.dialog({
        title: this.$t('confirm'),
        message: this.$t('deleteConfirmMessage'),
        cancel: { label: this.$t('cancel') },
        persistent: true
      }).onOk(() => {
        this.removeSelectedTasks()
        this.$q.notify(this.$t('deleteNotification'))
      })
    },
    createTask () {
      if (this.newTask === '') {
        return
      }
      this.addTask(this.newTask)
      this.newTask = ''
    }
  }
}
</script>

<style lang="sass">
  .task-description
    word-break: break-word

  .no-entries
    opacity: 0.5
</style>
