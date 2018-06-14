import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs/internal/BehaviorSubject";
import {Sequence} from "./seq";

@Injectable({
  providedIn: 'root'
})
export class FastaFileService {
  private _fastaSource = new BehaviorSubject<Sequence[]>(null);
  _fastaSourceReader = this._fastaSource.asObservable();
  allow = ['A','U','G','C'];
  constructor() { }

  async fileHandler(e) {
    return new Promise<Sequence[]>((resolve, reject)=>{
      const file = e.target.files[0];
      const reader = new FileReader();
      const result: Sequence[] = [];
      let currentP = new Sequence('', '');
      reader.onload = (event) => {
        const loadedFile = reader.result;
        const lines = loadedFile.split(/\r\n|\n/);
        lines.map((line) => {
          if (line.length > 0) {
            if (line.startsWith('>', 0)) {
              if (currentP.Header !== '') {
                result.push(currentP);
                currentP = new Sequence(line.slice(1), '');
              } else {
                currentP.Header = line.slice(1);
              }
            } else {
              const s = line.toUpperCase();
              for (const n of s) {
                if (this.allow.indexOf(n) === -1) {
                  console.log("Invalid characters");
                }
              }
              currentP.Seq += s;
            }
          }
        });
        result.push(currentP);
        resolve(result);
      };
      reader.readAsText(file);
    })
  }

  UpdateFastaSource(data) {
    this._fastaSource.next(data);
  }
}
