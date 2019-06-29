<template>
  <article>
    <svg height="440" width="650" viewBox="0 0 650 440">
      <rect class="bound" height="400" width="610" x="20" y="20"></rect>
      <g transform="translate(20, 20)">
        <g
          is="VerticalLine"
          class="line"
          :index="index"
          :line="lines[index] || ''"
          :key="index"
          @textClick="textClick"
          v-for="(n, index) in 20"
        ></g>
      </g>
    </svg>
    <textarea
      class="input-area"
      cols="100"
      rows="30"
      v-model="script"
      @input="input"
    >
    </textarea>
  </article>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import VerticalLine from "./VerticalLine.vue";

interface InputEvent {
  target: { value: string };
}

const 行頭禁則文字 = /[,)\x5D｝、〕〉》」』】〙〗〟’”｠»ゝゞーァィゥェォッャュョヮヵヶぁぃぅぇぉっゃゅょゎゕゖㇰㇱㇲㇳㇴㇵㇶㇷㇸㇹㇷ゚ㇺㇻㇼㇽㇾㇿ々〻‐゠–〜～?!‼⁇⁈⁉・:;。.\x2F]/;

@Component({ components: { VerticalLine } })
export default class Paper extends Vue {
  private script = localStorage.getItem("script") || "Hello, world!";
  private characters = Array.from(this.script.padEnd(400));
  private lines: string[] = new Array(20);

  private textClick(e: any) {}

  private mounted() {
    this.scriptToLines();
  }

  private input = (event: InputEvent) => {
    this.scriptToLines((this.script = event.target.value));
    localStorage.setItem("script", this.script);
  };

  /**
   * `this.script`を`this.lines`に変換する。
   * この時、禁則処理を済ませた行を作成する。
   */
  private scriptToLines = (script = this.script) => {
    const characters = Array.from(script);
    const lines: string[] = new Array(20).fill("");
    for (let i = 0; i < 20; i = i + 1) {
      // 文字がなければ行終了
      if (characters.length === 0) {
        break;
      }
      for (let j = 0; j < 20; j = j + 1) {
        if (characters[0] === "\n") {
          characters.shift() || "";
          break;
        }
        // 現在の行に文字を足す
        lines[i] += characters.shift() || "";
        if (j === 19) {
          if (行頭禁則文字.test(characters[0])) {
            lines[i] += characters.shift() || "";
          }
          if (行頭禁則文字.test(characters[0])) {
            lines[i] += characters.shift() || "";
          }
          if (characters[0] === "\n") {
            characters.shift() || "";
          }
        }
      }
    }
    this.lines.splice(0, Infinity, ...lines);
  };
}
</script>

<style scoped lang="scss">
svg {
  border: 0.4px solid black;
}
.bound {
  fill: none;
  stroke: #9b8;
  stroke-width: 0.6;
}
.editor {
  width: 600px;
  height: 400px;
  background-color: white;
  border: 1px solid black;
}
</style>
