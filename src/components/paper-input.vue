<template>
  <textarea
    ref="textarea"
    autofocus
    class="input-area"
    :value="script"
    @keydown="arrowManipulation"
    @keyup="updateScript"
    @blur="updateCaretVisibled"
    @focus="updateCaretVisibled"
    @compositionend="moveTo"
  >
  </textarea>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Script } from "../classes";

@Component({})
export default class PaperInput extends Vue {
  private mounted() {
    this.$store.watch(
      (state, getters) => state.caret.char,
      (newValue, oldValue) => {
        const el = this.$refs.textarea as HTMLTextAreaElement;
        el.setSelectionRange(newValue.position, newValue.position);
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
   * 入力中の文字を`this.script`にリアルタイム反映させる。 TODO: 差分検出で効率化
   */
  private updateScript(el: { target: HTMLTextAreaElement }) {
    if (el.target.value === this.script) return;
    this.script = el.target.value;
    this.moveTo(el);
  }

  /**
   * blur/focusのタイミングでキャレットの表示を更新する。
   */
  private updateCaretVisibled() {
    requestAnimationFrame(() => {
      const el = this.$refs.textarea as HTMLTextAreaElement;
      if (document.activeElement instanceof SVGElement) el.focus();
      this.$store.commit("caret", { visibled: el === document.activeElement });
    });
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
  height: 100px;
  padding: 0;
}
</style>
