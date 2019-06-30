import Vue from "vue";
import Vuex from "vuex";
import { Cell, Line, Script } from "./classes";

Vue.use(Vuex);

interface State {
  script: Script;
  selectionStart: number;
  currentLine: Line;
}

export default new Vuex.Store({
  state: {
    script: new Script(localStorage.getItem("script") || ""),
    selectionStart: 0,
    currentLine: new Line()
  } as State,
  mutations: {
    scriptRewrite(state, text: string) {
      state.script = new Script(text);
      localStorage.setItem("script", state.script.raw);
    },
    selectionStartChange(state, selectionStart: number) {
      const line =
        state.script.lines.find(
          line =>
            line.beforeAllCharLength + line.internalCharLength > selectionStart
        ) || state.script.lines[0];
      state.currentLine = line;
      state.selectionStart = selectionStart;
    }
  },
  actions: {
    script(context, text: string) {
      context.commit("scriptRewrite", text);
    },
    selectionStart(context, selectionStart: number) {
      context.commit("selectionStartChange", selectionStart);
    }
  }
});
