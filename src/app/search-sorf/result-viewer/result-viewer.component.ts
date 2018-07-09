import {Component, Input, OnInit} from '@angular/core';
import {TblastxQuery} from "../../helper/tblastx-query";
import {TblastxResult} from "../../helper/tblastx-result";

@Component({
  selector: 'app-result-viewer',
  templateUrl: './result-viewer.component.html',
  styleUrls: ['./result-viewer.component.css']
})
export class ResultViewerComponent implements OnInit {
  @Input('BlastDB') BlastDB: Array<number>;
  @Input('Result') Result: Map<number, TblastxResult>;
  @Input('CodonMap') CodonMap: Map<number, string>;
  withResultMap: Map<number, boolean>;
  initActive: string;
  constructor() { }

  ngOnInit() {
    this.withResultMap = new Map<number, boolean>();
    for (const b of this.BlastDB) {
      for (const q of this.Result.get(b).Queries) {
        if (q.Hits.length >0) {
          this.withResultMap.set(b, true);
          this.initActive = ''+this.CodonMap.get(this.Result.get(b).StartingCodonId)+this.CodonMap.get(this.Result.get(b).EndingCodonId)+b;
          break;
        }
      }
    }
  }

}
