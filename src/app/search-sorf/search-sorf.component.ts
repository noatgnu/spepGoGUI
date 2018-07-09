import { Component, OnInit } from '@angular/core';
import {GetRefSeqService} from "../get-sorf/get-refseq.service";
import {GetCodonService} from "../get-codon/get-codon.service";
import {GetBlastdbService} from "../get-blastdb.service";
import {Observable} from "rxjs/internal/Observable";
import {UpepCodon} from "../helper/upep-codon";
import {UpepRefSeqDb} from "../helper/upep-ref-seq-db";
import {BlastDB} from "../helper/blastdb";
import {FormBuilder, FormGroup} from "@angular/forms";
import {FastaFileService} from "../helper/fasta-file.service";
import {Sequence} from "../helper/seq";
import {SearchSorfService} from "./search-sorf.service";
import {TblastxResult} from "../helper/tblastx-result";
import {TblastxQuery} from "../helper/tblastx-query";

@Component({
  selector: 'app-search-sorf',
  templateUrl: './search-sorf.component.html',
  styleUrls: ['./search-sorf.component.css'],
  providers: [FastaFileService,]
})
export class SearchSorfComponent implements OnInit {
  codonStart: Observable<UpepCodon[]>;
  codonEnd: Observable<UpepCodon[]>;
  refseqs: Observable<UpepRefSeqDb[]>;
  bDB: Observable<BlastDB[]>;
  db: UpepRefSeqDb;
  avalabileRefSeqDB: number[] = [];
  codonMap: Map<number, string> = new Map();
  form: FormGroup;
  sequences: Sequence[] = [];
  results: Observable<Map<number, Map<number, TblastxResult>>>;
  refseqdbMap: Map<number, UpepRefSeqDb>;
  currentResult: TblastxQuery;
  constructor(private refseqDB: GetRefSeqService, private codonDB: GetCodonService, private blastDB: GetBlastdbService, private _fb: FormBuilder, private fastaFile: FastaFileService, private search: SearchSorfService) {
    this.codonStart = codonDB.refSeqStartingCodonsReader;
    this.codonEnd = codonDB.refSeqStoppingCodonsReader;
    this.refseqs = refseqDB.regularDBReader;
    this.bDB = blastDB.blastdbSourceReader;
    this.results = this.search.resultReader;
  }

  ngOnInit() {
    this.createForm();
    this.blastDB.GetBlastDB().subscribe((data)=>{
      this.blastDB.UpdateBlastDB(data.body);
      for (const d of data.body) {
        this.avalabileRefSeqDB.push(d.upep_ref_seq_db_id);
      }
      this.refseqDB.GetLocalDBs().subscribe((data)=>{
        this.refseqdbMap = new Map<number, UpepRefSeqDb>();
        this.refseqDB.UpdateRegularDB(data.body);
        console.log(data.body);
        for (const d of data.body) {

          this.refseqdbMap.set(d.ID, d);
          console.log(d.Name);
        }
        console.log(this.refseqdbMap)
      });
    });

    this.codonDB.GetRefSeqCodons().subscribe((data)=>{
      this.codonDB.UpdateRefSeqCodons(data.body);
      for (const c of data.body) {
        this.codonMap.set(c.id, c.sequence);
      }
    });

  }

  createForm(){
    this.form = this._fb.group({
      "Blastdb": [],
      "Evalue":  "",
      "Sequences": [],
    })
  }

  checkIfAvailable(dbID, db): boolean{
    return db.indexOf(dbID) > -1
  }

  async loadFasta(e) {
    if (e) {
      this.sequences = await this.fastaFile.fileHandler(e);
      this.form.patchValue({
        "Sequences": this.sequences,
      })
    }
  }

  submit() {
    this.search.PostForm(this.form).subscribe((data)=>{
      this.search.UpdateResult(data.body);
    })
  }

  checkIfHasResult(queries) {
    let qu = 0;
    for (const q of queries) {
      if (q.Hits.length > 0) {
        console.log(q.Hits.length);
        qu ++;
        break;
      }
    }
    return qu
  }
}
