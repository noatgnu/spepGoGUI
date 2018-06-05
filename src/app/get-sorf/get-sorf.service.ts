import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Subject} from "rxjs/internal/Subject";
import {Sorf} from "../helper/sorf";

@Injectable({
  providedIn: 'root'
})
export class GetSorfService {
  private _sorfSource = new Subject<Sorf[]>();
  sorfReader = this._sorfSource.asObservable();
  constructor(private httpClient: HttpClient) { }

  GetSorf(limit: number, offset: number, starting_id: number, stopping_id: number, organism: number, refseqname: string, dbId: number) {
    return this.httpClient.get<Sorf[]>("/request/sorf/limit/"+limit+"/offset/"+offset+"/startingCodon/"+starting_id+"/stoppingCodon/"+stopping_id+"/organism/"+organism+"/refseqname/"+refseqname+"/dbId/"+dbId+"/",{observe: "response"})
  }

  UpdateSorf(data: Sorf[]) {
    this._sorfSource.next(data);
  }
}
