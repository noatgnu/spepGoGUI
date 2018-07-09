import {Lagan} from "./lagan";

export interface Result {
  StartingCodonId: number;
  EndingCodonId: number;
  OriginDB: number;
  Queries: Query[];
}

export interface Query {
  Hits: Hit[];
  QueryID: string;
  Seq: string;
  StartingCodonId: number;
  EndingCodonId: number;
  OriginDB: number;
  BlastDBID: number;
}

export interface Hit {
  Accession: string;
  Def: string;
  HitID: number;
  Hsps: Hsp[];
  Length: number;
  Organism: string;
  QueryID: string;
  Seq: string;
}

export interface Hsp {
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
