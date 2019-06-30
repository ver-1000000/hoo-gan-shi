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
  parent: Line = {
    cells: [],
    index: 0,
    internalCharLength: 0,
    beforeAllCharLength: 0
  };
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
    const shiftAndAddLength = () => {
      characters.shift();
      this.internalCharLength = (this.internalCharLength + 1) | 0;
    };
    const breakOnDetectReturn = (i: number) => {
      shiftAndAddLength();
      this.cells = this.cells.concat(
        Array.from(Array(20 - i), () => new Cell({ parent: this }))
      );
    };
    const addCharToCurrentLine = (i: number) => {
      this.cells[i] = new Cell({
        char: characters.shift() || "",
        parent: this,
        index: i
      });
      this.internalCharLength = (this.internalCharLength + 1) | 0;
    };
    const combineCharOnDetectKinsoku = (char = characters.shift() || "") => {
      this.cells[19].combineChars.push({ char, x: 0, y: 0 });
      this.internalCharLength = (this.internalCharLength + 1) | 0;
    };
    for (let i = 0; i < 20; i = (i + 1) | 0) {
      if (characters[0] === "\n" || characters[0] == null) {
        breakOnDetectReturn(i);
        break;
      }
      addCharToCurrentLine(i);
      if (i === 19) {
        if (行頭禁則文字.test(characters[0])) combineCharOnDetectKinsoku();
        if (行頭禁則文字.test(characters[0])) combineCharOnDetectKinsoku();
        if (characters[0] === "\n") shiftAndAddLength();
      }
    }
  }
}

export class Script {
  lines: Line[] = [];
  raw = "";
  constructor(raw: string) {
    this.raw = raw;
    const characters = Array.from(raw);
    for (let i = 0; i < 20; i = (i + 1) | 0) {
      const beforeLine = this.lines[i - 1];
      const beforeInternalCharLength = beforeLine
        ? beforeLine.internalCharLength + beforeLine.beforeAllCharLength
        : 0;
      const line = new Line(characters, beforeInternalCharLength, i);
      this.lines.push(line);
    }
  }
}
