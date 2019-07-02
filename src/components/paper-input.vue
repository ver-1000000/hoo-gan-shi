<template>
  <textarea
    ref="textarea"
    autofocus
    class="input-area"
    :value="script"
    @keyup="updateScript"
    @keydown="arrowManipulation"
    @blur="updateCaretVisibled"
    @focus="updateCaretVisibled"
    @compositionend="moveTo"
  >
  </textarea>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Cell, Line, Script } from "../classes";

interface InputEvent {
  target: { value: string };
}

@Component({})
export default class PaperInput extends Vue {
  private mounted() {
    this.$store.watch(
      (state, getters) => state.selectionStart,
      (newValue, oldValue) => {
        const el = this.$refs.textarea as HTMLTextAreaElement;
        el.setSelectionRange(newValue, newValue);
        el.focus();
      }
    );
  }

  private get script(): string {
    return this.$store.state.script.raw;
  }

  private set script(text: string) {
    this.$store.dispatch("script", text);
  }

  /**
   * EventからselectionStartを取得して`moveTo`する。
   */
  private moveTo({ target }: { target: HTMLTextAreaElement }) {
    this.$store.dispatch("moveTo", target.selectionStart);
  }

  /**
   * 入力中の文字を`this.script`にリアルタイム反映させる。
   */
  private updateScript(el: { target: HTMLTextAreaElement }) {
    if (el.target.value === this.script) return;
    this.script = el.target.value;
    this.moveTo(el);
  }

  /**
   * 常にtextareaにフォーカスしててほしいので、blur時にtextareaにフォーカスを戻す。
   */
  private updateCaretVisibled() {
    const el = this.$refs.textarea as HTMLTextAreaElement;
    this.moveTo({ target: el });
    requestAnimationFrame(() =>
      this.$store.commit("caretVisibled", el === document.activeElement)
    );
  }

  /**
   * 矢印キーの動きを実際のマス上にマッピングする。
   */
  private arrowManipulation(e: KeyboardEvent) {
    const arrowKeys = ["ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft"];
    if (arrowKeys.some(x => x === e.key)) {
      e.preventDefault();
      if (e.key === "ArrowUp") this.$store.dispatch("moveToBeforeCell");
      if (e.key === "ArrowDown") this.$store.dispatch("moveToAfterCell");
      if (e.key === "ArrowRight") this.$store.dispatch("moveToRightCell");
      if (e.key === "ArrowLeft") this.$store.dispatch("moveToLeftCell");
    }
  }
}
</script>

<style scoped lang="scss">
textarea {
  box-sizing: border-box;
  width: 100%;
  height: 200px;
  padding: 0;
}
</style>
