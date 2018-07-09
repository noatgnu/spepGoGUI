import {Component, OnInit, AfterViewInit, ElementRef, Input, ViewEncapsulation} from '@angular/core';
import {D3Service, D3, ScaleQuantile, ScaleLinear, Selection, Transition, Axis} from 'd3-ng2-service';
import {Lagan} from "../helper/lagan";

import {SeqD3Coordinate} from "../helper/seq-d3-coordinate";

@Component({
  selector: 'app-alignment-viewer',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './alignment-viewer.component.html',
  styleUrls: ['./alignment-viewer.component.css']
})
export class AlignmentViewerComponent implements OnInit, AfterViewInit {
  @Input('Alignment') Alignment: Lagan;
  private d3: D3;
  private parentNativeElement: any;
  private d3Svg: Selection<SVGSVGElement, any, null, undefined>;
  legend: any;
  alignSize = 3;
  seqLabels: any;
  quant = [0, 0, 0];
  alignID = ['Query', 'Alignment', 'Target'];
  score: Array<number>;
  seqIdCoord = [new SeqD3Coordinate('Query', 0, 0), new SeqD3Coordinate('Alignment', 1, 0), new SeqD3Coordinate('Target', 2, 0)];

  constructor(element: ElementRef, d3Service: D3Service) {
    this.d3 = d3Service.getD3();
    this.parentNativeElement = element.nativeElement;
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    const d3 = this.d3;
    let svg: any;
    const colors = ['#ffffd9', '#edf8b1', '#c7e9b4', '#7fcdbb', '#41b6c4', '#1d91c0', '#225ea8', '#253494', '#081d58'];
    const gridSize = 15;
    const padding = gridSize * 2;
    const width = gridSize * this.score.length;
    const height = gridSize * this.alignSize;
    const ArrayPosition = [];
    for (let a = 0; a < this.score.length; a++) {
      ArrayPosition.push(a * gridSize);
    }
    if (this.parentNativeElement !== null) {
      const scaleDomain = d3.extent(this.score, function (d) {
        return d
      });
      scaleDomain[0] = 0;
      const colorScale = d3.scaleQuantile<string>()
        .domain(scaleDomain)
        .range(colors);
      const y = d3.scaleLinear().range([height, 0]).domain([0,1]);

      svg = d3.select(this.parentNativeElement)
        .append('svg')
        .attr('width', padding * 2 + width)
        .attr('height', padding * 2 + height)
        .append('g')
        .attr('transform', 'translate('+padding+','+padding+')');

      this.drawLegend(svg, colorScale, gridSize, colors);
      this.drawSeqLabels(svg, gridSize, padding);
      this.drawAAPosition(svg, ArrayPosition, gridSize);

      const aaQuant = svg.selectAll('.aaQuant').data(this.quant);
      const quantGroup = aaQuant.enter().append('g');
      const quantBlock = quantGroup.append('rect')
        .attr('x', function (d, i) {
          return i * gridSize;
        }).attr('y',  height).attr('width', gridSize).attr('height');
      const bars = svg.selectAll('.bars')
        .data(this.score);
      const barBlock = bars.enter().append('g').attr('class', 'barBlock');
      const barChart = barBlock.append('rect')
        .style('fill', 'steelblue')
        .attr('x', function (d, i) {
          return i * gridSize;
        }).attr('y', height)
        .attr('width', gridSize)
        .attr('height', y(0)).transition().duration(750).ease(this.d3.easeLinear).attr('y', function (d) {
          return y(d);
        }).attr('height', function(d) {
          return height - y(d);
        });
      svg.exit()
    }
  }

  private drawAAPosition(svg: any, ArrayPosition, gridSize: number) {
    const aaPosition = svg.selectAll('.aaPosition').data(ArrayPosition).enter();
    const aaPositionText = aaPosition.append('text').text(function (d, i) {
      return (i + 1)
    })
      .attr('x', function (d) {
        return d;
      })
      .attr('y', 0)
      .style('text-anchor', 'middle')
      .attr('transform', 'translate(' + gridSize / 2 + ', 0)')
      .attr('class', function (d, i) {
        return 'aaPositionText axis p' + (i + 1);
      });
  }

  drawLegend(svg, colorScale, gridSize, colors) {
    this.legend = svg.selectAll('.legend')
      .data([0].concat(colorScale.quantiles()), function(d) { return d; });

    const legendScale = this.legend.enter().append('g')
      .attr('class', 'legend');

    const legendBlock = legendScale.append('rect')
      .attr('x', function(d, i) { return gridSize * 2 * i; })
      .attr('y', gridSize)
      .attr('width', gridSize * 2)
      .attr('height', gridSize / 2)
      .style('fill', function(d, i) { return colors[i]; });

    legendScale.append('text')
      .attr('class', 'mono legend')
      .text(function(d) { return '≥ ' + Math.round(d*100)/100; })
      .attr('x', function(d, i) { return gridSize * 2 * i; })
      .attr('y', gridSize);

    legendScale.exit();
  }

  drawSeqLabels(svg, gridSize, padding) {

    this.seqLabels = svg.selectAll('.seqLabels')
      .data(this.seqIdCoord)
      .enter().append('text').text(function (d) {
        return d.seqId;
      })
      .attr('x', 0).attr('y', function(d) {return d.yCoord * gridSize + padding ; }).style('text-anchor', 'end')
      .attr('transform', 'translate(0,' + gridSize / 1.5 + ')').attr('class', 'seqLabels mono axis');
    this.seqLabels.exit();
  }
}
