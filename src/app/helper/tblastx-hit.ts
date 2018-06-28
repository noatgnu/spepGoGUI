import {TblastxHsp} from "./tblastx-hsp";

export class TblastxHit {
  constructor(Accession: string, Def: string, HitID: number, Hsps: TblastxHsp[], Length: number, Organism: string, QueryID: string, Seq: string) {
    this.Accession = Accession;
    this.Def = Def;
    this.HitID = HitID;
    this.Hsps = Hsps;
    this.Length = Length;
    this.Organism = Organism;
    this.QueryID = QueryID;
    this.Seq = Seq;
  }
  Accession: string;
  Def: string;
  HitID: number;
  Hsps: TblastxHsp[];
  Length: number;
  Organism: string;
  QueryID: string;
  Seq: string;
}
