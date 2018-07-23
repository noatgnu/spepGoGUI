import {Component, OnInit, AfterViewInit, ElementRef, Input, ViewEncapsulation} from '@angular/core';
import {D3Service, D3, ScaleQuantile, ScaleLinear, Selection, Transition, Axis} from 'd3-ng2-service';
import {Lagan} from "../helper/lagan";
import {TblastxHsp} from "../helper/tblastx-hsp";

@Component({
  selector: 'app-sequence-viewer',
  templateUrl: './sequence-viewer.component.html',
  styleUrls: ['./sequence-viewer.component.css']
})
export class SequenceViewerComponent implements OnInit, AfterViewInit {
  @Input('Sequence') Sequence: string;
  @Input('GridSize') GridSize: number;
  @Input('Hsps') Hsps: TblastxHsp[];
  private d3: D3;
  private parentNativeElement: any;
  private d3Svg: Selection<SVGSVGElement, any, null, undefined>;
  constructor(element: ElementRef, d3Service: D3Service) {
    this.d3 = d3Service.getD3();
    this.parentNativeElement = element.nativeElement;
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    const d3 = this.d3;
    let svg: any;
    const gridSize = this.GridSize;
    const padding = gridSize * 2;
    const width = gridSize * this.Sequence.length;
    const height = gridSize *5 + padding;

  }

  GetCord() {
    for (const h of this.Hsps) {
      if (h.HitFrame >0) {

      } else if (h.HitFrame < 0) {

      }
      h.HitStartPosition
      h.HitEndPosition
    }
  }
}
