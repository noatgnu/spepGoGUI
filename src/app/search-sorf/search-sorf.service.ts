import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Subject} from "rxjs/internal/Subject";
import {TblastxResult} from "../helper/tblastx-result";
import {TblastxQuery} from "../helper/tblastx-query";
import {Result} from "../helper/result";

@Injectable({
  providedIn: 'root'
})
export class SearchSorfService {
  private _resultSource = new Subject<Map<number, Map<number, TblastxResult>>>();
  resultReader = this._resultSource.asObservable();
  constructor(private http: HttpClient) { }

  PostForm(f) {
    console.log(f.value);
    return this.http.post<Result[]>("/request/search-sorf/", f.value, {observe: "response"})
  }

  UpdateResult(data){
    const M: Map<number, Map<number, TblastxResult>> = new Map();
    for (const d of data) {
      for (const i of d) {
        let MOther: Map<number, TblastxResult> = new Map();
        if (M.has(i.OriginDB)) {
          MOther = M.get(i.OriginDB);
        } else {
          MOther = new Map();
        }
        if (MOther.has(i.BlastDBID)) {
          const result = MOther.get(i.BlastDBID);
          result.Queries.push(i);
        } else {
          const result = new TblastxResult(i.StartingCodonId, i.EndingCodonId, i.OriginDB, [i]);
          MOther.set(i.BlastDBID, result);
        }
        M.set(i.OriginDB, MOther);
      }
    }
    console.log(M);
    this._resultSource.next(M);
  }
}
