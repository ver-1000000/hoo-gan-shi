import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    script: localStorage.getItem("script") || ""
  } as { script: string },
  mutations: {
    rewite(state, text: string) {
      localStorage.setItem("script", (state.script = text));
    }
  },
  actions: {}
});
