import { Component, OnInit } from '@angular/core';
import {GetRefSeqService} from "../get-sorf/get-refseq.service";
import {Observable} from "rxjs/internal/Observable";
import {UpepCodon} from "../helper/upep-codon";
import {GetCodonService} from "./get-codon.service";

@Component({
  selector: 'app-get-codon',
  templateUrl: './get-codon.component.html',
  styleUrls: ['./get-codon.component.css']
})
export class GetCodonComponent implements OnInit {
  Codons : Observable<UpepCodon[]>;
  constructor(private _codon: GetCodonService) {
    this.Codons = _codon.refSeqCodonsReader;
  }

  ngOnInit() {
    this.checkCodons()
  }

  checkCodons(){
    this._codon.GetRefSeqCodons().subscribe((data)=>{
      this._codon.UpdateRefSeqCodons(data.body);
    })
  }
}
