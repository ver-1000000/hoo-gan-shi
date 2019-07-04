import Vue from "vue";
import Vuex from "vuex";
import { Caret, Char, Script } from "./classes";

Vue.use(Vuex);

interface State {
  caret: Caret;
  script: Script;
}

export default new Vuex.Store({
  state: {
    caret: new Caret(),
    script: new Script().update(localStorage.getItem("script") || "")
  } as State,

  mutations: {
    caret(state, value: Caret) {
      state.caret.update(value);
    },
    script(state, value: string) {
      state.script.update(value);
    }
  },

  actions: {
    script(context, text: string) {
      context.commit("script", text);
    },

    // selectionStartの値をもとに`currentCell`/`currentLine`/`selectionStart`を更新する
    moveTo(context, positionOrChar: number | Char) {
      const characters = context.state.script.characters;
      const char =
        typeof positionOrChar === "number"
          ? characters[positionOrChar]
          : positionOrChar;
      if (char == null) return;
      const x = (char.line % 20) * -30;
      const y = char.index * 20;
      const internalY = char.index;
      const selectionStart = char.position;
      context.commit("caret", { char, internalY, selectionStart, x, y });
    },

    // 右のセルに移動
    moveToRightCell(context) {
      // 変数のエイリアス宣言
      const lpList = context.state.script.linePositionList;
      const characters = context.state.script.characters;
      const char = context.state.caret.char;
      const internalY = context.state.caret.internalY;
      // 以下`position`取得ロジック
      const rightLineFirstPosition = lpList[char.line - 1] || 0;
      const rightLineEndPosition = Math.max(char.position - char.index - 1, 0);
      const rightLineEndChar = characters[rightLineEndPosition] || new Char();
      const index = Math.min(rightLineEndChar.index, internalY);
      const position = rightLineFirstPosition + index;
      context
        .dispatch("moveTo", position)
        .then(() => context.commit("caret", { internalY }));
    },

    // 左のセルに移動
    moveToLeftCell(context) {
      // 変数のエイリアス宣言
      const lpList = context.state.script.linePositionList;
      const characters = context.state.script.characters;
      const char = context.state.caret.char;
      const internalY = context.state.caret.internalY;
      // 以下`position`取得ロジック
      const leftLineFirstPosition = lpList[char.line + 1];
      // 次の行がなければ（現在末行なら）カレットは一番最後のセルに移動させる。
      if (leftLineFirstPosition == null) {
        context
          .dispatch("moveTo", characters[characters.length - 1])
          .then(() => context.commit("caret", { internalY }));
        return;
      }
      const leftLineEndPosition = lpList[char.line + 2] || characters.length;
      const leftLineEndChar = characters[leftLineEndPosition - 1];
      const index = Math.min(leftLineEndChar.index, internalY);
      const position = leftLineFirstPosition + index;
      context
        .dispatch("moveTo", position)
        .then(() => context.commit("caret", { internalY }));
    },

    // 1つ前のセルに移動
    moveToBeforeCell(context) {
      context.dispatch("moveTo", context.state.caret.char.position - 1);
    },

    // 1つ後のセルに移動
    moveToAfterCell(context) {
      context.dispatch("moveTo", context.state.caret.char.position + 1);
    }
  }
});
