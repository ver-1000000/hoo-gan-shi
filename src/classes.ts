const 行頭禁則文字 = /[,)\x5D｝、〕〉》」』】〙〗〟’”｠»ゝゞーァィゥェォッャュョヮヵヶぁぃぅぇぉっゃゅょゎゕゖㇰㇱㇲㇳㇴㇵㇶㇷㇸㇹㇷ゚ㇺㇻㇼㇽㇾㇿ々〻‐゠–〜～？！?!‼⁇⁈⁉・:;。.\x2F]/;

interface CombineChar {
  char: string;
  x: number;
  y: number;
}

export class Cell {
  char = "";
  combineChars: CombineChar[] = [];
  index = 0;
  parent: Line = {} as Line;
  constructor(opt?: Partial<Cell>) {
    Object.assign(this, opt || {});
  }
}

export class Line {
  cells: Cell[] = [];
  index = 0;
  internalCharLength = 0; // 内包している文字(cell.charとcell.combineChars)の数
  beforeAllCharLength = 0; // 1つ前のLineすべての`internalCharLength`を合算した数
  constructor(
    characters: string[] = [],
    beforeInternalCharLength = 0,
    index = 0
  ) {
    this.index = index;
    this.beforeAllCharLength = beforeInternalCharLength;
    // `characters`から文字を削除し、内部文字数を更新する。
    const shiftedChar = () => {
      this.internalCharLength = (this.internalCharLength + 1) | 0;
      return characters.shift() || "";
    };
    // 改行文字が見つかった際に行う処理。 残りのセルを空文字で埋め、内部文字数を更新する。
    const breakOnDetectReturn = (i: number) => {
      shiftedChar();
      const parent = this;
      const cell = (_: any, j: number) => new Cell({ parent, index: i + j });
      this.cells = this.cells.concat(Array.from(Array(20 - i), cell));
    };
    // 行末に行頭禁則文字があった場合、combineCharsにそれを追加し内部文字数を更新する。 TODO: xとyの扱い
    const combineCharOnDetectKinsoku = (i: number) =>
      this.cells[i].combineChars.push({ char: shiftedChar(), x: 0, y: 0 });
    for (let i = 0; i < 20; i = (i + 1) | 0) {
      if (characters[0] === "\n" || characters[0] == null) {
        breakOnDetectReturn(i);
        break;
      }
      this.cells[i] = new Cell({ char: shiftedChar(), parent: this, index: i });
      if (i === 19) {
        if (行頭禁則文字.test(characters[0])) combineCharOnDetectKinsoku(i);
        if (行頭禁則文字.test(characters[0])) combineCharOnDetectKinsoku(i);
        if (characters[0] === "\n") shiftedChar();
      }
    }
  }
}

export class Script {
  lines: Line[] = [];
  internalCharLength = 0;
  raw = "";
  constructor(raw: string) {
    this.raw = raw;
    const characters = Array.from(raw);
    for (let i = 0; i < 20; i = (i + 1) | 0) {
      const beforeLine = this.lines[i - 1];
      const beforeInternalCharLength =
        i && beforeLine.internalCharLength + beforeLine.beforeAllCharLength;
      const line = new Line(characters, beforeInternalCharLength, i);
      this.lines.push(line);
      this.internalCharLength += line.internalCharLength;
    }
  }
}
