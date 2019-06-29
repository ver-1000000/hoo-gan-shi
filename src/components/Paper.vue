<template>
  <article>
    <svg height="440" width="650" viewBox="0 0 650 440">
      <rect class="bound" height="400" width="610" x="20" y="20"></rect>
      <g transform="translate(20, 20)">
        <g
          is="VerticalLine"
          class="line"
          :line="verticalLine"
          :key="index"
          :index="index"
          @textClick="textClick"
          v-for="(verticalLine, index) in verticalLines"
        ></g>
      </g>
    </svg>
    <textarea
      class="input-area"
      cols="100"
      rows="32"
      v-model="script"
      @input="input"
    >
    </textarea>
  </article>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import VerticalLine from "./VerticalLine.vue";

const 行頭禁則文字 = /[,)\x5D｝、〕〉》」』】〙〗〟’”｠»ゝゞーァィゥェォッャュョヮヵヶぁぃぅぇぉっゃゅょゎゕゖㇰㇱㇲㇳㇴㇵㇶㇷㇸㇹㇷ゚ㇺㇻㇼㇽㇾㇿ々〻‐゠–〜～?!‼⁇⁈⁉・:;。.\x2F]/;

interface InputEvent {
  target: { value: string };
}

interface CombineChar {
  char: string;
  x: number;
  y: number;
}

class Cell {
  char = "";
  paragraphNumber = 0;
  combineChars: CombineChar[] = [];
  position = 0;
  constructor(opt?: Partial<Cell>) {
    Object.assign(this, opt || {});
  }
}

class Line {
  cells: Cell[] = [];
  internalCharLength = 0;
  internalScript = "";
  afterScript = "";
  constructor(characters: string[]) {
    const add = (i: number) => {
      this.cells[i] = new Cell({ char: characters.shift() });
      this.internalCharLength = (this.internalCharLength + 1) | 0;
    };
    const combineLast = (char = characters.shift() || "") => {
      this.cells[19].combineChars.push({ char, x: 0, y: 0 });
      this.internalCharLength = (this.internalCharLength + 1) | 0;
    };
    for (let i = 0; i < 20; i = (i + 1) | 0) {
      if (characters[0] === "\n") {
        characters.shift() || "";
        this.cells = this.cells.concat(
          Array.from(Array(20 - i), () => new Cell())
        );
        break;
      }
      // 現在の行に文字を足す
      add(i);
      if (i === 19) {
        if (行頭禁則文字.test(characters[0])) combineLast();
        if (行頭禁則文字.test(characters[0])) combineLast();
        if (characters[0] === "\n") characters.shift();
      }
    }
  }
}

class Script {
  lines: Line[] = [];
  constructor(script: string) {
    const characters = Array.from(script);
    for (let i = 0; i < 20; i = (i + 1) | 0) {
      const line = new Line(characters);
      this.lines.push(line);
    }
  }
}

@Component({ components: { VerticalLine } })
export default class Paper extends Vue {
  private characters = Array.from(this.script.padEnd(400));
  private verticalLines: Line[] = new Script(this.script).lines;

  private get script(): string {
    return this.$store.state.script;
  }

  private set script(script: string) {
    this.$store.commit("rewite", script);
  }

  private textClick(e: any) {}

  private mounted() {
    this.scriptToLines();
  }

  private input = (event: InputEvent) => {
    this.scriptToLines((this.script = event.target.value));
  };

  /**
   * `this.script`を`this.lines`に変換する。
   * この時、禁則処理を済ませた行を作成する。
   */
  private scriptToLines = (script = this.script) => {
    this.verticalLines.splice(0, Infinity, ...new Script(script).lines);
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
