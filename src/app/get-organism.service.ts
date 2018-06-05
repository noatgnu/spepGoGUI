import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Subject} from "rxjs/internal/Subject";
import {Organism} from "./helper/organism";

@Injectable({
  providedIn: 'root'
})
export class GetOrganismService {
  private _organismSource = new Subject<Organism[]>();
  organismReader = this._organismSource.asObservable();
  constructor(private httpClient: HttpClient) { }

  GetOrganism(limit: number, dbId: number) {
    return this.httpClient.get<Organism[]>("/request/organisms/limit/"+limit+"/"+dbId+"/", {observe: "response"})
  }

  UpdateOrganism(data: Organism[]) {
    this._organismSource.next(data)
  }
}
