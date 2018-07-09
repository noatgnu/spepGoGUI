import {Component, Input, OnInit} from '@angular/core';
import {TblastxQuery} from "../../helper/tblastx-query";
import {Lagan} from "../../helper/lagan";
import {TblastxHit} from "../../helper/tblastx-hit";

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
}
