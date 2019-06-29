const 行頭禁則文字 = /[,)\x5D｝、〕〉》」』】〙〗〟’”｠»ゝゞーァィゥェォッャュョヮヵヶぁぃぅぇぉっゃゅょゎゕゖㇰㇱㇲㇳㇴㇵㇶㇷㇸㇹㇷ゚ㇺㇻㇼㇽㇾㇿ々〻‐゠–〜～？！?!‼⁇⁈⁉・:;。.\x2F]/;

interface CombineChar {
  char: string;
  x: number;
  y: number;
}

export class Cell {
  char = "";
  paragraphNumber = 0;
  combineChars: CombineChar[] = [];
  position = 0;
  constructor(opt?: Partial<Cell>) {
    Object.assign(this, opt || {});
  }
}

export class Line {
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

export class Script {
  lines: Line[] = [];
  raw = "";
  constructor(raw: string) {
    this.raw = raw;
    const characters = Array.from(raw);
    for (let i = 0; i < 20; i = (i + 1) | 0) {
      const line = new Line(characters);
      this.lines.push(line);
    }
  }
}
