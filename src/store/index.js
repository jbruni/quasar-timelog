import Vue from 'vue'
import Vuex from 'vuex'

import timelog from './time-logger'
import { i18n } from '../boot/i18n'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      timelog
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  Store.dispatch('loadState')

  Store.subscribe(mutation => {
    if (mutation.type === 'SET_LANGUAGE') {
      i18n.locale = mutation.payload
    }
    if (mutation.type !== 'LOAD_STATE') {
      Store.dispatch('saveState')
    }
  })

  return Store
}
