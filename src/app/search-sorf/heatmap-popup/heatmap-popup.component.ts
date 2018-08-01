import { Component, OnInit, Input } from '@angular/core';
import {Lagan} from "../../helper/lagan";
import {PopupService} from "../popup.service";
import {Observable, Subscription} from "rxjs";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-heatmap-popup',
  templateUrl: './heatmap-popup.component.html',
  styleUrls: ['./heatmap-popup.component.css']
})
export class HeatmapPopupComponent implements OnInit {
  @Input() Alignment: Lagan;

  constructor(public activeModal: NgbActiveModal) {

  }

  ngOnInit() {

  }

}
