import {Component, OnInit, AfterViewInit, ElementRef, Input, ViewEncapsulation} from '@angular/core';
import {D3Service, D3, ScaleQuantile, ScaleLinear, Selection, Transition, Axis} from 'd3-ng2-service';
import {Lagan} from "../helper/lagan";
import {TblastxHsp} from "../helper/tblastx-hsp";
import {GraphData} from "../helper/graph-data";
import {FrameData} from "../helper/frame-data";
import {BarGraphService} from "../bar-graph.service";
import {PopupService} from "../search-sorf/popup.service";

@Component({
  selector: 'app-sequence-viewer',
  templateUrl: './sequence-viewer.component.html',
  styleUrls: ['./sequence-viewer.component.css']
})
export class SequenceViewerComponent implements OnInit, AfterViewInit {
  @Input() Sequence: string;
  @Input() GridSize: number;
  @Input() Frames: FrameData[];
  @Input() Colors: string[];
  private d3: D3;
  private parentNativeElement: any;
  private d3Svg: Selection<SVGSVGElement, any, null, undefined>;
  hspsMap: Map<number, TblastxHsp[][]>;
  totalCount: number = 0;
  data: GraphData[] = [];
  frameUnique: string[] = [];
  FrameColorMap: Map<number, string> = new Map<number, string>([[1, '#c31432'], [2, '#f953c6'], [3, '#FDC830']]);
  FrameLabelMap: Map<string, number> = new Map<string, number>();
  constructor(element: ElementRef, d3Service: D3Service, private barChart: BarGraphService, private popUpService: PopupService) {
    this.d3 = d3Service.getD3();
    this.parentNativeElement = element.nativeElement;
  }

  ngOnInit() {
    for (let i = 0; i < this.Sequence.length; i++) {
      this.data.push(new GraphData(this.Sequence[i], i))
    }

    for (const f of this.Frames) {
      const frame = 'Frame_' + f.Frame;
      if (!this.FrameLabelMap.has(frame)) {
        this.FrameLabelMap.set(frame, f.Frame);
        this.frameUnique.push(frame);
      }
    }

    this.totalCount = this.Frames.length;
  }

