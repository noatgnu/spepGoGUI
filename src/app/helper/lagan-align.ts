export class LaganAlign {
  get MidLine(): string {
    return this._MidLine;
  }

  set MidLine(value: string) {
    this._MidLine = value;
    this.calculateScore(31);
  }
  constructor(MidLine: string, Query: string, Target: string) {
    this.MidLine = MidLine;
    this.Query = Query;
    this.Target = Target;
  }
  private _MidLine: string;
  Query: string;
  Target: string;
  Score: Array<number>;

  calculateScore(window: number) {
    const seqLength = this._MidLine.length;
    const windowHalf = (window-1)/2;
    const score: Array<number> = [];
    for (let i = 0; i < seqLength; i++) {
      let backward = 0;
      if (i >windowHalf) {
        backward = i - windowHalf -1
      }
      let forward = 0;
      if (i + 1 > seqLength - windowHalf) {
        forward = seqLength
      } else {
        forward = i + 1 + windowHalf
      }
      const seq = this._MidLine.slice(backward, forward);
      let count = 0;
      for (const s of seq) {
        if (s === '|') {
          count++
        }
      }
      score.push(count/seq.length)
    }
    this.Score = score
  }
}

