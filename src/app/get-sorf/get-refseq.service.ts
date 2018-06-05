import { Injectable } from '@angular/core';
import {Subject} from "rxjs/internal/Subject";
import {RefSeqQuery} from "../helper/ref-seq-query";

import {HttpClient} from "@angular/common/http";
import {UpepCodon} from "../helper/upep-codon";
import {UpepRefSeqDb} from "../helper/upep-ref-seq-db";
import {FtpEntry} from "../helper/ftp-entry";

@Injectable({
  providedIn: 'root'
})
export class GetRefSeqService {
  private _refSeqNCBISource = new Subject<RefSeqQuery>();
  RefSeqNCBIReader = this._refSeqNCBISource.asObservable();
  private _regularDB = new Subject<UpepRefSeqDb[]>();
  regularDBReader = this._regularDB.asObservable();

  constructor(private httpClient: HttpClient) { }

  GetRefSeqNCBI(remote: boolean) {
    if (remote) {
      return this.httpClient.get<RefSeqQuery>("/admin/request/refseq/remote", {observe: 'response'})
    } else {
      return this.httpClient.get<RefSeqQuery>("/admin/request/refseq/local", {observe: 'response'})
    }
  }

  GetLocalDBs() {
    return this.httpClient.get<UpepRefSeqDb[]>("/request/refseqdb/", {observe: 'response'})
  }

  UpdateRefSeqNCBISource(data: RefSeqQuery) {
    this._refSeqNCBISource.next(data);
  }

  PutRefSeqNCBI(dbname: string, data: FtpEntry[], version: number, test: string) {
    return this.httpClient.put("/admin/request/refreshdb/"+dbname+"/"+data.length+"/"+version+"/"+test+"/", data, {observe: "response"})
  }

  UpdateRegularDB(data: UpepRefSeqDb[]) {
    this._regularDB.next(data)
  }
}
