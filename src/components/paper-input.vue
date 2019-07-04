<template>
  <textarea
    ref="textarea"
    autofocus
    class="input-area"
    :style="position"
    :value="script.raw"
    @keydown="arrowManipulation"
    @keyup="updateScript"
    @blur="updateCaretVisibled"
    @focus="updateCaretVisibled"
    @compositionend="moveTo"
  >
  </textarea>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Caret, Script } from "../classes";

const ARROW_KEYS = ["ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft"];

@Component({})
export default class PaperInput extends Vue {
  private position = `left: 33%; top: 33%`;

  private get caret(): Caret {
    return this.$store.state.caret;
  }

  private get script(): Script {
    return this.$store.state.script;
  }

  private get textarea() {
    return this.$refs.textarea as HTMLTextAreaElement;
  }

  mounted() {
    this.textarea.setSelectionRange(
      this.caret.selectionStart,
      this.caret.selectionStart
    );
  }

  /**
   * IMEコンポジションウィンドウの位置を入力文字の邪魔にならないところに変更する。
   */
  @Watch("caret.x")
  onClientRectChange(newValue: number, oldValue: number) {
    const left = newValue > -200 ? 50 : newValue > -400 ? 66 : 50;
    this.position = `left: ${left}%; top: 33%;`;
  }

  /**
   * textareaのキャレットを追従させ、フォーカスを当てる。
   */
  @Watch("caret.char.position")
  onPositionChange(newValue: number, oldValue: number) {
    this.textarea.setSelectionRange(newValue, newValue);
    this.textarea.focus();
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
  private updateScript(el: { key: string; target: HTMLTextAreaElement }) {
    if (el.target.value === this.script.raw) return;
    this.$store.dispatch("script", el.target.value);
    this.moveTo(el);
  }

  /**
   * blur/focusのタイミングでキャレットの表示を更新する。
   */
  private updateCaretVisibled() {
    requestAnimationFrame(() => {
      if (document.activeElement instanceof SVGElement) this.textarea.focus();
      const visibled = this.textarea === document.activeElement;
      this.$store.commit("caret", { visibled });
    });
  }

  /**
   * 矢印キーの動きを実際のマス上にマッピングする。
   */
  private arrowManipulation(e: KeyboardEvent) {
    if (ARROW_KEYS.includes(e.key)) {
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
  font-size: 1rem;
  height: 1rem;
  opacity: 0;
  overflow: hidden;
  padding: 0;
  pointer-events: none;
  position: fixed;
  width: 1rem;
}
</style>
