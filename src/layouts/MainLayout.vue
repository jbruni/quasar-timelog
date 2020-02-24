<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
      </q-toolbar>
      <div class="q-px-lg q-pt-xl q-mb-md">
        <div class="text-h3">{{ appTitle }}</div>
      </div>
      <q-img
        src="statics/images/clocks.jpg"
        class="header-image absolute-top" />
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="200"
      :breakpoint="500"
    >
      <q-scroll-area style="height: calc(100% - 164px); margin-top: 164px; border-right: 1px solid #ddd">
        <q-list padding>
          <q-item
            to="/"
            exact
            clickable
            v-ripple>
            <q-item-section avatar>
              <q-icon name="timer" />
            </q-item-section>

            <q-item-section>
              Time
            </q-item-section>
          </q-item>

          <q-item
            to="/help"
            exact
            clickable
            v-ripple>
            <q-item-section avatar>
              <q-icon name="help" />
            </q-item-section>

            <q-item-section>
              Help
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <q-img class="drawer-header absolute-top" src="statics/images/clocks.jpg" style="height: 164px">
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img :src="user.avatar">
          </q-avatar>
          <div class="text-weight-bold text-grey-9">{{ user.name }}</div>
          <div class="text-grey-9">{{ user.twitter }}</div>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container>
      <keep-alive>
        <router-view />
      </keep-alive>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'MainLayout',

  computed: {
    ...mapGetters([
      'appTitle',
      'user',
    ]),

    leftDrawerOpen: {
      get () {
        return this.$store.state.timelog.leftDrawerOpen
      },
      set (value) {
        this.$store.commit('SET_LEFT_DRAWER_OPEN', value)
      }
    }
  }
}
</script>

<style lang="sass">
  .header-image
    height: 100%
    z-index: -1
    opacity: 0.2
    filter: grayscale(100%)

  .drawer-header .q-img__image
      opacity: 0.3
</style>
