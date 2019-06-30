<template>
  <textarea
    ref="textarea"
    class="input-area"
    v-model="script"
    @input="input"
    @click="caretDetection"
    @keyup="caretDetection"
    @focus="caretDetection"
  >
  </textarea>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

interface InputEvent {
  target: { value: string };
}

@Component({})
export default class PaperInput extends Vue {
  private get script(): string {
    return this.$store.state.script.raw;
  }

  private set script(text: string) {
    this.$store.dispatch("script", text);
  }

  private input(e: InputEvent) {
    this.script = e.target.value;
  }

  private caretDetection(e: FocusEvent) {
    const el = e.target as HTMLTextAreaElement;
    this.$store.dispatch("selectionStart", el.selectionStart);
  }

  mounted() {
    this.$store.watch(
      (state, getters) => state.selectionStart,
      (newValue, oldValue) => {
        const el = this.$refs.textarea as HTMLTextAreaElement;
        el.setSelectionRange(newValue, newValue);
        el.focus();
      }
    );
  }
}
</script>

<style scoped lang="scss">
textarea {
  box-sizing: border-box;
  width: 650px;
  height: 200px;
  padding: 0;
}
</style>