  ngAfterViewInit() {

    const popUp = this.popUpService;
    const uniqueFrames = this.frameUnique;
    const Frames = this.Frames;
    const FrameColorMap = this.FrameColorMap;
    const colors = this.Colors;
    const gridSize = this.GridSize;
    const margin = {top: gridSize*6, bottom: gridSize*6, left: gridSize*6, right: gridSize*6};
    const blockSize = this.GridSize/4;
    const d3 = this.d3;
    let svg: any;
    const width = gridSize * this.data.length/3;
    const height = gridSize * this.totalCount*5;
    if (this.parentNativeElement !== null) {
      const frame = {width: width + margin.left + margin.right, height: height + margin.top + margin.bottom};
      const x = d3.scaleBand().range([0, gridSize * this.data.length/3])
        .domain(this.data.map(function (d) {return d.value.toString();}));

      const y = d3.scaleLinear().range([height, 0]).domain([0, this.totalCount + 2]);
      svg = d3.select(this.parentNativeElement).append('svg')
        .attr('width', frame.width)
        .attr('height', frame.height);
      //.attr("preserveAspectRatio", "xMinYMin meet")
      //.attr('viewBox','0 0 ' + frame.width + ' ' + frame.height);

      const colourRange = d3.range(0,1,1.0/(colors.length-1));
      colourRange.push(1);
      const colorSc = d3.scaleLinear<string>().domain(colourRange).range(colors).interpolate(d3.interpolateHcl);
      const colorInterpolate = d3.scaleLinear().domain([0,1]).range([0,1]);
      this.barChart.CreateColorGradient(svg, colors);

      const graphBlock = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.right + ')');
      const {legendBlock, legendAxis} = this.barChart.CreateLegend(graphBlock, width, height, margin, d3, width*0.6, gridSize/5);
      const bars = graphBlock.selectAll('.baseSeq').data(this.data);
      const barBlock = bars.enter().append('g').attr('class', 'baseSeqBlock');
      const baseSeqBar = barBlock.append('rect')
        .attr('x', function (d) {
          return x(d.value.toString());
        })
        .attr('y', y(0))
        .attr('width', x.bandwidth())
        .attr('height', blockSize);

      const {legendContainer, legend} = this.barChart.CreateBarChartLegend(this.frameUnique, this.FrameLabelMap, this.FrameColorMap, graphBlock, width, height, gridSize, margin);
      legend.on('mouseover', function (d) {
        for (const l of uniqueFrames){
          const frames = svg.selectAll('.FrameBlock.'+l);
          const frameBars = frames.selectAll('rect');
          if (l !== d) {
            frameBars.transition().duration(500).style('opacity', 0.3);
          } else {
            const ft = frames.append('text');
            ft.attr('class', 'frame-text')
              .text( function (d) {
                return `Bit:${Frames[d.metadata].BitScore}; Evl:${Frames[d.metadata].Evalue}; Id:${Frames[d.metadata].Identity}`
              })
              .attr('x',function(d) {
                return x(Frames[d.metadata].Start.toString())
              }).attr('y', function (d) {
              return y(d.metadata+1) - blockSize
            });
            frameBars.transition().duration(500).style('fill', function(d: GraphData) {
              return colorSc(colorInterpolate(d.value))
            }).style('opacity', 1);
          }
        }
      }).on('mouseout', function (d) {
        for (const l of uniqueFrames){
          const frames = svg.selectAll('.FrameBlock.'+l);
          const frameBars = frames.selectAll('rect');
          if (l !== d) {
            frameBars.transition().duration(500).style('opacity', 1);
          } else {
            frameBars.transition().duration(500).style('fill', FrameColorMap.get(parseInt(l.replace('Frame_', '')))).style('opacity', 1);
          }
          const ft = frames.select('text').remove();
        }
      });

      for (let f = 0; f < this.totalCount; f++) {
        if (FrameColorMap.has(Frames[f].Frame)) {
          //const data = d3.range(this.Frames[f].Start, this.Frames[f].Stop+1, 1);
          const data: GraphData[] = [];
          for (let d = 0; d < Frames[f].Score.length; d++) {
            const a = new GraphData((d+Frames[f].Start).toString(), Frames[f].Score[d]);
            a.metadata = f;
            data.push(a)
          }
          const frameContainer = graphBlock.append('g').selectAll('.frameBlock');

          const frameBlock = frameContainer.append('g').data(data);
          const frameSeq = frameBlock.enter().append('g').attr('class', 'FrameBlock Frame_' + Frames[f].Frame);
          const frameSeqBar = frameSeq.append('rect').attr('class', 'seqBar Frame Frame_' + Frames[f].Frame).attr('x', function (d) {
            return x(d.name);
          }).attr('y', y(f+1))
            .attr('width', x.bandwidth())
            .attr('height', blockSize)
            //.style('fill', function (d, i) {return colorSc(colorInterpolate(d.value));});
            .style('fill', FrameColorMap.get(Frames[f].Frame));

          frameSeq.exit();
          console.log(frameSeqBar);

          /* const frameMouseOverBlock = frameBlock.append('rect').attr('class','mouseOverBar')
             .attr('x', x(data[0].name))
             .attr('y', y(f+1))
             .attr('width', x.bandwidth()*data.length)
             .attr('height', gridSize/10)
             .style('fill', this.FrameColorMap.get(this.Frames[f].Frame));
             //.style('fill', 'none');*/
          frameSeq.on('mouseover', function (d, i) {
            const ft = d3.select(d3.event.currentTarget.parentNode).append('text');
            ft.attr('class', 'frame-text')
              .text(`Bit:${Frames[d.metadata].BitScore}; Evl:${Frames[f].Evalue}; Id:${Frames[d.metadata].Identity}`)
              .attr('x', x(Frames[d.metadata].Start.toString())).attr('y', y(d.metadata+1) - blockSize);
            const r = d3.select(d3.event.currentTarget.parentNode).selectAll('rect');
            r.transition().duration(500)
              .style('fill', function(d: GraphData) {
                return colorSc(colorInterpolate(d.value))
              });
          }).on('mouseout', function (d, i) {
            const ft = d3.select(d3.event.currentTarget.parentNode).selectAll('text').remove();
            const r = d3.select(d3.event.currentTarget.parentNode).selectAll('rect');
            r.transition().duration(500).style('fill', FrameColorMap.get(Frames[f].Frame));
          }).on('click', function () {
            popUp.UpdatePopup(Frames[f].Alignment);
          });
        }
      }
      svg.exit()
    }

  }

  GetCord() {

  }
}
