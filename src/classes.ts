const 行頭禁則文字 = /[,)\x5D｝、〕〉》」』】〙〗〟’”｠»ゝゞーァィゥェォッャュョヮヵヶぁぃぅぇぉっゃゅょゎゕゖㇰㇱㇲㇳㇴㇵㇶㇷㇸㇹㇷ゚ㇺㇻㇼㇽㇾㇿ々〻‐゠–〜～？！?!‼⁇⁈⁉・:;。.\x2F]/;

export class Caret {
  char = new Char();
  internalY = 0;
  visibled = true;
  selectionStart = 0;
  x = 0;
  y = 0;
  update: (opt: Partial<Caret>) => Caret = (opt = {}) => {
    Object.assign(this, opt);
    return this;
  };
  constructor(opt: Partial<Caret> = {}) {
    Object.assign(this, opt);
  }
}

export class Char {
  beforeChar: Partial<Char> = {};
  br = false;
  characters: Char[] = [];
  index = 0;
  line = 0;
  lineStartProhivition = false;
  position = 0;
  value = "";
  id = `${this.line}-${this.index}-${this.value}`;
  update = (value = this.value) => {
    const beforeChar = this.characters[this.position - 1] || {};
    if (this.beforeChar.id === beforeChar.id) return this;
    this.beforeChar = beforeChar;
    this.value = value;
    this.lineStartProhivition = 行頭禁則文字.test(value);
    this.position = beforeChar.position + 1;
    // 前の文字の`br`を正しく更新する。
    if (
      (beforeChar.index >= 19 && !this.lineStartProhivition) ||
      beforeChar.value === "\n"
    )
      beforeChar.br = true;
    // 改行情報で行番号を更新する。
    if (beforeChar.br) {
      this.line = beforeChar.line + 1;
      this.index = 0;
    } else {
      this.line = beforeChar.line;
      this.index = beforeChar.index + 1;
    }
    this.id = `${this.line}-${this.index}-${this.value}`;
    const afterChar = this.characters[this.position + 1];
    if (afterChar) afterChar.update();
    return this;
  };
  constructor(opt: Partial<Char> = {}) {
    Object.assign(this, opt);
  }
}

export class Script {
  characters: Char[] = [];
  linePositionList = [0]; // 行が変わるcharのposition郡
  raw = "";
  update = (raw: string) => {
    localStorage.setItem("script", (this.raw = raw));
    this.characters = [];
    this.linePositionList = [0];
    let lineIndex = 0;
    Array.from(raw + "\n", (value, position) => {
      const char = new Char({ characters: this.characters, value, position });
      this.characters.push(char);
      char.update();
      if (lineIndex < char.line) {
        lineIndex = (lineIndex + 1) | 0;
        this.linePositionList.push(char.position);
      }
    });
    return this;
  };
  constructor(opt: Partial<String> = {}) {
    Object.assign(this, opt);
  }
}
