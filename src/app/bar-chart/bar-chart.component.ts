import {Component, OnInit, AfterViewInit, ElementRef, Input, ViewEncapsulation} from '@angular/core';
import {D3Service, D3, ScaleQuantile, ScaleLinear, Selection, Transition, Axis} from 'd3-ng2-service';
import {Lagan} from "../helper/lagan";

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit, AfterViewInit {
  @Input('Alignment') Alignment: Lagan;
  private d3: D3;
  private parentNativeElement: any;
  private d3Svg: Selection<SVGSVGElement, any, null, undefined>;
  legend: any;
  alignSize = 3;
  seqLabels: any;
  quant = [0, 0, 0];
  alignID = ['Query', 'Alignment', 'Target'];
  Score: Array<number>;
  constructor(element: ElementRef, d3Service: D3Service) {
    this.d3 = d3Service.getD3();
    this.parentNativeElement = element.nativeElement;
  }

  ngOnInit() {
    this.Alignment = Object.assign(new Lagan('', '', ''), this.Alignment);
    this.Score = this.Alignment.CalculateScore(7);
  }

  ngAfterViewInit(){
    const d3 = this.d3;
    let svg: any;
    const gridSize = 15;
    const padding = gridSize * 2;
    const width = gridSize * this.Score.length;
    const height = gridSize *5 + padding;
    const y = d3.scaleLinear().range([height, 0]).domain([0,1]);
    const x = d3.scaleBand().range([0, this.Score.length*gridSize])
      .domain(this.Score.map(function (d, i) {return (i+1).toString();}));
    const xAxis = d3.axisBottom(x).scale(x).tickPadding(30);
    svg = d3.select(this.parentNativeElement)
      .append('svg')
      .attr('width', padding * 2 + width)
      .attr('height', padding * 2 + height);
    const axis =  svg.append('g')
      .attr('class', 'bottom-axis')
      .attr('transform', 'translate(0,'+(height+padding)+')')
      .call(xAxis);
    const axisLabels =  axis.selectAll("text")
      .attr("y", 2)
      .attr("x", 15)
      .attr("dy", ".35em")
      .attr("transform", "rotate(90)").style("text-anchor", 'middle');


    const bars = svg.selectAll('.bars')
      .data(this.Score);
    const barBlock = bars.enter()
      .append('g')
      .attr('class', 'barBlock');
    const barChart = barBlock.append('rect')
      .style('fill', '#E85285')
      .attr('x', function (d, i) {return x((i+1).toString());})
      .attr('y', function (d) {
        return y(d)-2+padding;
      })
      .attr('width', gridSize)
      .attr('height', y(0))
      .on('mouseover', this.SelectBarEvent('#6A1B9A', '#6A1B9A', '10pt', 'inline', 'over', height, gridSize, d3, axis, x, y))
      .on('mouseout', this.SelectBarEvent('#E85285', '#aaa', '5pt', 'none', 'out', height, gridSize, d3, axis, x, y));
    const barTrans = barChart.transition().duration(750).ease(this.d3.easeLinear).attr('height', function (d) {
        return height - y(d);
      });


    svg.exit();
  }

  SelectBarEvent(barcolor: string, textcolor: string, axisFontSize: string, barTextDisplay: string, eventType: string, height: number, gridSize: number, d3: D3, axis, xAxix, yAxis): (d,i) => void {
    switch (eventType) {
      case 'over':
        return (d, i) => {
          const barIn = d3.select(d3.event.currentTarget).style('fill', barcolor);
          const parent = d3.select(d3.event.currentTarget.parentNode);
          const bartext = parent.append('text')
            .attr("transform", "translate("+(xAxix(i+1))+","+ (yAxis(d) + gridSize) + ")")
            //.attr('x', ).attr('y', yAxis(d) + gridSize*3)

            .attr('class', 'bartextLabel')
            .attr('text-anchor', 'start').text(Math.round(d*100)/100);

          const a = axis.selectAll('text').filter(function (x) {
            return (i+1).toString()===x;
          });
          d3.event.currentTarget.parentNode.appendChild(bartext.node());
          a.style('fill', textcolor).style('font-size', axisFontSize);
        };
      case 'out':
        return (d, i) => {
          const barIn = d3.select(d3.event.currentTarget).style('fill', barcolor);
          const bartext = d3.select(d3.event.currentTarget.parentNode).select('text').remove();
          const a = axis.selectAll('text').filter(function (x) {
            return (i+1).toString()===x;
          });
          a.style('fill', textcolor).style('font-size', axisFontSize);
        };
    }

  }

}
