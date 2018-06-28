import {TblastxHit} from "./tblastx-hit";

export class TblastxQuery {
  constructor(Hits: TblastxHit[], QueryID: string, Seq: string, StartingCodonId: number, EndingCodonId: number, OriginDB: number) {
    this.Hits = Hits;
    this.QueryID = QueryID;
    this.Seq = Seq;
    this.StartingCodonId = StartingCodonId;
    this.EndingCodonId = EndingCodonId;
    this.OriginDB = OriginDB;
  }

  Hits: TblastxHit[];
  QueryID: string;
  Seq: string;
  StartingCodonId: number;
  EndingCodonId: number;
  OriginDB: number
}
