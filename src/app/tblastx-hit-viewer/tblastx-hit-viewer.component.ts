import {Component, OnInit, AfterViewInit, ElementRef, Input, ViewEncapsulation} from '@angular/core';
import {D3Service, D3, ScaleQuantile, ScaleLinear, Selection, Transition, Axis} from 'd3-ng2-service';
import {Lagan} from "../helper/lagan";
import {TblastxHit} from "../helper/tblastx-hit";
@Component({
  selector: 'app-tblastx-hit-viewer',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './tblastx-hit-viewer.component.html',
  styleUrls: ['./tblastx-hit-viewer.component.css']
})
export class TblastxHitViewerComponent implements OnInit, AfterViewInit {
  @Input('Alignment') Hits: TblastxHit[];
  private d3: D3;
  private parentNativeElement: any;
  private d3Svg: Selection<SVGSVGElement, any, null, undefined>;
  constructor(element: ElementRef, d3Service: D3Service) {
    this.d3 = d3Service.getD3();
    this.parentNativeElement = element.nativeElement;
  }
  ngOnInit() {

  }

  ngAfterViewInit(){

  }
}
