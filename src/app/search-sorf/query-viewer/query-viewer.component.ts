import {Component, Input, OnInit} from '@angular/core';
import {TblastxQuery} from "../../helper/tblastx-query";
import {Lagan} from "../../helper/lagan";
import {TblastxHit} from "../../helper/tblastx-hit";
import {TblastxHsp} from "../../helper/tblastx-hsp";
import {FrameData} from "../../helper/frame-data";

@Component({
  selector: 'app-query-selector',
  templateUrl: './query-viewer.component.html',
  styleUrls: ['./query-viewer.component.css']
})
export class QueryViewerComponent implements OnInit {
  @Input('Queries') Queries: TblastxQuery[];
  @Input('Title') Title: string;
  currentQuery: TblastxQuery;
  currentQueryMap: Map<TblastxQuery, boolean>;
  queryWithResult = 0;
  gridSize = 15;
  colors = ['#ffffd9', '#edf8b1', '#c7e9b4', '#7fcdbb', '#41b6c4', '#1d91c0', '#225ea8', '#253494', '#081d58'];
  constructor() { }

  ngOnInit() {
    console.log(this.Title);
    this.currentQueryMap = new Map<TblastxQuery, boolean>();
    for (let i = 0; i < this.Queries.length; i++) {
      this.Queries[i] = new TblastxQuery(this.Queries[i].Hits, this.Queries[i].QueryID, this.Queries[i].Seq, this.Queries[i].StartingCodonId, this.Queries[i].EndingCodonId, this.Queries[i].OriginDB, this.Queries[i].BlastDBID);
      if (this.Queries[i].Hits.length > 0) {
        this.currentQueryMap.set(this.Queries[i], true);
        this.queryWithResult ++;
        if (this.currentQuery === undefined) {
          this.currentQuery = this.Queries[i];
        }
      } else {
        this.currentQueryMap.set(this.Queries[i], false);
      }
      for (let h = 0; h < this.Queries[i].Hits.length; h ++) {
        const a = this.Queries[i].Hits[h];
        this.Queries[i].Hits[h] = new TblastxHit(a.Accession, a.Def, a.HitID, a.Hsps, a.Length, a.Organism, a.QueryID, a.Seq);
      }
    }
  }

  checkIfHasResult() {
    return this.queryWithResult >0
  }

  getScore(window, alignment) {
    alignment = new Lagan(alignment.MidLine, alignment.Query, alignment.Target);
    return alignment.CalculateScore(window);
  }

  GetHitFrameData(hsps: TblastxHsp[]): FrameData[] {
    const fd: FrameData[] = [];
    for (const h of hsps) {
      if (h.HitFrame > 0) {
        const a = new FrameData(h.HitFrame, h.HitStartPosition, h.HitEndPosition, h.HitSeq, this.getScore(7, h.LaganAlign), h.BitScore, h.Evalue, h.Identity);
        a.Alignment = h.LaganAlign;
        fd.push(a);
      }
    }
    return fd
  }
}
