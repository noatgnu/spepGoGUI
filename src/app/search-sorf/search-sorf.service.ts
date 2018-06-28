import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Subject} from "rxjs/internal/Subject";
import {TblastxResult} from "../helper/tblastx-result";
import {TblastxQuery} from "../helper/tblastx-query";

@Injectable({
  providedIn: 'root'
})
export class SearchSorfService {
  private _resultSource = new Subject<Map<number, Map<string, TblastxResult>>>();
  resultReader = this._resultSource.asObservable();
  constructor(private http: HttpClient) { }

  PostForm(f) {
    console.log(f.value);
    return this.http.post<TblastxQuery[]>("/request/search-sorf/", f.value, {observe: "response"})
  }

  UpdateResult(data: TblastxQuery[]){
    const M = new Map();
    for (const i of data) {
      let MOther: Map<string, TblastxResult>;
      if (M.has(i.OriginDB)) {
        MOther = M.get(i.OriginDB);
      } else {
        MOther = new Map<string, TblastxResult>();
      }
      const m = i.StartingCodonId + "" + i.EndingCodonId;
      if (MOther.has(m)) {
        const result = MOther.get(m);
        result.Queries.push(i);
      } else {
        const result = new TblastxResult(i.StartingCodonId, i.EndingCodonId, i.OriginDB, [i]);
        MOther.set(m, result);
      }
      M.set(i.OriginDB, m)
    }
    this._resultSource.next(M);
  }
}
