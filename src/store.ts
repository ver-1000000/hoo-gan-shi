import Vue from "vue";
import Vuex from "vuex";
import { Script } from "./classes";

Vue.use(Vuex);

interface State {
  script: Script;
}

export default new Vuex.Store({
  state: {
    script: new Script(localStorage.getItem("script") || "")
  } as State,
  mutations: {
    rewite(state, text: string) {
      state.script = new Script(text);
      localStorage.setItem("script", state.script.raw);
    }
  },
  actions: {}
});
