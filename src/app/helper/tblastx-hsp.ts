import {Lagan} from "./lagan";

export class TblastxHsp {
  constructor(AlignLength: number, BitScore: number, Evalue: number, Gaps: number, HitEndPosition: number, HitFrame: number, HitSeq: string, HitStartPosition: number, Identity: number, LaganAlign: Lagan, MidLine: string, Positive: number, QueryEndPosition: number, QueryFrame: number, QuerySeq: string, QueryStartPosition: number, Score: number) {
    this.AlignLength = AlignLength;
    this.BitScore = BitScore;
    this.Evalue = Evalue;
    this.Gaps = Gaps;
    this.HitEndPosition = HitEndPosition;
    this.HitFrame = HitFrame;
    this.HitSeq = HitSeq;
    this.HitStartPosition = HitStartPosition;
    this.Identity = Identity;
    this.LaganAlign = LaganAlign;
    this.MidLine = MidLine;
    this.Positive = Positive;
    this.QueryEndPosition = QueryEndPosition;
    this.QueryFrame = QueryFrame;
    this.QuerySeq = QuerySeq;
    this.QueryStartPosition = QueryStartPosition;
    this.Score = Score;
  }
  AlignLength: number;
  BitScore: number;
  Evalue: number;
  Gaps: number;
  HitEndPosition: number;
  HitFrame: number;
  HitSeq: string;
  HitStartPosition: number;
  Identity: number;
  LaganAlign: Lagan;
  MidLine: string;
  Positive: number;
  QueryEndPosition: number;
  QueryFrame: number;
  QuerySeq: string;
  QueryStartPosition: number;
  Score: number;
}
