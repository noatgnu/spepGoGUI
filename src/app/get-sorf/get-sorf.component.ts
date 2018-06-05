import { Component, OnInit } from '@angular/core';
import {GetSorfService} from "./get-sorf.service";
import {Observable} from "rxjs/internal/Observable";
import {Sorf} from "../helper/sorf";
import {UpepCodon} from "../helper/upep-codon";
import {FormBuilder, FormGroup} from "@angular/forms";
import {GetCodonService} from "../get-codon/get-codon.service";
import {GetOrganismService} from "../get-organism.service";
import {Organism} from "../helper/organism";
import {GetRefSeqService} from "./get-refseq.service";
import {RefSeqQuery} from "../helper/ref-seq-query";
import {UpepRefSeqDb} from "../helper/upep-ref-seq-db";


@Component({
  selector: 'app-get-sorf',
  templateUrl: './get-sorf.component.html',
  styleUrls: ['./get-sorf.component.css']
})
export class GetSorfComponent implements OnInit {
  sorfs: Observable<Sorf[]>;
  startingCodons: Observable<UpepCodon[]>;
  endingCodons: Observable<UpepCodon[]>;
  organisms: Observable<Organism[]>;
  refseqdb: Observable<UpepRefSeqDb[]>;
  db: number;
  form: FormGroup;
  selectedDB = false;
  constructor(private _sorf: GetSorfService, private fb: FormBuilder, private _codon: GetCodonService, private _organism: GetOrganismService, private _refsegdb: GetRefSeqService) {
    this.sorfs = _sorf.sorfReader;
    this.startingCodons = this._codon.refSeqStartingCodonsReader;
    this.endingCodons = this._codon.refSeqStoppingCodonsReader;
    this.organisms = this._organism.organismReader;
    this.refseqdb = this._refsegdb.regularDBReader;
  }

  ngOnInit() {
    this.GetDB();
  }

  GetSorf(limit: number, offset: number, starting_id: number, stopping_id: number, organism: number, refseqname: string) {
    this._sorf.GetSorf(limit, offset, starting_id, stopping_id, organism, refseqname, this.db).subscribe((data) => {
      this._sorf.UpdateSorf(data.body);
    })
  }
  GetCodons(){
    this._codon.GetRefSeqCodons().subscribe((data)=>{
      this._codon.UpdateRefSeqCodons(data.body);
    })
  }

  GetOrganism(limit: number) {
    this._organism.GetOrganism(limit, this.db).subscribe((data)=>{
      this._organism.UpdateOrganism(data.body);
    })
  }

  GetDB() {
    this._refsegdb.GetLocalDBs().subscribe((data)=>{
      this._refsegdb.UpdateRegularDB(data.body);
      if (data.body !== null) {
        if (data.body.length > 0) {
          this.db = data.body[0].ID;
        }
      }
    })
  }

  GetDBInfo() {
    this.selectedDB = false;
    this.GetOrganism(1000);
    this.GetCodons();
    this.form = this.fb.group({
      Organism: 0,
      Starting: 0,
      Stopping: 0,
      Limit: 50,
      RefSeqName: ""
    });
    this.GetSorf(50,0,0,0,0,"0");
    this.selectedDB = true;
  }

  onSubmit() {
    console.log(this.form.value);
    if (this.form.value.RefSeqName=="") {
      this.GetSorf(this.form.value.Limit, 0, this.form.value.Starting, this.form.value.Stopping, this.form.value.Organism, "0")
    } else {
      this.GetSorf(this.form.value.Limit, 0, this.form.value.Starting, this.form.value.Stopping, this.form.value.Organism, this.form.value.RefSeqName)
    }

  }
}
