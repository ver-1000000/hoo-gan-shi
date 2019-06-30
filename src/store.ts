import Vue from "vue";
import Vuex from "vuex";
import { Cell, Script } from "./classes";

Vue.use(Vuex);

interface State {
  script: Script;
  selectionStart: number;
  currentCell: Cell;
}

export default new Vuex.Store({
  state: {
    script: new Script(localStorage.getItem("script") || ""),
    selectionStart: 0,
    currentCell: new Cell()
  } as State,
  mutations: {
    scriptRewrite(state, text: string) {
      state.script = new Script(text);
      localStorage.setItem("script", state.script.raw);
    },
    selectionStartChange(state, selectionStart: number) {
      state.selectionStart = selectionStart;
    },
    currentCellUpdate(state, cell: Cell) {
      state.currentCell = cell;
    }
  },
  actions: {
    script(context, text: string) {
      context.commit("scriptRewrite", text);
    },
    currentCell(context, cell: Cell) {
      context.commit("currentCellUpdate", cell);
    },
    selectionStart(context, selectionStart: number) {
      context.commit("selectionStartChange", selectionStart);
    }
  }
});
