export class SeqD3Coordinate {
  constructor(seqId: string, yCoord: number, value: number) {
    this.seqId = seqId;
    this.yCoord = yCoord;
    this.value = value;
  }

  seqId: string;
  yCoord: number;
  value: number;
}
