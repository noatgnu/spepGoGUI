import {TblastxQuery} from "./tblastx-query";

export class TblastxResult {
  constructor(StartingCodonId: number, EndingCodonId: number, OriginDB: number, Queries: TblastxQuery[]) {
    this.StartingCodonId = StartingCodonId;
    this.EndingCodonId = EndingCodonId;
    this.OriginDB = OriginDB;
    this.Queries = Queries;
  }
  StartingCodonId: number;
  EndingCodonId: number;
  OriginDB: number;
  Queries: TblastxQuery[];
}
