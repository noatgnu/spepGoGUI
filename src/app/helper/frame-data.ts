import {Lagan} from "./lagan";

export class FrameData {
  constructor(Frame: number, Start: number, Stop: number, Seq: string, Score: number[], BitScore: number, Evalue: number, Identity: number) {
    this.Frame = Frame;
    this.Start = Start;
    this.Stop = Stop;
    this.Seq = Seq;
    this.Score = Score;
    this.BitScore = BitScore;
    this.Evalue = Evalue;
    this.Identity = Identity;
  }

  Frame: number;
  Start: number;
  Stop: number;
  Seq: string;
  Score: number[];
  BitScore: number;
  Evalue: number;
  Identity: number;
  Alignment: Lagan;
}
