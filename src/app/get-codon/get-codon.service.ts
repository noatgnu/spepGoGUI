import { Injectable } from '@angular/core';
import {UpepCodon} from "../helper/upep-codon";
import {Subject} from "rxjs/internal/Subject";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs/internal/BehaviorSubject";

@Injectable({
  providedIn: 'root'
})
export class GetCodonService {
  private _refSeqCodonsSource = new BehaviorSubject<UpepCodon[]>(null);
  refSeqCodonsReader = this._refSeqCodonsSource.asObservable();

  private _refSeqStartingCodonsSource = new BehaviorSubject<UpepCodon[]>(null);
  refSeqStartingCodonsReader = this._refSeqStartingCodonsSource.asObservable();

  private _refSeqStoppingCodonsSource = new BehaviorSubject<UpepCodon[]>(null);
  refSeqStoppingCodonsReader = this._refSeqStoppingCodonsSource.asObservable();
  constructor(private httpClient: HttpClient) { }

  GetRefSeqCodons() {
    return this.httpClient.get<UpepCodon[]>("/request/codons/", {observe: 'response'})
  }
  UpdateRefSeqCodons(data: UpepCodon[]){
    this._refSeqCodonsSource.next(data);
    let starting = [];
    let ending = [];
    for (const codon of data) {
      if (codon.starting_codon == true) {
        starting.push(codon)
      } else if (codon.ending_codon == true) {
        ending.push(codon)
      }
    }
    this._refSeqStartingCodonsSource.next(starting);
    console.log(ending);
    this._refSeqStoppingCodonsSource.next(ending);
  }
}
