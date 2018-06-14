import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs/internal/BehaviorSubject";
import {BlastDB} from "./helper/blastdb";

@Injectable({
  providedIn: 'root'
})
export class GetBlastdbService {
  private blastdbSource = new BehaviorSubject<BlastDB[]>(null);
  blastdbSourceReader = this.blastdbSource.asObservable();
  constructor(private httpClient: HttpClient) {

  }

  GetBlastDB() {
    return this.httpClient.get<BlastDB[]>("/request/blastdb/0/", {observe: "response"})
  }

  UpdateBlastDB(data) {
    this.blastdbSource.next(data)
  }
}
