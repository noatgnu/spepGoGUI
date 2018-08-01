import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {Lagan} from "../helper/lagan";

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  private popupSource = new Subject<Lagan>();
  popupReader = this.popupSource.asObservable();
  private popupTrigger = new Subject<boolean>();
  popupTriggerReader = this.popupTrigger.asObservable();
  constructor() { }

  UpdatePopup(data) {
    this.popupSource.next(data)
  }

  UpdateTrigger(data) {
    this.popupTrigger.next(data)
  }
}
