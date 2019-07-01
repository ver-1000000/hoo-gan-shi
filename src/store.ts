import Vue from "vue";
import Vuex from "vuex";
import { Cell, Line, Script } from "./classes";

Vue.use(Vuex);

interface State {
  caretVIndex: number;
  caretVisibled: boolean;
  currentCell: Cell;
  currentLine: Line;
  script: Script;
  selectionStart: number;
}

export default new Vuex.Store({
  state: {
    caretVIndex: 0,
    caretVisibled: true,
    currentCell: new Cell(),
    currentLine: new Line(),
    script: new Script(localStorage.getItem("script") || ""),
    selectionStart: 0
  } as State,

  // TODO: 参照を切らない更新方法に切り替える
  mutations: {
    caretVIndex(state, value: number) {
      state.caretVIndex = value;
    },
    caretVisibled(state, value: boolean) {
      state.caretVisibled = value;
    },
    currentCell(state, value: Cell) {
      state.currentCell = value;
    },
    currentLine(state, value: Line) {
      state.currentLine = value;
    },
    script(state, value: string) {
      state.script = new Script(value);
      localStorage.setItem("script", state.script.raw);
    },
    selectionStart(state, value: number) {
      state.selectionStart = value;
    }
  },

  actions: {
    script(context, text: string) {
      context.commit("script", text);
      const lines = context.state.script.lines;
      const lastLine = lines[lines.length - 1];
      const length = lastLine.internalCharLength + lastLine.beforeAllCharLength;
    },
    // selectionStartの値をもとに`currentCell`/`currentLine`/`selectionStart`を更新する
    moveTo(context, selectionStartIndex: number) {
      const lines = context.state.script.lines;
      const sumLength = (x: Line) =>
        x.beforeAllCharLength + x.internalCharLength;
      const line =
        lines.find(x => sumLength(x) > selectionStartIndex) || lines[0];
      const currentCell =
        line.cells[selectionStartIndex - line.beforeAllCharLength] ||
        line.cells[line.cells.length - 1];
      context.commit("caretVIndex", currentCell.index);
      context.commit("currentLine", line);
      context.commit("currentCell", currentCell);
      context.commit("selectionStart", selectionStartIndex);
    },
    // 右のセルに移動
    moveToRightCell(context) {
      const { script, currentLine, caretVIndex } = context.state;
      const rightLine = script.lines[currentLine.index - 1] || currentLine;
      const rightCell = rightLine.cells[caretVIndex];
      const rightCharLength = rightLine.internalCharLength - 1;
      const rightCellIndex = rightCell.char ? rightCell.index : rightCharLength;
      const selectionStart = rightCellIndex + rightLine.beforeAllCharLength;
      context
        .dispatch("moveTo", selectionStart)
        .then(() => context.commit("caretVIndex", caretVIndex));
    },
    // 左のセルに移動
    moveToLeftCell(context) {
      const { script, currentLine, caretVIndex } = context.state;
      const leftLine = script.lines[currentLine.index + 1] || currentLine;
      const leftCell = leftLine.cells[caretVIndex];
      const leftCharLength = leftLine.internalCharLength - 1;
      const leftCellIndex = leftCell.char ? leftCell.index : leftCharLength;
      const selectionStart = leftCellIndex + leftLine.beforeAllCharLength;
      context
        .dispatch("moveTo", selectionStart)
        .then(() => context.commit("caretVIndex", caretVIndex));
    },
    // 1つ前のセルに移動
    moveToBeforeCell(context) {
      const selectionStart = Math.max(context.state.selectionStart - 1, 0);
      context.dispatch("moveTo", selectionStart);
    },
    // 1つ後のセルに移動
    moveToAfterCell(context) {
      const selectionMaxLength = context.state.script.internalCharLength;
      const afterSelectionStart = context.state.selectionStart + 1;
      const selectionStart = Math.min(afterSelectionStart, selectionMaxLength);
      context.dispatch("moveTo", selectionStart);
    }
  }
});
