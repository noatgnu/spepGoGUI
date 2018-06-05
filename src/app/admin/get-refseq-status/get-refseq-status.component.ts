import { Component, OnInit } from '@angular/core';
import {GetRefSeqService} from "../../get-sorf/get-refseq.service";
import {Observable} from "rxjs/internal/Observable";
import {RefSeqQuery} from "../../helper/ref-seq-query";
import {HttpResponse} from "@angular/common/http";
import {FtpEntry} from "../../helper/ftp-entry";
import {UpepRefSeqDb} from "../../helper/upep-ref-seq-db";

@Component({
  selector: 'app-get-refseq-status',
  templateUrl: './get-refseq-status.component.html',
  styleUrls: ['./get-refseq-status.component.css']
})
export class GetRefseqStatusComponent implements OnInit {
  refSeqQuery : Observable<RefSeqQuery>;
  selected = [];
  ReleaseMap : Map<string,string>;
  FTPList : Map<string,FtpEntry[]>;
  remoteDB: number;
  constructor(private _refSeq: GetRefSeqService) {
    this.refSeqQuery = this._refSeq.RefSeqNCBIReader;
  }

  ngOnInit() {
    this.checkRefSeqStatus(false);
  }

  checkRefSeqStatus(remote: boolean) {
    this._refSeq.GetRefSeqNCBI(remote).subscribe((data: HttpResponse<RefSeqQuery>)=>{
      console.log(data.body);
      this._refSeq.UpdateRefSeqNCBISource(data.body);
      this.remoteDB = data.body.RemoteDB;
      this.ReleaseMap = data.body.ReleaseMap;
      this.FTPList = data.body.FileListMap;
    })
  }

  onSelect({selected}) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  refreshDB(selected: UpepRefSeqDb[], test: string) {
    for (const s of selected) {
      const fileList = this.FTPList[this.ReleaseMap[s.Name]];
      console.log(fileList);
      this._refSeq.PutRefSeqNCBI(s.Name, fileList, this.remoteDB, test).subscribe((data)=>{

      });
    }
  }
}
